const jwt = require('jsonwebtoken');
const { chaveSecreta } = require('../config/jwtConfig');

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, chaveSecreta);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(403).json({ mensagem: 'Token inválido ou expirado' });
  }
};
