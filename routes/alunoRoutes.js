const express = require("express");
const router = express.Router();

// Controllers
const alunoController = require("../controllers/alunoController");
const matriculaController = require("../controllers/matriculaController");
const transferenciaController = require("../controllers/transferenciaController");
const declaracaoController = require("../controllers/declaracaoController");
const termoController = require("../controllers/termoController");
const upload = require("../middlewares/upload");
const uploadController = require("../controllers/uploadController");



//  Aluno
/**
 * @swagger
 * tags:
 *   - name: Alunos
 */

/**
 * @swagger
 * /api/aluno/alunos:
 *   post:
 *     summary: "Cadastra um novo aluno"
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cpf
 *               - nascimento
 *               - sexo
 *               - endereco
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
 *         description: "Aluno cadastrado com sucesso"
 */

/**
 * @swagger
 * /api/aluno/alunos:
 *   get:
 *     summary: "Lista alunos com filtros obrigatórios"
 *     tags:
 *       - "Alunos"
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: "Nome do aluno ou 'todos'. Obrigatório."
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [alergico, matriculado, desistente, ativo, transferido]
 *         description: "Categoria simulada para filtrar alunos. Obrigatório."
 *       - in: query
 *         name: turma
 *         required: false
 *         schema:
 *           type: string
 *         description: "Turma do aluno (opcional)"
 *       - in: query
 *         name: turno
 *         required: false
 *         schema:
 *           type: string
 *         description: "Turno da turma (ex: 'Manhã', 'Tarde', 'Noite', 'Integral')"
 *     responses:
 *       200:
 *         description: "Lista de alunos filtrada"
 *       400:
 *         description: "Campos obrigatórios ausentes"
 */
/**
 * @swagger
 * /api/aluno/alunos/{id}:
 *   get:
 *     summary: "Busca aluno por ID"
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Dados do aluno"
 *       404:
 *         description: "Aluno não encontrado"
 */

/**
 * @swagger
 * /api/aluno/alunos/{id}:
 *   put:
 *     summary: "Atualiza dados do aluno"
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
 *         description: "Aluno atualizado com sucesso"
 *       404:
 *         description: "Aluno não encontrado"
 */

/**
 * @swagger
 * /api/aluno/alunos/{id}:
 *   delete:
 *     summary: "Deleta aluno por ID"
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Aluno deletado com sucesso"
 *       404:
 *         description: "Aluno não encontrado"
 */

/**
 * @swagger
 * /api/aluno/buscar-id:
 *   get:
 *     summary: "Busca alunos pelo nome (autocomplete)"
 *     tags: [Alunos]
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: "Parte do nome do aluno para busca"
 *     responses:
 *       200:
 *         description: "Lista de alunos encontrados"
 *       400:
 *         description: "Nome muito curto"
 *       404:
 *         description: "Nenhum aluno encontrado"
 */
router.post("/alunos", alunoController.criarAluno);
router.get("/alunos", alunoController.listarAlunos);
router.get("/alunos/:id", alunoController.buscarAlunoPorId);
router.put("/alunos/:id", alunoController.atualizarAluno);
router.delete("/alunos/:id", alunoController.deletarAluno);
router.get("/buscar-id", alunoController.buscarIdPorNome);


//  Matrícula
/**
 * @swagger
 * tags:
 *   - name: Matrícula
 */

/**
 * @swagger
 * /api/aluno/matricula:
 *   post:
 *     summary: "Cadastra uma nova matrícula"
 *     tags: [Matrícula]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aluno_id
 *               - turma_id
 *               - data_matricula
 *               - turno
 *               - tipo_matricula
 *               - responsavel
 *             properties:
 *               aluno_id:
 *                 type: integer
 *                 description: "ID do aluno"
 *               turma_id:
 *                 type: integer
 *                 description: "ID da turma"
 *               data_matricula:
 *                 type: string
 *                 format: date-time
 *                 description: "Data da matrícula"
 *               turno:
 *                 type: string
 *                 description: "Turno da matrícula (ex: manhã, tarde)"
 *               tipo_matricula:
 *                 type: string
 *                 description: "Tipo da matrícula (ex: nova, rematrícula)"
 *               responsavel:
 *                 type: string
 *                 description: "Nome do responsável pela matrícula"
 *               documentos_entregues:
 *                 type: boolean
 *                 description: "Indica se os documentos foram entregues"
 *               observacoes:
 *                 type: string
 *                 description: "Observações adicionais"
 *     responses:
 *       201:
 *         description: "Matrícula criada com sucesso"
 */

/**
 * @swagger
 * /api/aluno/matricula:
 *   get:
 *     summary: "Lista todas as matrículas"
 *     tags: [Matrícula]
 *     responses:
 *       200:
 *         description: "Lista de matrículas"
 */

/**
 * @swagger
 * /api/aluno/matricula/{id}:
 *   get:
 *     summary: "Busca matrícula por ID"
 *     tags: [Matrícula]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Dados da matrícula"
 *       404:
 *         description: "Matrícula não encontrada"
 */

/**
 * @swagger
 * /api/aluno/matricula/{id}:
 *   put:
 *     summary: "Atualiza matrícula"
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
 *                 description: "Nova turma do aluno"
 *               anoLetivo:
 *                 type: string
 *                 description: "Ano letivo da matrícula"
 *     responses:
 *       200:
 *         description: "Matrícula atualizada com sucesso"
 */

/**
 * @swagger
 * /api/aluno/matricula/{id}:
 *   delete:
 *     summary: "Deleta matrícula por ID"
 *     tags: [Matrícula]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Matrícula deletada com sucesso"
 */
