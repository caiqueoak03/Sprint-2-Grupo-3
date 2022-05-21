var database = require("../database/config");

function carregarKPIs(idFuncionario) {
	// Retorna os valores das KPIs, o último select retorna o AVG de todas as fazendas para ser filtrado no JS
	instrucaoSql = `
    SELECT fazenda.nome as fazenda, setor.nome as setor, tempoDado, dataDado, MONTH(dataDado) as numMes, max(temperatura) as maxTemp, DATE_FORMAT(dataDado,'%d/%m/%Y') as dataDado FROM dado 
        JOIN setor ON idSetor = fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and month(dataDado) = MONTH(CURRENT_DATE()) and temperatura = 
			(
			SELECT max(temperatura) FROM dado 
			JOIN setor ON idSetor = fkSetor 
			JOIN fazenda ON idFazenda = setor.fkFazenda
			JOIN contrato ON contrato.fkFazenda = idFazenda
			JOIN funcionario ON idFuncionario = fkFuncionario
			WHERE idFuncionario = ${idFuncionario} and month(dataDado) = MONTH(CURRENT_DATE()) order by temperatura
            )
        group by fazenda.nome order by rand() limit 1;
    SELECT fazenda.nome as fazenda, setor.nome as setor, tempoDado, dataDado, max(umidade) as maxUmid, DATE_FORMAT(dataDado,'%d/%m/%Y') as dataDado FROM dado 
        JOIN setor ON idSetor = fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and month(dataDado) = MONTH(CURRENT_DATE()) and umidade = 
            (
            SELECT max(umidade) FROM dado 
            JOIN setor ON idSetor = fkSetor 
            JOIN fazenda ON idFazenda = setor.fkFazenda
            JOIN contrato ON contrato.fkFazenda = idFazenda
            JOIN funcionario ON idFuncionario = fkFuncionario
            WHERE idFuncionario = ${idFuncionario} and month(dataDado) = MONTH(CURRENT_DATE()) order by umidade
            )
        group by fazenda.nome order by rand() limit 1;
    SELECT fazenda.nome as fazenda, setor.nome as setor, tempoDado, dataDado, min(temperatura) as minTemp, DATE_FORMAT(dataDado,'%d/%m/%Y') as dataDado FROM dado 
        JOIN setor ON idSetor = fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and month(dataDado) = MONTH(CURRENT_DATE()) and temperatura = 
			(
			SELECT min(temperatura) FROM dado 
			JOIN setor ON idSetor = fkSetor 
			JOIN fazenda ON idFazenda = setor.fkFazenda
			JOIN contrato ON contrato.fkFazenda = idFazenda
			JOIN funcionario ON idFuncionario = fkFuncionario
			WHERE idFuncionario = ${idFuncionario} and month(dataDado) = MONTH(CURRENT_DATE()) order by temperatura
            )
        group by fazenda.nome order by rand() limit 1;
    SELECT fazenda.nome as fazenda, setor.nome as setor, tempoDado, dataDado, min(umidade) as minUmid, DATE_FORMAT(dataDado,'%d/%m/%Y') as dataDado FROM dado 
        JOIN setor ON idSetor = fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} and month(dataDado) = MONTH(CURRENT_DATE()) and umidade = 
            (
            SELECT min(umidade) FROM dado 
            JOIN setor ON idSetor = fkSetor 
            JOIN fazenda ON idFazenda = setor.fkFazenda
            JOIN contrato ON contrato.fkFazenda = idFazenda
            JOIN funcionario ON idFuncionario = fkFuncionario
            WHERE idFuncionario = ${idFuncionario} and month(dataDado) = MONTH(CURRENT_DATE()) order by umidade
            )
        group by fazenda.nome order by rand() limit 1;
    SELECT fazenda.nome as fazenda, truncate(avg(temperatura), 1) as avgTemp, truncate(avg(umidade),1) as avgUmid FROM dado
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
