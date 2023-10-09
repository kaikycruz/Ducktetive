var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          res.json(resultadoAutenticar[0]);

          // alteracao futura para criar servidor

          //   aquarioModel
          //     .buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
          //     .then((resultadoAquarios) => {
          //       if (resultadoAquarios.length > 0) {
          //         res.json({
          //           id: resultadoAutenticar[0].id,
          //           email: resultadoAutenticar[0].email,
          //           nome: resultadoAutenticar[0].nome,
          //           senha: resultadoAutenticar[0].senha,
          //         });
          //       } else {
          //         res.status(204).json({ aquarios: [] });
          //       }
          //     });
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

  var cep = req.body.cepServer;
  var endereco = req.body.enderecoServer;
  var numero = req.body.numeroServer;
  var bairro = req.body.bairroServer;
  var cidade = req.body.cidadeServer;
  var estado = req.body.estadoServer;
  var complemento = req.body.complementoServer;

  var razaoSocial = req.body.razaoSocialServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var cnpj = req.body.cnpjServer;

  var nomeUsuario = req.body.nomeUsuarioServer;
  var sobrenomeUsuario = req.body.sobrenomeUsuarioServer;
  var email = req.body.emailServer;
  var cargo = req.body.cargoServer;
  var telefone = req.body.telefoneServer;
  var perguntaDeSeguranca = req.body.perguntaDeSegurancaServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores
  if (cep == undefined) {
    res.status(400).send("Seu cep está undefined!");
  } else if (endereco == undefined) {
    res.status(400).send("Seu endereco está undefined!");
  } else if (numero == undefined) {
    res.status(400).send("Seu numero está undefined!");
  } else if (bairro == undefined) {
    res.status(400).send("Seu bairro está undefined!");
  } else if (cidade == undefined) {
    res.status(400).send("Seu cidade está undefined!");
  } else if (estado == undefined) {
    res.status(400).send("Seu estado está undefined!");
  } else if (complemento == undefined) {
    res.status(400).send("Seu complemento está undefined!");
  } else if (razaoSocial == undefined) {
    res.status(400).send("Seu razao está undefined!");
  } else if (nomeFantasia == undefined) {
    res.status(400).send("Seu nomeFantasia está undefined!");
  } else if (cnpj == undefined) {
    res.status(400).send("Seu cnpj está undefined!");
  } else if (nomeUsuario == undefined) {
    res.status(400).send("Seu nomeUsuario está undefined!");
  } else if (sobrenomeUsuario == undefined) {
    res.status(400).send("Seu sobrenomeUsuario está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cargo == undefined) {
    res.status(400).send("Seu cargo está undefined!");
  } else if (telefone == undefined) {
    res.status(400).send("Seu telefone está undefined!");
  } else if (perguntaDeSeguranca == undefined) {
    res.status(400).send("Seu perguntaDeSeguranca está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Seu senha está undefined!");
  }

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js razaoSocial, nomeFantasia, cnpj, nomeUsuario, sobrenomeUsuario, email, cargo, telefone, perguntaDeSeguranca, senha
  usuarioModel
    .cadastrar(
      endereco,
      numero,
      bairro,
      cep,
      complemento,
      cidade,
      estado,
      razaoSocial,
      nomeFantasia,
      cnpj,
      nomeUsuario,
      sobrenomeUsuario,
      telefone,
      email,
      senha,
      cargo,
      perguntaDeSeguranca
    )
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  autenticar,
  cadastrar,
};
