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
}