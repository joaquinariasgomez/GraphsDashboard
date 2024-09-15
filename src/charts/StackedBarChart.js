import React from "react";
import { Bar } from "react-chartjs-2";
import { getGraphTitleFromGraphOptions } from "../Utils";

function getUniqueTagsFromGraphData(graphData) {
    const tags = graphData.data.map(row => row.tag);
    return tags.filter((value, idx) => tags.indexOf(value) === idx);
}

function getUniqueCategoriesFromGraphData(graphData) {
    const categories = graphData.data.map(row => row.category);
    return categories.filter((value, idx) => categories.indexOf(value) === idx);
}

function getDatasetsFromGraphData(graphData) {
    // Organizada la información por categoría
    let datasets = [];
    let uniqueCategories = getUniqueCategoriesFromGraphData(graphData);

    for(const category of uniqueCategories) {
        let data = []
        const dateSet = new Set();
        for(const row of graphData.data) {
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

export default function StackedBarChart({ graphData, desiredGraphOptions }) {
    const data = {
        labels: getUniqueTagsFromGraphData(graphData),
        datasets: getDatasetsFromGraphData(graphData)
    }

    const options = {
        animation: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            },
            title: {
                display: true,
                text: getGraphTitleFromGraphOptions(desiredGraphOptions)
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