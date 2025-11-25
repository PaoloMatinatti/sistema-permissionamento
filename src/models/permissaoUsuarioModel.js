// src/models/permissaoUsuarioModel.js
const pool = require('../config/db');

const PermissaoUsuarioModel = {
  async listarPermissoesDoUsuario(usuarioId) {
    const [rows] = await pool.query(
      `
      SELECT DISTINCT
        p.id AS permissaoId,
        p.nome AS codigo,
        p.descricao,
        s.id AS sistemaId,
        s.nome AS sistemaNome
      FROM usuarios u
      JOIN usuario_grupos ug ON ug.usuario_id = u.id
      JOIN grupos g ON g.id = ug.grupo_id
      JOIN grupo_permissoes gp ON gp.grupo_id = g.id
      JOIN permissoes p ON p.id = gp.permissao_id
      JOIN sistemas s ON s.id = p.sistema_id
      WHERE u.id = ?
      `,
      [usuarioId]
    );

    return rows;
  }
};

module.exports = PermissaoUsuarioModel;
