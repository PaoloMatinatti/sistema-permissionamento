// src/controllers/associacaoController.js
const AssociacaoModel = require('../models/associacaoModel');
const UsuarioModel = require('../models/usuarioModel');
const GrupoModel = require('../models/grupoModel');
const PermissaoModel = require('../models/permissaoModel');

const AssociacaoController = {
  // Grupo ↔ Permissões
  async adicionarPermissoesAoGrupo(req, res, next) {
    try {
      const { idGrupo } = req.params;
      const { permissoesIds } = req.body; // [1,2,3]

      if (!Array.isArray(permissoesIds) || permissoesIds.length === 0) {
        return res.status(400).json({ mensagem: 'permissoesIds deve ser um array com IDs' });
      }

      // Opcional: validar se grupo existe
      const grupo = await GrupoModel.getById(idGrupo);
      if (!grupo) {
        return res.status(404).json({ mensagem: 'Grupo não encontrado' });
      }

      await AssociacaoModel.adicionarPermissoesAoGrupo(idGrupo, permissoesIds);
      const permissoes = await AssociacaoModel.listarPermissoesDoGrupo(idGrupo);
      res.status(200).json({ grupoId: idGrupo, permissoes });
    } catch (err) {
      next(err);
    }
  },

  async listarPermissoesDoGrupo(req, res, next) {
    try {
      const { idGrupo } = req.params;
      const permissoes = await AssociacaoModel.listarPermissoesDoGrupo(idGrupo);
      res.json(permissoes);
    } catch (err) {
      next(err);
    }
  },

  async removerPermissaoDoGrupo(req, res, next) {
    try {
      const { idGrupo, idPermissao } = req.params;
      await AssociacaoModel.removerPermissaoDoGrupo(idGrupo, idPermissao);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  // Usuário ↔ Grupos
  async adicionarGruposAoUsuario(req, res, next) {
    try {
      const { idUsuario } = req.params;
      const { gruposIds } = req.body;

      if (!Array.isArray(gruposIds) || gruposIds.length === 0) {
        return res.status(400).json({ mensagem: 'gruposIds deve ser um array com IDs' });
      }

      const usuario = await UsuarioModel.getById(idUsuario);
      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      await AssociacaoModel.adicionarGruposAoUsuario(idUsuario, gruposIds);
      const grupos = await AssociacaoModel.listarGruposDoUsuario(idUsuario);
      res.status(200).json({ usuarioId: idUsuario, grupos });
    } catch (err) {
      next(err);
    }
  },

  async listarGruposDoUsuario(req, res, next) {
    try {
      const { idUsuario } = req.params;
      const grupos = await AssociacaoModel.listarGruposDoUsuario(idUsuario);
      res.json(grupos);
    } catch (err) {
      next(err);
    }
  },

  async removerGrupoDoUsuario(req, res, next) {
    try {
      const { idUsuario, idGrupo } = req.params;
      await AssociacaoModel.removerGrupoDoUsuario(idUsuario, idGrupo);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

module.exports = AssociacaoController;
