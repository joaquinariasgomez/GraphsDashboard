import React, { useEffect, useState } from 'react';
import { Chart } from "chart.js/auto";
import DeleteIcon from '@mui/icons-material/Delete';
import CachedIcon from '@mui/icons-material/Cached';
import AddIcon from '@mui/icons-material/Add';
import { connectToNotion, deleteDesiredGraph, deleteGraphByUserIdAndType, getAllDesiredGraphsByUserId, getAllGraphsByUserId, reloadDesiredGraphAndReturnNewGraph, reloadDesiredGraphAndReturnUpdatedGraph } from './RequestUtils';
import { fakeGraphData, getRelativeTimeToUpdate, getRelativeTimestamp, getUserGraphByType } from './Utils';
import EmptyGraphsDashboard from './EmptyGraphsDashboard';
import GraphFactory from './charts/GraphFactory';
import LoginBox from './LoginBox';
import ClipLoader from "react-spinners/ClipLoader";
import SelectGraphTag from './SelectGraphTag';
import CreateGraph from './CreateGraph';

function App() {

    const [userGraphs, setUserGraphs] = useState([]);
    const [userDesiredGraphs, setUserDesiredGraphs] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [session, setSession] = useState([]);

    //const [graphIsUpdating, setGraphIsUpdating] = useState([]); // [{id: desiredGraphId, updating: false}]

    useEffect(() => {
        const params = new URL(window.document.location).searchParams;
        const notionCode = params.get("code");
        if (!notionCode) return;
        console.log("yoo notionCode: "+notionCode);
        // Send code to our backend to authorize
    }, []);

    useEffect(() => {
        if(isLoggedIn) {
            fetchUserGraphs();
        }
    }, []);

    useEffect(() => {
        if(isLoggedIn) {
            fetchUserDesiredGraphs();
        }
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
                            <div className='usergraph__selecttag'>
                                <SelectGraphTag
                                    desiredGraphId={userDesiredGraph.id}
                                    userId="joaquin"
                                    graphType={userDesiredGraph.type}
                                    defaultTag={userDesiredGraph.tag}
                                    updateStateFunction={fetchUserDesiredGraphs}
                                />
                            </div>
                            <button className='usergraph__reload' onClick={async function () {
                                // setGraphIsUpdating(true)
                                if(getUserGraphByType(userGraphs, userDesiredGraph.type) != null) {
                                    const updatedGraphResponse = await reloadDesiredGraphAndReturnUpdatedGraph(userDesiredGraph.userId, userDesiredGraph.type, getUserGraphByType(userGraphs, userDesiredGraph.type))
                                    const updatedUserGraphs = userGraphs.map((userGraph) => { // Just update this new userGraph
                                        if(userGraph.id === updatedGraphResponse.id) {
                                            return updatedGraphResponse;
                                        }
                                        return userGraph;
                                    });
                                    setUserGraphs(updatedUserGraphs);
                                }
                                else {
                                    const newGraphResponse = await reloadDesiredGraphAndReturnNewGraph(userDesiredGraph.userId, userDesiredGraph.type);
                                    setUserGraphs([...userGraphs, newGraphResponse]);
                                }
                                // setGraphIsUpdating(false)
                            }}>
                                <p>Actualizar</p>
                                <CachedIcon />
                                {/* {(graphIsUpdating) ? <ClipLoader size={20}/> : <CachedIcon />} */}
                            </button>
                        </div>
                        {renderGraph(userDesiredGraph)}
                    </div>
                ))}
                <CreateGraph
                    userId="joaquin"
                    updateStateFunction={fetchUserDesiredGraphs}
                />
            </div>
        )
    }

    const renderFakeUserGraphs = () => {
        return (
            <div className='usergraphsgrid__container'>
                <div className='usergraph__item' key="1">
                    <div className='usergraph__firstrow'>
                        <button className='usergraph__delete'>
                            <DeleteIcon style={{ color: '#f14668' }} />
                            <p>Eliminar</p>
                        </button>
                        <div className='usergraph__middleinfo'>
                            <p className='usergraph__timestamp'>
                                Actualizado hace 11 minutos
                            </p>
                            <p className='usergraph__timestamp'>
                                Próxima actualización en 15 horas
                            </p>
                        </div>
                        <div className='usergraph__selecttag'>
                            <SelectGraphTag
                                desiredGraphId="Mock"
                                userId="Mock"
                                graphType="Mock"
                                defaultTag="DAILY"
                                updateStateFunction={fetchUserDesiredGraphs}
                            />
                        </div>
                        <button className='usergraph__reload'>
                            <p>Actualizar</p>
                            <CachedIcon />
                        </button>
                    </div>
                    <GraphFactory
                        graphData={fakeGraphData}
                    />
                </div>
                {/* <CreateGraph
                    userId="joaquin"
                    updateStateFunction={fetchUserDesiredGraphs}
                /> */}
            </div>
        )
    }

    const renderDashboardForUser = () => {
        if(!isLoggedIn) {
            return (
                <div className='loginandfakegraphs'>
                    <LoginBox />
                    {renderFakeUserGraphs()}
                </div>
            )
        }
        else {
            if(userDesiredGraphs.length > 0) {
                {return renderUserGraphs()}
            }
            else {
                return (
                    <EmptyGraphsDashboard />
                )
            }
        }
    }

    const deleteDesiredGraphAndState = (userDesiredGraph) => {
        const userDesiredGraphId = userDesiredGraph.id
        deleteDesiredGraph(userDesiredGraphId)
        deleteGraphByUserIdAndType(userDesiredGraph.userId, userDesiredGraph.type)

        // Delete userDesiredGraph and userGraph for that type that is being deleted
        const updatedUserDesiredGraphs = userDesiredGraphs.filter((userDesiredGraph) => userDesiredGraph.id !== userDesiredGraphId);
        setUserDesiredGraphs(updatedUserDesiredGraphs);
        const updatedUserGraphs = userGraphs.filter((userGraph) => userGraph.type !== userDesiredGraph.type);
        setUserGraphs(updatedUserGraphs);
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
