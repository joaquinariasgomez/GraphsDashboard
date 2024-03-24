import React, { useEffect, useState } from 'react';
import { Chart } from "chart.js/auto";
import BarChart from './charts/BarChart';
import StackedBarChart from './charts/StackedBarChart';
import { fetchUserGraphs } from './RequestUtils';

function App() {

    useEffect(() => {
        fetchUserGraphs();
    });

    const response = {
        userId: "pepito",
        tag: "DAILY",
        type: "Gastos en los últimos 7 días",
        data: [
          {value: 11.87, tag: "2024-03-14"},
          {value: 40.96, tag: "2024-03-15"},
          {value: 5.75, tag: "2024-03-16"},
          {value: 19.73, tag: "2024-03-17"},
          {value: 14.67, tag: "2024-03-18"},
          {value: 0.0, tag: "2024-03-19"},
          {value: 64.96, tag: "2024-03-20"}
        ]
    }

    const response2 = {
        userId: "pepito",
        tag: "DAILY",
        type: "Gastos en los últimos 7 días por categoría",
        data: [
        {value: 11.87, category: "Supermarket", tag: "2024-03-14"},
        {value: 0.0, category: "Bills & Subscriptions", tag: "2024-03-14"},
        {value: 23.71, category: "Health and Personal Care", tag: "2024-03-15"},
        {value: 17.25, category: "Gasoline", tag: "2024-03-15"},
        {value: 5.55, category: "Supermarket", tag: "2024-03-16"},
        {value: 1.2, category: "Food Out", tag: "2024-03-16"},
        {value: 18.78, category: "Supermarket", tag: "2024-03-17"},
        {value: 0.95, category: "Food Out", tag: "2024-03-17"},
        {value: 10.0, category: "Bills & Subscriptions", tag: "2024-03-18"},
        {value: 4.67, category: "Supermarket", tag: "2024-03-18"},
        {value: 0.0, category: "Gasoline", tag: "2024-03-19"},
        {value: 64.96, category: "Shopping", tag: "2024-03-20"}
        ]
    }

    return (
        <div className="App">
            <h1>Hello {response.userId}</h1>
            <BarChart
                response={response}
            />
            <StackedBarChart
                response={response2}
            />
        </div>
    );
}

export default App;
