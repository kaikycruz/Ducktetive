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
  var opcoesPerguntaDeSeguranca = req.body.opcoesPerguntasDeSegurancaServer;
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
  } else if (opcoesPerguntaDeSeguranca == undefined) {
    res.status(400).send("Seu perguntaDeSeguranca está undefined!");
  } else if (perguntaDeSeguranca == undefined) {
    res.status(400).send("Seu perguntaDeSeguranca está undefined!");
  }  else if (senha == undefined) {
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
      perguntaDeSeguranca,
      opcoesPerguntaDeSeguranca
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

function redefinir(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

  var email = req.body.emailServer;
  var opcoesPerguntaDeSeguranca = req.body.opcoesPerguntasDeSegurancaServer;
  var perguntaDeSeguranca = req.body.perguntaDeSegurancaServer;
  var novaSenha = req.body.novaSenhaServer;

  // Faça as validações dos valores
  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (opcoesPerguntaDeSeguranca == undefined) {
    res.status(400).send("Seu perguntaDeSeguranca está undefined!");
  } else if (perguntaDeSeguranca == undefined) {
    res.status(400).send("Seu perguntaDeSeguranca está undefined!");
  }  else if (novaSenha == undefined) {
    res.status(400).send("Seu novaSenha está undefined!");
  }

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js razaoSocial, nomeFantasia, cnpj, nomeUsuario, sobrenomeUsuario, email, cargo, telefone, perguntaDeSeguranca, senha
  usuarioModel
    .redefinir(
      email,
      novaSenha,
      perguntaDeSeguranca,
      opcoesPerguntaDeSeguranca
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

function alterarDados(req, res) {
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

  var idUsuario = req.body.idUsuarioServer;
  var nomeUsuario = req.body.nomeUsuarioServer;
  var sobrenomeUsuario = req.body.sobrenomeUsuarioServer;
  var email = req.body.emailServer;
  var telefone = req.body.telefoneServer;
  var opcoesPerguntaDeSeguranca = req.body.opcoesPerguntasDeSegurancaServer;
  var perguntaDeSeguranca = req.body.perguntaDeSegurancaServer;


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
  } else if (telefone == undefined) {
    res.status(400).send("Seu telefone está undefined!");
  } else if (opcoesPerguntaDeSeguranca == undefined) {
    res.status(400).send("Seu perguntaDeSeguranca está undefined!");
  } else if (perguntaDeSeguranca == undefined) {
    res.status(400).send("Seu perguntaDeSeguranca está undefined!");
  }
  else if (idUsuario == undefined) {
    res.status(400).send("Seu idUsuario está undefined!");
  }

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js razaoSocial, nomeFantasia, cnpj, nomeUsuario, sobrenomeUsuario, email, cargo, telefone, perguntaDeSeguranca, senha
  usuarioModel
    .alterarDados(
      idUsuario,
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
      perguntaDeSeguranca,
      opcoesPerguntaDeSeguranca
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

function excluirConta(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

  var idUsuario = req.body.idUsuarioServer;

  // Faça as validações dos valores
  if (idUsuario == undefined) {
    res.status(400).send("Seu idUsuario está undefined!");
  }

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js razaoSocial, nomeFantasia, cnpj, nomeUsuario, sobrenomeUsuario, email, cargo, telefone, perguntaDeSeguranca, senha
  usuarioModel
    .excluirConta(
      idUsuario
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

function reativarConta(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

  var idUsuario = req.body.idUsuarioServer;

  // Faça as validações dos valores
  if (idUsuario == undefined) {
    res.status(400).send("Seu idUsuario está undefined!");
  }

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js razaoSocial, nomeFantasia, cnpj, nomeUsuario, sobrenomeUsuario, email, cargo, telefone, perguntaDeSeguranca, senha
  usuarioModel
    .reativarConta(
      idUsuario
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

function buscarServidores(req, res) {
  var idUsuario = req.body.idUsuarioServer;


  if (idUsuario == undefined) {
    res.status(400).send("Seu idUsuario está undefined!");
  } else {
    usuarioModel
      .buscarServidores(idUsuario)
      .then(function (resultadobuscarServidores) {
        console.log(`\nResultados encontrados: ${resultadobuscarServidores.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadobuscarServidores)}`); // transforma JSON em String

        if (resultadobuscarServidores.length > 0) {
          console.log(resultadobuscarServidores);
          res.json(resultadobuscarServidores);

          // alteracao futura para criar servidor

          //   aquarioModel
          //     .buscarAquariosPorEmpresa(resultadobuscarServidores[0].empresaId)
          //     .then((resultadoAquarios) => {
          //       if (resultadoAquarios.length > 0) {
          //         res.json({
          //           id: resultadobuscarServidores[0].id,
          //           email: resultadobuscarServidores[0].email,
          //           nome: resultadobuscarServidores[0].nome,
          //           senha: resultadobuscarServidores[0].senha,
          //         });
          //       } else {
          //         res.status(204).json({ aquarios: [] });
          //       }
          //     });
        } 
        // else if (resultadobuscarServidores.length == 0) {
        //   res.status(403).send("Email e/ou senha inválido(s)");
        // } else {
        //   res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        // }
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

function buscarParametros(req, res) {
  var idEmpresa = req.body.idEmpresaServer;


  if (idEmpresa == undefined) {
    res.status(400).send("Seu idEmpresa está undefined!");
  } else {
    usuarioModel
      .buscarParametros(idEmpresa)
      .then(function (resultadobuscarParametros) {
        console.log(`\nResultados encontrados: ${resultadobuscarParametros.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadobuscarParametros)}`); // transforma JSON em String

        if (resultadobuscarParametros.length > 0) {
          console.log(resultadobuscarParametros);
          res.json(resultadobuscarParametros);

          // alteracao futura para criar servidor

          //   aquarioModel
          //     .buscarAquariosPorEmpresa(resultadobuscarServidores[0].empresaId)
          //     .then((resultadoAquarios) => {
          //       if (resultadoAquarios.length > 0) {
          //         res.json({
          //           id: resultadobuscarServidores[0].id,
          //           email: resultadobuscarServidores[0].email,
          //           nome: resultadobuscarServidores[0].nome,
          //           senha: resultadobuscarServidores[0].senha,
          //         });
          //       } else {
          //         res.status(204).json({ aquarios: [] });
          //       }
          //     });
        } 
        // else if (resultadobuscarServidores.length == 0) {
        //   res.status(403).send("Email e/ou senha inválido(s)");
        // } else {
        //   res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        // }
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

function cadastrarServidor(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  
  
  //var idServidor = req.body.idServidorServer;
  var idEndereco = req.body.idEnderecoServer;
  var idEmpresa = req.body.idEmpresaServer;
  var nomeServidor = req.body.nomeServidorServer;
  var maximoCPU = req.body.maximoCPUServer;
  var minimoCPU = req.body.minimoCPUServer;
  var maximoRAM = req.body.maximoRAMServer;
  var minimoRAM = req.body.minimoRAMServer;
  var maximoDisco = req.body.maximoDiscoerver;
  var maximoRede = req.body.maximoRedeServer;

  // Faça as validações dos valores
  if (nomeServidor === undefined) {
      res.status(400).send("O nome do servidor está undefined!");
  } else if (maximoCPU === undefined) {
      res.status(400).send("A quantidade máxima de CPU está undefined!");
  } else if (minimoCPU === undefined) {
      res.status(400).send("A quantidade mínima de CPU está undefined!");
  } else if (maximoRAM === undefined) {
      res.status(400).send("A quantidade máxima de RAM está undefined!");
  } else if (minimoRAM === undefined) {
      res.status(400).send("A quantidade mínima de RAM está undefined!");
  } else if (maximoDisco === undefined) {
      res.status(400).send("A quantidade máxima de disco está undefined!");
  } else if (maximoRede === undefined) {
      res.status(400).send("A quantidade máxima de rede está undefined!");
  } //else if (idServidor === undefined) {
    //res.status(400).send("A quantidade máxima de rede está undefined!");
  //} 
  else if (idEmpresa === undefined) {
  res.status(400).send("A quantidade máxima de rede está undefined!");
  }else if (idEndereco === undefined) {
    res.status(400).send("A quantidade máxima de rede está undefined!");
    }

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js razaoSocial, nomeFantasia, cnpj, nomeUsuario, sobrenomeUsuario, email, cargo, telefone, perguntaDeSeguranca, senha
  usuarioModel
    .cadastrarServidor(
      nomeServidor,
      maximoCPU,
      minimoCPU,
      maximoRAM,
      minimoRAM,
      maximoDisco,
      maximoRede,
      //idServidor,
      idEmpresa,
      idEndereco
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
  alterarDados,
  redefinir,
  excluirConta,
  reativarConta,
  buscarServidores,
  buscarParametros,
  cadastrarServidor
};