router.post("/matricula", matriculaController.criarMatricula);
router.get("/matricula", matriculaController.listarMatriculas);
router.get("/matricula/:id", matriculaController.buscarMatriculaPorId);
router.put("/matricula/:id", matriculaController.atualizarMatricula);
router.delete("/matricula/:id", matriculaController.deletarMatricula);

//  Transferência
/**
 * @swagger
 * tags:
 *   - name: Transferência
 */

/**
 * @swagger
 * /api/aluno/transferencia:
 *   post:
 *     summary: "Registra uma transferência de aluno"
 *     tags: [Transferência]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aluno_id
 *               - motivo
 *               - nova_instituicao
 *             properties:
 *               aluno_id:
 *                 type: integer
 *                 description: "ID do aluno transferido"
 *               motivo:
 *                 type: string
 *                 description: "Motivo da transferência"
 *               nova_instituicao:
 *                 type: string
 *                 description: "Nome da nova instituição"
 *               data_transferencia:
 *                 type: string
 *                 format: date-time
 *                 description: "Data da transferência"
 *     responses:
 *       201:
 *         description: "Transferência registrada com sucesso"
 */

/**
 * @swagger
 * /api/aluno/transferencia:
 *   get:
 *     summary: "Lista todas as transferências"
 *     tags: [Transferência]
 *     responses:
 *       200:
 *         description: "Lista de transferências"
 */

/**
 * @swagger
 * /api/aluno/transferencia/{id}:
 *   get:
 *     summary: "Busca transferência por ID"
 *     tags: [Transferência]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Dados da transferência"
 *       404:
 *         description: "Transferência não encontrada"
 */
router.post("/transferencia", transferenciaController.criarTransferencia);
router.get("/transferencia", transferenciaController.listarTransferencias);
router.get(
  "/transferencia/:id",
  transferenciaController.buscarTransferenciaPorId
);

//  Declarações
/**
 * @swagger
 * tags:
 *   - name: Declarações
 */

/**
 * @swagger
 * /api/aluno/declaracoes:
 *   post:
 *     summary: "Gera uma nova declaração"
 *     tags: [Declarações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aluno_id
 *               - tipo
 *               - conteudo
 *             properties:
 *               aluno_id:
 *                 type: integer
 *                 description: "ID do aluno"
 *               tipo:
 *                 type: string
 *                 description: "Tipo da declaração (ex: escolar, conclusão)"
 *               conteudo:
 *                 type: string
 *                 description: "Texto da declaração"
 *               data_emissao:
 *                 type: string
 *                 format: date-time
 *                 description: "Data de emissão da declaração"
 *     responses:
 *       201:
 *         description: "Declaração gerada com sucesso"
 */

/**
 * @swagger
 * /api/aluno/declaracoes:
 *   get:
 *     summary: "Lista todas as declarações geradas"
 *     tags: [Declarações]
 *     responses:
 *       200:
 *         description: "Lista de declarações"
 */
router.post("/declaracoes", declaracaoController.criarDeclaracao);
router.get("/declaracoes", declaracaoController.listarDeclaracoes);
//  Termos

/**
 * @swagger
 * tags:
 *   - name: Termos
 */

/**
 * @swagger
 * /api/aluno/termos:
 *   post:
 *     summary: "Gera um novo termo para o aluno"
 *     tags: [Termos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aluno_id
 *               - tipo
 *               - descricao
 *             properties:
 *               aluno_id:
 *                 type: integer
 *                 description: "ID do aluno"
 *               tipo:
 *                 type: string
 *                 description: "Tipo do termo (ex: compromisso, ciência)"
 *               descricao:
 *                 type: string
 *                 description: "Conteúdo do termo"
 *               data_assinatura:
 *                 type: string
 *                 format: date-time
 *                 description: "Data da assinatura"
 *     responses:
 *       201:
 *         description: "Termo gerado com sucesso"
 */

/**
 * @swagger
 * /api/aluno/termos:
 *   get:
 *     summary: "Lista todos os termos gerados"
 *     tags: [Termos]
 *     responses:
 *       200:
 *         description: "Lista de termos"
 */
router.post("/termos", termoController.criarTermo);
router.get("/termos", termoController.listarTermos);

//  Upload de documentos
/**
 * @swagger
 * tags:
 *   - name: Upload
 */

/**
 * @swagger
 * /api/aluno/upload:
 *   post:
 *     summary: "Envia um documento para o aluno"
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - documento
 *               - aluno_id
 *             properties:
 *               documento:
 *                 type: string
 *                 format: binary
 *                 description: "Arquivo a ser enviado"
 *               aluno_id:
 *                 type: integer
 *                 description: "ID do aluno relacionado ao documento"
 *     responses:
 *       201:
 *         description: "Documento enviado com sucesso"
 */

/**
 * @swagger
 * /api/aluno/upload/{id}:
 *   delete:
 *     summary: "Deleta um documento enviado"
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID do documento"
 *     responses:
 *       200:
 *         description: "Documento deletado com sucesso"
 *       404:
 *         description: "Documento não encontrado"
 */
router.post("/upload", upload.single("documento"), uploadController.enviarDocumento);

router.delete("/upload/:id", uploadController.deletarDocumento);

//consulta detalhada do aluno//
/**
 * @swagger
 * /api/aluno/alunos/{id}/detalhado:
 *   get:
 *     summary: "Consulta detalhada do aluno com dados relacionados"
 *     tags:
 *       - "Alunos"
 *     parameters:
 *       - in: "path"
 *         name: "id"
*         required: true
*         schema:
*           type: "integer"
*         description: "ID do aluno"
*     responses:
*       200:
*         description: "Dados completos do aluno"
*       404:
*         description: "Aluno não encontrado"
 */



router.get("/alunos/:id/detalhado", alunoController.consultaDetalhada);




module.exports = router;


