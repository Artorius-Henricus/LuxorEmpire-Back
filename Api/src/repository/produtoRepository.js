import {con} from './connect.js';

export async function CadastrarProduto(produto) {
    const command = `
    INSERT INTO tb_produto(nm_produto, ds_genero, ds_material, ds_categoria, ds_gema, nr_preco, ds_descricao)
    VALUES (?, ?, ?, ?, ?, ?, ?)`

    const [resposta] = await con.query(command, [produto.nome, produto.genero, produto.material, produto.categoria, produto.gema, produto.preco, produto.descricao]);
    produto.id = resposta.insertId;

    return produto;
}

export async function CadastrarImagensProduto(imagem, id) {
    const command = `
    INSERT INTO tb_imagem (ds_url, id_produto)
    VALUES (?, ?)`
 
    const [linhas] = await con.query(command, [imagem, id])
    return linhas.affectedRows;
}

export async function ConsultarProdutos(categoria) {
    const command = `
    SELECT 
           id_produto      Id,
           nm_produto      Nome, 
           ds_genero       Gênero, 
           ds_material     Material, 
           ds_categoria    Categoria, 
           ds_gema         Gema, 
           nr_preco        Preço, 
           ds_descricao    Descrição
    FROM tb_produto
    WHERE ds_categoria = ?`

    const [linhas] = await con.query(command, [categoria])
    return linhas
};

export async function ProdutosInfo(id) {
    const command = `
    SELECT 
           id_produto      Id,
           nm_produto      Nome, 
           ds_genero       Gênero, 
           ds_material     Material, 
           ds_categoria    Categoria, 
           ds_gema         Gema, 
           nr_preco        Preço, 
           ds_descricao    Descrição
    FROM tb_produto
    WHERE id_produto = ?`

    const [linhas] = await con.query(command, [id])
    return linhas
};