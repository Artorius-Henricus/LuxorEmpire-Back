import {con} from './connect.js';

export async function CadastrarProduto(produto) {
    const command = `
    INSERT INTO tb_produtos(nm_produto, ds_genero, ds_material, ds_categoria, ds_gema, nr_preco, ds_descricao)
    VALUES (?, ?, ?, ?, ?, ?, ?)`

    const [resposta] = await con.query(command, [produto.nome, produto.genero, produto.material, produto.categoria, produto.gema, produto.preco, produto.descricao]);
    
}