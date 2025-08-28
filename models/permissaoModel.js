const db = require('../config/db');

exports.definirPermissoes = async (usuarioId, permissoes) => {
  for (const { recurso, permitido } of permissoes) {
    await db.query(
       `INSERT INTO permissoes (usuario_id, recurso, permitido)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE permitido = ?`,
      [usuarioId, recurso, permitido, permitido]
    );
  }
};

exports.verificar = async (usuarioId, recurso) => {
  const [rows] = await db.query(
    'SELECT permitido FROM permissoes WHERE usuario_id = ? AND recurso = ?',
    [usuarioId, recurso]
  );
  return rows.length > 0 && rows[0].permitido;
};
