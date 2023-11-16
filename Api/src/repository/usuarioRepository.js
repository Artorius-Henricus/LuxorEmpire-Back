import {con} from './connect.js'

// :: LOGIN DO USUÁRIO ::
export async function userLogin(email, senha, cpf, nome) {
       const command = `
       SELECT id_usuario    id,
              nm_usuario    nome,
                ds_email    email,
              ds_telefone   telefone,
            dt_nascimento   nascimento,
                   ds_cpf   cpf,
              img_usuario   img
          FROM tb_usuario
       WHERE  ds_email    = ? and
              nr_senha    = ? and
                ds_cpf    = ? and
            nm_usuario    = ?`

       const [linhas] = await con.query(command, [email, senha, cpf, nome])
       return linhas[0];
};

export async function dataIMG(id) {
       const command = `
       SELECT id_usuario    id,
              img_usuario   img
          FROM tb_usuario
       WHERE  id_usuario = ?`

       const [linhas] = await con.query(command, [id])
       return linhas[0];
}

export async function userReg(email, nascimento, cpf, telefone, nome, senha) {
       const command = `
       INSERT INTO tb_usuario (nm_usuario, ds_cpf, ds_email, ds_telefone, dt_nascimento, nr_senha, tp_usuario)
       VALUES (?, ?, ?, ?, ?, ?, 'Cliente')`

       const [linhas] = await con.query(command, [nome, cpf, email, telefone, nascimento, senha])
       return linhas;
};

export async function enviarImagem(imagem, id) {
       const command = `
       UPDATE tb_usuario
         SET img_usuario   = ?
        WHERE id_usuario   = ?`

       const [linhas] = await con.query(command, [imagem, id])
       return linhas.affectedRows;
};

export async function AtualizarPerfil(id, nome, cpf, email, telefone, nascimento) {
       const command = `
       UPDATE tb_usuario
         SET   nm_usuario = ?,
                 ds_email = ?,
              ds_telefone = ?,
            dt_nascimento = ?,
                   ds_cpf = ?
        WHERE id_usuario  = ?`
       const [linhas] = await con.query(command, [nome, email, telefone, nascimento, cpf, id]);
       return linhas;
};

export async function CadastrarCartao(info, id) {
       const command = `
       INSERT INTO tb_cartao(nr_cartao, nm_cartao, dt_expiracao, ds_cvv , id_usuario)
       VALUES (?, ?, ?, ?, ?)`
       const [linhas] = await con.query(command, [info.numero, info.nome, info.data, info.cvv, id]);
       return linhas;
}

export async function ConsultarCartao(id) {
       const command = `
       SELECT id_cartao Id,
       nm_cartao     Nome,
       RIGHT(nr_cartao, 4)  Cartao
       FROM tb_cartao
       WHERE id_usuario = ?`
       const [linhas] = await con.query(command, [id]);
       return linhas;
}

export async function ConsultarCartao2(id) {
       const command = `
       SELECT id_cartao Id,
       nm_cartao     Nome,
       RIGHT(nr_cartao, 4)  Cartao
       FROM tb_cartao
       WHERE id_cartao = ?`
       const [linhas] = await con.query(command, [id]);
       return linhas[0];
}

export async function ConsultarEndereco(id) {
       const command = `
       SELECT id_endereco Id,
       ds_regiao Regiao, 
       nm_nome          Nome, 
       ds_cep           CEP, 
       ds_endereco      Rua, 
       nr_residencia    NRua, 
       ds_bairro        Bairro, 
       ds_cidade        Cidade, 
       ds_estado        Estado
       FROM tb_endereco
       WHERE id_usuario = ?`
       const [linhas] = await con.query(command, [id]);
       return linhas;
}

export async function ConsultarEndereco2(id) {
       const command = `
       SELECT id_endereco Id,
       ds_regiao Regiao, 
       nm_nome          Nome, 
       ds_cep           CEP, 
       ds_endereco      Rua, 
       nr_residencia    NRua, 
       ds_bairro        Bairro, 
       ds_cidade        Cidade, 
       ds_estado        Estado
       FROM tb_endereco
       WHERE id_endereco = ?`
       const [linhas] = await con.query(command, [id]);
       return linhas[0];
}

export async function CadastrarEndereço(info, id) {
       const command = `
       INSERT INTO tb_endereco(ds_regiao, nm_nome, ds_cep, ds_endereco, nr_residencia, ds_bairro, ds_cidade, ds_estado, id_usuario)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
       const [linhas] = await con.query(command, [info.regiao, info.nome, info.cep, info.endereco, info.residencia, info.bairro, info.cidade, info.estado, id]);
       return linhas;
};

export async function FinalizarCompra(id, comprainfo) {
       const command = `
       INSERT INTO tb_pedido (id_pedido, id_usuario, id_endereco, id_cartao, tp_forma_pagamento, qtd_parcelas, dt_pedido, ds_situacao)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
       const [linhas] = await con.query(command, [comprainfo.pedido, id, comprainfo.endereco, comprainfo.cartao, comprainfo.frmpagamento, comprainfo.parcelas, comprainfo.dtpedido, comprainfo.situacao]);
       return linhas;
};

export async function ConsultarCompra(id) {
       const command = `
       SELECT id_pedido     IDPED, 
       id_usuario           IDUSER, 
       id_endereco          IDENDR, 
       id_cartao            IDCART, 
       tp_forma_pagamento   FRMPAG, 
       qtd_parcelas         PARCLS, 
       dt_pedido            DTPED, 
       ds_situacao          SITUACAO
       FROM tb_pedido
       WHERE id_pedido = ?`
       const [linhas] = await con.query(command, [id]);
       return linhas[0];
};