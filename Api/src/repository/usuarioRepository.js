import {con} from './connect.js'


// :: LOGIN DO USUÁRIO ::
export async function userLogin(email, senha) {
    const command = `
    SELECT id_usuario  id,
           nm_usuario  nome,
             ds_email  email,
    FROM tb_usuario
    WHERE  ds_email    = ?
           ns_senha    = ?`

    const [linhas] = await command.query(command, [email, senha])
    return linhas;
}