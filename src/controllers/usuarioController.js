// src/controllers/usuarioController.js
const UsuarioModel = require('../models/usuarioModel');

const UsuarioController = {
  async listar(req, res, next) {
    try {
      const { email } = req.query;
      const usuarios = await UsuarioModel.getAll({ email });
      res.json(usuarios);
    } catch (err) {
      next(err);
    }
  },

  async obterPorId(req, res, next) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.getById(id);

      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      res.json(usuario);
    } catch (err) {
      next(err);
    }
  },

  async criar(req, res, next) {
    try {
      const { nome, email } = req.body;

      if (!nome || !email) {
        return res.status(400).json({
          mensagem: 'Campos obrigatórios: nome, email'
        });
      }

      // verifica se já existe usuário com o mesmo e-mail
      const usuarioExistente = await UsuarioModel.getByEmail(email);
      if (usuarioExistente) {
        return res.status(409).json({ mensagem: 'Já existe usuário com esse e-mail' });
      }

      const novo = await UsuarioModel.create({ nome, email });
      res.status(201).json(novo);
    } catch (err) {
      next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const usuarioExistente = await UsuarioModel.getById(id);

      if (!usuarioExistente) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      const { nome, email } = req.body;

      let emailFinal = email ?? usuarioExistente.email;

      if (email && email !== usuarioExistente.email) {
        const outroUsuario = await UsuarioModel.getByEmail(email);
        if (outroUsuario && outroUsuario.id !== usuarioExistente.id) {
          return res.status(409).json({ mensagem: 'Já existe outro usuário com esse e-mail' });
        }
      }

      const atualizado = await UsuarioModel.update(id, {
        nome: nome ?? usuarioExistente.nome,
        email: emailFinal
      });

      res.json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  async remover(req, res, next) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.getById(id);

      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      await UsuarioModel.remove(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

module.exports = UsuarioController;
