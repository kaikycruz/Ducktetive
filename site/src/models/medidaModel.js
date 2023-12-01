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
    instrucaoSql = `SELECT
    c.nome,
    configuracao.cpuLogica,
    configuracao.cpuFisica,
    configuracao.nomeRede,
    m.valor AS valor,
    DATE_FORMAT(datahora, '%H:%i:%s') AS momento_grafico
FROM
    metrica m
JOIN configuracao ON m.fkConfigComponente = configuracao.fkComponente
JOIN servidor s ON m.fkConfigServidor = s.idServidor
JOIN componente c ON configuracao.fkComponente = c.idComponente
WHERE
    s.idServidor = ${idServidor}
    AND c.nome = 'CPU'
ORDER BY
    datahora DESC
LIMIT 7;`;
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
    instrucaoSql = `  SELECT
    c.nome,
    configuracao.cpuLogica,
    configuracao.cpuFisica,
    configuracao.nomeRede,
    FORMAT(configuracao.tamanhoTotal/ 1000000000, 2) as total,
    FORMAT(m.valor / 1000000000, 2) AS valor,
    DATE_FORMAT(datahora, '%H:%i:%s') AS momento_grafico
FROM
    metrica m
JOIN configuracao ON m.fkConfigComponente = configuracao.fkComponente
JOIN servidor s ON m.fkConfigServidor = s.idServidor
JOIN componente c ON configuracao.fkComponente = c.idComponente
WHERE
    s.idServidor = ${idServidor}
    AND c.nome = 'RAM'
ORDER BY
    datahora DESC
LIMIT 7;`;
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
    instrucaoSql = ` SELECT
    c.nome,
    configuracao.cpuLogica,
    configuracao.cpuFisica,
    configuracao.nomeRede,
    FORMAT(configuracao.tamanhoTotal/ 1000000000, 2) as total,
    FORMAT(m.valor / 10000000000, 2) AS valor,
    DATE_FORMAT(datahora, '%H:%i:%s') AS momento_grafico
FROM
    metrica m
JOIN configuracao ON m.fkConfigComponente = configuracao.fkComponente
JOIN servidor s ON m.fkConfigServidor = s.idServidor
JOIN componente c ON configuracao.fkComponente = c.idComponente
WHERE
    s.idServidor = ${idServidor}
    AND c.nome = 'DISCO'
ORDER BY
    datahora desc
LIMIT 7;`;
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
    instrucaoSql = `   SELECT
    c.nome,
    configuracao.cpuLogica,
    configuracao.cpuFisica,
    configuracao.nomeRede,
    (select (REPLACE((select format(m.valor / 1000000,0)), ',', '.'))) AS valor,
    (select (REPLACE((select format(m.valor / 1000000,0)) + 200, ',', '.'))) AS valorTeste,
    DATE_FORMAT(datahora, '%H:%i:%s') AS momento_grafico
FROM
    metrica m
JOIN configuracao ON m.fkConfigComponente = configuracao.fkComponente
JOIN servidor s ON m.fkConfigServidor = s.idServidor
JOIN componente c ON configuracao.fkComponente = c.idComponente
WHERE
    s.idServidor = ${idServidor}
    AND c.nome = 'REDE'
ORDER BY
    datahora DESC
LIMIT 7;`;
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
    instrucaoSql = ` SELECT
    c.nome,
    configuracao.cpuLogica,
    configuracao.cpuFisica,
    configuracao.nomeRede,
    m.valor AS valor,
    DATE_FORMAT(datahora, '%H:%i:%s') AS momento_grafico
FROM
    metrica m
JOIN configuracao ON m.fkConfigComponente = configuracao.fkComponente
JOIN servidor s ON m.fkConfigServidor = s.idServidor
JOIN componente c ON configuracao.fkComponente = c.idComponente
WHERE
    s.idServidor = ${idServidor}
    AND c.nome = 'cpu'
ORDER BY
    datahora desc
LIMIT 1;`;
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
    instrucaoSql = ` SELECT
    c.nome,
    configuracao.cpuLogica,
    configuracao.cpuFisica,
    configuracao.nomeRede,
    FORMAT(configuracao.tamanhoTotal/ 1000000000, 2) as total,
    FORMAT(m.valor / 1000000000, 2) AS valor,
    DATE_FORMAT(datahora, '%H:%i:%s') AS momento_grafico
FROM
    metrica m
JOIN configuracao ON m.fkConfigComponente = configuracao.fkComponente
JOIN servidor s ON m.fkConfigServidor = s.idServidor
JOIN componente c ON configuracao.fkComponente = c.idComponente
WHERE
    s.idServidor = ${idServidor}
    AND c.nome = 'ram'
ORDER BY
    datahora desc
LIMIT 1;`;
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
    instrucaoSql = ` SELECT
    c.nome,
    configuracao.cpuLogica,
    configuracao.cpuFisica,
    configuracao.nomeRede,
    FORMAT(configuracao.tamanhoTotal/ 1000000000, 2) as total,
    FORMAT(m.valor / 10000000000, 2) AS valor,
    DATE_FORMAT(datahora, '%H:%i:%s') AS momento_grafico
FROM
    metrica m
JOIN configuracao ON m.fkConfigComponente = configuracao.fkComponente
JOIN servidor s ON m.fkConfigServidor = s.idServidor
JOIN componente c ON configuracao.fkComponente = c.idComponente
WHERE
    s.idServidor = ${idServidor}
    AND c.nome = 'DISCO'
ORDER BY
    datahora desc
LIMIT 1;`;
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
    instrucaoSql = `   SELECT
    c.nome,
    configuracao.cpuLogica,
    configuracao.cpuFisica,
    configuracao.nomeRede,
    (select (REPLACE((select format(m.valor / 1000000,0)), ',', '.'))) AS valor,
    (select (REPLACE((select format(m.valor / 1000000,0)) + 200, ',', '.'))) AS valorTeste,
    DATE_FORMAT(datahora, '%H:%i:%s') AS momento_grafico
FROM
    metrica m
JOIN configuracao ON m.fkConfigComponente = configuracao.fkComponente
JOIN servidor s ON m.fkConfigServidor = s.idServidor
JOIN componente c ON configuracao.fkComponente = c.idComponente
WHERE
    s.idServidor = ${idServidor}
    AND c.nome = 'REDE'
ORDER BY
    datahora DESC
LIMIT 7;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarKPIsCPU(idServidor) {
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
    instrucaoSql = `select
    m.valor as 'Percentual USO'
    from  metrica m join configuracao on fkConfigComponente = fkComponente
    join servidor s on fkConfigServidor = fkServidor
    join componente c on fkComponente = idComponente
    where configuracao.fkServidor = ${idServidor} and c.nome = 'CPU'
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
  buscarKPIsCPU,
};
