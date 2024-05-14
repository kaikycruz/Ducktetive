

// Dados CPU

function obterDadosGraficoCPU(idMetrica) {
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

function atualizarGraficoCPU(idMetrica, dados, myChartCPU) {
  fetch(`/medidas/tempo-real/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          //obterdados(idMetrica);;
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

function atualizarGraficoRAM(idMetrica, dados, myChartRAMdeitada) {
  fetch(`/medidas/tempo-real/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          //obterdados(idMetrica);;
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
            () => atualizarGraficoRAM(idMetrica, dados, myChartRAMdeitada),
            2000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarGraficoRAM(idMetrica, dados, myChartRAMdeitada),
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

function atualizarGraficoRAMlinha(idMetrica, dados, myChartRAMlinha) {
  fetch(`/medidas/tempo-real/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          //obterdados(idMetrica);;
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
            () => atualizarGraficoRAMlinha(idMetrica, dados, myChartRAMlinha),
            2000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarGraficoRAMlinha(idMetrica, dados, myChartRAMlinha),
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
        label: "Disco",
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
  let myChartDisco = new Chart(
    document.getElementById(`uso_disco`),
    configDisco
  );

  setTimeout(() => atualizarGraficoDisco(idMetrica, dados, myChartDisco), 2000);
}

function atualizarGraficoDisco(idMetrica, dados, myChartDisco) {
  fetch(`/medidas/tempo-real/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          //obterdados(idMetrica);;
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

            myChartDisco.update();
          }

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarGraficoDisco(idMetrica, dados, myChartDisco),
            2000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarGraficoDisco(idMetrica, dados, myChartDisco),
          2000
        );
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// grafico REDE

function obterDadosGraficoRede(idMetrica) {
  fetch(`/medidas/ultimas/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          resposta.reverse();

          plotarGraficoRede(resposta, idMetrica);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoRede(resposta, idMetrica) {
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
        label: "Rede",
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
  const configRede = {
    type: "line",
    data: dados,
  };

  // Adicionando gráfico criado em div na tela
  let myChartRede = new Chart(document.getElementById(`uso_rede`), configRede);

  setTimeout(() => atualizarGraficoRede(idMetrica, dados, myChartRede), 2000);
}

function atualizarGraficoRede(idMetrica, dados, myChartRede) {
  fetch(`/medidas/tempo-real/${idMetrica}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          //obterdados(idMetrica);;
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

            myChartRede.update();
          }

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarGraficoRede(idMetrica, dados, myChartRede),
            2000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarGraficoRede(idMetrica, dados, myChartRede),
          2000
        );
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}
