function entrar() {
	var emailVar = in_email.value;
	var senhaVar = in_senha.value;

	if (emailVar == "" || senhaVar == "") {
		alert("Preencha todos os campos");
		return;
	}

	fetch("/usuarios/autenticar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			emailServer: emailVar,
			senhaServer: senhaVar,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO entrar()!");

			if (resposta.ok) {
				console.log(resposta);

				resposta.json().then((json) => {
					console.log(json);
					console.log(JSON.stringify(json));

					alert("JSON.stringify(json)::::" + JSON.stringify(json));
					alert("json:::::" + json);
					alert("json:::::" + json[0]);
					alert("json:::::" + json[1]);

					sessionStorage.ID_FUNCIONARIO = json.idFuncionario;
					sessionStorage.NOME = json.nome;
					sessionStorage.SOBRENOME = json.sobrenome;
					sessionStorage.CARGO = json.cargo;
					sessionStorage.ID_EMPRESA = json.fkEmpresa;

					if (json.urlImg == null) {
						sessionStorage.IMG_URL = "../../images/gerente-img.png";
					} else {
						sessionStorage.IMG_URL = json.urlImg;
					}

					sessionStorage.FUNCIONARIO = "flex";
					sessionStorage.FAZENDA = "flex";

					if (sessionStorage.CARGO == "analista") {
						sessionStorage.FUNCIONARIO = "none";
						sessionStorage.FAZENDA = "none";
					} else if (sessionStorage.CARGO == "supervisor") {
						sessionStorage.FUNCIONARIO = "flex";
						sessionStorage.FAZENDA = "none";
					}

					window.location = "dashboard/dashboard.html";
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
