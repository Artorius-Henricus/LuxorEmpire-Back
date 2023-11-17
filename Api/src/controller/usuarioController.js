import { userReg, userLogin, enviarImagem, dataIMG, AtualizarPerfil, ConsultarCartao, ConsultarEndereco, CadastrarCartao, CadastrarEndereço, FinalizarCompra, ConsultarCompra, ConsultarEndereco2, ConsultarCartao2, ConsultarCompra2, DeletarCartao, DeletarCartao2, DeletarEndereco, DeletarEndereco2, ConsultarPedidos, AdminLogin, ConsultarPedidosAndamento, ConsultarPedidosConcluído, AtualizarPedidosConcluído } from "../repository/usuarioRepository.js";
import multer from 'multer';
import { Router } from "express";

const server = Router();

const upload = multer({ dest: 'storage/usersIcons' });


server.get('/usuario/info/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await dataIMG(id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})


server.post('/usuario/logar', async (req, resp) => {
    try {
        const {email, senha, cpf, nome} = req.body;
        const resposta = await userLogin(email, senha, cpf, nome);
        if (!resposta)
            throw new Error('Credenciais Inválidas!');

        resp.send(resposta);
    }

    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})


server.post('/usuario/registrar', async (req, resp) => {
    try {
        const {email, nascimento, cpf, telefone, nome, senha} = req.body;

        // EMAIL!!
        if (email == undefined || email == '')
            throw new Error('Email é obrigatório!');

        if (!email.includes("@gmail.com") && !email.includes("@outlook.com"))
            throw new Error('Não é um Email válido!');

        if (!/^[^@]+@gmail\.com$/.test(email) && !/^[^@]+@outlook\.com$/.test(email))
            throw new Error('Não é um Email válido!');

        // NASCIMENTO!!
        if (nascimento == undefined || nascimento == '')
            throw new Error('Nascimento é obrigatório!');


        // CPF!!
        if (cpf == undefined || cpf == '')
            throw new Error('CPF é obrigatório!');

        if (isNaN(cpf))
            throw new Error('Cpf Deve Ser Um Número!');

        if (cpf.length < 11 || cpf.length > 11)
            throw new Error('CPF inválido!');


        // TELEFONE!!
        if (telefone == undefined || telefone == '')
            throw new Error('Telefone é obrigatório!');

        if (isNaN(telefone))
            throw new Error('Telefone Deve Ser Um Número!');

        if (telefone.length < 11 || telefone.length > 11)
            throw new Error('Telefone Inválido!');


        // NOME!!
        if (nome == undefined || nome == '')
            throw new Error('Nome é obrigatório!');


        // SENHA!
        if (senha == undefined || senha == '')
            throw new Error('Senha é obrigatório!');

        if (isNaN(senha))
            throw new Error('A Senha Deve Conter Apenas Números!');


        const resposta = await userReg(email, nascimento, cpf, telefone, nome, senha);
        resp.send(`Usuário ${nome} Cadastrado!`)
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})

server.put('/usuario/atualizar/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const {nome, cpf, email, telefone, nascimento} = req.body;

        // EMAIL!!
        if (email == undefined || email == '')
            throw new Error('Email é obrigatório!');

        if (!email.includes("@gmail.com") && !email.includes("@outlook.com"))
            throw new Error('Não é um Email válido!');

        if (!/^[^@]+@gmail\.com$/.test(email) && !/^[^@]+@outlook\.com$/.test(email))
            throw new Error('Não é um Email válido!');

        // NASCIMENTO!!
        if (nascimento == undefined || nascimento == '')
            throw new Error('Nascimento é obrigatório!');


        // CPF!!
        if (cpf == undefined || cpf == '')
            throw new Error('CPF é obrigatório!');

        if (isNaN(cpf))
            throw new Error('Cpf Deve Ser Um Número!');

        if (cpf.length < 11 || cpf.length > 11)
            throw new Error('CPF inválido!');


        // TELEFONE!!
        if (telefone == undefined || telefone == '')
            throw new Error('Telefone é obrigatório!');

        if (isNaN(telefone))
            throw new Error('Telefone Deve Ser Um Número!');

        if (telefone.length < 11 || telefone.length > 11)
            throw new Error('Telefone Inválido!');


        // NOME!!
        if (nome == undefined || nome == '')
            throw new Error('Nome é obrigatório!');


        const resposta = await AtualizarPerfil(id, nome, cpf, email, telefone, nascimento);
        resp.send(resposta)
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})

server.put('/usuario/:id/imagem', upload.single('perfilimg') ,async (req, resp) => {
    try {
        if (!req.file)
            throw new Error("Não foi possível salvar a imagem!")
        
        const {id} = req.params;
        const img = req.file.path;

        const resposta = await enviarImagem(img, id);
        if (resposta != 1)
            throw new Error("Não foi possível salvar a imagem!")
        resp.status(204).send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.delete('/usuario/cartao/deletar/:id', async (req, resp) => {
    try {
        const {id} = req.params;

        const resposta = await DeletarCartao(id);
        resposta = await DeletarCartao2(id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})

server.get('/usuario/cartao/consultar/:id', async (req, resp) => {
    try {
        const {id} = req.params;

        const resposta = await ConsultarCartao(id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})

server.get('/usuario/cartao/consultar2/:id', async (req, resp) => {
    try {
        const {id} = req.params;

        const resposta = await ConsultarCartao2(id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})

server.post('/usuario/cartao/cadastrar/:id',async (req, resp) => {
    try {
        const {id} = req.params;
        const cartaoinfo = req.body;

        
        if (cartaoinfo.numero == undefined || cartaoinfo.numero == '')
            throw new Error('O Número Deve ser Preenchido');



        if (cartaoinfo.nome == undefined || cartaoinfo.nome == '')
            throw new Error('O Nome Deve ser Preenchido');



        if (cartaoinfo.data == undefined || cartaoinfo.data == '')
            throw new Error('A Data de Expiração Deve ser Preenchida');



        if (cartaoinfo.cvv == undefined || cartaoinfo.cvv == '')
            throw new Error('O CVV Deve ser Preenchido');

        if (isNaN(cartaoinfo.cvv))
            throw new Error('O CVV Deve ser um Número');

        const resposta = await CadastrarCartao(cartaoinfo, id);
        resp.status(204).send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/usuario/endereco/consultar/:id', async (req, resp) => {
    try {
        const {id} = req.params;

        const resposta = await ConsultarEndereco(id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})

server.delete('/usuario/endereco/deletar/:id', async (req, resp) => {
    try {
        const {id} = req.params;

        const resposta = await DeletarEndereco(id);
        resposta = await DeletarEndereco2(id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})

server.get('/usuario/endereco/consultar2/:id', async (req, resp) => {
    try {
        const {id} = req.params;

        const resposta = await ConsultarEndereco2(id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})


server.post('/usuario/endereco/cadastrar/:id',async (req, resp) => {
    try {
        const {id} = req.params;
        const enderecoinfo = req.body;

        if (enderecoinfo.regiao == undefined || enderecoinfo.regiao == '')
            throw new Error('A Região Deve ser Preenchido');

        if (enderecoinfo.nome == undefined || enderecoinfo.nome == '')
            throw new Error('O Nome Deve ser Preenchido');
        
        if (enderecoinfo.cep == undefined || enderecoinfo.cep == '')
            throw new Error('O CEP Deve ser Preenchido');

        if (isNaN(enderecoinfo.cep))
            throw new Error('O CEP Deve ser um Número');

        if (enderecoinfo.endereco == undefined || enderecoinfo.endereco == '')
            throw new Error('O Endereço Deve ser Preenchido');

        if (enderecoinfo.residencia == undefined || enderecoinfo.residencia == '')
            throw new Error('O Número da Residência Deve ser Preenchido');

        if (isNaN(enderecoinfo.residencia))
            throw new Error('O Número da Residência Deve ser um Número');

        const resposta = await CadastrarEndereço(enderecoinfo, id);
        resp.status(204).send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.post('/usuario/compra/pagamento/:id',async (req, resp) => {
    try {
        const {id} = req.params;
        const comprainfo = req.body;

        if (comprainfo.endereco == undefined || comprainfo.endereco == '')
            throw new Error('Um endereço deve ser selecionado!');

        if (comprainfo.cartao == undefined || comprainfo.cartao == '')
            throw new Error('Um cartão deve ser selecionado!');


        const resposta = await FinalizarCompra(id, comprainfo);
        resp.status(204).send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/usuario/compra/consulta/:id',async (req, resp) => {
    try {
        const {id} = req.params;


        const resposta = await ConsultarCompra(id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/usuario/compra/consulta2/:id',async (req, resp) => {
    try {
        const {id} = req.params;


        const resposta = await ConsultarCompra2(id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/admin/pedidos',async (req, resp) => {
    try {
        const resposta = await ConsultarPedidos();
        resp.send(resposta);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/admin/pedidos/andamento',async (req, resp) => {
    try {
        const resposta = await ConsultarPedidosAndamento();
        resp.send(resposta);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/admin/pedidos/atualizar/:id',async (req, resp) => {
    try {
        const {id} = req.params;
        const {code} = req.body;

        const resposta = await AtualizarPedidosConcluído(code, id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/admin/pedidos/concluido',async (req, resp) => {
    try {
        const resposta = await ConsultarPedidosConcluído();
        resp.send(resposta);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.post('/admin/logar', async (req, resp) => {
    try {
        const {nome, senha} = req.body;
        const resposta = await AdminLogin(nome, senha);
        if (!resposta)
            throw new Error('Credenciais Inválidas!');

        resp.send(resposta);
    }

    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})

export default server;