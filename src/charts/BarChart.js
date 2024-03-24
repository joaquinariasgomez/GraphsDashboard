import React from "react";
import { Bar } from "react-chartjs-2";

function getTagsFromGraphData(graphData) {
    return graphData.data.map(row => row.tag);
}

function getValuesFromGraphData(graphData) {
    return graphData.data.map(row => row.value);
}

export default function BarChart({ graphData }) {
    const data = {
        labels: getTagsFromGraphData(graphData),
        datasets: [
            {
                label: 'Total gastado',
                data: getValuesFromGraphData(graphData)
            }
        ]
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
                text: graphData.type
            }
        }
    }

    return <Bar options={options} data={data} />;
}