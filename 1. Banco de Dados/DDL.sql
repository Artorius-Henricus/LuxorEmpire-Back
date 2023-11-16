CREATE DATABASE luxorempire_db;

USE luxorempire_db;

CREATE TABLE tb_produto (
	id_produto INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nm_produto varchar(200) NOT NULL,
	ds_genero varchar(200) NOT NULL,
	ds_material varchar(200) NOT NULL,
	ds_categoria varchar(200) NOT NULL,
	ds_gema varchar(200) NOT NULL,
	nr_preco INT NOT NULL,
	ds_descricao varchar(300) NOT NULL,
	ds_capa varchar(500),
    ds_imagem1 varchar(500),
    ds_imagem2 varchar(500),
    ds_imagem3 varchar(500),
    ds_imagem4 varchar(500)
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
	nr_cartao VARCHAR(100) NOT NULL,
	nm_cartao varchar(200) NOT NULL,
	dt_expiracao varchar(50) NOT NULL,
	ds_cvv INT NOT NULL,
	id_usuario INT NOT NULL,
    foreign key (id_usuario) references tb_usuario(id_usuario)
);

CREATE TABLE tb_pedido (
    id_pedido VARCHAR(300) PRIMARY KEY NOT NULL,
    id_usuario INT,
	id_endereco INT,
    id_cartao INT,
	tp_forma_pagamento VARCHAR(200),
	qtd_parcelas INT,
	dt_pedido DATE,
	ds_situacao VARCHAR(200),
    foreign key (id_usuario) references tb_usuario(id_usuario),
	foreign key (id_cartao) references tb_cartao(id_cartao),
    foreign key (id_endereco) references tb_endereco(id_endereco)
);

CREATE TABLE tb_pedido_item (
	id_pedido_item INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_pedido VARCHAR(300),
	id_produto INT,
	qtd_itens INT,
    id_usuario INT,
    foreign key (id_usuario) references tb_usuario(id_usuario),
	foreign key (id_pedido) references tb_pedido(id_pedido)
);