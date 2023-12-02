var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

//CPU
router.post("/buscarUltimasMedidasCPU", function (req, res) {
  medidaController.buscarUltimasMedidasCPU(req, res);
});

router.post("/buscarMedidasEmTempoRealCPU", function (req, res) {
  medidaController.buscarMedidasEmTempoRealCPU(req, res);
});

//RAM
router.post("/buscarUltimasMedidasRAM", function (req, res) {
  medidaController.buscarUltimasMedidasRAM(req, res);
});

router.post("/buscarMedidasEmTempoRealRAM", function (req, res) {
  medidaController.buscarMedidasEmTempoRealRAM(req, res);
});

//DISCO
router.post("/buscarUltimasMedidasDISCO", function (req, res) {
  medidaController.buscarUltimasMedidasDISCO(req, res);
});

router.post("/buscarMedidasEmTempoRealDISCO", function (req, res) {
  medidaController.buscarMedidasEmTempoRealDISCO(req, res);
});

//REDE
router.post("/buscarUltimasMedidasREDE", function (req, res) {
  medidaController.buscarUltimasMedidasREDE(req, res);
});

router.post("/buscarMedidasEmTempoRealREDE", function (req, res) {
  medidaController.buscarMedidasEmTempoRealREDE(req, res);
});

module.exports = router;
