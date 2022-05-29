var database = require("../database/config");

function listarMinUmid(idFuncionario) {
	instrucaoSql = `
    SELECT TOP 1 fazenda.nome as fazenda, setor.nome as setor, FORMAT(DATEADD(HOUR, -3, GETUTCDATE()), 'hh:mm:ss') as tempoDado, umidade as minUmid, FORMAT(dataDado, 'dd/MM/yyyy') as dataDado
    FROM dado 
    JOIN setor ON idSetor = dado.fkSetor 
    JOIN fazenda ON idFazenda = setor.fkFazenda
    JOIN contrato ON contrato.fkFazenda = idFazenda
    JOIN funcionario ON idFuncionario = fkFuncionario
    WHERE idFuncionario = ${idFuncionario} and MONTH(dataDado) = MONTH(GETDATE()) and umidade = (
        SELECT min(umidade) FROM dado 
        JOIN setor ON idSetor = dado.fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and MONTH(dataDado) = MONTH(GETDATE())
    ) order by newid();
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function listarMaxUmid(idFuncionario) {
	instrucaoSql = `
    SELECT TOP 1 idDado, fazenda.nome as fazenda, setor.nome as setor, FORMAT(DATEADD(HOUR, -3, GETUTCDATE()), 'hh:mm:ss') as tempoDado, umidade as maxUmid, FORMAT(dataDado, 'dd/MM/yyyy') as dataDado
    FROM dado 
    JOIN setor ON idSetor = dado.fkSetor 
    JOIN fazenda ON idFazenda = setor.fkFazenda
    JOIN contrato ON contrato.fkFazenda = idFazenda
    JOIN funcionario ON idFuncionario = fkFuncionario
    WHERE idFuncionario = ${idFuncionario} and MONTH(dataDado) = MONTH(GETDATE()) and umidade = (
        SELECT max(umidade) FROM dado 
        JOIN setor ON idSetor = dado.fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and MONTH(dataDado) = MONTH(GETDATE())
    ) order by newid();
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function listarMinTemp(idFuncionario) {
	instrucaoSql = `
    SELECT TOP 1 fazenda.nome as fazenda, setor.nome as setor, FORMAT(DATEADD(HOUR, -3, GETUTCDATE()), 'hh:mm:ss') as tempoDado, temperatura as minTemp, FORMAT(dataDado, 'dd/MM/yyyy') as dataDado
    FROM dado 
    JOIN setor ON idSetor = dado.fkSetor 
    JOIN fazenda ON idFazenda = setor.fkFazenda
    JOIN contrato ON contrato.fkFazenda = idFazenda
    JOIN funcionario ON idFuncionario = fkFuncionario
    WHERE idFuncionario = ${idFuncionario} and MONTH(dataDado) = MONTH(GETDATE()) and temperatura = (
        SELECT min(temperatura) FROM dado 
        JOIN setor ON idSetor = dado.fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and MONTH(dataDado) = MONTH(GETDATE())
    ) order by newid();
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function listarMaxTemp(idFuncionario) {
	// Retorna os valores das KPIs, o último select retorna o AVG de todas as fazendas para ser filtrado no JS
	instrucaoSql = `
    SELECT TOP 1 MONTH(GETDATE()) as numMes, fazenda.nome as fazenda, setor.nome as setor, FORMAT(DATEADD(HOUR, -3, GETUTCDATE()), 'hh:mm:ss') as tempoDado, temperatura as maxTemp, FORMAT(dataDado, 'dd/MM/yyyy') as dataDado
    FROM dado 
    JOIN setor ON idSetor = dado.fkSetor 
    JOIN fazenda ON idFazenda = setor.fkFazenda
    JOIN contrato ON contrato.fkFazenda = idFazenda
    JOIN funcionario ON idFuncionario = fkFuncionario
    WHERE idFuncionario = ${idFuncionario} and MONTH(dataDado) = MONTH(GETDATE()) and temperatura = (
        SELECT max(temperatura) FROM dado 
        JOIN setor ON idSetor = dado.fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and MONTH(dataDado) = MONTH(GETDATE())
    ) order by newid();
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function listarAvgs(idFuncionario) {
	// Retorna os valores das KPIs, o último select retorna o AVG de todas as fazendas para ser filtrado no JS
	instrucaoSql = `
    SELECT fazenda.nome as fazenda, round(avg(temperatura), 1) as avgTemp, round(avg(umidade),1) as avgUmid 
    FROM dado
    JOIN setor on idSetor = dado.fkSetor
    JOIN fazenda on idFazenda = setor.fkFazenda
    JOIN contrato on contrato.fkFazenda = idFazenda
    JOIN funcionario on idFuncionario = fkFuncionario 
    WHERE idFuncionario = ${idFuncionario} AND month(dataDado) = MONTH(GETDATE()) GROUP BY fazenda.nome;
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	listarMaxTemp,
	listarMinTemp,
	listarMaxUmid,
	listarMinUmid,
	listarAvgs,
};
