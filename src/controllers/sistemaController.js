// src/controllers/sistemaController.js
const SistemaModel = require('../models/sistemaModel');

const SistemaController = {
  async listar(req, res, next) {
    try {
      const sistemas = await SistemaModel.getAll();
      res.json(sistemas);
    } catch (err) {
      next(err);
    }
  },

  async obterPorId(req, res, next) {
    try {
      const { id } = req.params;
      const sistema = await SistemaModel.getById(id);
      if (!sistema) {
        return res.status(404).json({ mensagem: 'Sistema não encontrado' });
      }
      res.json(sistema);
    } catch (err) {
      next(err);
    }
  },

  async criar(req, res, next) {
    try {
      const { nome, descricao } = req.body;
      if (!nome) {
        return res.status(400).json({ mensagem: 'Nome é obrigatório' });
      }
      const novo = await SistemaModel.create({ nome, descricao });
      res.status(201).json(novo);
    } catch (err) {
      next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const sistemaExistente = await SistemaModel.getById(id);
      if (!sistemaExistente) {
        return res.status(404).json({ mensagem: 'Sistema não encontrado' });
      }
      const { nome, descricao } = req.body;
      const atualizado = await SistemaModel.update(id, {
        nome: nome ?? sistemaExistente.nome,
        descricao: descricao ?? sistemaExistente.descricao
      });
      res.json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  async remover(req, res, next) {
    try {
      const { id } = req.params;
      const sistema = await SistemaModel.getById(id);
      if (!sistema) {
        return res.status(404).json({ mensagem: 'Sistema não encontrado' });
      }
      await SistemaModel.remove(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

module.exports = SistemaController;
