import { userLogin } from "../repository/usuarioRepository";
import { Router } from "express";
const server = Router();

server.post('/usuario/login', (req, resp) => {
    try {
        const {email, senha} = req.body;
    }
    catch (err){

    }
})