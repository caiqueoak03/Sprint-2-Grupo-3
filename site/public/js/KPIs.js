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

					var meses = [
						"Janeiro",
						"Fevereiro",
						"Março",
						"Abril",
						"Maio",
						"Junho",
						"Julho",
						"Agosto",
						"Setembro",
						"Outubro",
						"Novembro",
						"Dezembro",
					];

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
					var jsonMinTemp = json[2][0];
					var jsonMaxUmid = json[1][0];
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

					// Renderizando o maior registro de temperatura no HTML
					maior_temp_fazenda.innerHTML = jsonMaxTemp.fazenda;
					maior_temp_setor.innerHTML = jsonMaxTemp.setor + " |&nbsp";
					maior_temp_horario.innerHTML =
						"" + jsonMaxTemp.tempoDado.slice(0, 5) + "hrs |&nbsp";
					maior_temp_dia.innerHTML = jsonMaxTemp.dataDado
						.slice(0, 10)
						.replaceAll("-", "/");
					maior_valor_temp.innerHTML = `(${jsonMaxTemp.maxTemp} ºC)`;

					// Renderizando o menor registro de temperatura no HTML
					menor_temp_fazenda.innerHTML = jsonMinTemp.fazenda;
					menor_temp_setor.innerHTML = jsonMinTemp.setor + " |&nbsp";
					menor_temp_horario.innerHTML =
						jsonMinTemp.tempoDado.slice(0, 5) + "hrs |&nbsp";
					menor_temp_dia.innerHTML = jsonMinTemp.dataDado
						.slice(0, 10)
						.replaceAll("-", "/");
					menor_valor_temp.innerHTML = `(${jsonMinTemp.minTemp} ºC)`;

					// Renderizando o maior registro de umidade no HTML
					maior_umid_fazenda.innerHTML = jsonMaxUmid.fazenda;
					maior_umid_setor.innerHTML = jsonMaxUmid.setor + " |&nbsp";
					maior_umid_horario.innerHTML =
						jsonMaxUmid.tempoDado.slice(0, 5) + "hrs |&nbsp";
					maior_umid_dia.innerHTML = jsonMaxUmid.dataDado
						.slice(0, 10)
						.replaceAll("-", "/");
					maior_valor_umid.innerHTML = `(${jsonMaxUmid.maxUmid}%)`;

					// Renderizando o menor registro de umidade no HTML
					menor_umid_fazenda.innerHTML = jsonMinUmid.fazenda;
					menor_umid_setor.innerHTML = jsonMinUmid.setor + " |&nbsp";
					menor_umid_horario.innerHTML =
						jsonMinUmid.tempoDado.slice(0, 5) + "hrs |&nbsp";
					menor_umid_dia.innerHTML = jsonMinUmid.dataDado
						.slice(0, 10)
						.replaceAll("-", "/");
					menor_valor_umid.innerHTML = `(${jsonMinUmid.minUmid}%)`;
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
