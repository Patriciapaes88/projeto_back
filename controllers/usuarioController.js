const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { enviarEmail } = require("../services/emailService");
const { chaveSecreta } = require("../config/jwtConfig");
const { definirPermissoes } = require("../models/permissaoModel");

const cargosValidos = [
  "diretor",
  "diretor_adjunto",
  "secretaria",
  "professor",
  "outros",
];

const permissoesPorCargo = {
  diretor: [
    "cadastro",
    "documentos",
    "termos",
    "declaracoes",
    "matricula",
    "transferencia",
    "rematricula",
    "relatorios",
    "aluno",
  ],
  diretor_adjunto: [
    "cadastro",
    "documentos",
    "termos",
    "declaracoes",
    "matricula",
    "transferencia",
    "rematricula",
    "relatorios",
    "aluno",
  ],
  secretaria: [
    "documentos",
    "relatorios",
    "matricula",
    "transferencia",
    "aluno",
    "rematricula",
  ],
  professor: ["termos", "declaracoes"],
  outros: ["termos", "declaracoes"],
};

exports.cadastrarUsuario = async (req, res) => {
  const { usuario, senha, email, cargo, cpf, telefone, permissoes } = req.body;

  // Verifica se o usuário logado é diretor ou diretor adjunto
  if (
    !req.usuario ||
    (req.usuario.cargo !== "diretor" && req.usuario.cargo !== "diretor_adjunto")
  ) {
    return res.status(403).json({
      mensagem:
        "Apenas diretores ou diretores adjuntos podem cadastrar usuários.",
    });
  }

  // Validação de campos obrigatórios
  if (!usuario || !senha || !email || !cargo  || !cpf || !telefone) {
    return res
      .status(400)
      .json({ mensagem: "Preencha usuario, senha, email e cargo!" });
  }

  // Validação de cargo permitido
  if (!cargosValidos.includes(cargo)) {
    return res.status(400).json({ mensagem: "Cargo inválido." });
  }

  try {
    // Verifica se nome ou email já existem
    const [usuarioExistente] = await db.query(
      "SELECT * FROM usuarios WHERE nome = ?",
      [usuario]
    );
    if (usuarioExistente.length > 0) {
      return res.status(400).json({ mensagem: "Usuário já existe!" });
    }
    const [emailExistente] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    if (emailExistente.length > 0) {
      return res.status(400).json({ mensagem: "Email já cadastrado!" });
    }
    // Verifica se CPF já existe
    const [cpfExistente] = await db.query(
      "SELECT * FROM usuarios WHERE cpf = ?",
      [cpf]
    );
    if (cpfExistente.length > 0) {
      return res.status(400).json({ mensagem: "CPF já cadastrado!" });
    }

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Insere novo usuário
    const [resultado] = await db.query(
      "INSERT INTO usuarios (nome, senha, email, cargo) VALUES (?, ?, ?, ?)",
      [usuario, senhaHash, email, cargo]
    );

    const novoUsuarioId = resultado.insertId;

    //  Aqui entra o trecho que define as permissões
    let permissoesFinal = [];

    if (Array.isArray(permissoes) && permissoes.length > 0) {
      permissoesFinal = permissoes;
    } else {
      permissoesFinal = (permissoesPorCargo[cargo] || []).map((recurso) => ({
        recurso,
        permitido: true,
      }));
    }

    await definirPermissoes(novoUsuarioId, permissoesFinal);

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

//* Login
exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [results] = await db.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);

    if (results.length === 0)
      return res.status(401).json({ mensagem: "Usuário não encontrado!" });

    const usuario = results[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida)
      return res.status(401).json({ mensagem: "Senha incorreta!" });

    const token = jwt.sign(
      { id: usuario.id, cargo: usuario.cargo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, mensagem: "Login realizado com sucesso!" });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

// Perfil
exports.perfilUsuario = async (req, res) => {
  const id = req.usuario.id;

  try {
    const [rows] = await db.query(
      "SELECT id, nome, email, cargo FROM usuarios WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao buscar perfil:", err);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

// Recuperar senha
exports.recuperarSenha = async (req, res) => {
  const { email } = req.body;

  try {
    //verifica se o email existe
    const [rows] = await db.query("SELECT id FROM usuarios WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Email não encontrado" });
    }
    // gera o token e define a expiraçao
    const token = crypto.randomBytes(32).toString("hex");
    const expiracao = new Date(Date.now() + 3600000); // 1 hora
    //atualiza usuario com token e expiração
    await db.query(
      "UPDATE usuarios SET token_recuperacao = ?, expiracao_token = ? WHERE email = ?",
      [token, expiracao, email]
    );

    // Monta link de recuperação
    const link = `https://seusite.com/resetar-senha/${token}`;

    const corpoHtml = `
      <h2>Recuperação de Senha</h2>
      <p>Olá! Clique no link abaixo para redefinir sua senha:</p>
      <a href="${link}">${link}</a>
      <p>Este link expira em 1 hora.</p>
    `;

    await enviarEmail(email, "Recuperação de Senha", corpoHtml);

    //retorna a resposta
    res.json({
      mensagem:
        "Verifique seu e-mail. Enviamos um link para redefinir sua senha.",
    });
  } catch (err) {
    console.error("Erro na recuperação de senha:", err);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

// A função resetarSenha já realiza a redefinição de senha via token enviado por e-mail.
// Não é necessário criar uma função separada chamada redefinirSenha.

exports.resetarSenha = async (req, res) => {
  const token = req.params.token.trim();
  const { novaSenha } = req.body;

  if (!novaSenha || novaSenha.length < 8) {
    return res
      .status(400)
      .json({ mensagem: "A nova senha deve ter pelo menos 8 caracteres." });
  }

  try {
    console.log("Token recebido:", token);
    console.log("Nova senha recebida:", novaSenha);
    const [verifica] = await db.query(
      "SELECT id, email, expiracao_token FROM usuarios WHERE token_recuperacao = ?",
      [token]
    );

    if (verifica.length === 0) {
      return res.status(400).json({ mensagem: "Token não encontrado." });
    }

    const usuario = verifica[0];
    const expiracao = new Date(usuario.expiracao_token);
    const agora = new Date();

    if (expiracao < agora) {
      console.log("Token expirado.");
      return res.status(400).json({ mensagem: "Token expirado." });
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10);

    const [result] = await db.query(
      "UPDATE usuarios SET senha = ?, token_recuperacao = NULL, expiracao_token = NULL WHERE id = ?",
      [senhaHash, usuario.id]
    );

    if (result.affectedRows === 0) {
      console.log("Erro ao atualizar a senha no banco.");
      return res
        .status(500)
        .json({ mensagem: "Não foi possível atualizar a senha." });
    }

    console.log(`Senha redefinida com sucesso para o usuário ${usuario.email}`);
    res.json({ mensagem: "Senha redefinida com sucesso!" });
  } catch (err) {
    console.error("Erro ao redefinir senha:", err);
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

//buscar por email

exports.buscarPorEmail = async (req, res) => {
  const email = req.params.email.trim();

  try {
    const [results] = await db.query(
      "SELECT id, nome, email, cargo FROM usuarios WHERE email = ?",
      [email]
    );

    if (results.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("Erro na query:", err);
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

//editar perfil
exports.editarPerfil = async (req, res) => {
  const id = req.usuario.id; // vem do middleware de autenticação
  const { nome, email } = req.body;

  try {
    // Verifica se o usuário existe
    const [rows] = await db.query("SELECT * FROM usuarios WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Verifica se o novo e-mail já está em uso por outro usuário
    if (email && email !== rows[0].email) {
      const [emailExistente] = await db.query(
        "SELECT id FROM usuarios WHERE email = ?",
        [email]
      );
      if (emailExistente.length > 0) {
        return res
          .status(400)
          .json({ mensagem: "Este e-mail já está em uso." });
      }
    }

    // Atualiza os dados
    await db.query("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?", [
      nome || rows[0].nome,
      email || rows[0].email,
      id,
    ]);

    res.json({ mensagem: "Perfil atualizado com sucesso!" });
  } catch (err) {
    console.error("Erro ao editar perfil:", err);
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

//cadastro de permissoes
const permissoes = [
  { recurso: "declaracao", permitido: true },
  { recurso: "historico_alergicos", permitido: true },
];

exports.definirPermissoesUsuario = async (req, res) => {
  const usuarioId = parseInt(req.params.id, 10);
  const permissoes = req.body;

  // Validação de ID
  if (isNaN(usuarioId) || usuarioId <= 0) {
    return res.status(400).json({ mensagem: "ID de usuário inválido." });
  }

  // Validação de permissões
  if (!Array.isArray(permissoes) || permissoes.length === 0) {
    return res
      .status(400)
      .json({ mensagem: "Permissões devem ser um array não vazio." });
  }

  try {
    // Verifica se o usuário existe
    const [usuario] = await db.query("SELECT * FROM usuarios WHERE id = ?", [
      usuarioId,
    ]);
    if (usuario.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Define permissões
    await definirPermissoes(usuarioId, permissoes);
    res.status(200).json({ mensagem: "Permissões atualizadas com sucesso!" });
  } catch (error) {
    console.error("Erro ao definir permissões:", error);
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};
