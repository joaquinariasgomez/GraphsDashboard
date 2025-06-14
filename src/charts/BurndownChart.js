import { Line } from "react-chartjs-2";
import { getGraphTitleFromGraphOptions } from "../Utils";

function getTagsFromReferenceData(graphData) {
  return graphData.referenceData.map(row => "Day " + row.tag);
}

function getValuesFromGraphData(graphData) {
  return graphData.data.map(row => row.value);
}

function getValuesFromReferenceData(graphData) {
  return graphData.referenceData.map(row => row.value);
}

export default function BurndownChart({ graphData, desiredGraphOptions }) {
  const data = {
    labels: getTagsFromReferenceData(graphData),
    datasets: [
      {
        label: 'Projected average spend',
        data: getValuesFromReferenceData(graphData),
        borderColor: 'rgba(201, 203, 207, 1)', // Grey line
        borderWidth: 2.5,
        borderDash: [6, 6], // This makes the line dashed
        fill: false, // No fill for the average line
        pointRadius: 0, // No dots on the average line
      },
      {
        label: 'Cumulative spending',
        data: getValuesFromGraphData(graphData),
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue fill
        borderColor: 'rgba(54, 162, 235, 1)',      // Solid blue line
        borderWidth: 2,
        fill: true, // This makes it an area chart
        tension: 0.3, // Makes the line slightly curved
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      }
    ]
  }

  const options = {
    animation: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      },
    },
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
      mode: 'index', // Show tooltips for both datasets on hover
      intersect: false,
    },
  }

  return <Line options={options} data={data} />;
}