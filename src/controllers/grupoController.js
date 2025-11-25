// src/controllers/grupoController.js
const GrupoModel = require('../models/grupoModel');
const SistemaModel = require('../models/sistemaModel');

const GrupoController = {
  async listar(req, res, next) {
    try {
      const { sistemaId } = req.query;
      const grupos = await GrupoModel.getAll({ sistemaId });
      res.json(grupos);
    } catch (err) {
      next(err);
    }
  },

  async obterPorId(req, res, next) {
    try {
      const { id } = req.params;
      const grupo = await GrupoModel.getById(id);

      if (!grupo) {
        return res.status(404).json({ mensagem: 'Grupo não encontrado' });
      }

      res.json(grupo);
    } catch (err) {
      next(err);
    }
  },

  async criar(req, res, next) {
    try {
      const { nome, descricao, sistema_id } = req.body;

      if (!nome || !sistema_id) {
        return res.status(400).json({
          mensagem: 'Campos obrigatórios: nome, sistema_id'
        });
      }

      const sistema = await SistemaModel.getById(sistema_id);
      if (!sistema) {
        return res.status(400).json({ mensagem: 'sistema_id inválido (sistema não existe)' });
      }

      const novo = await GrupoModel.create({ nome, descricao, sistema_id });
      res.status(201).json(novo);
    } catch (err) {
      next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const grupoExistente = await GrupoModel.getById(id);

      if (!grupoExistente) {
        return res.status(404).json({ mensagem: 'Grupo não encontrado' });
      }

      const { nome, descricao, sistema_id } = req.body;

      const sistemaIdFinal = sistema_id ?? grupoExistente.sistema_id;

      const sistema = await SistemaModel.getById(sistemaIdFinal);
      if (!sistema) {
        return res.status(400).json({ mensagem: 'sistema_id inválido (sistema não existe)' });
      }

      const atualizado = await GrupoModel.update(id, {
        nome: nome ?? grupoExistente.nome,
        descricao: descricao ?? grupoExistente.descricao,
        sistema_id: sistemaIdFinal
      });

      res.json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  async remover(req, res, next) {
    try {
      const { id } = req.params;
      const grupo = await GrupoModel.getById(id);

      if (!grupo) {
        return res.status(404).json({ mensagem: 'Grupo não encontrado' });
      }

      await GrupoModel.remove(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

module.exports = GrupoController;
