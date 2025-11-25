// src/controllers/permissaoUsuarioController.js
const PermissaoUsuarioModel = require('../models/permissaoUsuarioModel');
const UsuarioModel = require('../models/usuarioModel');

const PermissaoUsuarioController = {
  async listarPermissoesDoUsuario(req, res, next) {
    try {
      const { idUsuario } = req.params;

      const usuario = await UsuarioModel.getById(idUsuario);
      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      const permissoes = await PermissaoUsuarioModel.listarPermissoesDoUsuario(idUsuario);

      // Opcional: agrupar por sistema
      const porSistema = {};
      for (const p of permissoes) {
        if (!porSistema[p.sistemaNome]) {
          porSistema[p.sistemaNome] = [];
        }
        porSistema[p.sistemaNome].push({
          id: p.permissaoId,
          codigo: p.codigo,
          descricao: p.descricao
        });
      }

      res.json({
        usuarioId: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        permissoesPorSistema: porSistema
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = PermissaoUsuarioController;
