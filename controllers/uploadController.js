const Documento = require('../models/documentoModel');
const path = require('path');
const db = require('../config/db');


exports.enviarDocumento = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
    }

    const { aluno_id } = req.body;

    const dados = {
      aluno_id: parseInt(aluno_id),
      nome_arquivo: req.file.filename,
      caminho_arquivo: req.file.path,
      data_upload: new Date()
    };

    const resultado = await Documento.salvar(dados);

    res.status(201).json({
      mensagem: 'Documento enviado e registrado com sucesso!',
      id: resultado.insertId,
      nome_arquivo: req.file.filename
    });
  } catch (err) {
    console.error('❌ Erro ao salvar documento:', err);
    res.status(500).json({ erro: err.message });
  }
};
exports.deletarDocumento = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca o documento no banco
    const [rows] = await db.execute('SELECT caminho_arquivo FROM documentos_upload WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Documento não encontrado' });
    }

    const caminhoCompleto = path.join(__dirname, '..', rows[0].caminho_arquivo);

    await Documento.deletar(id, caminhoCompleto);

    res.status(200).json({ mensagem: 'Documento apagado com sucesso!' });
  } catch (err) {
    console.error('❌ Erro ao apagar documento:', err);
    res.status(500).json({ erro: err.message });
  }
};