const db = require('../config/db');

const Transferencia = {
  criar: (dados, callback) => {
    const sql = `
      INSERT INTO transferencias (
        aluno_id, motivo, data_solicitacao, status
      ) VALUES (?, ?, ?, ?)
    `;
    const valores = [dados.aluno_id, dados.motivo, dados.data_solicitacao, dados.status];
    db.query(sql, valores, callback);
  },

  listarTodas: (callback) => {
    db.query('SELECT * FROM transferencias', callback);
  },

  buscarPorId: (id, callback) => {
    db.query('SELECT * FROM transferencias WHERE id = ?', [id], callback);
  }
};

module.exports = Transferencia;
