CREATE DATABASE luxorempire_db;

USE luxorempire_db;

CREATE TABLE tb_produto (
	id_produto INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nm_produto varchar(200) NOT NULL,
	ds_genero varchar(200) NOT NULL,
	ds_material varchar(200) NOT NULL,
	ds_categoria varchar(200) NOT NULL,
	ds_gema varchar(200) NOT NULL,
	nr_preco DECIMAL NOT NULL,
	ds_descricao varchar(300) NOT NULL
);

CREATE TABLE tb_imagem (
	id_imagem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	ds_url varchar(500) NOT NULL,
	id_produto INT NOT NULL,
    foreign key (id_produto) references tb_produto(id_produto)
);

CREATE TABLE tb_usuario (
	id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nm_usuario varchar(200) NOT NULL,
	ds_cpf varchar(200) NOT NULL,
	ds_email varchar(200) NOT NULL,
	ds_telefone varchar(200) NOT NULL,
	dt_nascimento DATE NOT NULL,
    tp_usuario varchar(200),
	img_usuario varchar(800),
	nr_senha INT
);

CREATE TABLE tb_endereco (
	id_endereco INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	ds_regiao varchar(200) NOT NULL,
	nm_nome varchar(200) NOT NULL,
	ds_cep varchar(200) NOT NULL,
	ds_endereco varchar(200) NOT NULL,
	nr_residencia INT NOT NULL,
	ds_bairro varchar(200) NOT NULL,
	ds_cidade varchar(200) NOT NULL,
	ds_estado varchar(200) NOT NULL,
	id_usuario INT NOT NULL,
    foreign key (id_usuario) references tb_usuario(id_usuario)
);

CREATE TABLE tb_cartao (
	id_cartao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nr_cartao INT NOT NULL,
	nm_cartao varchar(200) NOT NULL,
	dt_expiracao DATE NOT NULL,
	ds_cvv INT NOT NULL,
	id_usuario INT NOT NULL,
    foreign key (id_usuario) references tb_usuario(id_usuario)
);

CREATE TABLE tb_pedido (
    id_pedido INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dt_pedido DATE NOT NULL,
    ds_status_pedido VARCHAR(100) NOT NULL,
    nr_quantidade INT NOT NULL,
    nr_preco_produto DECIMAL NOT NULL,
    id_usuario INT NOT NULL,
    id_produto INT NOT NULL,
    foreign key (id_usuario) references tb_usuario(id_usuario),
    foreign key (id_produto) references tb_produto(id_produto)
);