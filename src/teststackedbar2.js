import Chart from 'chart.js/auto'

(async function() {
  const response = {
    userId: "pepito",
    tag: "MONTHLY",
    type: "Ingresos desde noviembre por categoría",
    data: [
      {value: 2464.56, category: "BBVA", tag: "11-2023"},
      {value: 208.33, category: "Coverflex Benefits", tag: "11-2023"},
      {value: 201.6, category: "Coverflex Meal", tag: "11-2023"},
      {value: 3331.15, category: "BBVA", tag: "12-2023"},
      {value: 208.33, category: "Coverflex Benefits", tag: "12-2023"},
      {value: 134.4, category: "Coverflex Meal", tag: "12-2023"},
      {value: 2460.56, category: "BBVA", tag: "1-2024"},
      {value: 211.2, category: "Coverflex Meal", tag: "1-2024"},
      {value: 208.33, category: "Coverflex Benefits", tag: "1-2024"},
      {value: 2463.56, category: "BBVA", tag: "2-2024"},
      {value: 208.33, category: "Coverflex Benefits", tag: "2-2024"},
      {value: 201.6, category: "Coverflex Meal", tag: "2-2024"}
    ]
  }
// For entry 2-2024 and category BBVA we have this sum: 2463.56
// For entry 2-2024 and category Coverflex Benefits we have this sum: 208.33
// For entry 2-2024 and category Coverflex Meal we have this sum: 201.6

  new Chart(
    document.getElementById('teststackedbar2'),
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
        datasets: getDatasetsFromResponse(response)
      }
    }
  );
})();

function getUniqueTagsFromResponse(response) {
  const tags = response.data.map(row => row.tag);
  return tags.filter((value, idx) => tags.indexOf(value) === idx);
}

function getUniqueCategoriesFromResponse(response) {
  const categories = response.data.map(row => row.category);
  return categories.filter((value, idx) => categories.indexOf(value) === idx);
}

function getDatasetsFromResponse(response) {
  // Organizada la información por categoría
  let datasets = [];
  let uniqueCategories = getUniqueCategoriesFromResponse(response);

  for(const category of uniqueCategories) {
    let data = []
    const dateSet = new Set();
    for(const row of response.data) {
      if(dateSet.has(row.tag)) {
        if(row.category === category) { // Sobreescribir el 0 que hemos puesto anteriormente
          data[data.length-1] = row.value
        }
      } else {
        if(row.category === category) {
          data.push(row.value)
        } else {
          data.push(0.0)
        }
        dateSet.add(row.tag)
      }
      
    }
    const dataset = {
      label: category,
      data: data
    }
    datasets.push(dataset);
  }
  return datasets;
}