const jwt = require('jsonwebtoken');

function protecao(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = dados; // dados do usuário extraídos do token
    next(); // segue para a rota
  } catch (err) {
    res.status(403).json({ mensagem: 'Token inválido ou expirado' });
  }
}

module.exports = protecao;
