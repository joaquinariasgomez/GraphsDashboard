import Chart from 'chart.js/auto'

(async function() {
  const response = {
    userId: "pepito",
    tag: "MONTHLY",
    type: "Ahorros acumulado desde Noviembre 2023",
    data: [
      {value: 144.90, tag: "11-2023"},
      {value: 2040.20, tag: "12-2023"},
      {value: 1882.81, tag: "1-2024"},
      {value: 2891.75, tag: "2-2024"}
    ]
  }
//   For entry 11-2023 we have this value: 144.90
//   For entry 12-2023 we have this value: 2040.20
//   For entry 1-2024 we have this value: 1882.81
//   For entry 2-2024 we have this value: 2891.75

  new Chart(
    document.getElementById('testarea'),
    {
      type: 'line',
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
        },
        interaction: {
            intersect: false
        }
      },
      data: {
        labels: getTagsFromResponse(response),
        datasets: [
            {
                label: 'Total ahorrado',
                data: getValuesFromResponse(response),
                fill: "origin"
                //borderColor: rgb(255, 99, 132)
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