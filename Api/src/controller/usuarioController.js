import { userReg, userLogin, enviarImagem, dataIMG, AtualizarPerfil } from "../repository/usuarioRepository.js";
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

export default server;