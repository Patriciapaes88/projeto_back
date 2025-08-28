const Transferencia = require('../models/transferenciaModel');

exports.criarTransferencia = (req, res) => {
  Transferencia.criar(req.body, (err, resultado) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(201).json({ mensagem: 'Solicitação registrada!', id: resultado.insertId });
  });
};

exports.listarTransferencias = (req, res) => {
  Transferencia.listarTodas((err, resultados) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(200).json(resultados);
  });
};

exports.buscarTransferenciaPorId = (req, res) => {
  const id = req.params.id;
  Transferencia.buscarPorId(id, (err, resultado) => {
    if (err) return res.status(500).json({ erro: err });
    if (resultado.length === 0) return res.status(404).json({ mensagem: 'Não encontrada' });
    res.status(200).json(resultado[0]);
  });
};
