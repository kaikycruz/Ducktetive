var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
      SELECT idUsuario, usuario.nome as primeiro_nome, sobrenome, telefone, email, resposta_seguranca, cargo.nome as nomeCargo, idEmpresa, razao_social, nome_fantasia, nome_fantasia, cnpj, idEndereco, logradouro, numero, bairro, cep, complemento, cidade, estado, ativo from usuario join empresa on fkEmpresa = idEmpresa join endereco on fkEndereco = idEndereco join cargo on  fkCargo = idCargo where usuario.email = '${email}' and senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
async function cadastrar(
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
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  const verificaEmail = `
        SELECT * FROM Usuario WHERE email = '${email}';
    `;
  const resultadoEmail = await database.executar(verificaEmail);

  if (resultadoEmail.length > 0) {
    throw new Error("Já existe um usuário com o mesmo email.");
  }

  // Verifique se já existe uma empresa com o mesmo CNPJ
  const verificaCNPJ = `
        SELECT * FROM Empresa WHERE cnpj = '${cnpj}';
    `;
  const resultadoCNPJ = await database.executar(verificaCNPJ);

  if (resultadoCNPJ.length > 0) {
    throw new Error("Já existe uma empresa com o mesmo CNPJ.");
  }

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao1 = `
        INSERT INTO Endereco (logradouro, numero, bairro, cep, complemento, cidade, estado) VALUES ('${endereco}', '${numero}', '${bairro}', '${cep}', '${complemento}', '${cidade}', '${estado}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);

  var instrucao2 = `
         INSERT INTO Empresa (razao_social, nome_fantasia, cnpj, fkEndereco) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', ${"(SELECT MAX(idEndereco) AS ultimoIdEndereco FROM endereco)"});
       
    `;
  console.log("Executando a instrução SQL: \n" + instrucao2);
  await database.executar(instrucao2);

  var instrucao3 = `
        INSERT INTO Usuario (nome, sobrenome, telefone, email, senha, resposta_seguranca, fkPergunta, fkCargo, fkEmpresa) VALUES ('${nomeUsuario}', '${sobrenomeUsuario}', '${telefone}','${email}','${senha}','${perguntaDeSeguranca}','${opcoesPerguntaDeSeguranca}', '${cargo}', ${"(SELECT MAX(idEndereco) AS ultimoIdEndereco FROM endereco)"});
    `;
  console.log("Executando a instrução SQL: \n" + instrucao3);
  await database.executar(instrucao3);
}

async function cadastrarUsuario(
  nomeUsuario,
  sobrenomeUsuario,
  email,
  senha,
  cargo,
  perguntaDeSeguranca,
  opcoesPerguntaDeSeguranca,
  empresa,
  idEmpresa
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  const verificaEmail = `
        SELECT * FROM Usuario WHERE email = '${email}';
    `;
  const resultadoEmail = await database.executar(verificaEmail);

  if (resultadoEmail.length > 0) {
    throw new Error("Já existe um usuário com o mesmo email.");
  }

  // Verifique se já existe uma empresa com o mesmo CNPJ

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.

  var instrucao3 = `
        INSERT INTO Usuario (nome, sobrenome, telefone, email, senha, resposta_seguranca, fkPergunta, fkCargo, fkEmpresa) VALUES ('${nomeUsuario}', '${sobrenomeUsuario}', 'null','${email}','${senha}','${perguntaDeSeguranca}','${opcoesPerguntaDeSeguranca}', '${cargo}', ${idEmpresa});
    `;
  console.log("Executando a instrução SQL: \n" + instrucao3);
  await database.executar(instrucao3);
}

async function redefinir(
  email,
  novaSenha,
  perguntaDeSeguranca,
  opcoesPerguntaDeSeguranca
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  const verificaUsuario = `
        select * from usuario where email = '${email}' and resposta_seguranca = '${perguntaDeSeguranca}' and fkPergunta = '${opcoesPerguntaDeSeguranca}';
    `;
  const resultadoUsuario = await database.executar(verificaUsuario);

  if (resultadoUsuario.length < 1) {
    throw new Error("Ocorreu um erro");
  }




  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao1 = `
        UPDATE usuario JOIN ( SELECT idUsuario FROM usuario WHERE email = '${email}' AND resposta_seguranca = '${perguntaDeSeguranca}' AND fkPergunta = '${opcoesPerguntaDeSeguranca}' ) subquery ON usuario.idUsuario = subquery.idUsuario SET usuario.senha = '${novaSenha}';

    `;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);
}

async function alterarDados(
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
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao1 = `        
        UPDATE usuario u join empresa emp on u.fkEmpresa = emp.idEmpresa 
				                  join endereco ende on emp.fkEndereco = ende.idEndereco
            set u.nome = '${nomeUsuario}',
              u.sobrenome = '${sobrenomeUsuario}',
              u.telefone = '${telefone}',
              u.email = '${email}',
              u.resposta_seguranca = '${perguntaDeSeguranca}',
              u.fkPergunta = ${opcoesPerguntaDeSeguranca},
              emp.razao_social = '${razaoSocial}',
              emp.nome_fantasia = '${nomeFantasia}',
              emp.cnpj = '${cnpj}',
              ende.logradouro = '${endereco}',
              ende.numero = ${numero},
              ende.bairro = '${bairro}',
              ende.cep = '${cep}',
              ende.complemento = '${complemento}',
              ende.cidade = '${cidade}',
              ende.estado = '${estado}'
          WHERE u.idUsuario = ${idUsuario};
    
        `;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);

}

async function excluirConta(
  idUsuario
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao1 = `        
      UPDATE usuario SET ativo = 0 where idUsuario = ${idUsuario};`;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);

}

async function reativarConta(
  idUsuario
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao1 = `        
      UPDATE usuario SET ativo = 1 where idUsuario = ${idUsuario};`;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);

}

function buscarServidores(idEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idEmpresa
  );
  var instrucao = `
  SELECT empresa.idEmpresa, servidor.idServidor, servidor.nome as nomeServidor, endereco.logradouro, endereco.numero, endereco.cidade, statusservidor.nome as statusServidor FROM servidor JOIN empresa ON servidor.fkEmpresa = empresa.idEmpresa JOIN endereco ON servidor.fkEndereco = endereco.idEndereco JOIN statusservidor on servidor.fkStatusServ = statusservidor.idStatusServidor WHERE empresa.idEmpresa = ${idEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarParametros(idEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idEmpresa
  );
  var instrucao = `
  SELECT idParametro, nome, maximo, minimo FROM parametroalerta join servidor on idServidor = fkServidor WHERE fkServidor = ${idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

async function cadastrarServidor(
  nomeServidor,
  maximoCPU,
  minimoCPU,
  maximoRAM,
  minimoRAM,
  maximoDisco,
  maximoRede,
  idEmpresa,
  idEndereco
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );


  var instrucao1 = `
        INSERT INTO Servidor (idServidor, nome, fkEmpresa, fkEndereco, fkStatusServ) VALUES (null, '${nomeServidor}', ${idEmpresa}, ${idEndereco}, 2);
    `;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoParametro1 = `
    insert into parametroAlerta values (null, ${maximoCPU}, ${minimoCPU}, ${"(SELECT MAX(idServidor) AS ultimoIdServidor FROM servidor)"}, 1);
  `;

  var instrucaoParametro2 = `
    insert into parametroAlerta values (null, ${maximoRAM}, ${minimoRAM}, ${"(SELECT MAX(idServidor) AS ultimoIdServidor FROM servidor)"}, 2);
  `;

  var instrucaoParametro3 = `
    insert into parametroAlerta values (null, ${maximoDisco}, null, ${"(SELECT MAX(idServidor) AS ultimoIdServidor FROM servidor)"}, 3);
  `;

  var instrucaoParametro4 = `
    insert into parametroAlerta values (null, ${maximoRede}, null, ${"(SELECT MAX(idServidor) AS ultimoIdServidor FROM servidor)"}, 4);
  `;


  console.log("Executando as instruções SQL:");

  console.log("Instrução 1:\n" + instrucaoParametro1);
  await database.executar(instrucaoParametro1);


  console.log("Instrução 2:\n" + instrucaoParametro2);
  await database.executar(instrucaoParametro2);

  console.log("Instrução 3:\n" + instrucaoParametro3);
  await database.executar(instrucaoParametro3);

  console.log("Instrução 4:\n" + instrucaoParametro4);
  await database.executar(instrucaoParametro4);

  
}

async function alterarDadosServidor(
  nomeServidor,
  maximoCPU,
  minimoCPU,
  maximoRAM,
  minimoRAM,
  maximoDisco,
  maximoRede,
  idServidor
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  console.log(idServidor)
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

  var instrucaoParametro1 = `
    UPDATE parametroalerta SET maximo = ${maximoCPU}, minimo = ${minimoCPU} where fkServidor = ${idServidor} and fkComponente = 1;
    `;

  var instrucaoParametro2 = `
    UPDATE parametroalerta SET maximo = ${maximoRAM}, minimo = ${minimoRAM} where fkServidor = ${idServidor} and fkComponente = 2;
    `;

  var instrucaoParametro3 = `
    UPDATE parametroalerta SET maximo = ${maximoDisco} where fkServidor = ${idServidor} and fkComponente = 3;
    `;

  var instrucaoParametro4 = `
    UPDATE parametroalerta SET maximo = ${maximoRede} where fkServidor = ${idServidor} and fkComponente = 4;
    `;

    var instrucaoParametro5 = `
    UPDATE servidor SET nome = "${nomeServidor}" where idServidor = ${idServidor};
    `;


  console.log("Executando as instruções SQL:");

  console.log("Instrução 1:\n" + instrucaoParametro1);
  await database.executar(instrucaoParametro1);


  console.log("Instrução 2:\n" + instrucaoParametro2);
  await database.executar(instrucaoParametro2);

  console.log("Instrução 3:\n" + instrucaoParametro3);
  await database.executar(instrucaoParametro3);

  console.log("Instrução 4:\n" + instrucaoParametro4);
  await database.executar(instrucaoParametro4);

  console.log("Instrução 4:\n" + instrucaoParametro5);
  await database.executar(instrucaoParametro5);

  
}

async function excluirServidor(
  idServidor
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao1 = `        
  delete from parametroalerta where fkServidor = ${idServidor};`;
      
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);

  var instrucao2 = `        
  delete from servidor where idServidor = ${idServidor};`;
  console.log("Executando a instrução SQL: \n" + instrucao2);
  await database.executar(instrucao2);

}

async function alterarStatusServidor(
  idServidor
) {
  console.log(
    "ACESSEI O USUARIO MODEL do alterar \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  const verificaStatus = `
    select fkStatusServ from servidor where idServidor = '${idServidor}';
    `;
  const resultadoStatus = await database.executar(verificaStatus);
  console.log(resultadoStatus[0].fkStatusServ)
  console.log(resultadoStatus[0].fkStatusServ)
  console.log(resultadoStatus[0].fkStatusServ)
  console.log(resultadoStatus[0].fkStatusServ)
  console.log(resultadoStatus[0].fkStatusServ)
  console.log(resultadoStatus[0].fkStatusServ)
  console.log(resultadoStatus[0].fkStatusServ)

  var instrucaoAtivo = `        
  UPDATE servidor SET fkStatusServ = 3 WHERE idServidor = ${idServidor};`;

  var instrucaoEmManutencao = `        
  UPDATE servidor SET fkStatusServ = 1 WHERE idServidor = ${idServidor};`;


  if (resultadoStatus[0].fkStatusServ == 3) {
    console.log("Executando a instrução SQL 1: \n" + instrucaoEmManutencao);
    await database.executar(instrucaoEmManutencao);
  }else if(resultadoStatus[0].fkStatusServ == 1){
    console.log("Executando a instrução SQL 2: \n" + instrucaoAtivo);
    await database.executar(instrucaoAtivo);
  }else if(resultadoStatus[0].fkStatusServ == 2){
    throw new Error("Habilite o servidor para poder alterar seu status");
  }
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.



}

function buscarUsuarios(idEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idEmpresa
  );
  var instrucao = `
  select usuario.idUsuario, usuario.nome, usuario.sobrenome, usuario.email, cargo.nome as cargo, endereco.cidade, endereco.estado, usuario.telefone, usuario.ativo from usuario join empresa on fkEmpresa = idEmpresa join cargo on usuario.fkCargo = cargo.idCargo join endereco on empresa.fkEndereco = endereco.idEndereco where idEmpresa = ${idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

async function alterarStatusUsuario(
  idUsuario
) {
  console.log(
    "ACESSEI O USUARIO MODEL do alterar \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  const verificaStatus = `
    select ativo from usuario where idUsuario = '${idUsuario}';
    `;
  const resultadoStatus = await database.executar(verificaStatus);
  console.log(resultadoStatus[0].ativo)
  console.log(resultadoStatus[0].ativo)
  console.log(resultadoStatus[0].ativo)
  console.log(resultadoStatus[0].ativo)
  console.log(resultadoStatus[0].ativo)
  console.log(resultadoStatus[0].ativo)
  console.log(resultadoStatus[0].ativo)

  var instrucaoAtivo = `        
  UPDATE usuario SET ativo = 0 where idUsuario = ${idUsuario};`;

  var instrucaoEmManutencao = `        
  UPDATE usuario SET ativo = 1 where idUsuario = ${idUsuario};`;


  if (resultadoStatus[0].ativo == 0) {
    console.log("Executando a instrução SQL 1: \n" + instrucaoEmManutencao);
    await database.executar(instrucaoEmManutencao);
  }else if(resultadoStatus[0].ativo == 1){
    console.log("Executando a instrução SQL 2: \n" + instrucaoAtivo);
    await database.executar(instrucaoAtivo);
  }
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.



}


module.exports = {
  autenticar,
  cadastrar,
  redefinir,
  alterarDados,
  excluirConta,
  reativarConta,
  buscarServidores,
  buscarParametros,
  cadastrarServidor,
  cadastrarUsuario,
  excluirServidor,
  alterarStatusServidor,
  alterarDadosServidor,
  buscarUsuarios,
  alterarStatusUsuario
};
