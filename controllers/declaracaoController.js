// controllers/declaracaoController.js

exports.criarDeclaracao = (req, res) => {
  res.status(201).json({ mensagem: 'Declaração criada com sucesso (simulado)' });
};

exports.listarDeclaracoes = (req, res) => {
  res.status(200).json({ mensagem: 'Lista de declarações (simulado)' });
};
