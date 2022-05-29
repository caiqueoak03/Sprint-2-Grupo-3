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
					if (json[0].qtdFazendas == 0) {
						return;
					}
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

					var len = sessionStorage.ID_FAZENDAS.split(",").length;
					var idFazendas = sessionStorage.ID_FAZENDAS.split(",");
					var nomeFazendas = sessionStorage.NOME_FAZENDAS.split(",");

					for (let i = 0; i < len; i++) {
						checkBoxes.innerHTML += `
                    <li>
                      <label class="labels">
                        ${nomeFazendas[i]}
                      </label>
                      <input type="checkbox" class="boxes" id='${idFazendas[i]}'/>
                    </li>`;
					}
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
