var usuarioModel = require("../models/usuarioModel");

function listarFuncionarios(req, res) {
	var idFuncionario = req.body.idFuncionarioServer;

	if (idFuncionario == undefined) {
		res.status(400).send("O idFuncionario está undefined!");
	} else {
		usuarioModel
			.listarFuncionarios(idFuncionario)
			.then(function (resultado) {
				console.log(`\nResultados encontrados: ${resultado.length}`);
				console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

				if (resultado.length == 0) {
					res.status(403).send("Dados não encontrados");
				} else {
					console.log(resultado);
					console.log(resultado[0]);
					res.json(resultado[0]);
				}
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o login! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function listarSetores(req, res) {
	var idFazenda = req.body.idFazendaServer;

	if (idFazenda == undefined) {
		res.status(400).send("O idFazenda está undefined!");
	} else {
		usuarioModel
			.listarSetores(idFazenda)
			.then(function (resultado) {
				console.log(`\nResultados encontrados: ${resultado.length}`);
				console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

				if (resultado.length == 0) {
					res.status(403).send("Dados não encontrados");
				} else {
					console.log(resultado);
					console.log(resultado[0]);
					res.json(resultado[0]);
				}
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o login! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function alterarDados(req, res) {
	var idFuncionario = req.body.idFuncionarioServer;
	var nome = req.body.nomeServer;
	var sobrenome = req.body.sobrenomeServer;
	var telFixo = req.body.telFixoServer;
	var telCelular = req.body.telCelularServer;
	var email = req.body.emailServer;
	var senha = req.body.senhaServer;
	var urlImg = req.body.urlImgServer;

	if (idFuncionario == undefined) {
		res.status(400).send("O idFuncionario está undefined!");
	} else if (nome == undefined) {
		res.status(400).send("O nome está undefined!");
	} else if (sobrenome == undefined) {
		res.status(400).send("O sobrenome está undefined!");
	} else if (telFixo == undefined) {
		res.status(400).send("O telFixo está undefined!");
	} else if (telCelular == undefined) {
		res.status(400).send("O telCelular está undefined!");
	} else if (email == undefined) {
		res.status(400).send("O email está undefined!");
	} else if (senha == undefined) {
		res.status(400).send("O senha está undefined!");
	} else if (urlImg == undefined) {
		res.status(400).send("O urlImg está undefined!");
	} else {
		usuarioModel
			.alterarDados(
				idFuncionario,
				nome,
				sobrenome,
				telFixo,
				telCelular,
				email,
				senha,
				urlImg,
			)
			.then(function (resultado) {
				console.log("THEN do model: " + resultado);
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o login! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function carregarFazendas(req, res) {
	var idFuncionario = req.body.idFuncionarioServer;

	usuarioModel
		.carregarFazendas(idFuncionario)
		.then(function (resultado) {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send("Nenhum resultado encontrado!");
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"Houve um erro ao realizar a consulta! Erro: ",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function listarGerentes(req, res) {
	var idEmpresa = req.body.idEmpresaServer;

	usuarioModel
		.listarGerentes(idEmpresa)
		.then(function (resultado) {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send("Nenhum resultado encontrado!");
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"Houve um erro ao realizar a consulta! Erro: ",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function entrar(req, res) {
	var email = req.body.emailServer;
	var senha = req.body.senhaServer;

	if (email == undefined) {
		res.status(400).send("Seu email está undefined!");
	} else if (senha == undefined) {
		res.status(400).send("Sua senha está indefinida!");
	} else {
		usuarioModel
			.entrar(email, senha)
			.then(function (resultado) {
				console.log(`\nResultados encontrados: ${resultado.length}`);
				console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

				if (resultado.length == 0) {
					res.status(403).send("Email e/ou senha inválido(s)");
					alert("Email e/ou senha inválido(s)");
				} else {
					console.log(resultado);
					res.json(resultado[0]);
				}
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o login! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function cadastrarEmpresa(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var nomeEmpresa = req.body.nomeEmpresaServer;
	var cnpj = req.body.cnpjServer;

	// Faça as validações dos valores
	if (nomeEmpresa == undefined) {
		res.status(400).send("Seu nome está undefined!");
	} else if (cnpj == undefined) {
		res.status(400).send("Seu cnpj está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.cadastrarEmpresa(nomeEmpresa, cnpj)
			.then(function (resultado) {
				console.log("Resultado: " + resultado);
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function associarFazendaGerente(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var idFazenda = req.body.idFazendaServer;
	var idGerentes = req.body.idGerentesServer;
	var qtdSetores = req.body.qtdSetoresServer;

	console.log("id gerentes no controller: " + idGerentes);

	console.log("idFazenda no controller: " + idFazenda);

	// Faça as validações dos valores
	if (idFazenda == undefined) {
		res.status(400).send("Seu id Fazenda está undefined!");
	} else if (idGerentes == undefined) {
		res.status(400).send("A idgerentes está undefined!");
	} else if (qtdSetores == undefined) {
		res.status(400).send("A qtdSetores está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.associarFazendaGerente(idFazenda, idGerentes, qtdSetores)
			.then(function (resultado) {
				console.log("Resultado: " + resultado);
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function deletarEmpresa(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var idEmpresa = req.body.idEmpresaServer;

	console.log("idEmpresa no controller: " + idEmpresa);

	// Faça as validações dos valores
	if (idEmpresa == undefined) {
		res.status(400).send("Seu id Fazenda está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.deletarEmpresa(idEmpresa)
			.then(function (resultado) {
				console.log("Resultado: " + resultado);
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function associarFuncionario(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var idEmpresa = req.body.idEmpresaServer;
	var idFuncionario = req.body.idFuncionarioServer;

	console.log("idEmpresa no controller: " + idEmpresa);
	console.log("idFuncionario no controller: " + idFuncionario);

	// Faça as validações dos valores
	if (idEmpresa == undefined) {
		res.status(400).send("Seu idEmpresa está undefined!");
	} else if (idFuncionario == undefined) {
		res.status(400).send("Seu idFuncionario está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.associarFuncionario(idEmpresa, idFuncionario)
			.then(function (resultado) {
				console.log("Resultado: " + resultado);
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function gerarSetores(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var idFuncionario = req.body.idFuncionarioServer;

	console.log("idFuncionario no controller: " + idFuncionario);

	// Faça as validações dos valores
	if (idFuncionario == undefined) {
		res.status(400).send("Seu idFuncionario está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.gerarSetores(idFuncionario)
			.then(function (resultado) {
				console.log("Resultado: " + resultado);
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function gerarDias(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var idFazenda = req.body.idFazendaServer;

	console.log("idFazenda no controller: " + idFazenda);

	// Faça as validações dos valores
	if (idFazenda == undefined) {
		res.status(400).send("Seu idFazenda está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.gerarDias(idFazenda)
			.then(function (resultado) {
				console.log("Resultado: " + resultado);
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function gerarDadosSensores(req, res) {
	var fkFazendas = req.body.fkFazendasServer;
	var idSetores = req.body.idSetoresServer;

	if (fkFazendas == undefined) {
		res.status(400).send("Seu fkFazendas está undefined!");
	} else if (idSetores == undefined) {
		res.status(400).send("Seu idSetores está undefined!");
	} else {
		usuarioModel
			.gerarDadosSensores(fkFazendas, idSetores)
			.then(function (resultado) {
				console.log("Resultado: " + resultado);

				usuarioModel.pegarQtdDados().then(function (resposta) {
					console.log("resposta: " + resposta);
					res.json(resposta);
				});
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function pegarDados(req, res) {
	var fkSetor = req.body.fkSetorServer;
	var fkFazenda = req.body.fkFazendaServer;
	var dataDado = req.body.dataDadoServer;
	var idFuncionario = req.body.idFuncionarioServer;
	var setorLength = req.body.setorLengthServer;
	var resultado = [];

	if (fkSetor == undefined) {
		res.status(400).send("Seu fkSetor está undefined!");
	} else if (fkFazenda == undefined) {
		res.status(400).send("Seu fkFazenda está undefined!");
	} else if (dataDado == undefined) {
		res.status(400).send("Seu dataDado está undefined!");
	} else if (idFuncionario == undefined) {
		res.status(400).send("Seu idFuncionario está undefined!");
	} else if (setorLength == undefined) {
		res.status(400).send("Seu setorLength está undefined!");
	} else {
		usuarioModel
			.pegarDadosHora(fkSetor)
			.then(function (resposta1) {
				var resposta1Arr = [];
				for (var i = 0; i < resposta1.length; i++) {
					resposta1Arr.push(resposta1[i]);
				}
				resultado.push(resposta1Arr);

				usuarioModel
					.pegarDadosSetor(fkFazenda, dataDado)
					.then(function (resposta2) {
						var resposta2Arr = [];
						for (var i = 0; i < resposta2.length; i++) {
							resposta2Arr.push(resposta2[i]);
						}
						resultado.push(resposta2Arr);

						usuarioModel
							.pegarDadosAlerta(idFuncionario, setorLength)
							.then(function (resposta3) {
								var resposta3Arr = [];
								for (var i = 0; i < resposta3.length; i++) {
									resposta3Arr.push(resposta3[i]);
								}
								resultado.push(resposta3Arr);

								res.json(resultado);
							});
					});
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function limparDadosSensores(req, res) {
	usuarioModel
		.limparDadosSensores()
		.then(function (resultado) {
			console.log("Resultado: " + resultado);
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"\nHouve um erro ao realizar o cadastro! Erro: ",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function firmarContrato(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var idFuncionario = req.body.idFuncionarioServer;
	var idFazendasChecadas = req.body.idFazendasChecadasServer;
	var cargo = req.body.cargoServer;
	var idFazendas = req.body.idFazendasServer;

	// Faça as validações dos valores
	if (idFuncionario == undefined) {
		res.status(400).send("Seu id funcionario está undefined!");
	} else if (idFazendasChecadas == undefined) {
		res.status(400).send("Sua fazendas checadas está undefined!");
	} else if (cargo == undefined) {
		res.status(400).send("Seu cargo está undefined!");
	} else if (idFazendas == undefined) {
		res.status(400).send("A idFazendas está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.firmarContrato(idFuncionario, idFazendasChecadas, cargo, idFazendas)
			.then(function (resultado) {
				console.log("Resultado: " + resultado);
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function cadastrarFuncionario(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var nome = req.body.nomeServer;
	var sobrenome = req.body.sobrenomeServer;
	var email = req.body.emailServer;
	var telFixo = req.body.telFixoServer;
	var telCelular = req.body.telCelularServer;
	var senha = req.body.senhaServer;
	var idEmpresa = req.body.idEmpresaServer;
	var cargo = req.body.cargoServer;

	// Faça as validações dos valores
	if (email == undefined) {
		res.status(400).send("Seu email está undefined!");
	} else if (idEmpresa == undefined) {
		res.status(400).send("O id do cliente está undefined!");
	} else if (cargo == undefined) {
		res.status(400).send("O cargo está undefined!");
	} else if (telFixo == undefined) {
		res.status(400).send("Seu telefone fixo está undefined!");
	} else if (telCelular == undefined) {
		res.status(400).send("Sua telefone celular está undefined!");
	} else if (senha == undefined) {
		res.status(400).send("Sua cnpj está undefined!");
	} else if (nome == undefined) {
		res.status(400).send("seu nome está undefined!");
	} else if (sobrenome == undefined) {
		res.status(400).send("seu sobrenome está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.cadastrarFuncionario(
				nome,
				sobrenome,
				email,
				telFixo,
				telCelular,
				senha,
				idEmpresa,
				cargo,
			)
			.then(function (resultado) {
				console.log("Resultado: " + resultado);
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function cadastrarFazenda(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var nomeFazenda = req.body.nomeFazendaServer;
	var telFixo = req.body.telFixoServer;
	var telcelular = req.body.telCelularServer;
	var cep = req.body.cepServer;
	var areaHectare = req.body.areaHectareServer;
	var idGerentes = req.body.idGerentesServer;
	var qtdSetores = req.body.qtdSetoresServer;

	console.log("dentro do cadastrarFazenda()");

	// Faça as validações dos valores
	if (nomeFazenda == undefined) {
		res.status(400).send("O nome da fazenda está undefined!");
	} else if (telFixo == undefined) {
		res.status(400).send("O telefone fixo está undefined!");
	} else if (telcelular == undefined) {
		res.status(400).send("O telefone celular está undefined!");
	} else if (cep == undefined) {
		res.status(400).send("O cep está undefined!");
	} else if (areaHectare == undefined) {
		res.status(400).send("A área em hectare está undefined!");
	} else if (idGerentes == undefined) {
		res.status(400).send("O idGerentes está undefined!");
	} else if (qtdSetores == undefined) {
		res.status(400).send("A qtdSetores está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.cadastrarFazenda(
				nomeFazenda,
				telFixo,
				telcelular,
				cep,
				areaHectare,
				idGerentes,
				qtdSetores,
			)
			.then(function (resultado) {
				console.log("Resultado: " + resultado);
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {
	entrar,
	cadastrarEmpresa,
	cadastrarFuncionario,
	associarFazendaGerente,
	associarFuncionario,
	listarGerentes,
	cadastrarFazenda,
	firmarContrato,
	carregarFazendas,
	listarFuncionarios,
	deletarEmpresa,
	alterarDados,
	gerarSetores,
	listarSetores,
	gerarDadosSensores,
	pegarDados,
	gerarDias,
	limparDadosSensores,
};
