const {pId} = require('process')
const pool = require('../config/db');

const clienteModel = {

    selecionarTodosClientes: async() => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    inserirCliente: async (pNome, pCpf) => {
        const sql = 'INSERT INTO clientes (nome, cpf) VALUES (?,?)';
        const values = [pNome, pCpf];
        const [rows] = await pool.query(sql, values);
        console.log (rows);
        return rows;
    },

    buscarPorCPF: async (pCpf) => {
        const sql = 'SELECT * FROM clientes WHERE cpf = ?';
        const values = [pCpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
}

module.exports = {clienteModel};







    
