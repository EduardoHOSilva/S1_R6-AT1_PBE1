const {pId} = require('process')
const pool = require('../config/db');

const produtoModel = {
/**
 * Seleciona todos os produtos cadastrado das tabelas
 * @async
 * @function selecionarTodos 
 * @returns Retorna o resultado com um array de objetos, cada objeto representa um registro da tabela.
 * 
 * @example
 * const produtos = await produtoModel.selecionarTodos();
 * console.log(produto);
 * / / Saída esperada
 * [
 *   {id_produtos: 1, descricao: 'Teclado', valor: 150.00}
 *   {id_produtos: 1, descricao: 'Mouse', valor: 80.90}
 * ]
 */
    selecionarTodos: async() => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },
    /**
     * Seleciona um produto de acordo com o id_produto especificado
     * @async
     * @param {number} pId  Identificador que deve ser pesquisado no banco de dados
     * @returns {Promise<Array<object>>}
     * 
     * @example
     * const produtos = await produtoModel.selecionarPorId(1);
     * console.log(produto);
     * / / Saída esperada
     * [
     *   {id_produtos: 1, descricao: 'Teclado', valor: 150.00}
     * ]
     */
    selecionarProdutosId: async(pId) => {
        const sql = 'SELECT * FROM produtos WHERE id_produtos = ?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
 
    },
     /**
     * Inclui um item novo no banco de dados
     * @param {String} pDescricao  
     * @param {number} pValor
     * @returns {Promise<object>} Retorna um objeto contendo propriedades que representa as informações do comando executado 
     * 
     * @example
     * const produtos = await produtoModel.inserirProduto('Produto teste', 16,99);
     * / / Saída
     * "result" : {
     *      "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 4,
            "info": "",
            "serverStatus": 2,
            "warningStatus": 0,
            "changedRows": 0
     * }
     */

    inserirProduto: async (pDescricao, pValor) => {
        const sql = 'INSERT INTO produtos (descricao, valor) VALUES (?,?)';
        const values = [pDescricao, pValor];
        const [rows] = await pool.query(sql, values);
        console.log (rows);
        return rows;
    },
     /**
     * Inclui um item novo no banco de dados
     * @param {number} pId  
     * @param {String} pDescricao  
     * @param {number} pValor
     * @returns {Promise<object>} Retorna um objeto contendo propriedades que representa as informações do comando executado 
     * 
     * @example
     * const produtos = await produtoModel.alterarProduto(1, 'Produto teste', 16,99);
     * / / Saída
     * "result" : {
     *      "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 0,
            "info": "",
            "serverStatus": 2,
            "warningStatus": 0,
            "changedRows": 1
     * }
     */

    alterarProduto: async (pId, pDescricao, pValor) => {
        const sql = 'UPDATE produtos SET descricao=?, valor=? WHERE id_produtos=?';
        const values = [pDescricao, pValor, pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deleteProduto: async (pId) => {
        const sql = 'DELETE FROM produtos WHERE id_produtos=?';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
}
module.exports = {produtoModel};
