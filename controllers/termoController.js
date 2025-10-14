const Termo = require('../models/termoModel');

exports.criarTermo = async (req, res) => {
  try {
    const resultado = await Termo.criar(req.body);
    res.status(201).json({ mensagem: 'Termo criado com sucesso!', id: resultado.insertId });
  } catch (err) {
    console.error('Erro ao criar termo:', err);
    res.status(500).json({ erro: err.message });
  }
};

exports.listarTermos = async (req, res) => {
  try {
    const resultados = await Termo.listarTodas();
    res.status(200).json(resultados);
  } catch (err) {
    console.error(' Erro ao listar termos:', err);
    res.status(500).json({ erro: err.message });
  }
};
