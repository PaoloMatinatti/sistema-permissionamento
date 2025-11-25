// src/models/sistemaModel.js
const pool = require('../config/db');

const SistemaModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM sistemas');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM sistemas WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ nome, descricao }) {
    const [result] = await pool.query(
      'INSERT INTO sistemas (nome, descricao) VALUES (?, ?)',
      [nome, descricao]
    );
    return { id: result.insertId, nome, descricao };
  },

  async update(id, { nome, descricao }) {
    await pool.query(
      'UPDATE sistemas SET nome = ?, descricao = ? WHERE id = ?',
      [nome, descricao, id]
    );
    return this.getById(id);
  },

  async remove(id) {
    await pool.query('DELETE FROM sistemas WHERE id = ?', [id]);
  }
};

module.exports = SistemaModel;
