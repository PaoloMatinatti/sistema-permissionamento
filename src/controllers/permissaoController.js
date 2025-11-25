// src/controllers/permissaoController.js
const PermissaoModel = require('../models/permissaoModel');
const SistemaModel = require('../models/sistemaModel');

const PermissaoController = {
  async listar(req, res, next) {
    try {
      const { sistemaId } = req.query;
      const permissoes = await PermissaoModel.getAll({ sistemaId });
      res.json(permissoes);
    } catch (err) {
      next(err);
    }
  },

  async obterPorId(req, res, next) {
    try {
      const { id } = req.params;
      const permissao = await PermissaoModel.getById(id);
      if (!permissao) {
        return res.status(404).json({ mensagem: 'Permissão não encontrada' });
      }
      res.json(permissao);
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

      // valida se sistema existe
      const sistema = await SistemaModel.getById(sistema_id);
      if (!sistema) {
        return res.status(400).json({ mensagem: 'sistema_id inválido (sistema não existe)' });
      }

      const nova = await PermissaoModel.create({ nome, descricao, sistema_id });
      res.status(201).json(nova);
    } catch (err) {
      next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const permissaoExistente = await PermissaoModel.getById(id);

      if (!permissaoExistente) {
        return res.status(404).json({ mensagem: 'Permissão não encontrada' });
      }

      const { nome, descricao, sistema_id } = req.body;

      const sistemaIdFinal = sistema_id ?? permissaoExistente.sistema_id;

      // valida se sistema existe (caso for alterado)
      const sistema = await SistemaModel.getById(sistemaIdFinal);
      if (!sistema) {
        return res.status(400).json({ mensagem: 'sistema_id inválido (sistema não existe)' });
      }

      const atualizada = await PermissaoModel.update(id, {
        nome: nome ?? permissaoExistente.nome,
        descricao: descricao ?? permissaoExistente.descricao,
        sistema_id: sistemaIdFinal
      });

      res.json(atualizada);
    } catch (err) {
      next(err);
    }
  },

  async remover(req, res, next) {
    try {
      const { id } = req.params;
      const permissao = await PermissaoModel.getById(id);

      if (!permissao) {
        return res.status(404).json({ mensagem: 'Permissão não encontrada' });
      }

      await PermissaoModel.remove(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

module.exports = PermissaoController;
