// src/routes/sistemaRoutes.js
const express = require('express');
const router = express.Router();
const SistemaController = require('../controllers/sistemaController');

router.get('/', SistemaController.listar);
router.get('/:id', SistemaController.obterPorId);
router.post('/', SistemaController.criar);
router.put('/:id', SistemaController.atualizar);
router.delete('/:id', SistemaController.remover);

module.exports = router;
