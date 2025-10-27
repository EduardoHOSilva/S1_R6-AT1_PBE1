const express = require('express');
const router = express.Router();

// Referencia do arquivo de rotas
const {produtoRoutes} = require('./produtoRoutes');
const {clienteRoutes} = require('./clienteRoutes');

router.use('/', produtoRoutes);
router.use('/', clienteRoutes);

module.exports = {router};