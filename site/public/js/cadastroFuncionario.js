function carregarFazendas() {
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
}
