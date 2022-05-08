// sessão
function validarSessao() {
	// aguardar();

	var email = sessionStorage.EMAIL_USUARIO;
	var nome = sessionStorage.NOME_USUARIO;

	var h1LoginUsuario = document.getElementById("h1_login_usuario");

	if (email != null && nome != null) {
		// window.alert(`Seja bem-vindo, ${nome}!`);
		if (h1LoginUsuario != undefined) {
			h1LoginUsuario.innerHTML = email;
		}
		b_usuario.innerHTML = nome;

		// finalizarAguardar();
	} else {
		window.location = "../login.html";
	}
}

function iniciarSessao() {
	nome_usuario.innerHTML = `${
		sessionStorage.NOME + " " + sessionStorage.SOBRENOME
	}`;
	cad_funcionario.style.display = `${sessionStorage.FUNCIONARIO}`;
	cad_fazenda.style.display = `${sessionStorage.FAZENDA}`;
}

function limparSessao() {
	sessionStorage.clear();
	window.location = "../login.html";
}

var expanded = false;

function mostrarBoxes() {
	var checkboxes = document.getElementById("checkBoxes");
	if (!expanded) {
		checkboxes.style.display = "block";
		expanded = true;
	} else {
		checkboxes.style.display = "none";
		expanded = false;
	}
}

function checkGerente() {
	var cargo = in_cargo.value;

	if (cargo == "gerente") {
		select_container.style.display = "none";
	} else {
		select_container.style.display = "flex";
	}
}

function carregarFazendas() {
	fetch("/usuarios/listarFazendas", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO carregarFazendas()!");

			if (resposta.ok) {
				console.log(resposta);

				resposta.json().then((json) => {
					console.log("json: " + json);
					console.log("JSON: " + JSON.stringify(json));

					var idFazendas = [];
					var nomeFazendas = [];

					for (let i = 0; i < json.length; i++) {
						idFazendas.push(json[i].idFazenda);
						nomeFazendas.push(json[i].nome);

						console.log(json[i]);
					}

					sessionStorage.ID_FAZENDAS = idFazendas;
					sessionStorage.NOME_FAZENDAS = nomeFazendas;

					for (let i = 0; i < json.length; i++) {
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
				console.log("Houve um erro ao tentar realizar o login!");
				alert("Usuário não cadastrado!");

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
