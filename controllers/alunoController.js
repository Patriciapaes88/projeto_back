//Recebe os dados da requisição e chama o model.

const Aluno = require("../models/alunoModel");


exports.criarAluno = async (req, res) => {
  try {
    const resultado = await Aluno.criar(req.body);
    res.status(201).json({
      mensagem: "Aluno cadastrado com sucesso!",
      id: resultado.insertId,
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.consultaDetalhada = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await Aluno.consultaDetalhada(id);
    if (resultado.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Aluno não encontrado ou sem dados relacionados" });
    }
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
exports.listarAlunos = async (req, res) => {
  // Recebe os filtros e paginação via query string
  const { nome, turma, status, turno, page = 1, limit = 10 } = req.query;


  // Calcula o deslocamento (offset) para a página atual
  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    // Chama o model com os filtros e paginação
    const resultados = await Aluno.listarComFiltros({
      nome,
      turma,
      status,
      limit: parseInt(limit),
      offset,
    });

    // Retorna os dados paginados e filtrados
    res.status(200).json({
      total: resultados.total,
      paginaAtual: parseInt(page),
      totalPaginas: Math.ceil(resultados.total / limit),
      alunos: resultados.alunos,
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.buscarAlunoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await Aluno.buscarPorId(id);
    if (resultado.length === 0) {
      return res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
    res.status(200).json(resultado[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarAluno = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await Aluno.atualizar(id, req.body);
    if (resultado.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensagem: "Aluno não encontrado para atualizar" });
    }
    res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deletarAluno = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await Aluno.deletar(id);
    if (resultado.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensagem: "Aluno não encontrado para exclusão" });
    }
    res.status(200).json({ mensagem: "Aluno deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.buscarIdPorNome = async (req, res) => {
  const { nome } = req.query;

  if (!nome || nome.length < 3) {
    return res
      .status(400)
      .json({ mensagem: "Informe pelo menos 3 caracteres." });
  }

  try {
    const resultados = await Aluno.buscarIdPorNome(nome);

    if (resultados.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum aluno encontrado." });
    }

    res.status(200).json(resultados); // retorna array [{id, nome}, ...]
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


