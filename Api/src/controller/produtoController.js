import {Router} from 'express';
import multer from 'multer';
import { CadastrarImagensProduto, CadastrarProduto, ConsultarProdutos, ProdutosInfo, ConsultarImagem } from '../repository/produtoRepository.js';

const server = Router();

const upload = multer({ dest: 'storage/productImages' });

server.get('/produto/:id', async (req, resp) => {
    try {
        const {id} = req.params

        const resposta = await ProdutosInfo(id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/produto/imagem/:id', async (req, resp) => {
    try {
        const {id} = req.params

        const resposta = await ConsultarImagem(id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/produto/consultar/:categoria', async (req, resp) => {
    try {
        const {categoria} = req.params

        const resposta = await ConsultarProdutos(categoria);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.post('/produto/:id/imagens', upload.single('prodimg') ,async (req, resp) => {
    try {
        if (!req.file)
            throw new Error("Não foi possível salvar a imagem!")
        
        const {id} = req.params;
        const img = req.file.path;

        const resposta = await CadastrarImagensProduto(img, id);
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


server.post('/produto/registrar', async (req, resp) => {
    try {
        const produtoinfo = req.body;

        if (produtoinfo.nome == undefined || produtoinfo.nome == '')
            throw new Error('É necessário preencher o nome!');
        
        if (produtoinfo.genero == undefined || produtoinfo.genero == '')
            throw new Error('É necessário preencher o gênero!');

        if (produtoinfo.material == undefined || produtoinfo.material == '')
            throw new Error('É necessário preencher o material!');

        if (produtoinfo.categoria == undefined || produtoinfo.categoria == '')
            throw new Error('É necessário preencher a categoria');

        if (produtoinfo.gema == undefined || produtoinfo.gema == '')
            throw new Error('É necessário preencher a gema!');

        if (produtoinfo.preco == undefined || produtoinfo.preco == '')
            throw new Error('É necessário preencher o preço!');

        if (produtoinfo.descricao == undefined || produtoinfo.descricao == '')
            throw new Error('É necessário preencher a descrição!');
        const resposta = await CadastrarProduto(produtoinfo);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})








export default server;