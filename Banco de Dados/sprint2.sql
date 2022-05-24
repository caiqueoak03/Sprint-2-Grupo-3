create database sprint2;

use sprint2;

create table cliente(
idCliente int primary key auto_increment,
nomeEmpresa varchar(45),
cnpj char(14),
email varchar(45),
telFixoCliente char(12),
telCelularCliente char(13),
senha varchar(45)
);

insert into cliente values(null,'EasyFarm',1234567890123,'easyFarm@gmail.com',551156651234,11953338000,'673039281'),
(null,'FarmAgro',4321098765432,'FarmAgro@gmail.com',551158851234,11945451234, '502094982184'),
(null,'AgroSolutions',1112223334412,'agroSolutions@gmail.com',551165551234,1193211005, '0349294582182'),
(null,'VerdeAgro',2224445556678,'verdeAgro@gmail.com',551155551234,11912334444, '03954837gh#'),
(null,'ProblemFarm',0001114455581,'problemFarm@gmail.com',551145351234,11923456666,'#ghU78954210');

select * from cliente;

select * from cliente;
create table fazenda(
idFazenda int primary key auto_increment,
nomeFazenda varchar(45),
cep char(8),
telFixoFazenda char(12),
telCelularFazenda char(13),
areaHectare int,
qtdSensores int,
fkCliente int,
foreign key (fkCliente) references cliente (idCliente)
);

insert into fazenda values(null,'FazendaAgro','0923-190',551159951234,11953338000, 1000, 220, 1),
(null,'Fazenda Agronegocios','0994-190',551158851234,11953338554, 900, 200, 1),
(null,'Fazenda-Mineira','0123-191',551157671234,11953336789, 700, 290, 2),
(null,'Fazenda-Sao Paulo','0123-191',551155651234,11953356709, 700, 290, 2),
(null,'Fazenda Joao','0993-190',551196651234,11953338020, 1000, 220, 3),
(null,'Fazenda Maria','0993-190',551156651234,11953338140, 1000, 220, 3),
(null,'Fazenda Ozila','0996-190',551159651234,11913338000, 8000, 2200, 4),
(null,'Fazenda Usual','0992-190',551157851234,11912338000, 7000, 2000, 4),
(null,'Fazenda AgroFarm','0999-190',551159051234,11956338000, 100000, 7000, 5),
(null,'Fazenda SafeHouse','0945-190',551152351234,11978338000, 5000, 200, 5);

select * from fazenda;


create table funcionario (
idFunc int primary key auto_increment,
nomeFunc varchar(45),
sobrenome varchar(45),
login varchar(45),
senha varchar(45),
telFixoFunc char(12),
telCelularFunc char(13),
cargo varchar(45), check (cargo in('funcionario','supervisor','gerente')),
fkFazenda int,
foreign key (fkFazenda) references fazenda(idFazenda)
);

insert into funcionario values (null,'Gustavo','Aliba','5511000-0000','1191111-1111','supervisor',1),
(null,'Eduarda', 'Evan', '553390-4567','1192222-2222','gerente', 2 ),
(null, 'Caique', 'Carvalho' , '552345-9080','1195667-1234','funcionario',3),
(null, 'Maria','Rita' , '559876-0123','1196589-0876','gerente',4),
(null , 'Alan','Silva', '559876-4002','1105433-3900','supervisor',5);

select * from funcionario;

select * from funcionario where sobrenome like 'Evan';

select * from funcionario where sobrenome like '%s%';

select * from cliente join fazenda on fkCliente = idCliente join funcionario on fkFazenda = idFazenda;



create table sensor (
idSensor int primary key auto_increment,
modelo varchar(45),
longitude varchar(45),
latitude varchar(45),
fkFazenda int, foreign key(fkFazenda) references fazenda(idFazenda)




);

create table dados (
idDados int,
temperatura decimal (4,2),
umidade decimal (5,2),
dataHorario datetime,
fkSensor int, foreign key (fkSensor) references sensor(idSensor),
primary key (idDados,fkSensor)




);


  
insert into sensor values
(null, 'DHT11', '120°', '43°', 1),
(null, 'DHT11', '168°', '11°', 2),
(null, 'DHT11', '124°', '29°', 3),
(null, 'DHT11', '23°', '65°', 4),
(null, 'DHT11', '34°', '21°', 5),
(null, 'DHT11', '79°', '90°', 7),
(null, 'DHT11', '56°', '87°', 8),
(null, 'DHT11', '12°', '40°', 9),
(null, 'DHT11', '31°', '20°', 10),
(null, 'DHT11', '76°', '10°', 11),
(null, 'DHT11', '33°', '150°', 12);


insert into dados values
( 1, 21, 2.05, '2021-05-13 12:09:01', 1),
( 2, 34, 32.5, '2020-05-13 13:11:12', 2),
( 3, 40, 14, '2022-05-13 10:24:50', 3),
( 4, 15, 25.5, '2020-05-13 11:07:45', 4),
( 5, -10, 44.9, '2021-05-13 22:10:16', 5),
( 6, 5, 42.2, '2021-05-13 19:10:02', 6),
( 7, 25, 35, '2019-05-13 13:15:17', 7),
( 8, 30, 15, '2020-05-13 21:18:02', 8),
( 9, 22, 10.7, '2021-05-13 15:40:33', 9),
( 10, 26, 40.5, '2021-12-15 07:11:55', 10);

