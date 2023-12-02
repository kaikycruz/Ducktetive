var database = require("../database/config");

function buscarPorId(id) {
  query = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `SELECT * FROM empresa WHERE id = @'${id}';`

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `select * from empresa where id = '${id}'`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
   

  return database.executar(query);
}

function listar() {
  query = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `select * from empresa`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `select * from empresa`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
   

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  query = "";
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `select * from empresa where cnpj = '${cnpj}'`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `select * from empresa where cnpj = '${cnpj}'`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
   
  return database.executar(query);
}

function cadastrar(razaoSocial, cnpj) {
  query = "";
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
   

  return database.executar(query);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
