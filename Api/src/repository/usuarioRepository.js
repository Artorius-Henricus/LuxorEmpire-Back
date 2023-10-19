import {con} from './connect.js'

// :: LOGIN DO USUÁRIO ::
export async function userLogin(email, senha) {
       const command = `
       SELECT id_usuario  id,
              nm_usuario  nome,
              ds_email    email
       FROM tb_usuario
       WHERE  ds_email    = ? and
              nr_senha    = ?`

       const [linhas] = await con.query(command, [email, senha])
       return linhas;
};

export async function userReg(email, nascimento, cpf, telefone, nome, senha) {
       const command = `
       INSERT INTO tb_usuario (nm_usuario, ds_cpf, ds_email, ds_telefone, dt_nascimento, nr_senha, tp_usuario)
       VALUES (?, ?, ?, ?, ?, ?, 'Cliente')`

       const [linhas] = await con.query(command, [nome, cpf, email, telefone, nascimento, senha])
       return linhas;
};