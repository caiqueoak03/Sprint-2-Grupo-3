-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */

/*
truncate table dado;
alter table dado modify column dataDado date default(CURRENT_DATE());
*/
CREATE DATABASE soyventure;

USE soyventure;

CREATE TABLE empresa (
	idEmpresa int primary key IDENTITY(1,1),
	nome varchar(45) not null,
	cnpj char(14) unique not null
);

CREATE TABLE funcionario (
	idFuncionario int IDENTITY(1,1),
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
	idFazenda INT PRIMARY KEY IDENTITY(1,1),
	nome varchar(45) not null,
	cep char(8) unique not null,
	areaHectare decimal(10,2) not null,
	qtdSetores int  not null,
	telFixo char(10),
	telCelular char(11)
); 

create table contrato (
	fkFuncionario int,
	fkFazenda int,
	foreign key (fkFuncionario) references funcionario(idFuncionario),
	foreign key (fkFazenda) references fazenda(idFazenda),
	primary key (fkFuncionario, fkFazenda)
);

create table setor (
	idSetor int IDENTITY(1,1),
	nome varchar(45) not null,
	modeloSensor varchar(45) default 'HOBOnet T11',
	longitudeSensor decimal(4,2),
	latitudeSensor decimal(4,2),
	fkFazenda int,
	foreign key (fkFazenda) references fazenda(idFazenda),
	primary key (idSetor, fkFazenda)
);

create table dado (
	idDado int IDENTITY(1,1),
	temperatura decimal(3,1),
	umidade decimal(4,1),
	dataDado date default(CURRENT_DATE),
	tempoDado time default(CURRENT_TIME),
	fkSetor int,
	setor_fkFazenda int,
	foreign key (fkSetor) references setor(idSetor),
	foreign key (setor_fkFazenda) references setor(fkFazenda),
	primary key (idDado, fkSetor, setor_fkFazenda)
);





/* para sql server - remoto - produção */

CREATE TABLE empresa (
	idEmpresa int primary key IDENTITY(1,1),
	nome varchar(45) not null,
	cnpj char(14) unique not null
);

CREATE TABLE funcionario (
	idFuncionario int IDENTITY(1,1),
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
	idFazenda INT PRIMARY KEY IDENTITY(1,1),
	nome varchar(45) not null,
	cep char(8) unique not null,
	areaHectare decimal(10,2) not null,
	qtdSetores int  not null,
	telFixo char(10),
	telCelular char(11)
); 


create table contrato (
	fkFuncionario int,
	fkFazenda int,
	fkEmpresa int,
	foreign key (fkFuncionario, fkEmpresa) references funcionario(idFuncionario, fkEmpresa),
	foreign key (fkFazenda) references fazenda(idFazenda),
	primary key (fkEmpresa, fkFazenda, fkFuncionario)
);

create table setor (
	idSetor int IDENTITY(1,1),
	fkFazenda int,
	nome varchar(45) not null,
	modeloSensor varchar(45) default 'HOBOnet T11',
	longitudeSensor decimal(4,2),
	latitudeSensor decimal(4,2),
	foreign key (fkFazenda) references fazenda(idFazenda),
	primary key (fkFazenda, idSetor)
);


create table dado (
	idDado int IDENTITY(1,1),
	temperatura decimal(3,1),
	umidade decimal(4,1),
	dataDado date default CONVERT (date, SYSDATETIME()),
	tempoDado time default CONVERT (time, SYSDATETIME()),
	fkSetor int,
	setor_fkFazenda int,
	foreign key (setor_fkFazenda, fkSetor) references setor(fkFazenda, idSetor),
	primary key (setor_fkFazenda, fkSetor, idDado)
);