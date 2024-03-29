import React, { useEffect, useState } from 'react';
import { Chart } from "chart.js/auto";
import { deleteDesiredGraph, getAllDesiredGraphsByUserId, getAllGraphsByUserId } from './RequestUtils';
import { getRelativeTimestamp, getUserGraphByType } from './Utils';
import EmptyGraphsDashboard from './EmptyGraphsDashboard';
import GraphFactory from './charts/GraphFactory';
import ClipLoader from "react-spinners/ClipLoader";

function App() {

    const [userGraphs, setUserGraphs] = useState([]);
    const [userDesiredGraphs, setUserDesiredGraphs] = useState([]);

    useEffect(() => {
        fetchUserGraphs();
    }, []);

    useEffect(() => {
        fetchUserDesiredGraphs();
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

    const fetchUserDesiredGraphs = async () => {
        // Get session token from current logged in user
    
        // Perform request sending that Token
        // Backend then should be able to retrieve the user from the token
        const apiResponse = await getAllDesiredGraphsByUserId("joaquin");
        if(apiResponse) {
            setUserDesiredGraphs(apiResponse);
        }
    }

    const renderUserGraphs = () => {
        return (
            <div className='usergraphsgrid__container'>
                {userDesiredGraphs.map(userDesiredGraph => (
                    <div className='usergraph__item' key={userDesiredGraph.id}>
                        <div className='usergraph__firstrow'>
                            <button className='usergraph__delete' onClick={function () {
                                deleteDesiredGraph(userDesiredGraph.id)
                            }}>
                                Eliminar
                            </button>
                            {renderTimestamp(userDesiredGraph)}
                            <button className='usergraph__reload'>

                            </button>
                        </div>
                        {renderGraph(userDesiredGraph)}
                    </div>
                ))}
            </div>
        )
    }

    const renderDashboardForUser = () => {
        if(userDesiredGraphs.length > 0) {
            {return renderUserGraphs()}
        }
        else {
            return (
                <EmptyGraphsDashboard />
            )
        }
    }

    const renderTimestamp = (userDesiredGraph) => {
        if(getUserGraphByType(userGraphs, userDesiredGraph.type) != null) {
            return <div className='usergraph__timestamp'>{getRelativeTimestamp(getUserGraphByType(userGraphs, userDesiredGraph.type).lastUpdated)}</div>
        }
    }

    const renderGraph = (userDesiredGraph) => {
        if(getUserGraphByType(userGraphs, userDesiredGraph.type) != null) {
            return (
                <GraphFactory
                    graphData={getUserGraphByType(userGraphs, userDesiredGraph.type)}
                />
            )
        }
        else {
            return (
                <div className='usergraph__loadinggraph'>
                    <ClipLoader size={50}/>
                </div>
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
