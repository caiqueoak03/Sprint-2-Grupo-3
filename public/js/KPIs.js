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
					// alert("JSON: " + JSON.stringify(json));

					var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

					var tempIdeal = 25,
						umidIdeal = 65,
						jsonTempIdealProx,
						jsonUmidIdealProx,
						jsonTempIdealAfastado,
						jsonUmidIdealAfastado;

					h1_title.innerHTML += " de " + meses[json[0][0].numMes - 1];

					// Define o Json contendo os dados da fazenda com os melhores registros
					for (var i = 0; i < json[4].length; i++) {
						jsonTempIdealProx = json[4].reduce(function (prev, curr) {
							return Math.abs(Number(curr.avgTemp) - tempIdeal) <
								Math.abs(Number(prev.avgTemp) - tempIdeal)
								? curr
								: prev;
						});

						jsonUmidIdealProx = json[4].reduce(function (prev, curr) {
							return Math.abs(Number(curr.avgUmid) - umidIdeal) <
								Math.abs(Number(prev.avgUmid) - umidIdeal)
								? curr
								: prev;
						});
					}

					// Define o Json contendo os dados da fazenda com os piores registros
					for (var i = 0; i < json[4].length; i++) {
						jsonTempIdealAfastado = json[4].reduce(function (prev, curr) {
							return Math.abs(Number(curr.avgTemp) - tempIdeal) >
								Math.abs(Number(prev.avgTemp) - tempIdeal)
								? curr
								: prev;
						});

						jsonUmidIdealAfastado = json[4].reduce(function (prev, curr) {
							return Math.abs(Number(curr.avgUmid) - umidIdeal) >
								Math.abs(Number(prev.avgUmid) - umidIdeal)
								? curr
								: prev;
						});
					}

					var jsonMaxTemp = json[0][0];
					var jsonMaxUmid = json[1][0];
					var jsonMinTemp = json[2][0];
					var jsonMinUmid = json[3][0];

					// Renderizando os melhores registros médios no HTML
					melhor_registro_nome_temp.innerHTML = jsonTempIdealProx.fazenda;
					melhor_registro_valor_temp.innerHTML = `(${jsonTempIdealProx.avgTemp} ºC)`;
					melhor_registro_nome_umid.innerHTML = jsonUmidIdealProx.fazenda;
					melhor_registro_valor_umid.innerHTML = `(${jsonUmidIdealProx.avgUmid}%)`;

					// Renderizando os piores registros médios no HTML
					pior_registro_nome_temp.innerHTML = jsonTempIdealAfastado.fazenda;
					pior_registro_valor_temp.innerHTML = `(${jsonTempIdealAfastado.avgTemp} ºC)`;
					pior_registro_nome_umid.innerHTML = jsonUmidIdealAfastado.fazenda;
					pior_registro_valor_umid.innerHTML = `(${jsonUmidIdealAfastado.avgUmid}%)`;

					// Renderizando os melhores registros de temperatura no HTML
					melhor_registro_nome_temp.innerHTML = jsonTempIdealProx.fazenda;
					melhor_registro_valor_temp.innerHTML = `(${jsonTempIdealProx.avgTemp} ºC)`;
					melhor_registro_nome_umid.innerHTML = jsonUmidIdealProx.fazenda;
					melhor_registro_valor_umid.innerHTML = `(${jsonUmidIdealProx.avgUmid}%)`;
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
