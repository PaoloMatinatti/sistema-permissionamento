// src/models/associacaoModel.js
const pool = require('../config/db');

const AssociacaoModel = {
  // Associa múltiplas permissões a um grupo
  async adicionarPermissoesAoGrupo(grupoId, permissoesIds) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      for (const permissaoId of permissoesIds) {
        await conn.query(
          'INSERT IGNORE INTO grupo_permissoes (grupo_id, permissao_id) VALUES (?, ?)',
          [grupoId, permissaoId]
        );
      }

      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  async listarPermissoesDoGrupo(grupoId) {
    const [rows] = await pool.query(
      `SELECT p.* 
       FROM grupo_permissoes gp
       JOIN permissoes p ON p.id = gp.permissao_id
       WHERE gp.grupo_id = ?`,
      [grupoId]
    );
    return rows;
  },

  async removerPermissaoDoGrupo(grupoId, permissaoId) {
    await pool.query(
      'DELETE FROM grupo_permissoes WHERE grupo_id = ? AND permissao_id = ?',
      [grupoId, permissaoId]
    );
  },

  // Associa múltiplos grupos a um usuário
  async adicionarGruposAoUsuario(usuarioId, gruposIds) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      for (const grupoId of gruposIds) {
        await conn.query(
          'INSERT IGNORE INTO usuario_grupos (usuario_id, grupo_id) VALUES (?, ?)',
          [usuarioId, grupoId]
        );
      }

      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  async listarGruposDoUsuario(usuarioId) {
    const [rows] = await pool.query(
      `SELECT g.*
       FROM usuario_grupos ug
       JOIN grupos g ON g.id = ug.grupo_id
       WHERE ug.usuario_id = ?`,
      [usuarioId]
    );
    return rows;
  },

  async removerGrupoDoUsuario(usuarioId, grupoId) {
    await pool.query(
      'DELETE FROM usuario_grupos WHERE usuario_id = ? AND grupo_id = ?',
      [usuarioId, grupoId]
    );
  }
};

module.exports = AssociacaoModel;
