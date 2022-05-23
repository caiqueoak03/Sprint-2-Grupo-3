var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/carregarKPIs", function (req, res) {
	medidaController.carregarKPIs(req, res);
});

module.exports = router;
