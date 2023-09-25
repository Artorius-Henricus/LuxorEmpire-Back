// TABELA DE PEDIDOS
SELECT * FROM tb_pedido;

INSERT INTO tb_pedido (dt_pedido, ds_status_pedido, nr_quantidade, nr_preco_produto, id_usuario, id_produto)
VALUES (? ,? ,? ,? ,? ,?);




// TABELA DE USUARIOS
SELECT * FROM tb_usuario;

INSERT INTO tb_usuario (nm_usuario, ds_cpf, ds_email, ds_telefone, dt_nascimento)
VALUES (?, ?, ?, ?, ?);

UPDATE tb_usuario
    SET 
    nm_usuario = ?, 
    ds_cpf = ?, 
    ds_email = ?, 
    ds_telefone = ?, 
    dt_nascimento = ?
    
    WHERE id_usuario = ?




// TABELA DE PRODUTOS
SELECT * FROM tb_produto;

INSERT INTO tb_produto (nm_produto, ds_genero, ds_material, ds_categoria, ds_gema, nr_preco, ds_descricao)
VALUES (?, ?, ?, ?, ?, ?, ?);

INSERT INTO tb_imagem (ds_url, id_produto)
VALUES (?, ?);

UPDATE tb_produto
    SET 
    nm_produto = ?, 
    ds_genero = ?, 
    ds_material = ?, 
    ds_categoria = ?, 
    ds_gema = ?, 
    nr_preco = ?, 
    ds_descricao = ?
    
    WHERE id_tarefa = ?