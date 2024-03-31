import React, { useEffect, useState } from 'react';
import { Chart } from "chart.js/auto";
import DeleteIcon from '@mui/icons-material/Delete';
import CachedIcon from '@mui/icons-material/Cached';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { deleteDesiredGraph, deleteGraphByUserIdAndType, getAllDesiredGraphsByUserId, getAllGraphsByUserId, reloadDesiredGraph } from './RequestUtils';
import { getRelativeTimeToUpdate, getRelativeTimestamp, getUserGraphByType } from './Utils';
import EmptyGraphsDashboard from './EmptyGraphsDashboard';
import GraphFactory from './charts/GraphFactory';
import Select from 'react-select';
import ClipLoader from "react-spinners/ClipLoader";

function App() {

    const [userGraphs, setUserGraphs] = useState([]);
    const [userDesiredGraphs, setUserDesiredGraphs] = useState([]);

    //const [graphIsUpdating, setGraphIsUpdating] = useState([]); // [{id: desiredGraphId, updating: false}]

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
                                deleteDesiredGraphAndState(userDesiredGraph)
                            }}>
                                <DeleteIcon style={{ color: '#f14668' }} />
                                <p>Eliminar</p>
                            </button>
                            {renderTimestamp(userDesiredGraph)}
                            <button className='usergraph__reload' onClick={async function () {
                                // setGraphIsUpdating(true)
                                const updatedGraphResponse = await reloadDesiredGraph(userDesiredGraph.userId, userDesiredGraph.type, getUserGraphByType(userGraphs, userDesiredGraph.type))
                                // setGraphIsUpdating(false)
                                
                                const updatedUserGraphs = userGraphs.map((userGraph) => { // Just update this new userGraph
                                    if(userGraph.id === updatedGraphResponse.id) {
                                        return updatedGraphResponse;
                                    }
                                    return userGraph;
                                });
                                setUserGraphs(updatedUserGraphs);
                            }}>
                                <p>Actualizar</p>
                                <CachedIcon />
                                {/* {(graphIsUpdating) ? <ClipLoader size={20}/> : <CachedIcon />} */}
                            </button>
                        </div>
                        {renderGraph(userDesiredGraph)}
                    </div>
                ))}
                <div className='usergraph__item'>
                    <button className='usergraph__create' onClick={function() {

                    }}>
                        <AddCircleOutlineSharpIcon style={{ width: 50, height: 50 }}/>
                        <Select>

                        </Select>
                    </button>
                </div>
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

    const deleteDesiredGraphAndState = (userDesiredGraph) => {
        const userDesiredGraphId = userDesiredGraph.id
        deleteDesiredGraph(userDesiredGraphId)
        deleteGraphByUserIdAndType(userDesiredGraph.userId, userDesiredGraph.type)
        const updatedUserDesiredGraphs = userDesiredGraphs.filter((userDesiredGraph) => userDesiredGraph.id !== userDesiredGraphId);
        setUserDesiredGraphs(updatedUserDesiredGraphs);
    }

    const renderTimestamp = (userDesiredGraph) => {
        if(getUserGraphByType(userGraphs, userDesiredGraph.type) != null) {
            return (
                <div className='usergraph__middleinfo'>
                    <p className='usergraph__timestamp'>
                        {"Actualizado hace "+getRelativeTimestamp(getUserGraphByType(userGraphs, userDesiredGraph.type).lastUpdated)}
                    </p>
                    <p className='usergraph__timestamp'>
                        {"Próxima actualización en "+getRelativeTimeToUpdate(userDesiredGraph.tag)}
                    </p>
                </div>
            )
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
                    <p>
                        {"Esta gráfica se actualizará en "+getRelativeTimeToUpdate(userDesiredGraph.tag)}
                    </p>
                    <CachedIcon fontSize="large" style={{ color: '#6d6d6d' }} />
                    {/* <ClipLoader size={50}/> */}
                </div>
            )
        }
    }

    return (
        <div className="App">
            {renderDashboardForUser()}
        </div>
    );
}

export default App;
