// src/models/permissaoModel.js
const pool = require('../config/db');

const PermissaoModel = {
  async getAll(filtros = {}) {
    const { sistemaId } = filtros;

    let sql = 'SELECT * FROM permissoes';
    const params = [];

    if (sistemaId) {
      sql += ' WHERE sistema_id = ?';
      params.push(sistemaId);
    }

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM permissoes WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ nome, descricao, sistema_id }) {
    const [result] = await pool.query(
      'INSERT INTO permissoes (nome, descricao, sistema_id) VALUES (?, ?, ?)',
      [nome, descricao, sistema_id]
    );
    return { id: result.insertId, nome, descricao, sistema_id };
  },

  async update(id, { nome, descricao, sistema_id }) {
    await pool.query(
      'UPDATE permissoes SET nome = ?, descricao = ?, sistema_id = ? WHERE id = ?',
      [nome, descricao, sistema_id, id]
    );
    return this.getById(id);
  },

  async remove(id) {
    await pool.query('DELETE FROM permissoes WHERE id = ?', [id]);
  }
};

module.exports = PermissaoModel;
