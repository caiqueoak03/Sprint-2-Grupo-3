// sessão
function validarSessao() {
	var nome = sessionStorage.SOBRENOME;

	if (nome == null) {
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

	user_profile_pic.src = "" + sessionStorage.IMG_URL;
}

function limparSessao() {
	sessionStorage.clear();
	window.location = "../login.html";
}

var expanded = false;

function mostrarBoxes() {
	var checkboxes = document.getElementById("checkBoxes");
	if (!expanded) {
		checkboxes.style.minHeight = '120px';
		checkboxes.style.border = '1px #2ac28a solid';
		checkboxes.style.borderTop = 'none';
		expanded = true;
	} else {
		checkboxes.style.minHeight = '0';
		checkboxes.style.border = 'none';
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
