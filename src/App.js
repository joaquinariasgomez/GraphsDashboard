import React, { useEffect, useState } from 'react';
import { Chart } from "chart.js/auto";
import { getAllGraphsByUserId } from './RequestUtils';
import EmptyGraphsDashboard from './EmptyGraphsDashboard';
import GraphFactory from './charts/GraphFactory';

function App() {

    const [userGraphs, setUserGraphs] = useState([]);

    useEffect(() => {
        fetchUserGraphs();
    }, []);

    const fetchUserGraphs = async () => {
        // Get session token from current logged in user
    
        // Perform request sending that Token
        // Backend then should be able to retrieve the user from the token
        const apiResponse = await getAllGraphsByUserId("joaquin");
        if(apiResponse) {
            setUserGraphs(apiResponse);
        }
    }

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

    const renderUserGraphs = () => {
        return (
            <div className='usergraphsgrid__container'>
                {userGraphs.map(userGraph => (
                    <div className='usergraph__item' key={userGraph.id}>
                        <GraphFactory
                            graphData={userGraph}
                        />
                    </div>
                ))}
            </div>
        )
    }

    const renderDashboardForUser = () => {
        if(userGraphs.length > 0) {
            {return renderUserGraphs()}
        }
        else {
            return (
                <EmptyGraphsDashboard />
            )
        }
    }

    return (
        <div className="App">
            {renderDashboardForUser()}
            {/* <h1>Hello {response.userId}</h1>
            <BarChart
                response={response}
            />
            <StackedBarChart
                response={response2}
            /> */}
        </div>
    );
}

export default App;
