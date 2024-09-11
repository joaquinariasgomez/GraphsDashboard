import React from "react";
import { Line } from "react-chartjs-2";
import { getGraphTitleFromGraphOptions } from "../Utils";

function getTagsFromGraphData(graphData) {
    return graphData.data.map(row => row.tag);
}

function getValuesFromGraphData(graphData) {
    return graphData.data.map(row => row.value);
}

function getValues2FromGraphData(graphData) {
    return graphData.data.map(row => row.value2);
}

export default function MultiLineChart({ graphData, desiredGraphOptions }) {
    const data = {
        labels: getTagsFromGraphData(graphData),
        datasets: [
            {
                label: 'Calories consumed',
                data: getValuesFromGraphData(graphData),
                yAxisID: 'c'
            },
            {
                label: 'Weight',
                data: getValues2FromGraphData(graphData),
                yAxisID: 'w'
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
            },
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            c: {
                type: 'linear',
                display: true,
                position: 'left'
            },
            w: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false, // Only want the grid lines for one axis to show
                }
            }
        }
    }

    return <Line options={options} data={data} />;
}