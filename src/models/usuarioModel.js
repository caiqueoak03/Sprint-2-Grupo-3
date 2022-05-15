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

function carregarFazendas(idFuncionario) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
		idFuncionario,
	);
	var instrucao = `
		SELECT idFazenda, fazenda.nome, fazenda.qtdSetores FROM fazenda 
			JOIN contrato on idFazenda = fkFazenda
				JOIN funcionario on idFuncionario = fkFuncionario where idFuncionario = ${idFuncionario} order by idFazenda;
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function listarGerentes(idEmpresa) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
	);
	var instrucao = `
        SELECT idFuncionario FROM funcionario where cargo = 'gerente' and fkEmpresa = '${idEmpresa}'
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function gerarSetores(idFuncionario, idFazenda) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
		idFuncionario,
		idFazenda,
	);
	var instrucao = `
		SELECT idSetor, setor.nome FROM setor JOIN fazenda ON setor.fkFazenda = idFazenda 
			JOIN contrato on idFazenda = contrato.fkFazenda
				JOIN funcionario on idFuncionario = fkFuncionario where idFuncionario = ${idFuncionario} and idFazenda = ${idFazenda};
		SELECT idSetor, setor.fkFazenda FROM setor JOIN fazenda ON setor.fkFazenda = idFazenda 
			JOIN contrato on idFazenda = contrato.fkFazenda
				JOIN funcionario on idFuncionario = fkFuncionario where idFuncionario = ${idFuncionario} order by idSetor;
		SELECT DISTINCT(dataDado) FROM dado;
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function gerarDadosSensores(fkFazendas, idSetores) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
		temperaturaRandom,
		umidadeRandom,
		fkFazendas,
		idSetores,
	);

	idSetores = idSetores.split(",");
	fkFazendas = fkFazendas.split(",");

	var instrucao = `
    `;

	for (var i = 0; i < idSetores.length; i++) {
		var temperaturaRandom = Number(Math.floor(Math.random() * 26) + 10);
		var umidadeRandom = Number(Math.floor(Math.random() * 51) + 30);

		instrucao += `
			INSERT INTO dado (temperatura, umidade, fkSetor, setor_fkFazenda) values 
			('${temperaturaRandom}', '${umidadeRandom}', '${idSetores[i]}', '${fkFazendas[i]}');
    `;
	}
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function pegarDadosSetor(fkSetor, fkFazenda) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
		fkSetor,
		fkFazenda,
	);

	var instrucao = `
			SELECT * FROM dado WHERE fkSetor = ${fkSetor} ORDER BY idDados DESC LIMIT 8;
			SET @fkSetorCount = (SELECT count(DISTINCT(fksetor)) FROM dado WHERE setor_fkFazenda = ${fkFazenda});
			PREPARE STMT FROM 
				'SELECT * FROM dado JOIN setor ON idSetor = fkSetor 
					WHERE setor_fkFazenda = ${fkFazenda} ORDER BY idDados DESC LIMIT ?';
			EXECUTE STMT USING @fkSetorCount;
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

function cadastrarEmpresa(nomeEmpresa, cnpj) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nomeEmpresa,
		cnpj,
	);

	var instrucao = `
        		INSERT INTO empresa (nome, cnpj) VALUES ('${nomeEmpresa}', '${cnpj}');
				SELECT idEmpresa FROM empresa WHERE nome = '${nomeEmpresa}';
				`;

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function deletarEmpresa(idEmpresa) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		idEmpresa,
	);

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.
	var instrucao = `
        		DELETE FROM empresa WHERE idEmpresa = '${idEmpresa}'
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
	idEmpresa,
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
		idEmpresa,
		cargo,
	);

	var instrucao = `
					INSERT INTO funcionario 
					(nome, sobrenome, email, telFixo, telCelular, senha, fkEmpresa, cargo) VALUES 
					('${nome}', '${sobrenome}','${email}', '${telFixo}', '${telCelular}', '${senha}', '${idEmpresa}', '${cargo}');
					SELECT idFuncionario FROM funcionario where email = '${email}';
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
	qtdSetores,
) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nomeFazenda,
		telFixo,
		telcelular,
		cep,
		areaHectare,
		idGerentes,
		qtdSetores,
	);

	var instrucao = `
        INSERT INTO fazenda 
				(nome, telFixo, telcelular, cep, areaHectare, qtdSetores) 
				VALUES 
				('${nomeFazenda}', '${telFixo}','${telcelular}', '${cep}','${areaHectare}', '${qtdSetores}');
				SELECT idFazenda FROM fazenda where cep = '${cep}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function associarFazendaGerente(idFazenda, idGerentes, qtdSetores) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		idFazenda,
		idGerentes,
		qtdSetores,
	);

	var instrucao = "";
	var arr = idGerentes.split(",");
	var len = arr.length;

	for (let i = 0; i < len; i++) {
		instrucao += `
					INSERT INTO contrato (fkFuncionario, fkFazenda) values ('${arr[i]}', '${idFazenda}'); 
					`;
	}

	for (let i = 1; i <= qtdSetores; i++) {
		instrucao += `
					INSERT INTO setor (nome, fkFazenda) values ('Setor ${i}', '${idFazenda}'); 
					`;
	}

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

module.exports = {
	entrar,
	cadastrarEmpresa,
	deletarEmpresa,
	cadastrarFuncionario,
	cadastrarFazenda,
	listarGerentes,
	carregarFazendas,
	firmarContrato,
	listarFuncionarios,
	associarFazendaGerente,
	alterarDados,
	gerarSetores,
	gerarDadosSensores,
	pegarDadosSetor,
};
