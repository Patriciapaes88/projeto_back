const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'sua_chave_secreta';

// Gera um token com payload e tempo de expiração
function gerarToken(payload, expiresIn = '1h') {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verifica e decodifica o token
function verificarToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}

// Middleware para proteger rotas
function autenticarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

  const decoded = verificarToken(token);
  if (!decoded) return res.status(403).json({ mensagem: 'Token inválido ou expirado' });

  req.usuario = decoded;
  next();
}

// Renova o token com base no payload anterior
function renovarToken(tokenAntigo, expiresIn = '10h') {
  const dados = verificarToken(tokenAntigo);
  if (!dados) return null;

  const { iat, exp, ...payload } = dados; // Remove campos automáticos
  return gerarToken(payload, expiresIn);
}

module.exports = {
  gerarToken,
  verificarToken,
  autenticarToken,
  renovarToken
};
