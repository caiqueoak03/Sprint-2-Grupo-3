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

function listarSetores(idFazenda) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
	);
	var instrucao = `
		SELECT * FROM setor JOIN fazenda ON idFazenda = fkFazenda WHERE idFazenda = '${idFazenda}';
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

function carregarFazendas(idFuncionario) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
		idFuncionario,
	);
	var instrucao = `
	SELECT idFazenda, fazenda.nome, fazenda.qtdSetores,
		(SELECT count(idFazenda) as qtdFazendas FROM fazenda 
			JOIN contrato on idFazenda = fkFazenda
				JOIN funcionario on idFuncionario = fkFuncionario where idFuncionario = ${idFuncionario}) as qtdFazendas
		FROM fazenda 
			JOIN contrato on idFazenda = fkFazenda
				JOIN funcionario on idFuncionario = fkFuncionario where idFuncionario = ${idFuncionario} order by idFazenda;
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function gerarSetores(idFuncionario) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function gerarSetores()",
		idFuncionario,
	);
	var instrucao = `
		SELECT idSetor, setor.fkFazenda, setor.nome FROM setor JOIN fazenda ON setor.fkFazenda = idFazenda 
			JOIN contrato on idFazenda = contrato.fkFazenda
				JOIN funcionario on idFuncionario = fkFuncionario where idFuncionario = ${idFuncionario} order by idSetor;
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function gerarDias(idFazenda) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function gerarDias()",
		idFazenda,
	);
	var instrucao = `
	SELECT DISTINCT FORMAT(dataDado, 'dd/MM/yyyy') as dataDado FROM dado JOIN fazenda on idFazenda = setor_fkFazenda 		where setor_fkFazenda = '${idFazenda}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

// Conta quantas inserções foram feitas nos dados
var contador = 1;
// Incrementa na data do dado
var incrementador = 1;

function gerarDadosSensores(fkFazendas, idSetores) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function gerarDadosSensores()",
		fkFazendas,
		idSetores,
	);

	idSetores = idSetores.split(",");
	fkFazendas = fkFazendas.split(",");

	var instrucao = `
    `;

	for (var i = 0; i < idSetores.length; i++) {
		var temperaturaRandom = Math.random() * 42 - 2;
		var umidadeRandom = Math.random() * 60 + 20;

		// Insere 10 dados em uma data, depois insere mais 10 dados em outra data e assim por diante
		if (contador == 10) {
			instrucao += `
			ALTER TABLE dado DROP df_dataDado;
			ALTER TABLE dado ADD CONSTRAINT df_dataDado DEFAULT DATEADD(day, ${incrementador}, GETDATE()) FOR dataDado;
			INSERT INTO dado (temperatura, umidade, fkSetor, setor_fkFazenda) values 
			('${temperaturaRandom}', '${umidadeRandom}', '${idSetores[i]}', '${fkFazendas[i]}');
			`;
			incrementador++;
			contador = 0;
		} else {
			instrucao += `
			INSERT INTO dado (temperatura, umidade, fkSetor, setor_fkFazenda) values 
			('${temperaturaRandom}', '${umidadeRandom}', '${idSetores[i]}', '${fkFazendas[i]}');
			`;
			contador++;
		}
	}
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function pegarQtdDados() {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarQtdDados()",
	);

	var instrucao = `
		SELECT TOP 1 * FROM dado ORDER BY idDado DESC;
	;
    `;

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function pegarDadosHora(fkSetor) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
		fkSetor,
	);

	var instrucao = `
	SELECT TOP 8 temperatura, umidade, FORMAT(DATEADD(HOUR, -3, GETUTCDATE()), 'hh:mm:ss') as tempoDado 
		FROM dado JOIN setor on idSetor = fkSetor JOIN fazenda on idFazenda = fkFazenda
			WHERE fkSetor = ${fkSetor} ORDER BY idDado DESC;
    `;

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function pegarDadosSetor(fkFazenda, dataDado) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
		fkFazenda,
		dataDado,
	);

	dataDadoFormatado = dataDado.split("/").reverse().join("-");

	var instrucao = `
	SELECT nome, round(avg(temperatura), 2) as avgTemp, round(avg(umidade), 2) as avgUmid 
		FROM dado JOIN setor on idSetor = fkSetor 
			WHERE setor_fkFazenda = ${fkFazenda} and dataDado = '${dataDadoFormatado}' group by nome;
    `;

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function pegarDadosAlerta(idFuncionario, setorLength) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()",
		setorLength,
		idFuncionario,
	);

	var instrucao = `
		SELECT TOP ${setorLength} temperatura, umidade, fazenda.nome as fazendaNome, setor.nome as setorNome
			FROM dado JOIN setor on idSetor = fkSetor JOIN fazenda ON idFazenda = fkFazenda 
				JOIN contrato ON contrato.fkFazenda = idFazenda
					WHERE contrato.fkFuncionario = ${idFuncionario} ORDER BY idDado DESC;
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

function limparDadosSensores() {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
	);
	var instrucao = `
        TRUNCATE TABLE dado;
				ALTER TABLE dado DROP df_dataDado;
				ALTER TABLE dado ADD CONSTRAINT df_dataDado DEFAULT FORMAT(GETDATE(), 'dd/MM/yyyy') FOR dataDado;
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
				    SELECT idEmpresa FROM empresa WHERE cnpj = ${cnpj};
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
				SELECT idFazenda FROM fazenda WHERE cep = '${cep}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function associarFazendaGerente(idFazenda, idGerentes, qtdSetores) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function associarFazendaGerente():",
		idFazenda,
		idGerentes,
		qtdSetores,
	);

	var instrucao = "";
	var arr = idGerentes.split(",");
	var len = arr.length;

	console.log(arr);

	for (let i = 0; i < len; i++) {
		instrucao += `
					INSERT INTO contrato (fkFuncionario, fkFazenda) values (${arr[i]}, ${idFazenda}); 
					`;
	}

	for (let i = 1; i <= qtdSetores; i++) {
		instrucao += `
					INSERT INTO setor (nome, fkFazenda) values ('Setor ${i}', ${idFazenda}); 
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
	pegarQtdDados,
	listarFuncionarios,
	associarFazendaGerente,
	alterarDados,
	gerarSetores,
	gerarDadosSensores,
	pegarDadosHora,
	pegarDadosSetor,
	pegarDadosAlerta,
	gerarDias,
	listarSetores,
	limparDadosSensores,
};
