// src/routes/permissaoRoutes.js
const express = require('express');
const router = express.Router();
const PermissaoController = require('../controllers/permissaoController');

router.get('/', PermissaoController.listar);
router.get('/:id', PermissaoController.obterPorId);
router.post('/', PermissaoController.criar);
router.put('/:id', PermissaoController.atualizar);
router.delete('/:id', PermissaoController.remover);

module.exports = router;
