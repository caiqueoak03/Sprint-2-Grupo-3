// sessão
function validarSessao() {
	var email = sessionStorage.NOME;
	var nome = sessionStorage.SOBRENOME;

	if (email || nome) {
		window.location = "../login.html";
	}
}

function iniciarSessao() {
	nome_usuario.innerHTML = `${
		sessionStorage.NOME + " " + sessionStorage.SOBRENOME
	}`;
	cad_funcionario.style.display = `${sessionStorage.FUNCIONARIO}`;
	cad_fazenda.style.display = `${sessionStorage.FAZENDA}`;

	wrapper_loading.style.display = "none";
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

function carregarGerentes() {
	fetch('/usuarios/')
}