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
            return;
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

          gerarDadosSensores();
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

var intervalo = 3 * 1000; // segundos * 1000

function limparDadosSensores() {
  fetch("/usuarios/limparDadosSensores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    }),
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO limparDadosSensores()!");

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
}

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

            if (json[0].idDado >= 500) {
              limparDadosSensores();
            }
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

  clearInterval(gerar);
  gerar();

  setInterval(() => {
    gerar();
  }, intervalo);

  setTimeout(() => {
    gerarDias();
  }, 100);
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
              10
            )}</option>
						`;
          }

          pegarDadosSetor();
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
        idFuncionarioServer: sessionStorage.ID_FUNCIONARIO,
        setorLengthServer: sessionStorage.ID_SETORES.split(",").length,
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

			// Randomiza a ordem do Json 
			for(var i = 0; i < json[2].length; i++) {
				var indexRand = Math.random() * json
			}

            // Gerador de alertas
            for (var i = 0; i < json[2].length; i++) {
              if (json[2][i].temperatura >= 35) {
                temp_nome.innerHTML = `${json[2][i].fazendaNome} - ${json[2][i].setorNome}`;
                alerta_temp_msg.innerHTML =
                  "Temperatura muito alta " + json[2][i].temperatura;
              } else if (json[2][i].temperatura <= 10) {
				temp_nome.innerHTML = `${json[2][i].fazendaNome} - ${json[2][i].setorNome}`;
                alerta_temp_msg.innerHTML =
                  "Temperatura muito baixa " + json[2][i].temperatura;
			  }

              if (json[2][i].umidade >= 80) {
                umid_nome.innerHTML = `${json[2][i].fazendaNome} - ${json[2][i].setorNome}`;
                alerta_umid_msg.innerHTML =
                  "Umidade muito alta " + json[2][i].umidade;
              } else if (json[2][i].umidade <= 30) {
				umid_nome.innerHTML = `${json[2][i].fazendaNome} - ${json[2][i].setorNome}`;
                alerta_umid_msg.innerHTML =
                  "Umidade muito baixa " + json[2][i].umidade;
			  }
            }

            if (grafico_select.value == "dia") {
              clearInterval(interval);
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

  interval = setInterval(() => {
    pegar();
  }, intervalo);

  pegar();
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
    configTemp
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
    configUmid
  );

  primeiroRender = false;
}
