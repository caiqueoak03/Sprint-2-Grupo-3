// Variáveis globais do chartJS
var temperaturaValues = [10, 8, 7, 3, 7, 12, 0];
var umidadeValues = [12, 15, 7, 9, 7, 12, 14];
var nomeTemp = "Temperatura por Hora";
var nomeUmid = "Umidade por Hora";
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
		area.value = "areaA";
		dia.value = "";
		area.style.display = "inline";
		dia.style.display = "none";
		tipoGrafico = "line";
		nomeTemp = "Temperatura por Hora";
		nomeUmid = "Umidade por Hora";
		labels = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
		mostrar();
	} else {
		area.value = "";
		dia.value = "01/01/2022";
		area.style.display = "none";
		dia.style.display = "inline";
		tipoGrafico = "bar";
		nomeTemp = "Temperatura Média por Área";
		nomeUmid = "Umidade Média por Área";
		labels = [
			"Área A",
			"Area B",
			"Area C",
			"Area D",
			"Area E",
			"Area F",
			"Area G",
		];

		mostrar();
	}
}

// Aplica valores exemplo
function mostrar() {
	if (fazenda.value == "fazendaA") {
		if (area.value == "areaA") {
			temperaturaValues = [10, 8, 7, 3, 7, 12, 7];
			umidadeValues = [12, 15, 7, 9, 7, 12, 14];
		} else if (area.value == "areaB") {
			temperaturaValues = [7, 9, 3, 5, 11, 15, 12];
			umidadeValues = [15, 17, 8, 5, 3, 5, 17];
		} else if (dia.value == "01/01/2022") {
			temperaturaValues = [5, 1, 5, 6, 12, 17, 9];
			umidadeValues = [15, 40, 45, 18, 30, 25, 15];
		} else if (dia.value == "02/01/2022") {
			temperaturaValues = [12, 6, 3, 12, 15, 8, 3];
			umidadeValues = [4, 30, 12, 19, 25, 11, 4];
		} else if (dia.value == "03/01/2022") {
			temperaturaValues = [8, 5, 3, 2, 7, 12, 7];
			umidadeValues = [18, 25, 30, 35, 12, 20, 10];
		}
	} else if (fazenda.value == "fazendaB") {
		if (area.value == "areaA") {
			temperaturaValues = [13, 7, 2, 5, 8, 16, 2];
			umidadeValues = [7, 12, 6, 2, 6, 25, 10];
		} else if (area.value == "areaB") {
			temperaturaValues = [9, 12, 5, 7, 13, 17, 20];
			umidadeValues = [12, 13, 12, 12, 15, 17, 19];
		} else if (dia.value == "01/01/2022") {
			temperaturaValues = [7, 8, 7, 12, 5, 8, 13];
			umidadeValues = [13, 30, 25, 40, 30, 26, 20];
		} else if (dia.value == "02/01/2022") {
			temperaturaValues = [13, 12, 5, 7, 9, 3, 5];
			umidadeValues = [40, 20, 25, 30, 30, 45, 50];
		} else if (dia.value == "03/01/2022") {
			temperaturaValues = [12, 3, 5, 12, 9, 15, 12];
			umidadeValues = [18, 40, 20, 12, 18, 30, 40];
		}
	}

	// Renderiza os graficos denovo
	primeiroRender = false;
	renderizarGraficos();
}
