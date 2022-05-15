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
					console.log("json: " + json);
					console.log("JSON: " + JSON.stringify(json));

					var idFazendas = [];
					var nomeFazendas = [];

					for (let i = 0; i < json.length; i++) {
						nomeFazendas.push(json[i].nome);
						idFazendas.push(json[i].idFazenda);
					}

					sessionStorage.ID_FAZENDAS = idFazendas;
					sessionStorage.NOME_FAZENDAS = nomeFazendas;

					for (var i = 0; i < nomeFazendas.length; i++) {
						fazendas_select.innerHTML += `
							<option value='${idFazendas[i]}'>${nomeFazendas[i]}</option>
						`;
					}

					gerarSetores(fazendas_select.value);
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

function gerarSetores(idFazenda) {
	fetch("/usuarios/gerarSetores", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idFuncionarioServer: sessionStorage.ID_FUNCIONARIO,
			idFazendaServer: idFazenda,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO gerarSetores()!");

			if (resposta.ok) {
				setor_select.innerHTML = "";
				dia_select.innerHTML = "";

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

					for (var i = 0; i < json[2].length; i++) {
						dia_select.innerHTML += `
							<option value="${json[2][i].dataDado.slice(0, 10)}">${json[2][i].dataDado.slice(
							0,
							10,
						)}</option>
						`;
					}

					sessionStorage.ID_SETORES = idSetores;
					sessionStorage.FK_FAZENDAS = fkFazendas;

					pegarDadosSetor(setor_select.value, fazendas_select.value);
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

var intervalo = 5 * 1000; // segundos * 1000

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

	gerar();
	setInterval(() => {
		gerar();
	}, intervalo);
}

// Variáveis globais do chartJS
var nomeTemp = "Temperatura por Hora (°C)";
var nomeUmid = "Umidade por Hora (%)";
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

function pegarDadosSetor(grafico, fkFazenda) {
	var pegar = () =>
		fetch("/usuarios/pegarDadosSetor", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fkSetorServer: fkSetor,
				fkFazendaServer: fkFazenda,
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
						umidadeValues = [];
						labels = [];
						labelsHora = [];
						labelsSetor = [];

						for (var i = 0; i < json[0].length; i++) {
							temperaturaValues.unshift(json[0][i].temperatura);
							umidadeValues.unshift(json[0][i].umidade);
							labelsHora.unshift(json[0][i].tempoDado);
						}

						for (var i = 0; i < json[3].length; i++) {
							temperaturaValues.unshift(json[3][i].temperatura);
							umidadeValues.unshift(json[3][i].umidade);
							labelsSetor.unshift(json[3][i].nome);
						}

						if (grafico_select.value == "dia") {
							labels = labelsSetor;
							setor_select.style.display = "none";
							dia_select.style.display = "inline";
							tipoGrafico = "bar";
							nomeTemp = "Temperatura Média por Área (°C)";
							nomeUmid = "Umidade Média por Área (%)";
						} else {
							labels = labelsHora;
							setor_select.style.display = "inline";
							dia_select.style.display = "none";
							tipoGrafico = "line";
							nomeTemp = "Temperatura por Hora (°C)";
							nomeUmid = "Umidade por Hora (%)";
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

	if (grafico == "dia") {
		dataDado = dia_select.value;
		pegar();
	} else {
		fkSetor = setor_select.value;
		pegar();
	}
	clearInterval(interval);

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

// Verifica qual gráfico foi selecionado e aplica as alterações necessárias do gráfico
function verificar() {
	if (grafico_select.value == "setor") {
		setor_select.style.display = "inline";
		dia_select.style.display = "none";
		tipoGrafico = "line";
		nomeTemp = "Temperatura por Hora (°C)";
		nomeUmid = "Umidade por Hora (%)";
		labels = labels;
		mostrar();
	} else {
		setor.value = "";
		dia.value = "01/01/2022";
		setor.style.display = "none";
		dia.style.display = "inline";
		tipoGrafico = "bar";
		nomeTemp = "Temperatura Média por Área (°C)";
		nomeUmid = "Umidade Média por Área (%)";
		labels = [
			"Setor A",
			"Setor B",
			"Setor C",
			"Setor D",
			"Setor E",
			"Setor F",
			"Setor G",
		];
		mostrar();
	}
}

/*
// Aplica valores exemplo
function mostrar() {
	if (fazenda.value == "fazendaA") {
		if (setor.value == "setorA") {
			temperaturaValues = [20, 25, 30, 27, 21, 23, 25];
			umidadeValues = [50, 65, 70, 85, 88, 95, 87];
		} else if (setor.value == "setorB") {
			temperaturaValues = [18, 17, 18, 22, 20, 19, 23];
			umidadeValues = [30, 45, 55, 65, 70, 50, 65];
		} else if (dia.value == "01/01/2022") {
			temperaturaValues = [23, 25, 27, 20, 15, 17, 20];
			umidadeValues = [50, 55, 60, 75, 65, 60, 68];
		} else if (dia.value == "02/01/2022") {
			temperaturaValues = [22, 26, 32, 35, 37, 32, 30];
			umidadeValues = [40, 41, 45, 47, 50, 55, 60];
		} else if (dia.value == "03/01/2022") {
			temperaturaValues = [15, 17, 19, 22, 26, 30, 28];
			umidadeValues = [30, 25, 22, 20, 24, 26, 25];
		}
	} else if (fazenda.value == "fazendaB") {
		if (setor.value == "setorA") {
			temperaturaValues = [25, 30, 32, 35, 38, 36, 32];
			umidadeValues = [55, 60, 62, 67, 70, 68, 65];
		} else if (setor.value == "setorB") {
			temperaturaValues = [23, 25, 22, 21, 26, 25, 27];
			umidadeValues = [30, 35, 37, 38, 35, 40, 38];
		} else if (dia.value == "01/01/2022") {
			temperaturaValues = [17, 18, 22, 25, 28, 26, 25];
			umidadeValues = [40, 42, 45, 50, 52, 50, 47];
		} else if (dia.value == "02/01/2022") {
			temperaturaValues = [20, 22, 26, 22, 21, 20, 23];
			umidadeValues = [32, 35, 37, 38, 40, 42, 45];
		} else if (dia.value == "03/01/2022") {
			temperaturaValues = [10, 12, 15, 18, 18, 17, 15];
			umidadeValues = [60, 65, 65, 65, 68, 70, 88];
		}
	}

	// Renderiza os graficos denovo
	primeiroRender = false;
	renderizarGraficos();
}
*/
