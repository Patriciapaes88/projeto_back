
const Matricula = require('../models/matriculaModel');

exports.criarMatricula = async (req, res) => {
  console.log('➡️ Requisição recebida em /api/aluno/matricula');
  console.log('📦 Dados recebidos:', req.body);

  const { aluno_id, turma_id } = req.body;

  try {
    const resultado = await Matricula.buscarPorAlunoETurma(aluno_id, turma_id);

    if (resultado.length > 0) {
      console.log('⚠️ Matrícula já existe para aluno e turma');
      return res.status(400).json({ mensagem: 'Aluno já matriculado nessa turma.' });
    }

    const novaMatricula = await Matricula.criar(req.body);
    console.log('✅ Matrícula criada com sucesso:', novaMatricula.insertId);

    res.status(201).json({
      mensagem: 'Matrícula realizada com sucesso!',
      id: novaMatricula.insertId
    });

  } catch (err) {
    console.error('❌ Erro ao criar matrícula:', err);
    res.status(500).json({ erro: err.message });
  }
};

exports.listarMatriculas = async (req, res) => {
  try {
    const resultados = await Matricula.listarTodas();
    res.status(200).json(resultados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.buscarMatriculaPorId = async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await Matricula.buscarPorId(id);

    if (!resultado) {
      return res.status(404).json({ mensagem: 'Matrícula não encontrada.' });
    }

    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarMatricula = async (req, res) => {
  const id = req.params.id;
  const dadosAtualizados = req.body;

  try {
    await Matricula.atualizar(id, dadosAtualizados);
    res.status(200).json({ mensagem: 'Matrícula atualizada com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deletarMatricula = async (req, res) => {
  const id = req.params.id;

  try {
    await Matricula.deletar(id);
    res.status(200).json({ mensagem: 'Matrícula excluída com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
