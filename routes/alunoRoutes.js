const express = require('express');
const router = express.Router();

// Controllers
const alunoController = require('../controllers/alunoController');
const matriculaController = require('../controllers/matriculaController');
const transferenciaController = require('../controllers/transferenciaController');
const declaracaoController = require('../controllers/declaracaoController'); 
const termoController = require('../controllers/termoController'); 
const upload = require('../middlewares/upload');
const uploadController = require('../controllers/uploadController');

/**
 * @swagger
 * tags:
 *   - name: Alunos
 *   - name: Matrícula
 *   - name: Transferência
 *   - name: Declarações
 *   - name: Termos
 *   - name: Upload
 */


// 📌 Aluno

/**
 * @swagger
 * /api/aluno/alunos:
 *   post:
 *     summary: Cadastra um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               rg:
 *                 type: string
 *               nascimento:
 *                 type: string
 *                 format: date
 *               certidao_nascimento:
 *                 type: string
 *               nis:
 *                 type: string
 *               bolsa_familia:
 *                 type: boolean
 *               alergias:
 *                 type: string
 *               deficiencia:
 *                 type: string
 *               sexo:
 *                 type: string
 *               cor_raca:
 *                 type: string
 *               nacionalidade:
 *                 type: string
 *               naturalidade:
 *                 type: string
 *               endereco:
 *                 type: string
 *               telefone:
 *                 type: string
 *               nome_social:
 *                 type: string
 *               nome_afetivo:
 *                 type: string
 *               filiacao_pai:
 *                 type: string
 *               filiacao_mae:
 *                 type: string
 *     responses:
 *       201:
 *         description: Aluno cadastrado com sucesso
 */

router.post('/alunos', alunoController.criarAluno);
/**
 * @swagger
 * /api/aluno/alunos:
 *   get:
 *     summary: Lista alunos com filtros obrigatórios
 *     tags: [Alunos]
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do aluno ou todos. Obrigatório.
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [alergico,  matriculado, desistente, ativo, tranferido]
 *         description: Categoria simulada para filtrar alunos. Obrigatório.
 *       - in: query
 *         name: turma
 *         schema:
 *           type: string
 *         description: Turma do aluno (opcional)
 *     responses:
 *       200:
 *         description: Lista de alunos filtrada
 *       400:
 *         description: Campos obrigatórios ausentes
 */
router.get('/alunos', alunoController.listarAlunos);

router.get('/alunos', alunoController.listarAlunos);

/**
 * @swagger
 * /api/aluno/alunos/{id}:
 *   get:
 *     summary: Busca aluno por ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do aluno
 *       404:
 *         description: Aluno não encontrado
 */
router.get('/alunos/:id', alunoController.buscarAlunoPorId);
/**
 * @swagger
 * /api/aluno/alunos/{id}:
 *   put:
 *     summary: Atualiza dados do aluno
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               telefone:
 *                 type: string
 *               endereco:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.put('/alunos/:id', alunoController.atualizarAluno);   // Atualiza aluno por ID
/**
 * @swagger
 * /api/aluno/alunos/{id}:
 *   delete:
 *     summary: Deleta aluno por ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno deletado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.delete('/alunos/:id', alunoController.deletarAluno);   // Deleta aluno por ID


// 📌 Matrícula
/**
 * @swagger
 * /api/aluno/matricula:
 *   post:
 *     summary: Cadastra uma nova matrícula
 *     tags: [Matrícula]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alunoId:
 *                 type: integer
 *               turma:
 *                 type: string
 *               anoLetivo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Matrícula criada com sucesso
 */
router.post('/matricula', matriculaController.criarMatricula);
/**
 * @swagger
 * /api/aluno/matricula:
 *   get:
 *     summary: Lista todas as matrículas
 *     tags: [Matrícula]
 *     responses:
 *       200:
 *         description: Lista de matrículas
 */
router.get('/matricula', matriculaController.listarMatriculas);
/**
 * @swagger
 * /api/aluno/matricula/{id}:
 *   get:
 *     summary: Busca matrícula por ID
 *     tags: [Matrícula]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da matrícula
 *       404:
 *         description: Matrícula não encontrada
 */
