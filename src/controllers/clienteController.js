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

    buscarClientesPorId: async (req, res) => {
        try{
            const id = Number(req.params.idCliente);

            if(!id || !Number.isInteger(id)) {

                return res.status(400).json({message: 'Forneça um identificador (ID) valido'});
            }
            const resultado = await clienteModel.selecionarClientesId(id);
            res.status(500).json({ message: 'Resultado dos dados listados', data: resultado});
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor!', errorMessage: error.message});
        }
    },

    editarClientes: async (req, res) => {
        try{
            const idCliente = Number(req.params.idCliente);
            let {nome, cpf} = req.body;
            nome = nome.trim();

            if(!idCliente || !nome || !cpf || typeof idCliente !== 'number' || !isNaN(nome) || isNaN(cpf) || nome.trim().length <3) {

             return res.status(400).json({message: 'Verifique os dados enviados e tente novamente'});

            }

            const clienteAtual = await clienteModel.selecionarClientesId(idCliente);
            if(clienteAtual.length === 0) {
                throw new Error('Registro não localizado');
            } 
            const novoNome = nome ?? clienteAtual[0].nome;
            const novoCpf = cpf ?? clienteAtual[0].cpf;

            const resultado = await clienteModel.editarClientes(idCliente, novoNome, novoCpf);

            if(resultado.changedRows === 0) {
                throw new Error('Ocorreu um erro ao incluir o registro');
            } 

            res.status(200).json({ message: 'Registro atualizado com sucesso', data: resultado});
             
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor!', errorMessage: error.message});
        }
    },

    excluirClientes: async (req, res) => {
        try{
            const id = Number(req.params.idCliente);
            
            if(!id || !Number.isInteger(id)) {

             return res.status(400).json({message: 'Forneça um ID válido.'});

            }

            const clienteSelecionado = await clienteModel.selecionarClientesId(id);
            console.log(clienteSelecionado);

            if(produtoSelecionado.length === 0) {
                throw new Error('Registro não localizado');
            }else{

                const resultado = await produtoModel.deleteProduto(id);
                if(resultado.affectedRows === 1) {
                 res.status(200).json({ message: 'Produto excluido com sucesso.', data: resultado});

                }else{

                    throw new Error('Não foi possivel excluir o produto');
                }
            }
            
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor!', errorMessage: error.message});
        }
    },

}

module.exports = {clienteController};