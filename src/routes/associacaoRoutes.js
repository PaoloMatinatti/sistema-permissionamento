// src/routes/associacaoRoutes.js
const express = require('express');
const router = express.Router();
const AssociacaoController = require('../controllers/associacaoController');
const PermissaoUsuarioController = require('../controllers/permissaoUsuarioController');

// Grupo ↔ Permissões
router.post('/grupos/:idGrupo/permissoes', AssociacaoController.adicionarPermissoesAoGrupo);
router.get('/grupos/:idGrupo/permissoes', AssociacaoController.listarPermissoesDoGrupo);
router.delete('/grupos/:idGrupo/permissoes/:idPermissao', AssociacaoController.removerPermissaoDoGrupo);

// Usuário ↔ Grupos
router.post('/usuarios/:idUsuario/grupos', AssociacaoController.adicionarGruposAoUsuario);
router.get('/usuarios/:idUsuario/grupos', AssociacaoController.listarGruposDoUsuario);
router.delete('/usuarios/:idUsuario/grupos/:idGrupo', AssociacaoController.removerGrupoDoUsuario);

// Endpoint principal: permissões de um usuário
router.get('/usuarios/:idUsuario/permissoes', PermissaoUsuarioController.listarPermissoesDoUsuario);

module.exports = router;
