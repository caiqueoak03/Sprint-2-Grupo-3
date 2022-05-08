var database = require("../database/config");

function listarFazendas() {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
	);
	var instrucao = `
        SELECT * FROM fazenda;
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function listarGerentes() {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
	);
	var instrucao = `
        SELECT idFuncionario FROM funcionario where cargo = 'gerente';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function entrar(email, senha) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
		email,
		senha,
	);
	var instrucao = `
        SELECT * FROM funcionario WHERE email = '${email}' AND senha = '${senha}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarCliente(nomeEmpresa, cnpj) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nomeEmpresa,
		cnpj,
	);

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.
	var instrucao = `
        INSERT INTO cliente (nomeEmpresa, cnpj) VALUES ('${nomeEmpresa}', '${cnpj}');
				select idCliente from cliente where nomeEmpresa = '${nomeEmpresa}';
				`;

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function cadastrarFuncionario(
	nome,
	sobrenome,
	email,
	telFixo,
	telCelular,
	senha,
	idCliente,
	cargo,
) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nome,
		sobrenome,
		email,
		telFixo,
		telCelular,
		senha,
		idCliente,
		cargo,
	);

	var instrucao = `
									INSERT INTO funcionario (nome, sobrenome, email, telFixo, telCelular, senha, fkCliente, cargo) VALUES ('${nome}', '${sobrenome}','${email}', '${telFixo}', '${telCelular}', '${senha}', '${idCliente}', '${cargo}');
									select idFuncionario from funcionario where email = '${email}';
									`;

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function firmarContrato(idFuncionario, idFazendasChecadas, cargo, idFazendas) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		idFuncionario,
		idFazendasChecadas,
		cargo,
		idFazendas,
	);

	var instrucao = "";
	var arr = idFazendas.split(",");
	var len = arr.length;

	if (cargo == "gerente") {
		for (let i = 0; i < len; i++) {
			instrucao += `
										insert into contrato (fkFuncionario, fkFazenda) values ('${idFuncionario}', '${arr[i]}'); 
										`;
		}
	} else {
		for (let i = 0; i < idFazendasChecadas.length; i++) {
			instrucao += `
										insert into contrato (fkFuncionario, fkFazenda) values ('${idFuncionario}', '${idFazendasChecadas[i]}'); 
										`;
		}
	}
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function cadastrarFazenda(
	nomeFazenda,
	telFixo,
	telcelular,
	cep,
	areaHectare,
	idGerentes,
	qtdSensores,
) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nomeFazenda,
		telFixo,
		telcelular,
		cep,
		areaHectare,
		idGerentes,
		qtdSensores,
	);

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.
	var instrucao = `
        INSERT INTO fazenda 
				(nome, telFixo, telcelular, cep, areaHectare, qtdSensores) 
				VALUES 
				('${nomeFazenda}', '${telFixo}','${telcelular}', '${cep}','${areaHectare}', '${qtdSensores}');
				SELECT idFazenda FROM fazenda where cep = '${cep}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function associarFazendaGerente(idFazenda, idGerentes) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		idFazenda,
		idGerentes,
	);

	console.log("dentro do associarFazendaGerente");

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.

	var instrucao = "";
	var arr = idGerentes.split(",");
	var len = arr.length;

	for (let i = 0; i < len; i++) {
		instrucao += `
									insert into contrato (fkFuncionario, fkFazenda) values ('${arr[i]}', '${idFazenda}'); 
									`;
	}

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

module.exports = {
	entrar,
	cadastrarCliente,
	cadastrarFuncionario,
	cadastrarFazenda,
	listarGerentes,
	listarFazendas,
	firmarContrato,
	associarFazendaGerente,
};
