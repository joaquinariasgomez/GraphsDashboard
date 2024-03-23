import Chart from 'chart.js/auto'

(async function() {
  const response = {
    userId: "pepito",
    tag: "DAILY",
    type: "Gastos en los últimos 7 días",
    data: [
      {value: 11.87, tag: "2024-03-14"},
      {value: 40.96, tag: "2024-03-15"},
      {value: 5.75, tag: "2024-03-16"},
      {value: 19.73, tag: "2024-03-17"},
      {value: 14.67, tag: "2024-03-18"},
      {value: 0.0, tag: "2024-03-19"},
      {value: 64.96, tag: "2024-03-20"}
    ]
  }

  new Chart(
    document.getElementById('testbar'),
    {
      type: 'bar',
      options: {
        animation: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          },
          title: {
            display: true,
            text: response.type
          }
        }
      },
      data: {
        labels: getTagsFromResponse(response),
        datasets: [
            {
                label: 'Total gastado',
                data: getValuesFromResponse(response),
            }
        ]
      }
    }
  );
})();

function getTagsFromResponse(response) {
  return response.data.map(row => row.tag);
}

function getValuesFromResponse(response) {
  return response.data.map(row => row.value);
}