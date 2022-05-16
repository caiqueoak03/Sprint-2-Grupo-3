var database = require("../database/config");

function carregarKPIs(idFuncionario) {
	// Retorna os valores das KPIs, o último select retorna o AVG de todas as fazendas para ser filtrado no JS
	instrucaoSql = `
    SELECT fazenda.nome, setor.nome, tempoDado, dataDado, 
    max(temperatura) as maxTemp, min(temperatura) as minTemp, max(umidade) as maxUmid, min(umidade) as minUmid 
        FROM dado 
        JOIN setor ON idSetor = fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario};
    SELECT avg(temperatura), avg(umidade)
        FROM dado 
        JOIN setor ON idSetor = fkSetor 
        JOIN fazenda ON idFazenda = setor.fkFazenda
        JOIN contrato ON contrato.fkFazenda = idFazenda
        JOIN funcionario ON idFuncionario = fkFuncionario
        WHERE idFuncionario = ${idFuncionario} GROUP BY fazenda.nome;
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	carregarKPIs,
};
