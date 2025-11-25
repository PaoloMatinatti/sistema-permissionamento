// src/routes/grupoRoutes.js
const express = require('express');
const router = express.Router();
const GrupoController = require('../controllers/grupoController');

router.get('/', GrupoController.listar);
router.get('/:id', GrupoController.obterPorId);
router.post('/', GrupoController.criar);
router.put('/:id', GrupoController.atualizar);
router.delete('/:id', GrupoController.remover);

module.exports = router;
