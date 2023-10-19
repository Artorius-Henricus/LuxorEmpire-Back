import { userReg } from "../repository/usuarioRepository.js";
import { Router } from "express";
const server = Router();


server.post('/usuario/registrar', async (req, resp) => {
    try {
        const {email, nascimento, cpf, telefone, nome, senha} = req.body;

        // EMAIL!!
        if (email == undefined || email == '')
            throw new Error('Email é obrigatório!');

        if (!email.includes("@gmail.com") && !email.includes("@outlook.com"))
            throw new Error('Não é um Email válido');

        
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

export default server;