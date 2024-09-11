import React from "react";
import { Line } from "react-chartjs-2";
import { getGraphTitleFromGraphOptions } from "../Utils";

function getTagsFromGraphData(graphData) {
    return graphData.data.map(row => row.tag);
}

function getValuesFromGraphData(graphData) {
    return graphData.data.map(row => row.value);
}

export default function AreaChart({ graphData, desiredGraphOptions }) {
    const data = {
        labels: getTagsFromGraphData(graphData),
        datasets: [
            {
                label: 'Total saved',
                data: getValuesFromGraphData(graphData),
                fill: "origin"
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
        },
        interaction: {
            intersect: false
        }
    }

    return <Line options={options} data={data} />;
}