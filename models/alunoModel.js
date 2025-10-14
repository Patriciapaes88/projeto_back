const db = require("../config/db");

const Aluno = {
  criar: async (dados) => {
    console.log("Dados recebidos:", dados);

    const valores = [
      dados.nome ?? null,
      dados.cpf ?? null,
      dados.rg ?? null,
      dados.nascimento ?? null,
      dados.certidao_nascimento ?? null,
      dados.nis ?? null,
      dados.bolsa_familia ?? null,
      dados.alergias ?? null,
      dados.deficiencia ?? null,
      dados.sexo ?? null,
      dados.cor_raca ?? null,
      dados.nacionalidade ?? null,
      dados.naturalidade ?? null,
      dados.endereco ?? null,
      dados.telefone ?? null,
      dados.nome_social ?? null,
      dados.nome_afetivo ?? null,
      dados.filiacao_pai ?? null,
      dados.filiacao_mae ?? null,
    ];

    if (valores.length !== 19) {
      throw new Error(
        `Número incorreto de valores: esperado 20, recebido ${valores.length}`
      );
    }

    const sql = `
  INSERT INTO alunos (
    nome, cpf, rg, nascimento, certidao_nascimento, nis, bolsa_familia,
    alergias, deficiencia, sexo, cor_raca, nacionalidade, naturalidade,
    endereco, telefone, nome_social, nome_afetivo, filiacao_pai, filiacao_mae
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    const [resultado] = await db.query(sql, valores);
    return resultado;
  },

  listarTodos: async () => {
    const [resultados] = await db.query("SELECT * FROM alunos");
    return resultados;
  },

  buscarPorId: async (id) => {
    const [resultado] = await db.query("SELECT * FROM alunos WHERE id = ?", [
      id,
    ]);
    return resultado;
  },

  atualizar: async (id, dados) => {
    const campos = [
      "nome",
      "cpf",
      "rg",
      "nascimento",
      "certidao_nascimento",
      "nis",
      "bolsa_familia",
      "alergias",
      "deficiencia",
      "sexo",
      "cor_raca",
      "nacionalidade",
      "naturalidade",
      "endereco",
      "telefone",
      "nome_social",
      "nome_afetivo",
      "filiacao_pai",
      "filiacao_mae",
    ];

    const valores = campos.map((campo) => dados[campo] ?? null);
    valores.push(id); // para o WHERE

    const sql = `
      UPDATE alunos SET
        nome = ?, cpf = ?, rg = ?, nascimento = ?, certidao_nascimento = ?, nis = ?, bolsa_familia = ?,
        alergias = ?, deficiencia = ?, sexo = ?, cor_raca = ?, nacionalidade = ?, naturalidade = ?,
        endereco = ?, telefone = ?, nome_social = ?, nome_afetivo = ?, filiacao_pai = ?, filiacao_mae = ?
      WHERE id = ?
    `;

    const [resultado] = await db.query(sql, valores);
    return resultado;
  },

  deletar: async (id) => {
    const [resultado] = await db.query("DELETE FROM alunos WHERE id = ?", [id]);
    return resultado;
  },

  /*  Método para listar alunos com filtros e paginação
    Pode filtrar por nome, turma e status (se existirem no banco)
  Também retorna total de registros para controle de páginas
    Exemplo de uso: GET /api/aluno?nome=ana&turma=3A&page=2&limit=5
   */
  listarComFiltros: async ({ nome, turma, status, limit,turno, offset }) => {
    let sql = "SELECT * FROM alunos WHERE 1=1";
    let countSql = "SELECT COUNT(*) as total FROM alunos WHERE 1=1";
    const params = [];
    const countParams = [];

    // Filtro por nome, ignorando se for "todos"
    if (nome && nome.toLowerCase() !== "todos") {
      sql += " AND nome LIKE ?";
      countSql += " AND nome LIKE ?";
      params.push(`%${nome}%`);
      countParams.push(`%${nome}%`);
    }

    // Filtro por turma
    if (turma) {
      sql += " AND turma = ?";
      countSql += " AND turma = ?";
      params.push(turma);
      countParams.push(turma);
    }
    // Filtro por turno
if (turno) {
  sql += " AND turno = ?";
  countSql += " AND turno = ?";
  params.push(turno);
  countParams.push(turno);
}


    // Filtros simulados por status
    if (status === "alergico") {
      sql += ' AND alergias IS NOT NULL AND alergias != ""';
      countSql += ' AND alergias IS NOT NULL AND alergias != ""';
    }

    if (status === "matriculado") {
      sql +=
        " AND EXISTS (SELECT 1 FROM matriculas WHERE aluno_id = alunos.id)";
      countSql +=
        " AND EXISTS (SELECT 1 FROM matriculas WHERE aluno_id = alunos.id)";
    }

    if (status === "desistente") {
      sql += ' AND observacoes LIKE "%desistente%"';
      countSql += ' AND observacoes LIKE "%desistente%"';
    }

    if (status === "ativo") {
      sql += ` AND EXISTS (
      SELECT 1 FROM matriculas m 
      WHERE m.aluno_id = alunos.id AND m.ano_letivo = YEAR(CURDATE())
    )`;
      countSql += ` AND EXISTS (
      SELECT 1 FROM matriculas m 
      WHERE m.aluno_id = alunos.id AND m.ano_letivo = YEAR(CURDATE())
    )`;
    }

    if (status === "transferido") {
      sql += ' AND observacoes LIKE "%transferido%"';
      countSql += ' AND observacoes LIKE "%transferido%"';
    }

    // Paginação (opcional)
    if (limit && offset !== null) {
      sql += " ORDER BY nome ASC LIMIT ? OFFSET ?";
      params.push(limit, offset);
    } else {
      sql += " ORDER BY nome ASC";
    }

    const [alunos] = await db.query(sql, params);
    const [[{ total }]] = await db.query(countSql, countParams);

    return { alunos, total };
  },

  consultaDetalhada: async (id) => {
    const sql = `
    SELECT 
      a.id AS alunoId,
      a.nome,
      a.cpf,
      a.rg,
      a.nascimento,
      m.id AS matriculaId,
      m.data_matricula,
      m.turno,
      m.tipo_matricula,
      m.responsavel,
      m.observacoes
    FROM alunos a
    LEFT JOIN matriculas m ON a.id = m.aluno_id
    WHERE a.id = ?
  `;
    const [rows] = await db.query(sql, [id]);
    return rows;
  },

  buscarIdPorNome: async (nome) => {
    const sql =
      "SELECT id, nome FROM alunos WHERE nome LIKE ? ORDER BY nome ASC LIMIT 10";
    const [resultado] = await db.query(sql, [`%${nome}%`]);
    return resultado;
  },
};

module.exports = Aluno;
