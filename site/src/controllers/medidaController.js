var medidaModel = require("../models/medidaModel");

function carregarKPIs(req, res) {
	var idFuncionario = req.body.idFuncionarioServer;
	var resultado = [];

	if (idFuncionario == undefined) {
		console.log("ID FUNCIONARIO ESTÁ UNDEFINED");
	} else {
		medidaModel
			.listarMaxTemp(idFuncionario)
			.then(function (resposta1) {
				var resposta1Arr = [];
				for (var i = 0; i < resposta1.length; i++) {
					resposta1Arr.push(resposta1[i]);
				}
				resultado.push(resposta1Arr);

				medidaModel.listarMinTemp(idFuncionario).then(function (resposta2) {
					var resposta2Arr = [];
					for (var i = 0; i < resposta2.length; i++) {
						resposta2Arr.push(resposta2[i]);
					}
					resultado.push(resposta2Arr);

					medidaModel.listarMaxUmid(idFuncionario).then(function (resposta3) {
						var resposta3Arr = [];
						for (var i = 0; i < resposta3.length; i++) {
							resposta3Arr.push(resposta3[i]);
						}
						resultado.push(resposta3Arr);

						medidaModel.listarMinUmid(idFuncionario).then(function (resposta4) {
							var resposta4Arr = [];
							for (var i = 0; i < resposta4.length; i++) {
								resposta4Arr.push(resposta4[i]);
							}
							resultado.push(resposta4Arr);

							medidaModel.listarAvgs(idFuncionario).then(function (resposta5) {
								var resposta5Arr = [];
								for (var i = 0; i < resposta5.length; i++) {
									resposta5Arr.push(resposta5[i]);
								}
								resultado.push(resposta5Arr);

								res.json(resultado);
							});
						});
					});
				});
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"Houve um erro ao buscar as ultimas medidas.",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {
	carregarKPIs,
};
