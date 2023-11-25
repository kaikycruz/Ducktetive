var database = require("../database/config");

function buscarUltimasMedidasCPU(idServidor) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `select top 7
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
    where s.idServidor = ${idServidor} AND c.nome = 'CPU' order by s.idServidor desc limit 7;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRAM(idServidor) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `select top 7
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
    where s.idServidor = ${idServidor} AND c.nome = 'RAM' order by s.idServidor desc limit 7;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDISCO(idServidor) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `select top 7
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
    where s.idServidor = ${idServidor} AND c.nome = 'DISCO' order by s.idServidor desc limit 7;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUltimasMedidasREDE(idServidor) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `select top 7
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idMetrica}
                    order by id desc`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `select c.nome,
    (m.valor / 100) as 'Porcentagem USO',
    (1 - (m.valor / 100)) as 'Resto',
    DATE_FORMAT(datahora,'%H:%i:%s') as momento_grafico
    from  metrica m join configuracao on fkConfigComponente = fkComponente
    join servidor s on fkConfigServidor = fkServidor
    join componente c on fkComponente = idComponente
    where s.idServidor = ${idServidor} and c.nome = 'REDE'
    order by m.valor asc limit 1;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}



function buscarMedidasEmTempoRealCPU(idServidor) {
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
      where s.idServidor = ${idServidor} AND c.nome = 'CPU' order by s.idServidor limit 1;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRAM(idServidor) {
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
      where s.idServidor = ${idServidor} AND c.nome = 'RAM' order by s.idServidor limit 1;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDISCO(idServidor) {
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
      where s.idServidor = ${idServidor} AND c.nome = 'DISCO' order by s.idServidor limit 1;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealREDE(idServidor) {
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
    (m.valor / 100) as 'Porcentagem USO',
    (1 - (m.valor / 100)) as 'Resto',
    DATE_FORMAT(datahora,'%H:%i:%s') as momento_grafico
    from  metrica m join configuracao on fkConfigComponente = fkComponente
    join servidor s on fkConfigServidor = fkServidor
    join componente c on fkComponente = idComponente
    where s.idServidor = ${idServidor} and c.nome = 'REDE'
    order by m.valor asc limit 1;`;
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
  buscarUltimasMedidasCPU,
  buscarUltimasMedidasRAM,
  buscarUltimasMedidasDISCO,
  buscarUltimasMedidasREDE,
  buscarMedidasEmTempoRealCPU,
  buscarMedidasEmTempoRealRAM,
  buscarMedidasEmTempoRealDISCO,
  buscarMedidasEmTempoRealREDE,
};
