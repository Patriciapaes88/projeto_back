const db = require('../config/db');

const Matricula = {
  criar: async (dados) => {
    const sql = `
      INSERT INTO matriculas (
        aluno_id, turma_id, data_matricula, turno, tipo_matricula, responsavel,
        documentos_entregues, observacoes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      dados.aluno_id, dados.turma_id, dados.data_matricula, dados.turno,
      dados.tipo_matricula, dados.responsavel, dados.documentos_entregues,
      dados.observacoes
    ];
    const [resultado] = await db.query(sql, valores);
    console.log('✅ INSERT realizado com sucesso:', resultado);
    return resultado;
  },

  listarTodas: async () => {
    const [rows] = await db.query('SELECT * FROM matriculas');
    return rows;
  },

  buscarPorId: async (id) => {
    const [rows] = await db.query('SELECT * FROM matriculas WHERE id = ?', [id]);
    return rows[0];
  },

  atualizar: async (id, dados) => {
    const sql = `
      UPDATE matriculas SET
        aluno_id = ?, turma_id = ?, data_matricula = ?, turno = ?,
        tipo_matricula = ?, responsavel = ?, documentos_entregues = ?, observacoes = ?
      WHERE id = ?
    `;
    const valores = [
      dados.aluno_id, dados.turma_id, dados.data_matricula, dados.turno,
      dados.tipo_matricula, dados.responsavel, dados.documentos_entregues,
      dados.observacoes, id
    ];
    const [resultado] = await db.query(sql, valores);
    console.log('📥 Atualização realizada com sucesso:', resultado);
    return resultado;
  },

  deletar: async (id) => {
    const [resultado] = await db.query('DELETE FROM matriculas WHERE id = ?', [id]);
    return resultado;
  },

  buscarPorAlunoETurma: async (aluno_id, turma_id) => {
    const sql = 'SELECT * FROM matriculas WHERE aluno_id = ? AND turma_id = ?';
    const [rows] = await db.query(sql, [aluno_id, turma_id]);
    return rows;
  }
};

module.exports = Matricula;
