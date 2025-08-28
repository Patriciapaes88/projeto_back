exports.criarTermo = (req, res) => {
  res.status(201).json({ mensagem: 'Termo criado com sucesso (simulado)' });
};

exports.listarTermos = (req, res) => {
  res.status(200).json({ mensagem: 'Lista de termos (simulado)' });
};
