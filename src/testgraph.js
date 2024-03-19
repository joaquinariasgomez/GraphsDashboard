import Chart from 'chart.js/auto'

(async function() {
  const data = [
    { day: '2024-03-07', sum: 14 },
    { day: '2024-03-08', sum: 28 },
    { day: '2024-03-09', sum: 16.5 }
  ];

  new Chart(
    document.getElementById('testgraph'),
    {
      type: 'bar',
      options: {
        animation: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      data: {
        labels: data.map(row => row.day),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.sum)
          }
        ]
      }
    }
  );
})();