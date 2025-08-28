const express = require('express');
const router = express.Router();

// Controllers
const alunoController = require('../controllers/alunoController');
const matriculaController = require('../controllers/matriculaController');
const transferenciaController = require('../controllers/transferenciaController');
const declaracaoController = require('../controllers/declaracaoController'); 
const termoController = require('../controllers/termoController'); 
const uploadController = require('../controllers/uploadController'); 

// 📌 Aluno
router.post('/alunos', alunoController.criarAluno);
router.get('/alunos', alunoController.listarAlunos);
router.get('/alunos/:id', alunoController.buscarAlunoPorId);
router.put('/alunos/:id', alunoController.atualizarAluno);   // Atualiza aluno por ID
router.delete('/alunos/:id', alunoController.deletarAluno);   // Deleta aluno por ID


// 📌 Matrícula
router.post('/matricula', matriculaController.criarMatricula);
router.get('/matricula', matriculaController.listarMatriculas);
router.get('/matricula/:id', matriculaController.buscarMatriculaPorId);
router.put('/matricula/:id', matriculaController.atualizarMatricula);
router.delete('/matricula/:id', matriculaController.deletarMatricula);

// 📌 Transferência
router.post('/transferencia', transferenciaController.criarTransferencia);
router.get('/transferencia', transferenciaController.listarTransferencias);
router.get('/transferencia/:id', transferenciaController.buscarTransferenciaPorId);

// 📌 Declarações
router.post('/declaracoes', declaracaoController.criarDeclaracao);
router.get('/declaracoes', declaracaoController.listarDeclaracoes);

// 📌 Termos
router.post('/termos', termoController.criarTermo);
router.get('/termos', termoController.listarTermos);

// 📌 Upload de documentos
router.post('/upload', uploadController.enviarDocumento);





module.exports = router;
