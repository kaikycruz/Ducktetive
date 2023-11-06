var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
        SELECT idUsuario, primeiro_nome, sobrenome, telefone, email, cargo, resposta_seguranca, razao_social, nome_fantasia, nome_fantasia, cnpj, logradouro, numero, bairro, cep, complemento, cidade, estado from usuario join empresa on fkEmpresa = idEmpresa join endereco on fkEndereco = idEndereco where usuario.email = '${email}' and senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function alterarUsuario(nome, sobrenome, email, perguntaDeSeguranca) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    nome,
    sobrenome,
    email,
    perguntaDeSeguranca
  );
  var instrucao = `
        
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
         INSERT INTO Empresa (razao_social, nome_fantasia, cnpj, fkEndereco) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', ${"(SELECT COUNT(*) AS total_cadastros FROM Endereco)"});
       
    `;
  console.log("Executando a instrução SQL: \n" + instrucao2);
  await database.executar(instrucao2);

  var instrucao3 = `
        INSERT INTO Usuario (primeiro_nome, sobrenome, telefone, email, senha, cargo, resposta_seguranca, fkPergunta, fkEmpresa) VALUES ('${nomeUsuario}', '${sobrenomeUsuario}', '${telefone}','${email}','${senha}','${cargo}','${perguntaDeSeguranca}','${opcoesPerguntaDeSeguranca}', ${"(SELECT COUNT(*) AS total_cadastros FROM Empresa)"});
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

module.exports = {
  autenticar,
  cadastrar,
  alterarUsuario,
};
