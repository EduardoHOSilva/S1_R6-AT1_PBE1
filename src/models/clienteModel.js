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
    },
    selecionarClientesId: async(pId) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente = ?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
 
    },
    editarClientes: async (pId, pNome, pCpf) => {
        const sql = 'UPDATE clientes SET nome=?, cpf=? WHERE id_cliente =?';
        const values = [pNome, pCpf, pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    deleteClientes: async (pId) => {
        const sql = 'DELETE FROM clientes WHERE id_cliente =?';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
}

module.exports = {clienteModel};







    
