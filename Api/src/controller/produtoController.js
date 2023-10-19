mport {Router} from 'express';
import { InserirProduto, InserirUsuario, BuscarProduto } from '../repository/produtoRepository.js';

const server = Router();

server.get('/produtos', async (req, resp) => {
    try {
        const resposta = await BuscarProduto();
        resp.send(resposta);
    }
    catch (err){
        resp.status(400).send({
            erro: 'Ocorreu um erro!'
        })
    }
});

server.post('/produto', async (req, resp) => {
    try {
        const {nm_produto, ds_genero, ds_material, ds_categoria, ds_gema, nr_preco, ds_descricao} = req.body;
        const resposta = await InserirProduto(nm_produto, ds_genero, ds_material, ds_categoria, ds_gema, nr_preco, ds_descricao);
        resp.send('Produto Registrado!');
    }
    catch (err){
        resp.status(400).send({
            erro: 'Ocorreu um erro'
        })
    }
});

server.post('/usuario', async (req, resp) => {
    try {
        const {nm_usuario, ds_cpf, ds_email, ds_telefone, dt_nascimento} = req.body;
        const resposta = await InserirUsuario(nm_usuario, ds_cpf, ds_email, ds_telefone, dt_nascimento);
        resp.send('Usuário Cadastrado!');
    }
    catch (err){
        resp.status(400).send({
            erro: 'Ocorreu um erro!'
        })
    }
});











export default server;