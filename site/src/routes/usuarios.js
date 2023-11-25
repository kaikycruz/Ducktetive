var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/redefinir", function (req, res) {
    usuarioController.redefinir(req, res);
}) 

router.post("/alterarDados", function (req, res) {
    usuarioController.alterarDados(req, res);
}) 

router.post("/excluirConta", function (req, res) {
    usuarioController.excluirConta(req, res);
}) 

router.post("/reativarConta", function (req, res) {
    usuarioController.reativarConta(req, res);
}) 

router.post("/buscarServidores", function (req, res) {
    usuarioController.buscarServidores(req, res);
}) 

router.post("/buscarParametros", function (req, res) {
    usuarioController.buscarParametros(req, res);
}) 

router.post("/cadastrarServidor", function (req, res) {
    usuarioController.cadastrarServidor(req, res);
}) 

router.post("/alterarDadosServidor", function (req, res) {
    usuarioController.alterarDadosServidor(req, res);
}) 

router.post("/excluirServidor", function (req, res) {
    usuarioController.excluirServidor(req, res);
}) 

router.post("/alterarStatusServidor", function (req, res) {
    usuarioController.alterarStatusServidor(req, res);
}) 

router.post("/buscarUsuarios", function (req, res) {
    usuarioController.buscarUsuarios(req, res);
}) 

router.post("/alterarStatusUsuario", function (req, res) {
    usuarioController.alterarStatusUsuario(req, res);
}) 



module.exports = router;