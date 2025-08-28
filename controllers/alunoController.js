//Recebe os dados da requisição e chama o model.

const Aluno = require('../models/alunoModel');

exports.criarAluno = async (req, res) => {
  try {
    const resultado = await Aluno.criar(req.body);
    res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso!', id: resultado.insertId });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarAlunos = async (req, res) => {
  try {
    const resultados = await Aluno.listarTodos();
    res.status(200).json(resultados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.buscarAlunoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await Aluno.buscarPorId(id);
    if (resultado.length === 0) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado' });
    }
    res.status(200).json(resultado[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarAluno = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await Aluno.atualizar(id, req.body);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado para atualizar' });
    }
    res.status(200).json({ mensagem: 'Aluno atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deletarAluno = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await Aluno.deletar(id);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado para exclusão' });
    }
    res.status(200).json({ mensagem: 'Aluno deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

