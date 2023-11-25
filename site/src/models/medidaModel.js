var database = require("../database/config");

function buscarUltimasMedidas(idServidor, limite_linhas) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idMetrica}
                    order by id desc`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `select c.nome,
    m.valor,
    DATE_FORMAT(datahora,'%H:%i:%s') as momento_grafico,
    m.datahora
    from  metrica m join configuracao on fkConfigComponente = fkComponente
    join servidor s on fkConfigServidor = fkServidor
    join componente c on fkComponente = idComponente
    where s.idServidor = 8 order by s.idServidor desc limit ${limite_linhas};`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idServidor) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `select c.nome,
      m.valor,
      DATE_FORMAT(datahora,'%H:%i:%s') as momento_grafico,
      m.datahora
      from  metrica m join configuracao on fkConfigComponente = fkComponente
      join servidor s on fkConfigServidor = fkServidor
      join componente c on fkComponente = idComponente
      where s.idServidor = 8 order by s.idServidor limit 1;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
};
