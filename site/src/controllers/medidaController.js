var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidasCPU(req, res) {
  var idServidor = req.body.idServidorServer;

  console.log(`Recuperando as ultimas medidas`);

  medidaModel
    .buscarUltimasMedidasCPU(idServidor)
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
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasRAM(req, res) {
  var idServidor = req.body.idServidorServer;

  console.log(`Recuperando as ultimas medidas`);

  medidaModel
    .buscarUltimasMedidasRAM(idServidor)
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
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasDISCO(req, res) {
  var idServidor = req.body.idServidorServer;

  console.log(`Recuperando as ultimas medidas`);

  medidaModel
    .buscarUltimasMedidasDISCO(idServidor)
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
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasREDE(req, res) {
  var idServidor = req.body.idServidorServer;

  console.log(`Recuperando as ultimas medidas`);

  medidaModel
    .buscarUltimasMedidasREDE(idServidor)
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
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoRealCPU(req, res) {
  var idServidor = req.body.idServidorServer;

  console.log(`Recuperando medidas em tempo real`);

  medidaModel
    .buscarMedidasEmTempoRealCPU(idServidor)
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
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoRealRAM(req, res) {
  var idServidor = req.body.idServidorServer;

  console.log(`Recuperando medidas em tempo real`);

  medidaModel
    .buscarMedidasEmTempoRealRAM(idServidor)
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
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoRealDISCO(req, res) {
  var idServidor = req.body.idServidorServer;

  console.log(`Recuperando medidas em tempo real`);

  medidaModel
    .buscarMedidasEmTempoRealDISCO(idServidor)
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
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoRealREDE(req, res) {
  var idServidor = req.body.idServidorServer;

  console.log(`Recuperando medidas em tempo real`);

  medidaModel
    .buscarMedidasEmTempoRealREDE(idServidor)
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
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarUltimasMedidasCPU,
  buscarUltimasMedidasRAM,
  buscarUltimasMedidasDISCO,
  buscarUltimasMedidasREDE,
  buscarMedidasEmTempoRealCPU,
  buscarMedidasEmTempoRealRAM,
  buscarMedidasEmTempoRealDISCO,
  buscarMedidasEmTempoRealREDE,
};
