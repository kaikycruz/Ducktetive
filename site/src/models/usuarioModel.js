var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  instrucao = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
   instrucao = `SELECT
   idUsuario,
   CAST('' AS VARBINARY) AS fotoPerfil, -- A função TO_BASE64 não é diretamente suportada no SQL Server
   usuario.nome AS primeiro_nome,
   sobrenome,
   telefone,
   email,
   resposta_seguranca,
   cargo.nome AS nomeCargo,
   idEmpresa,
   razao_social,
   nome_fantasia,
   cnpj,
   idEndereco,
   logradouro,
   numero,
   bairro,
   cep,
   complemento,
   cidade,
   estado,
   ativo
FROM
   usuario
JOIN
   empresa ON fkEmpresa = idEmpresa
JOIN
   endereco ON fkEndereco = idEndereco
JOIN
   cargo ON  fkCargo = idCargo
WHERE
   usuario.email = '${email}'
   AND senha = '${senha}';`

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
   instrucao = `
      SELECT idUsuario, TO_BASE64(usuario.fotoPerfil) as fotoPerfil, usuario.nome as primeiro_nome, sobrenome, telefone, email, resposta_seguranca, cargo.nome as nomeCargo, idEmpresa, razao_social, nome_fantasia, nome_fantasia, cnpj, idEndereco, logradouro, numero, bairro, cep, complemento, cidade, estado, ativo from usuario join empresa on fkEmpresa = idEmpresa join endereco on fkEndereco = idEndereco join cargo on  fkCargo = idCargo where usuario.email = '${email}' and senha = '${senha}';
    `;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
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

  instrucao1 = "";
  instrucao2 = "";
  instrucao3 = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
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

  instrucao1 = `
        INSERT INTO Endereco (logradouro, numero, bairro, cep, complemento, cidade, estado) VALUES ('${endereco}', '${numero}', '${bairro}', '${cep}', '${complemento}', '${cidade}', '${estado}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);

   instrucao2 = `
         INSERT INTO Empresa (razao_social, nome_fantasia, cnpj, fkEndereco) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', ${"(SELECT MAX(idEndereco) AS ultimoIdEndereco FROM endereco)"});
       
    `;
  console.log("Executando a instrução SQL: \n" + instrucao2);
  await database.executar(instrucao2);

   instrucao3 = `
        INSERT INTO Usuario (nome, sobrenome, telefone, email, senha, resposta_seguranca, fkPergunta, fkCargo, fkEmpresa) VALUES ('${nomeUsuario}', '${sobrenomeUsuario}', '${telefone}','${email}','${senha}','${perguntaDeSeguranca}','${opcoesPerguntaDeSeguranca}', '${cargo}', ${"(SELECT MAX(idEndereco) AS ultimoIdEndereco FROM endereco)"});
    `;

   console.log("Executando a instrução SQL: \n" + instrucao3);
   await database.executar(instrucao3);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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
   instrucao1 = `
        INSERT INTO Endereco (logradouro, numero, bairro, cep, complemento, cidade, estado) VALUES ('${endereco}', '${numero}', '${bairro}', '${cep}', '${complemento}', '${cidade}', '${estado}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);

   instrucao2 = `
         INSERT INTO Empresa (razao_social, nome_fantasia, cnpj, fkEndereco) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', ${"(SELECT MAX(idEndereco) AS ultimoIdEndereco FROM endereco)"});
       
    `;
  console.log("Executando a instrução SQL: \n" + instrucao2);
  await database.executar(instrucao2);

   instrucao3 = `
        INSERT INTO Usuario (nome, sobrenome, telefone, email, senha, resposta_seguranca, fkPergunta, fkCargo, fkEmpresa) VALUES ('${nomeUsuario}', '${sobrenomeUsuario}', '${telefone}','${email}','${senha}','${perguntaDeSeguranca}','${opcoesPerguntaDeSeguranca}', '${cargo}', ${"(SELECT MAX(idEndereco) AS ultimoIdEndereco FROM endereco)"});
    `;

  console.log("Executando a instrução SQL: \n" + instrucao3);
  await database.executar(instrucao3);
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  
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

  instrucao3 = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
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

     instrucao3 = `
     INSERT INTO Usuario (nome, sobrenome, telefone, email, senha, resposta_seguranca, fkPergunta, fkCargo, fkEmpresa)
     VALUES ('${nomeUsuario}', '${sobrenomeUsuario}', NULL, '${email}', '${senha}', '${perguntaDeSeguranca}', '${opcoesPerguntaDeSeguranca}', '${cargo}', ${idEmpresa});
`;
    console.log("Executando a instrução SQL: \n" + instrucao3);
    await database.executar(instrucao3);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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

     instrucao3 = `
       INSERT INTO Usuario (nome, sobrenome, telefone, email, senha, resposta_seguranca, fkPergunta, fkCargo, fkEmpresa) VALUES ('${nomeUsuario}', '${sobrenomeUsuario}', 'null','${email}','${senha}','${perguntaDeSeguranca}','${opcoesPerguntaDeSeguranca}', '${cargo}', ${idEmpresa});
`;
    console.log("Executando a instrução SQL: \n" + instrucao3);
    await database.executar(instrucao3);
   } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

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

  instrucao1 = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    const verificaUsuario = `
    SELECT *
    FROM usuario
    WHERE email = '${email}' AND resposta_seguranca = '${perguntaDeSeguranca}' AND fkPergunta = ${opcoesPerguntaDeSeguranca};
    `;
    const resultadoUsuario = await database.executar(verificaUsuario);

    if (resultadoUsuario.length < 1) {
      throw new Error("Ocorreu um erro");
   }

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
   instrucao1 = `
   UPDATE usuario
   SET senha = '${novaSenha}'
   FROM usuario
   JOIN (
       SELECT idUsuario
       FROM usuario
       WHERE email = '${email}' AND resposta_seguranca = '${perguntaDeSeguranca}' AND fkPergunta = ${opcoesPerguntaDeSeguranca}
   ) subquery ON usuario.idUsuario = subquery.idUsuario;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    const verificaUsuario = `
        select * from usuario where email = '${email}' and resposta_seguranca = '${perguntaDeSeguranca}' and fkPergunta = '${opcoesPerguntaDeSeguranca}';
    `;
    const resultadoUsuario = await database.executar(verificaUsuario);

    if (resultadoUsuario.length < 1) {
      throw new Error("Ocorreu um erro");
   }

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
   instrucao1 = `
        UPDATE usuario JOIN ( SELECT idUsuario FROM usuario WHERE email = '${email}' AND resposta_seguranca = '${perguntaDeSeguranca}' AND fkPergunta = '${opcoesPerguntaDeSeguranca}' ) subquery ON usuario.idUsuario = subquery.idUsuario SET usuario.senha = '${novaSenha}';

    `;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  
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
  opcoesPerguntaDeSeguranca,
  fotoUsuario
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  instrucao1 = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucao1 = `        
    BEGIN TRANSACTION;

