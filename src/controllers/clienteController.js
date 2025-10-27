const {clienteModel} = require('../models/clienteModel');

const clienteController = {

    buscarTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionarTodosClientes();
            if (resultado.length === 0) { // Quando o resultado for 0 (Sem clientes)
                return res.status(200).json({message: 'A tabela selecionada não contem dados'});
            }
            res.status (200).json({message: 'Resultado dos dados listados', data: resultado});
        }catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
        }
    },

    incluirCliente: async (req, res) => {
        try{
            const {nome, cpf} = req.body;

            if (!String(nome) || !String(cpf) || cpf.length !== 11) {

                return res.status(400).json({ message: 'Forneça um nome válido e CPF com 11 dígitos.' });
            
            }
            const clienteExistente = await clienteModel.buscarPorCPF(cpf);

            if (clienteExistente.length > 0) {
                return res.status(409).json({ message: 'CPF já cadastrado!' });
            }
            const resultado = await clienteModel.inserirCliente(nome, cpf);      

            if(resultado.affectedRows ===1 && resultado.insertId != 0) {

             res.status(201).json({ message: 'Cliente registrado com sucesso', result: resultado});
             
            }else{
                throw new Error('Ocorreu um erro ao incluir o registro');
            }
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor!', errorMessage: error.message});
        }
    },

}

module.exports = {clienteController};