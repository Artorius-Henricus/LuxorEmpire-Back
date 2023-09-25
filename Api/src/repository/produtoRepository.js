import {con} from './connect.js'

export async function InserirProduto(nm_produto, ds_genero, ds_material, ds_categoria, ds_gema, nr_preco, ds_descricao) {
    const comando = `
    INSERT INTO tb_produto (nm_produto, ds_genero, ds_material, ds_categoria, ds_gema, nr_preco, ds_descricao)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [linhas] = await con.query(comando, [nm_produto, ds_genero, ds_material, ds_categoria, ds_gema, nr_preco, ds_descricao]);
    return linhas[0];
};

export async function BuscarProduto() {
    const comando = `SELECT * FROM tb_produto;`;
    const [linhas] = await con.query(comando);
    return linhas;
};

export async function InserirUsuario(nm_usuario, ds_cpf, ds_email, ds_telefone, dt_nascimento) {
    const comando = `
    INSERT INTO tb_usuario (nm_usuario, ds_cpf, ds_email, ds_telefone, dt_nascimento)
    VALUES (?, ?, ?, ?, ?)`;
    const [linhas] = await con.query(comando, [nm_usuario, ds_cpf, ds_email, ds_telefone, dt_nascimento]);
    return linhas[0];
};