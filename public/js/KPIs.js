function carregarKPIs() {
	fetch("/medidas/carregarKPIs", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idFuncionarioServer: sessionStorage.ID_FUNCIONARIO,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO carregarKPIs()!");

			if (resposta.ok) {
				resposta.json().then((json) => {
					console.log("json: " + json);
					console.log("JSON: " + JSON.stringify(json));

					var tempIdeal = 25,
						umidIdeal = 65,
						jsonTempIdealProx,
						jsonUmidIdealProx,
						jsonTempIdealAfastado,
						jsonUmidIdealAfastado;

					h1_title.innerHTML += " " + json[0][0].numMes;

					// Define o Json contendo os dados da fazenda com os melhores registros
					for (var i = 0; i < json[1].length; i++) {
						jsonTempIdealProx = json[1].reduce(function (prev, curr) {
							return Math.abs(Number(curr.avgTemp) - tempIdeal) <
								Math.abs(Number(prev.avgTemp) - tempIdeal)
								? curr
								: prev;
						});

						jsonUmidIdealProx = json[1].reduce(function (prev, curr) {
							return Math.abs(Number(curr.avgTemp) - umidIdeal) <
								Math.abs(Number(prev.avgTemp) - umidIdeal)
								? curr
								: prev;
						});
					}

					// Define o Json contendo os dados da fazenda com os piores registros
					for (var i = 0; i < json[1].length; i++) {
						jsonTempIdealAfastado = json[1].reduce(function (prev, curr) {
							return Math.abs(Number(curr.avgTemp) - tempIdeal) >
								Math.abs(Number(prev.avgTemp) - tempIdeal)
								? curr
								: prev;
						});

						jsonUmidIdealAfastado = json[1].reduce(function (prev, curr) {
							return Math.abs(Number(curr.avgTemp) - umidIdeal) >
								Math.abs(Number(prev.avgTemp) - umidIdeal)
								? curr
								: prev;
						});
					}

					var jsonMaxTemp = json[0];
					var jsonMaxUmid = json[1];
					var jsonMinTemp = json[2];
					var jsonMinUmid = json[3];
				});
			} else {
				console.log("Houve um erro ao tentar carregar os dados!");

				resposta.text().then((texto) => {
					console.error(texto);
				});
			}
		})
		.catch(function (erro) {
			console.log(erro);
		});

	return false;
}
