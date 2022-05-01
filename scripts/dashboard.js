// Variáveis globais do chartJS
var temperaturaValues = [20, 25, 30, 27, 21, 23, 25];
var umidadeValues = [50, 65, 70, 85, 88, 95, 87];
var nomeTemp = "Temperatura por Hora (°C)";
var nomeUmid = "Umidade por Hora (%)";
var labels = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
var tipoGrafico = "line";
var graficoUmid = {};
var graficoTemp = {};

// Flag para verificar se é a primeira renderização
var primeiroRender = true;

// Primeira renderização
renderizarGraficos();

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
}

// Verifica qual gráfico foi selecionado e aplica as alterações necessárias do gráfico
function verificar() {
	fazenda.value = "fazendaA";

	if (grafico.value == "porHora") {
		setor.value = "setorA";
		dia.value = "";
		setor.style.display = "inline";
		dia.style.display = "none";
		tipoGrafico = "line";
		nomeTemp = "Temperatura por Hora (°C)";
		nomeUmid = "Umidade por Hora (%)";
		labels = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
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
