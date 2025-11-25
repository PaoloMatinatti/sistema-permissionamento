// src/routes/index.js
const express = require('express');
const router = express.Router();

const sistemaRoutes = require('./sistemaRoutes');
const permissaoRoutes = require('./permissaoRoutes');
const grupoRoutes = require('./grupoRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const associacaoRoutes = require('./associacaoRoutes');

router.use('/sistemas', sistemaRoutes);
router.use('/permissoes', permissaoRoutes);
router.use('/grupos', grupoRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/', associacaoRoutes); // rotas específicas (ex: /usuarios/:id/permissoes)

module.exports = router;
