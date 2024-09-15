import React from "react";
import { Bar } from "react-chartjs-2";
import { getGraphTitleFromGraphOptions } from "../Utils";

function getTagsFromGraphData(graphData) {
    return graphData.data.map(row => row.tag);
}

function getValuesFromGraphData(graphData) {
    return graphData.data.map(row => row.value);
}

export default function BarChart({ graphData, desiredGraphOptions }) {
    const data = {
        labels: getTagsFromGraphData(graphData),
        datasets: [
            {
                label: 'Total',
                data: getValuesFromGraphData(graphData)
            }
        ]
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
        }
    }

    return <Bar options={options} data={data} />;
}