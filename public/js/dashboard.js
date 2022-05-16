function carregarFazendas() {
	fetch("/usuarios/carregarFazendas", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idFuncionarioServer: sessionStorage.ID_FUNCIONARIO,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO carregarFazendas()!");

			if (resposta.ok) {
				resposta.json().then((json) => {
					if (json[1][0].qtdFazendas == 0) {
						return
					}
					console.log("json: " + json);
					console.log("JSON: " + JSON.stringify(json));

					var idFazendas = [];
					var nomeFazendas = [];

					for (let i = 0; i < json[0].length; i++) {
						nomeFazendas.push(json[0][i].nome);
						idFazendas.push(json[0][i].idFazenda);
					}

					sessionStorage.ID_FAZENDAS = idFazendas;
					sessionStorage.NOME_FAZENDAS = nomeFazendas;

					for (var i = 0; i < nomeFazendas.length; i++) {
						fazendas_select.innerHTML += `
							<option value='${idFazendas[i]}'>${nomeFazendas[i]}</option>
						`;
					}

					dashboardWrapper.style.display = "none";
					gerarSetores();
				});
			} else {
				console.log("Houve um erro ao tentar carregar as fazendas!");

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

function gerarSetores() {
	fetch("/usuarios/gerarSetores", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idFuncionarioServer: sessionStorage.ID_FUNCIONARIO,
			idFazendaServer: fazendas_select.value,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO gerarSetores()!");

			if (resposta.ok) {
				setor_select.innerHTML = "";

				resposta.json().then((json) => {
					console.log("json: " + json);
					console.log("JSON: " + JSON.stringify(json));

					var idSetores = [];
					var fkFazendas = [];

					for (var i = 0; i < json[0].length; i++) {
						setor_select.innerHTML += `
							<option value="${json[0][i].idSetor}">${json[0][i].nome}</option>
						`;
					}

					for (var i = 0; i < json[1].length; i++) {
						idSetores.push(json[1][i].idSetor);
						fkFazendas.push(json[1][i].fkFazenda);
					}

					sessionStorage.FK_FAZENDAS = fkFazendas;
					sessionStorage.ID_SETORES = idSetores;

					gerarDias()
				});
			} else {
				console.log("Houve um erro ao tentar carregar os setores!");

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

var intervalo = 2 * 1000; // segundos * 1000

function gerarDadosSensores() {
	var gerar = () =>
		fetch("/usuarios/gerarDadosSensores", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fkFazendasServer: sessionStorage.FK_FAZENDAS,
				idSetoresServer: sessionStorage.ID_SETORES,
			}),
		})
			.then(function (resposta) {
				console.log("ESTOU NO THEN DO entrar()!");

				if (resposta.ok) {
					console.log(resposta);
					pegarDadosSetor()
					resposta.json().then((json) => {
						console.log(json);
						console.log(JSON.stringify(json));

					});
				} else {
					console.log("Houve um erro ao carregar os dados");

					resposta.text().then((texto) => {
						console.error(texto);
					});
				}
			})
			.catch(function (erro) {
				console.log(erro);
			});

	clearInterval(gerar)

	gerar();
	setInterval(() => {
		gerar();
	}, intervalo);
}

function gerarDias() {
	fetch("/usuarios/gerarDias", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idFazendaServer: fazendas_select.value,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO gerarDias()!");

			if (resposta.ok) {
				resposta.json().then((json) => {
					console.log("json: " + json);
					console.log("JSON: " + JSON.stringify(json));

					dia_select.innerHTML = "";

					for (var i = 0; i < json.length; i++) {
						dia_select.innerHTML += `
							<option value="${json[i].dataDado.slice(0, 10)}">${json[i].dataDado.slice(
							0,
							10,
						)}</option>
						`;
					}
					gerarDadosSensores();
				});
			} else {
				console.log("Houve um erro ao tentar carregar os dias!");

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

// Variáveis globais do chartJS
var nomeTemp = "Temperatura em Tempo Real (°C)";
var nomeUmid = "Umidade em Tempo Real (%)";
var tipoGrafico = "line";
var graficoUmid = {};
var graficoTemp = {};
var temperaturaValues = [];
var umidadeValues = [];
var labels = [];
var labelsHora = [];
var labelsSetor = [];

// Flag para verificar se é a primeira renderização
var primeiroRender = true;

var interval;

function pegarDadosSetor() {
	var pegar = () =>
		fetch("/usuarios/pegarDadosSetor", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fkSetorServer: setor_select.value,
				fkFazendaServer: fazendas_select.value,
				dataDadoServer: dia_select.value,
			}),
		})
			.then(function (resposta) {
				console.log("ESTOU NO THEN DO entrar()!");

				if (resposta.ok) {
					console.log(resposta);

					resposta.json().then((json) => {
						console.log(json);
						console.log("json dados: " + JSON.stringify(json));

						// RESET
						temperaturaValues = [];
						temperaturaValuesHora = [];
						temperaturaValuesSetor = [];
						umidadeValues = [];
						umidadeValuesHora = [];
						umidadeValuesSetor = [];
						labels = [];
						labelsHora = [];
						labelsSetor = [];

						if(json[0][0].temperatura > 25) {
							alerta.innerHTML = "Valor acima do ideal!"
						}

						for (var i = 0; i < json[0].length; i++) {
							temperaturaValuesHora.unshift(json[0][i].temperatura);
							umidadeValuesHora.unshift(json[0][i].umidade);
							labelsHora.unshift(json[0][i].tempoDado);
						}

						for (var i = 0; i < json[1].length; i++) {
							temperaturaValuesSetor.push(json[1][i].avgTemp);
							umidadeValuesSetor.push(json[1][i].avgUmid);
							labelsSetor.push(json[1][i].nome);
						}

						if (grafico_select.value == "dia") {
							clearInterval(interval)
							labels = labelsSetor;
							umidadeValues = umidadeValuesSetor;
							temperaturaValues = temperaturaValuesSetor;
							setor_select.style.display = "none";
							dia_select.style.display = "inline";
							tipoGrafico = "bar";
							nomeTemp = "Temperatura Média Diária por Setor (°C)";
							nomeUmid = "Umidade Média Diária por Setor (%)";
						} else {
							labels = labelsHora;
							umidadeValues = umidadeValuesHora;
							temperaturaValues = temperaturaValuesHora;
							setor_select.style.display = "inline";
							dia_select.style.display = "none";
							tipoGrafico = "line";
							nomeTemp = "Temperatura em Tempo Real (°C)";
							nomeUmid = "Umidade em Tempo Real (%)";
						}

						renderizarGraficos();
					});
				} else {
					console.log("Houve um erro ao carregar os dados");

					resposta.text().then((texto) => {
						console.error(texto);
					});
				}
			})
			.catch(function (erro) {
				console.log(erro);
			});

	clearInterval(interval);
	pegar();

	interval = setInterval(() => {
		pegar();
	}, intervalo);
}

// Renderiza o gráfico usando o chartJS
function renderizarGraficos() {
	// Caso não seja a primeira renderização, destruir os gráficos para recriá-los abaixo
	if (primeiroRender == false) {
		graficoUmid.destroy();
		graficoTemp.destroy();
	}

	// Temperatura chartJS
	const dataTemp = {
		labels: labels,
		datasets: [
			{
				label: nomeTemp,
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgb(255, 99, 132)",
				data: temperaturaValues,
			},
		],
	};

	const configTemp = {
		type: tipoGrafico,
		data: dataTemp,
		options: {},
	};

	graficoTemp = new Chart(
		document.getElementById("graficoTemperatura"),
		configTemp,
	);

	// Umidade chartJS
	const dataUmid = {
		labels: labels,
		datasets: [
			{
				label: nomeUmid,
				backgroundColor: "rgb(100,100,255)",
				borderColor: "rgb(100,100,255)",
				data: umidadeValues,
			},
		],
	};

	const configUmid = {
		type: tipoGrafico,
		data: dataUmid,
		options: {},
	};

	graficoUmid = new Chart(
		document.getElementById("graficoUmidade"),
		configUmid,
	);

	primeiroRender = false;
}
