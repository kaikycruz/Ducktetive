var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

for (let i = 0; i <= array.length; i++) {
  const graficos= array[i];
  campo_grafico.innerHTML += `<div class="graficos">
                                 <canvas id="grafico_cpu${i}"></canvas>
                              </div>`;
}


const cpu0 = document.getElementById('grafico_cpu');

new Chart(cpu0, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu1 = document.getElementById('grafico_cpu0');

new Chart(cpu1, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu2 = document.getElementById('grafico_cpu1');

new Chart(cpu2, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const cpu3 = document.getElementById('grafico_cpu2');

new Chart(cpu3, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu4 = document.getElementById('grafico_cpu3');

new Chart(cpu4, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu5 = document.getElementById('grafico_cpu4');

new Chart(cpu5, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu6 = document.getElementById('grafico_cpu5');

new Chart(cpu6, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu7 = document.getElementById('grafico_cpu6');

new Chart(cpu7, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu8 = document.getElementById('grafico_cpu7');

new Chart(cpu8, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu9 = document.getElementById('grafico_cpu8');

new Chart(cpu9, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu10 = document.getElementById('grafico_cpu9');

new Chart(cpu10, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu11 = document.getElementById('grafico_cpu10');

new Chart(cpu11, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const cpu12 = document.getElementById('grafico_cpu11');

new Chart(cpu12, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu13 = document.getElementById('grafico_cpu12');

new Chart(cpu13, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu14 = document.getElementById('grafico_cpu13');

new Chart(cpu14, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


const cpu15 = document.getElementById('grafico_cpu14');

new Chart(cpu15, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const cpu16 = document.getElementById('grafico_cpu15');

new Chart(cpu16, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      tension: 0.5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const detalhes = document.getElementById('detalhes_cpu');

new Chart(detalhes, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15'],
    datasets: [{
      label: 'Core 1',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});