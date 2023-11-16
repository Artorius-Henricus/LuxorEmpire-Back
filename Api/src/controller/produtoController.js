import {Router} from 'express';
import multer from 'multer';
import { AdicionarCarrinho, AllProdutos, AlterarId, AlterarQuantidade, AtualizarProduto, CadastrarImagensProduto, CadastrarProduto, ConsultarCarrinho, ConsultarCarrinho2, ConsultarCarrinho3, ConsultarProdutos, DeletarCarrinho, ProdutosInfo } from '../repository/produtoRepository.js';

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

server.post('/produto/:id/imagens/:campo', upload.single('prodimg') ,async (req, resp) => {
    try {
        if (!req.file)
            throw new Error("Não foi possível salvar a imagem!")
        
        const {id, campo} = req.params;
        const img = req.file.path;

        const resposta = await CadastrarImagensProduto(img, id, campo);
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

server.post('/produto/atualizar/:id', async (req, resp) => {
    try {
        const produtonewinfo = req.body;
        const {id} = req.params;

        if (produtonewinfo.nome == undefined || produtonewinfo.nome == '')
            throw new Error('É necessário preencher o nome!');
        
        if (produtonewinfo.genero == undefined || produtonewinfo.genero == '')
            throw new Error('É necessário preencher o gênero!');

        if (produtonewinfo.material == undefined || produtonewinfo.material == '')
            throw new Error('É necessário preencher o material!');

        if (produtonewinfo.categoria == undefined || produtonewinfo.categoria == '')
            throw new Error('É necessário preencher a categoria');

        if (produtonewinfo.gema == undefined || produtonewinfo.gema == '')
            throw new Error('É necessário preencher a gema!');

        if (produtonewinfo.preco == undefined || produtonewinfo.preco == '')
            throw new Error('É necessário preencher o preço!');

        if (produtonewinfo.descricao == undefined || produtonewinfo.descricao == '')
            throw new Error('É necessário preencher a descrição!');

        const resposta = await AtualizarProduto(produtonewinfo, id);
        resp.send(resposta);
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})

server.get("/produtos/all", async (req, resp) => {
    try {
        
        const resposta = await AllProdutos();
        resp.send(resposta);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.post("/produto/carrinho/add/:id", async (req, resp) => {
    try {
        const {id} = req.params;
        const datas = req.body;

        const resposta = await AdicionarCarrinho(datas, id);
        resp.send(resposta)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get("/produto/carrinho/consulta/:id", async (req, resp) => {
    try {
        const {id} = req.params;

        const resposta = await ConsultarCarrinho(id);
        resp.send(resposta)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get("/produto/carrinho/consulta2/:id", async (req, resp) => {
    try {
        const {id} = req.params;

        const resposta = await ConsultarCarrinho2(id);
        resp.send(resposta)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get("/produto/carrinho/consulta3/:id", async (req, resp) => {
    try {
        const {id} = req.params;

        const resposta = await ConsultarCarrinho3(id);
        resp.send(resposta)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put("/produto/carrinho/alterar/:iditem/:qtditems", async (req, resp) => {
    try {
        const {iditem, qtditems} = req.params;

        const resposta = await AlterarQuantidade(qtditems, iditem);
        resp.send(resposta)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.delete("/produto/carrinho/deletar/:iditem/", async (req, resp) => {
    try {
        const {iditem} = req.params;

        const resposta = await DeletarCarrinho(iditem);
        resp.send(resposta)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put("/produto/carrinho/atualizarpedido/:id", async (req, resp) => {
    try {
        const { id } = req.params; // Corrigido de iditem para id
        const {chave} = req.body // Corrigido para corresponder ao nome do campo no corpo

        const resposta = await AlterarId(chave, id);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


export default server;