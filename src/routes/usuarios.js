var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/listarFuncionarios", function (req, res) {
	usuarioController.listarFuncionarios(req, res);
});

router.put("/alterarDados", function (req, res) {
	usuarioController.alterarDados(req, res);
});

router.post("/cadastrarEmpresa", function (req, res) {
	usuarioController.cadastrarEmpresa(req, res);
});

router.post("/deletarEmpresa", function (req, res) {
	usuarioController.deletarEmpresa(req, res);
});

router.post("/cadastrarFazenda", function (req, res) {
	usuarioController.cadastrarFazenda(req, res);
});

router.post("/cadastrarFuncionario", function (req, res) {
	usuarioController.cadastrarFuncionario(req, res);
});

router.post("/associarFuncionario", function (req, res) {
	usuarioController.associarFuncionario(req, res);
});

router.post("/associarFazendaGerente", function (req, res) {
	usuarioController.associarFazendaGerente(req, res);
});

router.post("/firmarContrato", function (req, res) {
	usuarioController.firmarContrato(req, res);
});

router.post("/autenticar", function (req, res) {
	usuarioController.entrar(req, res);
});

router.post("/listarFazendas", function (req, res) {
	usuarioController.listarFazendas(req, res);
});

router.post("/listarGerentes", function (req, res) {
	usuarioController.listarGerentes(req, res);
});

module.exports = router;
