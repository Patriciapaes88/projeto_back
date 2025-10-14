const db = require('../config/db');

const Transferencia = {
  criar: async (dados) => {
    const sql = `
      INSERT INTO transferencias (
        aluno_id, motivo, data_transferencia, nova_instituicao
      ) VALUES (?, ?, ?, ?)
    `;
    const valores = [
      dados.aluno_id,
      dados.motivo,
      dados.data_transferencia,
      dados.nova_instituicao
    ];

    console.log('Executando query com valores:', valores);

    //  Aqui está o ponto certo para usar db.execute
    const [resultado] = await db.execute(sql, valores);

    console.log('Transferência inserida com sucesso:', resultado);

    return resultado;
  },

  listarTodas: async () => {
    const [rows] = await db.execute('SELECT * FROM transferencias');
    return rows;
  },

  buscarPorId: async (id) => {
    const [rows] = await db.execute('SELECT * FROM transferencias WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = Transferencia;