router.get('/matricula/:id', matriculaController.buscarMatriculaPorId);
/**
 * @swagger
 * /api/aluno/matricula/{id}:
 *   put:
 *     summary: Atualiza matrícula
 *     tags: [Matrícula]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               turma:
 *                 type: string
 *               anoLetivo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Matrícula atualizada com sucesso
 */
router.put('/matricula/:id', matriculaController.atualizarMatricula);
/**
 * @swagger
 * /api/aluno/matricula/{id}:
 *   delete:
 *     summary: Deleta matrícula por ID
 *     tags: [Matrícula]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Matrícula deletada com sucesso
 */
router.delete('/matricula/:id', matriculaController.deletarMatricula);

// 📌 Transferência

/**
 * @swagger
 * /api/aluno/transferencia:
 *   post:
 *     summary: Registra uma transferência de aluno
 *     tags: [Transferência]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alunoId:
 *                 type: integer
 *               destino:
 *                 type: string
 *               motivo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transferência registrada com sucesso
 */
router.post('/transferencia', transferenciaController.criarTransferencia);
/**
 * @swagger
 * /api/aluno/transferencia:
 *   get:
 *     summary: Lista todas as transferências
 *     tags: [Transferência]
 *     responses:
 *       200:
 *         description: Lista de transferências
 */
router.get('/transferencia', transferenciaController.listarTransferencias);
/**
 * @swagger
 * /api/aluno/transferencia/{id}:
 *   get:
 *     summary: Busca transferência por ID
 *     tags: [Transferência]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da transferência
 *       404:
 *         description: Transferência não encontrada
 */
router.get('/transferencia/:id', transferenciaController.buscarTransferenciaPorId);

// 📌 Declarações
/**
 * @swagger
 * /api/aluno/declaracoes:
 *   post:
 *     summary: Gera uma nova declaração
 *     tags: [Declarações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alunoId:
 *                 type: integer
 *               tipo:
 *                 type: string
 *   responses:
 *       201:
 *         description: Declaração gerada com sucesso
 */
router.post('/declaracoes', declaracaoController.criarDeclaracao);
/**
 * @swagger
 * /api/aluno/declaracoes:
 *   get:
 *     summary: Lista todas as declarações geradas
 *     tags: [Declarações]
 *     responses:
 *       200:
 *         description: Lista de declarações
 */
router.get('/declaracoes', declaracaoController.listarDeclaracoes);

// 📌 Termos

/**
 * @swagger
 * /api/aluno/termos:
 *   post:
 *     summary: Gera um novo termo para o aluno
 *     tags: [Termos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alunoId
 *               - tipo
 *             properties:
 *               alunoId:
 *                 type: integer
 *               tipo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Termo gerado com sucesso
 */
router.post('/termos', termoController.criarTermo);

/**
 * @swagger
 * /api/aluno/termos:
 *   get:
 *     summary: Lista todos os termos gerados
 *     tags: [Termos]
 *     responses:
 *       200:
 *         description: Lista de termos
 */
router.get('/termos', termoController.listarTermos);
// 📌 Upload de documentos
/**
 * @swagger
 * /api/aluno/upload:
 *   post:
 *     summary: Envia um documento para o aluno
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               documento:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Documento enviado com sucesso
 */

router.post('/upload', upload.single('documento'), uploadController.enviarDocumento);
/**
 * @swagger
 * /api/aluno/upload/{id}:
 *   delete:
 *     summary: Deleta um documento enviado
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do documento
 *     responses:
 *       200:
 *         description: Documento deletado com sucesso
 *       404:
 *         description: Documento não encontrado
 */

router.delete('/upload/:id', uploadController.deletarDocumento);

//consulta detalhada do aluno//
/**
 * @swagger
 * /api/aluno/alunos/{id}/detalhado:
 *   get:
 *     summary: Consulta detalhada do aluno com dados relacionados
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados completos do aluno
 *       404:
 *         description: Aluno não encontrado
 */

 
router.get('/alunos/:id/detalhado', alunoController.consultaDetalhada);


module.exports = router;
