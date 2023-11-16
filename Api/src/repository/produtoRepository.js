import {con} from './connect.js';

export async function CadastrarProduto(produto) {
    const command = `
    INSERT INTO tb_produto(nm_produto, ds_genero, ds_material, ds_categoria, ds_gema, nr_preco, ds_descricao)
    VALUES (?, ?, ?, ?, ?, ?, ?)`

    const [resposta] = await con.query(command, [produto.nome, produto.genero, produto.material, produto.categoria, produto.gema, produto.preco, produto.descricao]);
    produto.id = resposta.insertId;

    return produto;
}

export async function CadastrarImagensProduto(imagem, id, campo) {
    const command = `
    UPDATE tb_produto
    SET ${campo} = ?
    WHERE id_produto = ?`
 
    const [linhas] = await con.query(command, [imagem, id])
    return linhas.affectedRows;
}

export async function AtualizarProduto(produtonewinfo, id) {
    const command = `
    UPDATE tb_produto
    SET nm_produto   = ?,
        ds_genero    = ?,
        ds_material  = ?,
        ds_categoria = ?,
        ds_gema      = ?,
        nr_preco     = ?,
        ds_descricao = ?
    WHERE id_produto = ?`
 
    const [linhas] = await con.query(command, [produtonewinfo.nome, produtonewinfo.genero, produtonewinfo.material, produtonewinfo.categoria, produtonewinfo.gema, produtonewinfo.preco, produtonewinfo.descricao, id])
    return linhas;
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
           ds_descricao    Descrição,
           ds_capa         Capa,
           ds_imagem1      Imagem1,
           ds_imagem2      Imagem2,
           ds_imagem3      Imagem3,
           ds_imagem4      Imagem4
    FROM tb_produto
    WHERE id_produto = ?`

    const [linhas] = await con.query(command, [id])
    return linhas[0];
};

export async function AllProdutos() {
    const command = `
    SELECT 
           id_produto      Id,
           nm_produto      Nome, 
           ds_genero       Gênero, 
           ds_material     Material, 
           ds_categoria    Categoria, 
           ds_gema         Gema, 
           nr_preco        Preço, 
           ds_descricao    Descrição,
           ds_capa         Capa
    FROM tb_produto`

    const [linhas] = await con.query(command, [])
    return linhas;
};

export async function AdicionarCarrinho(data, id) {
    const command = `
    INSERT INTO tb_pedido_item(id_produto, qtd_itens, id_usuario)
    VALUES(?, ?, ?)`

    const [linhas] = await con.query(command, [id, data.qtd, data.user])
    return linhas;
};



export async function ConsultarCarrinho(id) {
    const command = `
    SELECT 
        id_pedido       IDMAIN,
        id_pedido_item  itemid, 
        id_produto      prodid, 
        qtd_itens       quantd
    FROM tb_pedido_item
    WHERE id_usuario = ?`

    const [linhas] = await con.query(command, [id])
    return linhas;
};

export async function ConsultarCarrinho2(id) {
    const command = `
    SELECT 
        id_pedido       IDMAIN,
        id_pedido_item  itemid, 
        id_produto      prodid, 
        qtd_itens       quantd
    FROM tb_pedido_item
    WHERE id_usuario = ? and id_pedido is null`

    const [linhas] = await con.query(command, [id])
    return linhas;
};

export async function ConsultarCarrinho3(id) {
    const command = `
    SELECT 
        id_pedido       IDMAIN,
        id_pedido_item  itemid, 
        id_produto      prodid, 
        qtd_itens       quantd
    FROM tb_pedido_item
    WHERE id_pedido = ?`

    const [linhas] = await con.query(command, [id])
    return linhas;
};

export async function DeletarCarrinho(id) {
    const command = `
    DELETE FROM tb_pedido_item
    WHERE id_pedido_item = ?`

    const [linhas] = await con.query(command, [id])
    return linhas;
};

export async function AlterarQuantidade(quantidade, idproduto) {
    const command = `
    UPDATE tb_pedido_item
    SET qtd_itens =?
    WHERE id_pedido_item = ?`

    const [linhas] = await con.query(command, [quantidade, idproduto])
    return linhas;
};

export async function AlterarId(idpedido, idpedidoitem) {
    const command = `
    UPDATE tb_pedido_item
    SET id_pedido = ?
    WHERE id_pedido_item = ?`

    const [linhas] = await con.query(command, [idpedido, idpedidoitem])
    return linhas;
};