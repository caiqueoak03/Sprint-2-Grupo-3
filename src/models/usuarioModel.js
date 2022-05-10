var database = require("../database/config");

function listarFuncionarios(idFuncionario) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
	);
	var instrucao = `
        SELECT * FROM funcionario where idFuncionario = '${idFuncionario}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function alterarDados(
	idFuncionario,
	nome,
	sobrenome,
	telFixo,
	telCelular,
	email,
	senha,
	urlImg,
) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
	);
	var instrucao = `
				UPDATE funcionario SET nome = '${nome}' where idFuncionario = '${idFuncionario}';
				UPDATE funcionario SET sobrenome = '${sobrenome}' where idFuncionario = '${idFuncionario}';
				UPDATE funcionario SET telFixo = '${telFixo}' where idFuncionario = '${idFuncionario}';
				UPDATE funcionario SET telCelular = '${telCelular}' where idFuncionario = '${idFuncionario}';
				UPDATE funcionario SET email = '${email}' where idFuncionario = '${idFuncionario}';
				UPDATE funcionario SET senha = '${senha}' where idFuncionario = '${idFuncionario}';
				UPDATE funcionario SET urlImg = '${urlImg}' where idFuncionario = '${idFuncionario}';
				`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function listarFazendas(idFuncionario) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
	);
	var instrucao = `
					SELECT fazenda.nome, contrato.fkFazenda 
					FROM fazenda JOIN contrato 
					ON idFazenda = fkFazenda 
					WHERE fkFuncionario = '${idFuncionario}';
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
function cadastrarEmpresa(nomeEmpresa, cnpj) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nomeEmpresa,
		cnpj,
	);

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.
	var instrucao = `
        INSERT INTO empresa (nome, cnpj) VALUES ('${nomeEmpresa}', '${cnpj}');
				select idEmpresa from empresa where nome = '${nomeEmpresa}';
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
	cargo,
	idEmpresa,
) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nome,
		sobrenome,
		email,
		telFixo,
		telCelular,
		senha,
		idEmpresa,
		cargo,
	);

	var instrucao = `
									INSERT INTO funcionario 
									(nome, sobrenome, email, telFixo, telCelular, senha, fkEmpresa, cargo) VALUES 
									('${nome}', '${sobrenome}','${email}', '${telFixo}', '${telCelular}', '${senha}', '${idEmpresa}', '${cargo}');
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
	cadastrarEmpresa,
	cadastrarFuncionario,
	cadastrarFazenda,
	listarGerentes,
	listarFazendas,
	firmarContrato,
	listarFuncionarios,
	associarFazendaGerente,
	alterarDados,
};
