import Chart from 'chart.js/auto'
import { getAllGraphsByUserId } from './api';
import { getGraphDataByType, getTypeExpensesLastSevenPerCategory, userId } from './utils';

(async function() {
  // const response = {
  //   userId: "pepito",
  //   tag: "DAILY",
  //   type: "Gastos en los últimos 7 días por categoría",
  //   data: [
  //     {value: 11.87, category: "Supermarket", tag: "2024-03-14"},
  //     {value: 0.0, category: "Bills & Subscriptions", tag: "2024-03-14"},
  //     {value: 23.71, category: "Health and Personal Care", tag: "2024-03-15"},
  //     {value: 17.25, category: "Gasoline", tag: "2024-03-15"},
  //     {value: 5.55, category: "Supermarket", tag: "2024-03-16"},
  //     {value: 1.2, category: "Food Out", tag: "2024-03-16"},
  //     {value: 18.78, category: "Supermarket", tag: "2024-03-17"},
  //     {value: 0.95, category: "Food Out", tag: "2024-03-17"},
  //     {value: 10.0, category: "Bills & Subscriptions", tag: "2024-03-18"},
  //     {value: 4.67, category: "Supermarket", tag: "2024-03-18"},
  //     {value: 0.0, category: "Gasoline", tag: "2024-03-19"},
  //     {value: 64.96, category: "Shopping", tag: "2024-03-20"}
  //   ]
  // }
  let response = await getAllGraphsByUserId(userId);
  response = getGraphDataByType("Gastos en los últimos 7 días por categoría", response);

  new Chart(
    document.getElementById('teststackedbar'),
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