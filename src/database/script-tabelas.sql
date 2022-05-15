-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
CREATE DATABASE soyventure;

USE soyventure;

CREATE TABLE empresa (
	idEmpresa int primary key AUTO_INCREMENT,
	nome varchar(45) not null,
	cnpj char(14) unique not null
);

CREATE TABLE funcionario (
	idFuncionario int AUTO_INCREMENT,
	nome varchar(45) not null,
	sobrenome varchar(45) not null,
	email varchar(45) unique not null,
	senha varchar(45) not null,
	cargo varchar(45)  not null, check (cargo in ('analista', 'supervisor', 'gerente')),
	urlImg varchar(300),
	telFixo char(10),
	telCelular char(11),
	fkEmpresa int,
	foreign key (fkEmpresa) references empresa(idEmpresa),
	primary key (idFuncionario, fkEmpresa)
);

CREATE TABLE fazenda (
	idFazenda INT PRIMARY KEY AUTO_INCREMENT,
	nome varchar(45) not null,
	cep char(8) unique not null,
	areaHectare decimal(10,2) not null,
	qtdSetores int  not null,
	telFixo char(10),
	telCelular char(11)
); 

alter table fazenda modify column areaHectare decimal(10,2) not null;
alter table setor modify column modeloSensor varchar(45) default 'HOBOnet T11';

create table contrato (
	fkFuncionario int,
	fkFazenda int,
	foreign key (fkFuncionario) references funcionario(idFuncionario),
	foreign key (fkFazenda) references fazenda(idFazenda),
	primary key (fkFuncionario, fkFazenda)
);

create table setor (
	idSetor int AUTO_INCREMENT,
	nome varchar(45) not null,
	modeloSensor varchar(45),
	longitudeSensor decimal(4,2),
	latitudeSensor decimal(4,2),
	fkFazenda int,
	foreign key (fkFazenda) references fazenda(idFazenda),
	primary key (idSetor, fkFazenda)
);

create table dado (
	idDados int AUTO_INCREMENT,
	temperatura decimal(3,1),
	umidade decimal(4,1),
	dataDado date default(CURRENT_DATE),
	tempoDado time default(CURRENT_TIME),
	fkSetor int,
	setor_fkFazenda int,
	foreign key (fkSetor) references setor(idSetor),
	foreign key (setor_fkFazenda) references setor(fkFazenda),
	primary key (idDados, fkSetor, setor_fkFazenda)
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