-- Atualizar a tabela Usuario
UPDATE usuario
SET
    nome = '${nomeUsuario}',
    sobrenome = '${sobrenomeUsuario}',
    telefone = '${telefone}',
    email = '${email}',
    resposta_seguranca = '${perguntaDeSeguranca}',
    fkPergunta = ${opcoesPerguntaDeSeguranca},
    fotoPerfil = null
WHERE
    idUsuario = ${idUsuario};

-- Atualizar a tabela Empresa
UPDATE empresa
SET
    razao_social = '${razaoSocial}',
    nome_fantasia = '${nomeFantasia}',
    cnpj = '${cnpj}'
FROM
    empresa AS emp
JOIN usuario AS u ON u.fkEmpresa = emp.idEmpresa
WHERE
    u.idUsuario = ${idUsuario};

-- Atualizar a tabela Endereco
UPDATE endereco
SET
    logradouro = '${endereco}',
    numero = ${numero},
    bairro = '${bairro}',
    cep = '${cep}',
    complemento = '${complemento}',
    cidade = '${cidade}',
    estado = '${estado}'
FROM
    endereco AS ende
JOIN empresa AS emp ON emp.fkEndereco = ende.idEndereco
JOIN usuario AS u ON u.fkEmpresa = emp.idEmpresa
WHERE
    u.idUsuario = ${idUsuario};

COMMIT;

    `;
console.log("Executando a instrução SQL: \n" + instrucao1);
await database.executar(instrucao1);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucao1 = `        
    UPDATE usuario u join empresa emp on u.fkEmpresa = emp.idEmpresa 
                      join endereco ende on emp.fkEndereco = ende.idEndereco
        set u.nome = '${nomeUsuario}',
          u.sobrenome = '${sobrenomeUsuario}',
          u.telefone = '${telefone}',
          u.email = '${email}',
          u.resposta_seguranca = '${perguntaDeSeguranca}',
          u.fkPergunta = ${opcoesPerguntaDeSeguranca},
          u.fotoPerfil = FROM_BASE64('${fotoUsuario}'),
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
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
   

}

