-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
CREATE DATABASE soyventure;

USE soyventure;

CREATE TABLE cliente (
	idCliente int primary key AUTO_INCREMENT,
	nomeEmpresa varchar(45) not null,
	cnpj char(14) not null,
	email varchar(45) not null,
	telFixo char(10),
	telCelular char(11) not null,
	senha varchar(45) not null
);

CREATE TABLE fazenda (
	idFazenda INT PRIMARY KEY AUTO_INCREMENT,
	fkCliente int,
	nome varchar(45) not null,
	cep char(8) not null,
	telFixo char(10),
	telCelular char(11) not null,
	areaHectare int not null,
	qtdSensores int not null,
	foreign key (fkCliente) references cliente(idCliente)
); 

CREATE TABLE funcionario (
	idFuncionario int primary key AUTO_INCREMENT,
	nome varchar(45) not null,
	sobrenome varchar(45) not null,
	email varchar(45) not null,
	senha varchar(45) not null,
	telFixo char(10),
	telCelular char(11) not null
);

create table contrato (
	idContrato int AUTO_INCREMENT,
	fkFuncionario int not null,
	fkFazenda int not null,
	cargo varchar(45), check (cargo in ('analista', 'supervisor', 'gerente')),
	foreign key (fkFuncionario) references funcionario(idFuncionario),
	foreign key (fkFazenda) references fazenda(idFazenda),
	primary key (idContrato, fkFuncionario, fkFazenda)
);

create table sensor (
	idSensor int primary key AUTO_INCREMENT,
	modelo varchar(45),
	longitude decimal(4,2),
	latitude decimal(4,2)
);

create table dados (
	idDados int primary key AUTO_INCREMENT,
	temperatura decimal(4,2),
	umidade decimal(5,2),
	dtDado date,
	tempo time,
	fkSensor int,
	foreign key (fkSensor) references sensor(idSensor)
);

create table setor (
	idSetor int AUTO_INCREMENT,
	nome varchar(45),
	fkSensor int,
	fkFazenda int,
	primary key (idSetor, fkFazenda),
	foreign key (fkSensor) references sensor(idSensor)
);



/* para sql server - remoto - produção */

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
    descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
); 

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	temperatura DOUBLE,
	umidade DOUBLE,
	momento DATETIME,
	fk_aquario INT
);


