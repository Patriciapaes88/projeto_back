const Transferencia = require('../models/transferenciaModel');


exports.criarTransferencia = async (req, res) => {
  try {
    console.log(' Dados recebidos no controller:', req.body);
    const resultado = await Transferencia.criar(req.body);
    res.status(201).json({ mensagem: 'Solicitação registrada!', id: resultado.insertId });
  } catch (err) {
    console.error(' Erro ao inserir transferência:', err);
    res.status(500).json({ erro: err.message });
  }
};


exports.listarTransferencias = async (req, res) => {
  try {
    console.log('Requisição para listar todas as transferências');
    const resultados = await Transferencia.listarTodas();
    res.status(200).json(resultados);
  } catch (err) {
    console.error(' Erro ao listar transferências:', err);
    res.status(500).json({ erro: err.message });
  }
};

exports.buscarTransferenciaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(` Buscando transferência com ID: ${id}`);
    const resultado = await Transferencia.buscarPorId(id);

    if (!resultado) {
      return res.status(404).json({ mensagem: 'Transferência não encontrada' });
    }

    res.status(200).json(resultado);
  } catch (err) {
    console.error(' Erro ao buscar transferência por ID:', err);
    res.status(500).json({ erro: err.message });
  }
};
