import React from "react";
import { Bar } from "react-chartjs-2";

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

export default function StackedBarChart({response}) {
    const data = {
        labels: getUniqueTagsFromResponse(response),
        datasets: getDatasetsFromResponse(response)
    }

    const options = {
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
    }

    return <Bar options={options} data={data} />;
}