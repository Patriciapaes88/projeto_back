const { verificar } = require('../models/permissaoModel');

module.exports = (recursoNecessario) => {
  return async (req, res, next) => {
    const usuarioId = req.usuario.id;

    try {
      const permitido = await verificar(usuarioId, recursoNecessario);
      if (!permitido) {
        return res.status(403).json({ mensagem: 'Permissão negada.' });
      }
      next();
    } catch (err) {
      console.error('Erro ao verificar permissão:', err);
      res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
  };
};
