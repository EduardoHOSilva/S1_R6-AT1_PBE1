const express = require('express');
const clienteRoutes = express.Router();

const {clienteController} = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.buscarTodosClientes);
clienteRoutes.post('/clientes', clienteController.incluirCliente);
clienteRoutes.get('/clientes', clienteController.buscarClientesPorId);
clienteRoutes.put('/clientes/:idCliente', clienteController.editarClientes);

module.exports = {clienteRoutes};