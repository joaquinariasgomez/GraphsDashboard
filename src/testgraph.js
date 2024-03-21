import Chart from 'chart.js/auto'

(async function() {
  const response = {
    userId: "pepito",
    tag: "DAILY",
    type: "Gastos en los últimos 7 días por categoría",
    data: [
      {value: 11.87, category: "Supermarket", tag: "2024-03-14"},
      {value: 0.0, category: "Bills & Subscriptions", tag: "2024-03-14"},
      {value: 23.71, category: "Health and Personal Care", tag: "2024-03-15"},
      {value: 17.25, category: "Gasoline", tag: "2024-03-15"},
      {value: 5.55, category: "Supermarket", tag: "2024-03-16"},
      {value: 1.2, category: "Food Out", tag: "2024-03-16"},
      {value: 18.78, category: "Supermarket", tag: "2024-03-17"},
      {value: 0.95, category: "Food Out", tag: "2024-03-17"},
      {value: 10.0, category: "Bills & Subscriptions", tag: "2024-03-18"},
      {value: 4.67, category: "Supermarket", tag: "2024-03-18"},
      {value: 0.0, category: "Gasoline", tag: "2024-03-19"},
      {value: 64.96, category: "Shopping", tag: "2024-03-20"}
    ]
  }
// For entry 2024-03-14 and category Supermarket we have this sum: 11.87
// For entry 2024-03-14 and category Bills & Subscriptions we have this sum: 0.0
// For entry 2024-03-15 and category Health and Personal Care we have this sum: 23.71
// For entry 2024-03-15 and category Gasoline we have this sum: 17.25
// For entry 2024-03-16 and category Supermarket we have this sum: 5.55
// For entry 2024-03-16 and category Food Out we have this sum: 1.2
// For entry 2024-03-17 and category Supermarket we have this sum: 18.78
// For entry 2024-03-17 and category Food Out we have this sum: 0.95
// For entry 2024-03-18 and category Bills & Subscriptions we have this sum: 10.0
// For entry 2024-03-18 and category Supermarket we have this sum: 4.67
// For entry 2024-03-19 and category Gasoline we have this sum: 0.0
// For entry 2024-03-20 and category Shopping we have this sum: 64.96

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
            enabled: true
          },
          title: {
            display: true,
            text: response.type
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      },
      data: {
        labels: getUniqueTagsFromResponse(response),
        datasets: [
          {
            label: "Food Out",
            data: [1 ,2]
          }
        ]
        // datasets: [
        //   {
        //     label: 'Acquisitions by year',
        //     data: response.data.map(row => row.value)
        //   }
        // ]
      }
    }
  );
})();

function getUniqueTagsFromResponse(response) {
  let tags = response.data.map(row => row.tag)
  return tags.filter((value, idx) => tags.indexOf(value) === idx);
}