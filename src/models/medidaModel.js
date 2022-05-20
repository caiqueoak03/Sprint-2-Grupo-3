var database = require("../database/config");

function carregarKPIs(idFuncionario) {
	// Retorna os valores das KPIs, o último select retorna o AVG de todas as fazendas para ser filtrado no JS
	instrucaoSql = `
    SELECT fazenda.nome, setor.nome, tempoDado, MONTH(dataDado) as numMes, max(temperatura) as maxTemp FROM dado 
        JOIN setor ON idSetor = fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and temperatura = 
			(
			SELECT max(temperatura) FROM dado 
			JOIN setor ON idSetor = fkSetor 
			JOIN fazenda ON idFazenda = setor.fkFazenda
			JOIN contrato ON contrato.fkFazenda = idFazenda
			JOIN funcionario ON idFuncionario = fkFuncionario
			WHERE idFuncionario = ${idFuncionario} order by temperatura
            )
        group by fazenda.nome order by rand() limit 1;
    SELECT fazenda.nome, setor.nome, tempoDado, dataDado, max(umidade) as maxUmid FROM dado 
        JOIN setor ON idSetor = fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and umidade = 
            (
            SELECT max(umidade) FROM dado 
            JOIN setor ON idSetor = fkSetor 
            JOIN fazenda ON idFazenda = setor.fkFazenda
            JOIN contrato ON contrato.fkFazenda = idFazenda
            JOIN funcionario ON idFuncionario = fkFuncionario
            WHERE idFuncionario = ${idFuncionario} order by umidade
            )
        group by fazenda.nome order by rand() limit 1;
    SELECT fazenda.nome, setor.nome, tempoDado, dataDado, min(temperatura) as minTemp FROM dado 
        JOIN setor ON idSetor = fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and temperatura = 
			(
			SELECT min(temperatura) FROM dado 
			JOIN setor ON idSetor = fkSetor 
			JOIN fazenda ON idFazenda = setor.fkFazenda
			JOIN contrato ON contrato.fkFazenda = idFazenda
			JOIN funcionario ON idFuncionario = fkFuncionario
			WHERE idFuncionario = ${idFuncionario} order by temperatura
            )
        group by fazenda.nome order by rand() limit 1;
    SELECT fazenda.nome, setor.nome, tempoDado, dataDado, min(umidade) as minUmid FROM dado 
        JOIN setor ON idSetor = fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and umidade = 
            (
            SELECT min(umidade) FROM dado 
            JOIN setor ON idSetor = fkSetor 
            JOIN fazenda ON idFazenda = setor.fkFazenda
            JOIN contrato ON contrato.fkFazenda = idFazenda
            JOIN funcionario ON idFuncionario = fkFuncionario
            WHERE idFuncionario = ${idFuncionario} order by umidade
            )
        group by fazenda.nome order by rand() limit 1;
    SELECT fazenda.nome, truncate(avg(temperatura), 2) as avgTemp, truncate(avg(umidade),2) as avgUmid FROM dado
        JOIN setor on fkSetor = idSetor
        JOIN fazenda on idFazenda = setor.fkFazenda
        JOIN contrato on contrato.fkFazenda = idFazenda
        JOIN funcionario on idFuncionario = fkFuncionario WHERE idFuncionario = ${idFuncionario} 
        AND month(dataDado) = MONTH(CURRENT_DATE()) GROUP BY fazenda.nome;
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	carregarKPIs,
};
