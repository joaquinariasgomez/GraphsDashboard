import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import BarChart from './charts/BarChart';

function App() {

    useEffect(() => {
        console.log("Esto sale una vez cada vez se carga la pagina");
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

    return (
        <div className="App">
            <h1>Hello {response.userId}</h1>
            <BarChart
                response={response}
            />
        </div>
    );
}

export default App;
