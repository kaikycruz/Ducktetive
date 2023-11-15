// Dados CPU

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function obterDadosGraficoCPU(idMetrica) {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/medidas/ultimas/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          resposta.reverse();

          plotarGraficoCPU(resposta, idMetrica);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// ConfigCPUura o gráfico (cores, tipo, etc), materializa-o na página e,
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGraficoCPU(resposta, idMetrica) {
  console.log("iniciando plotagem do gráfico...");

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [
      {
        label: "Core 1",
        data: [20, 30, 10, 24, 23, 45, 50],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "CPU",
        data: [],
        fill: false,
        borderColor: "rgb(199, 52, 52)",
        tension: 0.1,
      },
    ],
  };

  console.log("----------------------------------------------");
  console.log(
    'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
  );
  console.log(resposta);

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    labels.push(registro.momento_grafico);
    dados.datasets[0].data.push(registro.valor);
    // dados.datasets[1].data.push(registro.temperatura);
  }

  console.log("----------------------------------------------");
  console.log("O gráfico será plotado com os respectivos valores:");
  console.log("Labels:");
  console.log(labels);
  console.log("Dados:");
  console.log(dados.datasets);
  console.log("----------------------------------------------");

  // Criando estrutura para plotar gráfico - configCPU
  const configCPU = {
    type: "line",
    data: dados,
  };

  // Adicionando gráfico criado em div na tela
  let myChartCPU = new Chart(document.getElementById(`uso_cpu`), configCPU);

  setTimeout(() => atualizarGraficoCPU(idMetrica, dados, myChartCPU), 2000);
}

// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas,

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGraficoCPU(idMetrica, dados, myChartCPU) {
  fetch(`/medidas/tempo-real/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          obterdados(idMetrica);
          // alertar(novoRegistro, idMetrica);
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
          console.log(`Dados atuais do gráfico:`);
          console.log(dados);

          if (
            novoRegistro[0].momento_grafico ==
            dados.labels[dados.labels.length - 1]
          ) {
            console.log(
              "---------------------------------------------------------------"
            );
            console.log(
              "Como não há dados novos para captura, o gráfico não atualizará."
            );
            console.log("Horário do novo dado capturado:");
            console.log(novoRegistro[0].momento_grafico);
            console.log("Horário do último dado capturado:");
            console.log(dados.labels[dados.labels.length - 1]);
            console.log(
              "---------------------------------------------------------------"
            );
          } else {
            // tirando e colocando valores no gráfico
            dados.labels.shift(); // apagar o primeiro
            dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

            dados.datasets[0].data.shift(); // apagar o primeiro de umidade
            dados.datasets[0].data.push(novoRegistro[0].valor); // incluir uma nova medida de umidade

            //  dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
            //  dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

            myChartCPU.update();
          }

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarGraficoCPU(idMetrica, dados, myChartCPU),
            2000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarGraficoCPU(idMetrica, dados, myChartCPU),
          2000
        );
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// Graficos RAM deitado e linha

function obterDadosGraficoRAM(idMetrica) {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/medidas/ultimas/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          resposta.reverse();

          plotarGraficoRAM(resposta, idMetrica);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// ConfigCPUura o gráfico (cores, tipo, etc), materializa-o na página e,
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGraficoRAM(resposta, idMetrica) {
  console.log("iniciando plotagem do gráfico...");

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [
      {
        label: "Core 1",
        data: [20, 30, 10, 24, 23, 45, 50],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "RAM",
        data: [],
        fill: false,
        borderColor: "rgb(199, 52, 52)",
        tension: 0.1,
      },
    ],
  };

  console.log("----------------------------------------------");
  console.log(
    'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
  );
  console.log(resposta);

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    labels.push(registro.momento_grafico);
    dados.datasets[0].data.push(registro.valor);
    // dados.datasets[1].data.push(registro.temperatura);
  }

  console.log("----------------------------------------------");
  console.log("O gráfico será plotado com os respectivos valores:");
  console.log("Labels:");
  console.log(labels);
  console.log("Dados:");
  console.log(dados.datasets);
  console.log("----------------------------------------------");

  // Criando estrutura para plotar gráfico - configCPU
  const configRAMdeitada = {
    type: "bar",
    data: dados,
    options: {
      plugins: {
        legend: {
          display: false, // Remove a legenda
        },
      },
      scales: {
        x: {
          display: false, // Remove os rótulos do eixo X
        },
        y: {
          display: false, // Remove os rótulos do eixo Y
        },
      },
      indexAxis: "y", // Mudança para o eixo y para sobrepor as barras
      barPercentage: -4, // Ajuste para sobrepor as barras
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  };

  // Adicionando gráfico criado em div na tela
  let myChartRAMdeitada = new Chart(
    document.getElementById(`uso_ramBarra`),
    configRAMdeitada
  );

  setTimeout(
    () => atualizarGraficoRAM(idMetrica, dados, myChartRAMdeitada),
    2000
  );
}

// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas,

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGraficoRAM(idMetrica, dados, myChartRAMdeitada) {
  fetch(`/medidas/tempo-real/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          obterdados(idMetrica);
          // alertar(novoRegistro, idMetrica);
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
          console.log(`Dados atuais do gráfico:`);
          console.log(dados);

          if (
            novoRegistro[0].momento_grafico ==
            dados.labels[dados.labels.length - 1]
          ) {
            console.log(
              "---------------------------------------------------------------"
            );
            console.log(
              "Como não há dados novos para captura, o gráfico não atualizará."
            );
            console.log("Horário do novo dado capturado:");
            console.log(novoRegistro[0].momento_grafico);
            console.log("Horário do último dado capturado:");
            console.log(dados.labels[dados.labels.length - 1]);
            console.log(
              "---------------------------------------------------------------"
            );
          } else {
            // tirando e colocando valores no gráfico
            dados.labels.shift(); // apagar o primeiro
            dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

            dados.datasets[0].data.shift(); // apagar o primeiro de umidade
            dados.datasets[0].data.push(novoRegistro[0].valor); // incluir uma nova medida de umidade

            //  dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
            //  dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

            myChartRAMdeitada.update();
          }

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarGraficoCPU(idMetrica, dados, myChartRAMdeitada),
            2000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarGraficoCPU(idMetrica, dados, myChartRAMdeitada),
          2000
        );
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// ram linha

function obterDadosGraficoRAMlinha(idMetrica) {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/medidas/ultimas/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          resposta.reverse();

          plotarGraficoRAMlinha(resposta, idMetrica);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// ConfigCPUura o gráfico (cores, tipo, etc), materializa-o na página e,
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGraficoRAMlinha(resposta, idMetrica) {
  console.log("iniciando plotagem do gráfico...");

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [
      {
        label: "Core 1",
        data: [20, 30, 10, 24, 23, 45, 50],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "RAM",
        data: [],
        fill: false,
        borderColor: "rgb(199, 52, 52)",
        tension: 0.1,
      },
    ],
  };

  console.log("----------------------------------------------");
  console.log(
    'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
  );
  console.log(resposta);

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    labels.push(registro.momento_grafico);
    dados.datasets[0].data.push(registro.valor);
    // dados.datasets[1].data.push(registro.temperatura);
  }

  console.log("----------------------------------------------");
  console.log("O gráfico será plotado com os respectivos valores:");
  console.log("Labels:");
  console.log(labels);
  console.log("Dados:");
  console.log(dados.datasets);
  console.log("----------------------------------------------");

  // Criando estrutura para plotar gráfico - configCPU
  const configRAMlinha = {
    type: "line",
    data: dados,
  };

  // Adicionando gráfico criado em div na tela
  let myChartRAMlinha = new Chart(
    document.getElementById(`uso_ramLinha`),
    configRAMlinha
  );

  setTimeout(
    () => atualizarGraficoRAMlinha(idMetrica, dados, myChartRAMlinha),
    2000
  );
}

// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas,

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGraficoRAMlinha(idMetrica, dados, myChartRAMlinha) {
  fetch(`/medidas/tempo-real/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          obterdados(idMetrica);
          // alertar(novoRegistro, idMetrica);
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
          console.log(`Dados atuais do gráfico:`);
          console.log(dados);

          if (
            novoRegistro[0].momento_grafico ==
            dados.labels[dados.labels.length - 1]
          ) {
            console.log(
              "---------------------------------------------------------------"
            );
            console.log(
              "Como não há dados novos para captura, o gráfico não atualizará."
            );
            console.log("Horário do novo dado capturado:");
            console.log(novoRegistro[0].momento_grafico);
            console.log("Horário do último dado capturado:");
            console.log(dados.labels[dados.labels.length - 1]);
            console.log(
              "---------------------------------------------------------------"
            );
          } else {
            // tirando e colocando valores no gráfico
            dados.labels.shift(); // apagar o primeiro
            dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

            dados.datasets[0].data.shift(); // apagar o primeiro de umidade
            dados.datasets[0].data.push(novoRegistro[0].valor); // incluir uma nova medida de umidade

            //  dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
            //  dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

            myChartRAMlinha.update();
          }

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarGraficoCPU(idMetrica, dados, myChartRAMlinha),
            2000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarGraficoCPU(idMetrica, dados, myChartRAMlinha),
          2000
        );
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}


// grafico disco

function obterDadosGraficoDisco(idMetrica) {
    if (proximaAtualizacao != undefined) {
      clearTimeout(proximaAtualizacao);
    }
  
    fetch(`/medidas/ultimas/${idMetrica}`, { cache: "no-store" })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            resposta.reverse();
  
            plotarGraficoDisco(resposta, idMetrica);
          });
        } else {
          console.error("Nenhum dado encontrado ou erro na API");
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  }
  
  // Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
  // ConfigCPUura o gráfico (cores, tipo, etc), materializa-o na página e,
  // A função *plotarGrafico* também invoca a função *atualizarGrafico*
  function plotarGraficoDisco(resposta, idMetrica) {
    console.log("iniciando plotagem do gráfico...");
  
    // Criando estrutura para plotar gráfico - labels
    let labels = [];
  
    // Criando estrutura para plotar gráfico - dados
    let dados = {
      labels: labels,
      datasets: [
        {
          label: "Core 1",
          data: [20, 30, 10, 24, 23, 45, 50],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "RAM",
          data: [],
          fill: false,
          borderColor: "rgb(199, 52, 52)",
          tension: 0.1,
        },
      ],
    };
  
    console.log("----------------------------------------------");
    console.log(
      'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
    );
    console.log(resposta);
  
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      labels.push(registro.momento_grafico);
      dados.datasets[0].data.push(registro.valor);
      // dados.datasets[1].data.push(registro.temperatura);
    }
  
    console.log("----------------------------------------------");
    console.log("O gráfico será plotado com os respectivos valores:");
    console.log("Labels:");
    console.log(labels);
    console.log("Dados:");
    console.log(dados.datasets);
    console.log("----------------------------------------------");
  
    // Criando estrutura para plotar gráfico - configCPU
    const configDisco = {
      type: "line",
      data: dados,
    };
  
    // Adicionando gráfico criado em div na tela
    let myChartDisco= new Chart(
      document.getElementById(`uso_disco`),
      configDisco
    );
  
    setTimeout(
      () => atualizarGraficoRAMlinha(idMetrica, dados, myChartDisco),
      2000
    );
  }
  
  // Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
  // buscando a última medida inserida em tabela contendo as capturas,
  
  //     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
  //     Para ajustar o "select", ajuste o comando sql em src/models
  function atualizarGraficoRAMlinha(idMetrica, dados, myChartRAMlinha) {
    fetch(`/medidas/tempo-real/${idMetrica}`, { cache: "no-store" })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (novoRegistro) {
            obterdados(idMetrica);
            // alertar(novoRegistro, idMetrica);
            console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
            console.log(`Dados atuais do gráfico:`);
            console.log(dados);
  
            if (
              novoRegistro[0].momento_grafico ==
              dados.labels[dados.labels.length - 1]
            ) {
              console.log(
                "---------------------------------------------------------------"
              );
              console.log(
                "Como não há dados novos para captura, o gráfico não atualizará."
              );
              console.log("Horário do novo dado capturado:");
              console.log(novoRegistro[0].momento_grafico);
              console.log("Horário do último dado capturado:");
              console.log(dados.labels[dados.labels.length - 1]);
              console.log(
                "---------------------------------------------------------------"
              );
            } else {
              // tirando e colocando valores no gráfico
              dados.labels.shift(); // apagar o primeiro
              dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento
  
              dados.datasets[0].data.shift(); // apagar o primeiro de umidade
              dados.datasets[0].data.push(novoRegistro[0].valor); // incluir uma nova medida de umidade
  
              //  dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
              //  dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura
  
              myChartRAMlinha.update();
            }
  
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(
              () => atualizarGraficoCPU(idMetrica, dados, myChartRAMlinha),
              2000
            );
          });
        } else {
          console.error("Nenhum dado encontrado ou erro na API");
          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarGraficoCPU(idMetrica, dados, myChartRAMlinha),
            2000
          );
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  }
  