// src/models/usuarioModel.js
const pool = require('../config/db');

const UsuarioModel = {
  async getAll(filtros = {}) {
    const { email } = filtros;

    let sql = 'SELECT * FROM usuarios';
    const params = [];

    if (email) {
      sql += ' WHERE email = ?';
      params.push(email);
    }

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  },

  async getByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  },

  async create({ nome, email }) {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    return { id: result.insertId, nome, email };
  },

  async update(id, { nome, email }) {
    await pool.query(
      'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id]
    );
    return this.getById(id);
  },

  async remove(id) {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  }
};

module.exports = UsuarioModel;
