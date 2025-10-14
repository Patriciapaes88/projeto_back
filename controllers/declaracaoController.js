// controllers/declaracaoController.js

const Declaracao = require('../models/declaracaoModel');

exports.criarDeclaracao = async (req, res) => {
  try {
    const resultado = await Declaracao.criar(req.body);
    res.status(201).json({ mensagem: 'Declaração criada com sucesso!', id: resultado.insertId });
  } catch (err) {
    console.error(' Erro ao criar declaração:', err);
    res.status(500).json({ erro: err.message });
  }
};

exports.listarDeclaracoes = async (req, res) => {
  try {
    const resultados = await Declaracao.listarTodas();
    res.status(200).json(resultados);
  } catch (err) {
    console.error('Erro ao listar declarações:', err);
    res.status(500).json({ erro: err.message });
  }
};
