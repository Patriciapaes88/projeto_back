const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const autenticacao = require('../middlewares/autenticacao');
const verificarPermissao = require('../middlewares/verificarPermissao');

// Cadastro e login
router.post('/cadastro',autenticacao, usuarioController.cadastrarUsuario);
router.post('/login', usuarioController.loginUsuario);

// Recuperação de senha
router.post('/recuperar-senha', usuarioController.recuperarSenha);
router.post('/resetar-senha/:token', usuarioController.resetarSenha);

// Buscar por email
router.get('/buscarPorEmail/:email', usuarioController.buscarPorEmail);

// Rotas protegidas (autenticadas)
router.use(autenticacao);
router.get('/perfil', usuarioController.perfilUsuario);
router.put('/editar-perfil', usuarioController.editarPerfil);


// Definir permissões (ex: por diretor)
router.post(
  '/usuarios/:id/permissoes',
  verificarPermissao('gerenciar_permissoes'),
  usuarioController.definirPermissoesUsuario
);

module.exports = router;