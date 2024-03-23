import React from "react";
import { Bar } from "react-chartjs-2";

function getTagsFromResponse(response) {
    return response.data.map(row => row.tag);
}

function getValuesFromResponse(response) {
    return response.data.map(row => row.value);
}

export default function BarChart({response}) {
    const data = {
        labels: getTagsFromResponse(response),
        datasets: [
            {
                label: 'Total gastado',
                data: getValuesFromResponse(response)
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
                text: response.type
            }
        }
    }

    return <Bar options={options} data={data} />;
}