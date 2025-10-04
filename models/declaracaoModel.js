const db = require('../config/db');

const Declaracao = {
  criar: async (dados) => {
    const sql = `
      INSERT INTO declaracoes (
        aluno_id, tipo, conteudo, data_emissao
      ) VALUES (?, ?, ?, ?)
    `;
    const valores = [
      dados.aluno_id,
      dados.tipo,
      dados.conteudo,
      dados.data_emissao
    ];

    console.log('📦 Executando INSERT de declaração:', valores);

    const [resultado] = await db.execute(sql, valores);
    return resultado;
  },

  listarTodas: async () => {
    console.log('📤 Executando SELECT de todas as declarações');
    const [rows] = await db.execute('SELECT * FROM declaracoes');
    return rows;
  }
};

module.exports = Declaracao;
