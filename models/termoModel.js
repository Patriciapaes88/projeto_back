const db = require('../config/db');

const Termo = {
  criar: async (dados) => {
    const sql = `
      INSERT INTO termos (
        aluno_id, tipo, descricao, data_assinatura
      ) VALUES (?, ?, ?, ?)
    `;
    const valores = [
      dados.aluno_id,
      dados.tipo,
      dados.descricao,
      dados.data_assinatura
    ];

    console.log('Executando INSERT de termo:', valores);

    const [resultado] = await db.execute(sql, valores);
    return resultado;
  },

  listarTodas: async () => {
    console.log(' Executando SELECT de todos os termos');
    const [rows] = await db.execute('SELECT * FROM termos');
    return rows;
  }
};

module.exports = Termo;
