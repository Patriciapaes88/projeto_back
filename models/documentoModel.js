const db = require('../config/db');
const fs = require('fs');

const Documento = {
  salvar: async (dados) => {
    const sql = `
      INSERT INTO documentos_upload (
        aluno_id, nome_arquivo, caminho_arquivo, data_upload
      ) VALUES (?, ?, ?, ?)
    `;
    const valores = [
      dados.aluno_id,
      dados.nome_arquivo,
      dados.caminho_arquivo,
      dados.data_upload
    ];

    const [resultado] = await db.execute(sql, valores);
    return resultado;
  },

  listarTodos: async () => {
    const [rows] = await db.execute('SELECT * FROM documentos_upload');
    return rows;
  },

  deletar: async (id, caminho_arquivo) => {
    await db.execute('DELETE FROM documentos_upload WHERE id = ?', [id]);

    if (fs.existsSync(caminho_arquivo)) {
      fs.unlinkSync(caminho_arquivo);
    }
  }
};

module.exports = Documento;