async function excluirConta(
  idUsuario
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  instrucao1 = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucao1 = `UPDATE usuario
    SET ativo = 0
    WHERE idUsuario = ${idUsuario};`

    console.log("Executando a instrução SQL: \n" + instrucao1);
    await database.executar(instrucao1);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucao1 = `        
      UPDATE usuario SET ativo = 0 where idUsuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucao1);
    await database.executar(instrucao1);
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.

}

async function reativarConta(
  idUsuario
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  instrucao1 = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucao1 = `UPDATE usuario SET ativo = 1 where idUsuario = ${idUsuario};`

    console.log("Executando a instrução SQL: \n" + instrucao1);
    await database.executar(instrucao1);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucao1 = `        
       UPDATE usuario SET ativo = 1 where idUsuario = ${idUsuario};`;
    console.log("Executando a instrução SQL: \n" + instrucao1);
    await database.executar(instrucao1);

    console.log("Executando a instrução SQL: \n" + instrucao1);
    await database.executar(instrucao1);
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  

}

function buscarServidores(idEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idEmpresa
  );

  instrucao = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
     instrucao = `SELECT empresa.idEmpresa, servidor.idServidor, servidor.nome AS nomeServidor, endereco.logradouro, endereco.numero, endereco.cidade, statusservidor.nome AS statusServidor
    FROM servidor
    JOIN empresa ON servidor.fkEmpresa = empresa.idEmpresa
    JOIN endereco ON servidor.fkEndereco = endereco.idEndereco
    JOIN statusservidor ON servidor.fkStatusServ = statusservidor.idStatusServidor
    WHERE empresa.idEmpresa = ${idEmpresa};`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
     instrucao = `
    SELECT empresa.idEmpresa, servidor.idServidor, servidor.nome as nomeServidor, endereco.logradouro, endereco.numero, endereco.cidade, statusservidor.nome as statusServidor FROM servidor JOIN empresa ON servidor.fkEmpresa = empresa.idEmpresa JOIN endereco ON servidor.fkEndereco = endereco.idEndereco JOIN statusservidor on servidor.fkStatusServ = statusservidor.idStatusServidor WHERE empresa.idEmpresa = ${idEmpresa};
      `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }




 
}


function buscarParametroServidores(idServidor) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idServidor
  );

  instrucao = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucao = `
    SELECT 
    servidor.idServidor,
    servidor.nome AS nomeServidor,
    (SELECT maximo FROM ParametroAlerta 
        JOIN componente ON ParametroAlerta.fkComponente = componente.idComponente 
        WHERE ParametroAlerta.fkServidor = servidor.idServidor AND componente.nome = 'CPU') AS maximoCPU,
    (SELECT minimo FROM ParametroAlerta 
        JOIN componente ON ParametroAlerta.fkComponente = componente.idComponente 
        WHERE ParametroAlerta.fkServidor = servidor.idServidor AND componente.nome = 'CPU') AS minimoCPU,
    (SELECT maximo FROM ParametroAlerta 
        JOIN componente ON ParametroAlerta.fkComponente = componente.idComponente 
        WHERE ParametroAlerta.fkServidor = servidor.idServidor AND componente.nome = 'RAM') AS maximoRAM,
    (SELECT minimo FROM ParametroAlerta 
        JOIN componente ON ParametroAlerta.fkComponente = componente.idComponente 
        WHERE ParametroAlerta.fkServidor = servidor.idServidor AND componente.nome = 'RAM') AS minimoRAM,
    (SELECT maximo FROM ParametroAlerta 
        JOIN componente ON ParametroAlerta.fkComponente = componente.idComponente 
        WHERE ParametroAlerta.fkServidor = servidor.idServidor AND componente.nome = 'DISCO') AS maximoDISCO,
    (SELECT maximo FROM ParametroAlerta 
        JOIN componente ON ParametroAlerta.fkComponente = componente.idComponente 
        WHERE ParametroAlerta.fkServidor = servidor.idServidor AND componente.nome = 'REDE') AS maximoREDE
FROM servidor 
WHERE servidor.idServidor = ${idServidor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucao = `
    SELECT servidor.idServidor,
   servidor.nome as nomeServidor,
   (select maximo from ParametroAlerta join componente on ParametroAlerta.fkComponente = componente.idComponente join servidor on ParametroAlerta.fkServidor = servidor.idServidor where idServidor = ${idServidor} and componente.nome = 'CPU') as maximoCPU,
   (select minimo from ParametroAlerta join componente on ParametroAlerta.fkComponente = componente.idComponente join servidor on ParametroAlerta.fkServidor = servidor.idServidor where idServidor = ${idServidor} and componente.nome = 'CPU') as minimoCPU,
   (select maximo from ParametroAlerta join componente on ParametroAlerta.fkComponente = componente.idComponente join servidor on ParametroAlerta.fkServidor = servidor.idServidor where idServidor = ${idServidor} and componente.nome = 'RAM') as maximoRAM,
   (select minimo from ParametroAlerta join componente on ParametroAlerta.fkComponente = componente.idComponente join servidor on ParametroAlerta.fkServidor = servidor.idServidor where idServidor = ${idServidor} and componente.nome = 'RAM') as minimoRAM,
    (select maximo from ParametroAlerta join componente on ParametroAlerta.fkComponente = componente.idComponente join servidor on ParametroAlerta.fkServidor = servidor.idServidor where idServidor = ${idServidor} and componente.nome = 'DISCO') as maximoDISCO,
   (select maximo from ParametroAlerta join componente on ParametroAlerta.fkComponente = componente.idComponente join servidor on ParametroAlerta.fkServidor = servidor.idServidor where idServidor = ${idServidor} and componente.nome = 'REDE') as maximoREDE
   FROM servidor 
   WHERE servidor.idServidor = ${idServidor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  } 


   
}


function buscarParametros(idEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idEmpresa
  );

  instrucao = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucao = `SELECT 
    idParametro,
    nome,
    maximo,
    minimo 
FROM 
    parametroalerta 
JOIN 
    servidor ON idServidor = fkServidor 
WHERE 
    fkServidor = ${idEmpresa};`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucao = `
    SELECT idParametro, nome, maximo, minimo FROM parametroalerta join servidor on idServidor = fkServidor WHERE fkServidor = ${idEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
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

  instrucao1 = "";
  instrucaoParametro1 = "";
  instrucaoParametro2 = "";
  instrucaoParametro3 = "";
  instrucaoParametro4 = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucao1 = `
    INSERT INTO Servidor (nome, fkEmpresa, fkEndereco, fkStatusServ) VALUES ('${nomeServidor}', ${idEmpresa}, ${idEndereco}, 2);
    `;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.

  // caso de erro adicionar chaves
   instrucaoParametro1 = `
   INSERT INTO parametroAlerta (maximo, minimo, fkServidor, fkComponente)
   VALUES (${maximoCPU}, ${minimoCPU}, (SELECT MAX(idServidor) FROM servidor), 1);
  `;

   instrucaoParametro2 = `
   INSERT INTO parametroAlerta (maximo, minimo, fkServidor, fkComponente)
   VALUES ( ${maximoRAM}, ${minimoRAM}, (SELECT MAX(idServidor) FROM servidor), 2);
   
  `;

   instrucaoParametro3 = `
   INSERT INTO parametroAlerta (maximo, minimo, fkServidor, fkComponente)
   VALUES ( ${maximoDisco}, null, (SELECT MAX(idServidor) FROM servidor), 3);
  `;

   instrucaoParametro4 = `
   INSERT INTO parametroAlerta (maximo, minimo, fkServidor, fkComponente)
   VALUES ( ${maximoRede}, null, (SELECT MAX(idServidor) FROM servidor), 4);
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

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucao1 = `
        INSERT INTO Servidor (idServidor, nome, fkEmpresa, fkEndereco, fkStatusServ) VALUES (null, '${nomeServidor}', ${idEmpresa}, ${idEndereco}, 2);
    `;
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
   instrucaoParametro1 = `
    insert into parametroAlerta values (null, ${maximoCPU}, ${minimoCPU}, ${"(SELECT MAX(idServidor) AS ultimoIdServidor FROM servidor)"}, 1);
  `;

   instrucaoParametro2 = `
    insert into parametroAlerta values (null, ${maximoRAM}, ${minimoRAM}, ${"(SELECT MAX(idServidor) AS ultimoIdServidor FROM servidor)"}, 2);
  `;

   instrucaoParametro3 = `
    insert into parametroAlerta values (null, ${maximoDisco}, null, ${"(SELECT MAX(idServidor) AS ultimoIdServidor FROM servidor)"}, 3);
  `;

   instrucaoParametro4 = `
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
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

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


  instrucaoParametro1 = "";
  instrucaoParametro2 = "";
  instrucaoParametro3 = "";
  instrucaoParametro4 = "";
  instrucaoParametro5 = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoParametro1 = `
    UPDATE parametroalerta SET maximo = ${maximoCPU}, minimo = ${minimoCPU} where fkServidor = ${idServidor} and fkComponente = 1;
    `;

   instrucaoParametro2 = `
    UPDATE parametroalerta SET maximo = ${maximoRAM}, minimo = ${minimoRAM} where fkServidor = ${idServidor} and fkComponente = 2;
    `;

   instrucaoParametro3 = `
    UPDATE parametroalerta SET maximo = ${maximoDisco} where fkServidor = ${idServidor} and fkComponente = 3;
    `;

   instrucaoParametro4 = `
    UPDATE parametroalerta SET maximo = ${maximoRede} where fkServidor = ${idServidor} and fkComponente = 4;
    `;

     instrucaoParametro5 = `
    UPDATE servidor SET nome = '${nomeServidor}' where idServidor = ${idServidor};
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


  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoParametro1 = `
    UPDATE parametroalerta SET maximo = ${maximoCPU}, minimo = ${minimoCPU} where fkServidor = ${idServidor} and fkComponente = 1;
    `;

   instrucaoParametro2 = `
    UPDATE parametroalerta SET maximo = ${maximoRAM}, minimo = ${minimoRAM} where fkServidor = ${idServidor} and fkComponente = 2;
    `;

   instrucaoParametro3 = `
    UPDATE parametroalerta SET maximo = ${maximoDisco} where fkServidor = ${idServidor} and fkComponente = 3;
    `;

   instrucaoParametro4 = `
    UPDATE parametroalerta SET maximo = ${maximoRede} where fkServidor = ${idServidor} and fkComponente = 4;
    `;

     instrucaoParametro5 = `
    UPDATE servidor SET nome = '${nomeServidor}' where idServidor = ${idServidor};
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

  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
   


   
  
}

async function excluirServidor(
  idServidor
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  instrucao1 = "";
  instrucao2 = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucao1 = `        
  delete from parametroalerta where fkServidor = ${idServidor};`;
      
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);

   instrucao2 = `        
  DELETE FROM ParametroAlerta_Old WHERE fkServidor = ${idServidor};
`;
  
  console.log("Executando a instrução SQL: \n" + instrucao2);
  await database.executar(instrucao2);

  instrucao3 = `        
  delete from servidor where idServidor = ${idServidor};`;
  
  console.log("Executando a instrução SQL: \n" + instrucao3);
  await database.executar(instrucao3);


  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucao1 = `        
  delete from parametroalerta where fkServidor = ${idServidor};`;
      
  console.log("Executando a instrução SQL: \n" + instrucao1);
  await database.executar(instrucao1);

   instrucao2 = `        
  delete from servidor where idServidor = ${idServidor};`;
  console.log("Executando a instrução SQL: \n" + instrucao2);
  await database.executar(instrucao2);

  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
   
}

async function alterarStatusServidor(
  idServidor
) {
  console.log(
    "ACESSEI O USUARIO MODEL do alterar \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  instrucaoAtivo = "";
  instrucaoEmManutencao = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
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

   instrucaoAtivo = `        
  UPDATE servidor SET fkStatusServ = 3 WHERE idServidor = ${idServidor};`;

   instrucaoEmManutencao = `        
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

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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

   instrucaoAtivo = `        
  UPDATE servidor SET fkStatusServ = 3 WHERE idServidor = ${idServidor};`;

   instrucaoEmManutencao = `        
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
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }


 
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.



}

function buscarUsuarios(idEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idEmpresa
  );
    console.log("ENTREI")
    console.log("ENTREI")
    console.log("ENTREI")
    console.log("ENTREI")
    console.log("ENTREI")
    console.log("ENTREI")
    console.log("ENTREI")
    console.log("ENTREI")
    console.log("ENTREI")

  instrucao = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    
          instrucao = `SELECT
          usuario.idUsuario,
          usuario.nome,
          usuario.sobrenome,
          usuario.email,
          cargo.nome as cargo,
          endereco.cidade,
          endereco.estado,
          usuario.telefone,
          usuario.ativo
      FROM
          usuario
      JOIN
          empresa ON usuario.fkEmpresa = empresa.idEmpresa
      JOIN
          cargo ON usuario.fkCargo = cargo.idCargo
      JOIN
          endereco ON empresa.fkEndereco = endereco.idEndereco
      WHERE
          idEmpresa = ${idEmpresa};`
          console.log("Executando a instrução SQL: \n" + instrucao);
          return database.executar(instrucao);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucao = `
    select usuario.idUsuario, usuario.nome, usuario.sobrenome, usuario.email, cargo.nome as cargo, endereco.cidade, endereco.estado, usuario.telefone, usuario.ativo from usuario join empresa on fkEmpresa = idEmpresa join cargo on usuario.fkCargo = cargo.idCargo join endereco on empresa.fkEndereco = endereco.idEndereco where idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
}

async function alterarStatusUsuario(
  idUsuario
) {
  console.log(
    "ACESSEI O USUARIO MODEL do alterar \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );

  instrucaoAtivo = "";
  instrucaoEmManutencao = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
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

  instrucaoAtivo = `        
  UPDATE usuario SET ativo = 0 where idUsuario = ${idUsuario};`;

  instrucaoEmManutencao = `        
  UPDATE usuario SET ativo = 1 where idUsuario = ${idUsuario};`;


  if (resultadoStatus[0].ativo == 0) {
    console.log("Executando a instrução SQL 1: \n" + instrucaoEmManutencao);
    await database.executar(instrucaoEmManutencao);
  }else if(resultadoStatus[0].ativo == 1){
    console.log("Executando a instrução SQL 2: \n" + instrucaoAtivo);
    await database.executar(instrucaoAtivo);
  }

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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

  instrucaoAtivo = `        
  UPDATE usuario SET ativo = 0 where idUsuario = ${idUsuario};`;

  instrucaoEmManutencao = `        
  UPDATE usuario SET ativo = 1 where idUsuario = ${idUsuario};`;


  if (resultadoStatus[0].ativo == 0) {
    console.log("Executando a instrução SQL 1: \n" + instrucaoEmManutencao);
    await database.executar(instrucaoEmManutencao);
  }else if(resultadoStatus[0].ativo == 1){
    console.log("Executando a instrução SQL 2: \n" + instrucaoAtivo);
    await database.executar(instrucaoAtivo);
  }
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
}

function buscarProcessos(idServidor) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
  );

  instrucao = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucao = `
    SELECT
    processo.idProcesso,
    processo.pId,
    processo.nome,
    processo.consumoCPU,
    processo.consumoMem,
    servidor.nome as nomeServidor
FROM
    processo
JOIN
    servidor ON processo.fkServidor = servidor.idServidor
JOIN
    acaoProcesso ON acaoProcesso.idAcaoProcesso = processo.fkAcaoProcesso
WHERE
    idServidor = ${idServidor}
    AND acaoProcesso.nome != 'matar';
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucao = `
      select processo.idProcesso, processo.pId, processo.nome, processo.consumoCPU, processo.consumoMem, servidor.nome as nomeServidor from processo join servidor on processo.fkServidor = servidor.idServidor join acaoProcesso on acaoProcesso.idAcaoProcesso = processo.fkAcaoProcesso where idServidor = ${idServidor} and acaoProcesso.nome != 'matar';
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
   

 


   
}

async function alterarStatusprocesso(
  idAcaoProcesso,
  idProcesso,
  idServidor
) {
  console.log(
    "ACESSEI O USUARIO MODEL do alterar \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
  );
  console.log(idProcesso)
  console.log(idProcesso)
  console.log(idProcesso)
  console.log(idProcesso)
  console.log(idProcesso)
  console.log(idProcesso)
  console.log(idProcesso)
  console.log(idProcesso)
  

  instrucaoAtivo = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoAtivo = `        
  UPDATE processo set fkAcaoProcesso = ${idAcaoProcesso} where idProcesso = ${idProcesso} and fkServidor = ${idServidor};`;


  console.log("Executando a instrução SQL 1: \n" + instrucaoAtivo);
  await database.executar(instrucaoAtivo);

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoAtivo = `        
    UPDATE processo set fkAcaoProcesso = ${idAcaoProcesso} where idProcesso = ${idProcesso} and fkServidor = ${idServidor};`;
  
    console.log("Executando a instrução SQL 1: \n" + instrucaoAtivo);
    await database.executar(instrucaoAtivo);
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
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
  buscarParametroServidores,
  buscarParametros,
  cadastrarServidor,
  cadastrarUsuario,
  excluirServidor,
  alterarStatusServidor,
  alterarDadosServidor,
  buscarUsuarios,
  alterarStatusUsuario,
  buscarProcessos,
  alterarStatusprocesso
};
