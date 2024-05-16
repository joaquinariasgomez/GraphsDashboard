import React, { useEffect, useState } from 'react';
import { Chart } from "chart.js/auto";
import DeleteIcon from '@mui/icons-material/Delete';
import CachedIcon from '@mui/icons-material/Cached';
import AddIcon from '@mui/icons-material/Add';
import { connectToNotion, deleteDesiredGraph, deleteGraphByUserIdAndType, getAllDesiredGraphsByUserId, getAllGraphsByUserId, reloadDesiredGraphAndReturnNewGraph, reloadDesiredGraphAndReturnUpdatedGraph, loginToNotionWithCode } from './RequestUtils';
import { getRelativeTimeToUpdate, getRelativeTimestamp, getUserGraphByType } from './Utils';
import EmptyGraphsDashboard from './EmptyGraphsDashboard';
import LoadingGraphsScreen from './LoadingGraphsScreen';
import GraphFactory from './charts/GraphFactory';
import LoginBox from './LoginBox';
import UserCircle from './UserCircle';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import SelectGraphTag from './SelectGraphTag';
import CreateGraph from './CreateGraph';
import { useCookie } from './useCookie';
import { useSessionStorage } from './useSessionStorage';
import { useGlobalStateValue } from './context/GlobalStateProvider';
import { actionTypes } from './context/globalReducer';
import { ALERT_BOX_TYPES } from './notification-boxes/AlertBoxConstants';
import GetProButton from './GetProButton';
import LandingPageFooter from './LandingPageFooter';

function App() {

    const [userGraphs, setUserGraphs] = useState([]);
    const [userDesiredGraphs, setUserDesiredGraphs] = useState([]);

    const [cookieValue, setBotIdCookie, deleteBotIdCookie] = useCookie("bot_id");   // Value from actual cookie from browser application
    const [sessionValue, setSessionStorage, deleteSessionStorage] = useSessionStorage("bot_id");

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    //const [graphIsUpdating, setGraphIsUpdating] = useState([]); // [{id: desiredGraphId, updating: false}]

    // Context
    const [{botIdCookie, session}, dispatch] = useGlobalStateValue();

    const navigate = useNavigate();


    useEffect(() => {
        const params = new URL(window.document.location).searchParams;
        const notionCode = params.get("code");
        if (!notionCode) return;
        getLoginDataFromNotion(notionCode);
    }, []);

    useEffect(() => {
        if(cookieValue !== "") {
            dispatch({
                type: actionTypes.SET_BOT_ID_COOKIE,
                value: cookieValue
            })
        }
    }, [cookieValue]);

    useEffect(() => {
        if(sessionValue != {}) {
            dispatch({
                type: actionTypes.SET_SESSION,
                value: sessionValue
            })
        }
    }, [sessionValue]);

    useEffect(() => {
        fetchUserGraphs();
    }, [botIdCookie]);

    useEffect(() => {
        fetchUserDesiredGraphs();
    }, [botIdCookie]);

    const getLoginDataFromNotion = async (code) => {
        try {
            setIsLoggingIn(true);
            const apiResponse = await loginToNotionWithCode(code);
            if(apiResponse) {
                setBotIdCookie(apiResponse.bot_id, 7);   // Set Cookie for next reloads, for 7 days
                setSessionStorage(apiResponse);
                setIsLoggingIn(false);
                navigate("/GraphsDashboard");
            }
        } catch(error) {
            navigate("/GraphsDashboard");
            setIsLoggingIn(false);
            if(error.message === "409") {
                showAlert("Máximo número de usuarios creados para el MVP. Inténtalo e nuevo más tarde y perdona las molestias.");
            }
            else {
                showAlert("Ha habido un problema con el servicio. Inténtalo de nuevo.");
            }
        }
    }

    const fetchUserGraphs = async () => {
        // Comprobar que tenemos la cookie antes de hacer la petición
        //if(Object.keys(session).length > 0) {
        if(botIdCookie !== "") {
            const apiResponse = await getAllGraphsByUserId(botIdCookie);
            if(apiResponse) {
                setUserGraphs(apiResponse);
            }
        }
    }

    const fetchUserDesiredGraphs = async () => {
        // Comprobar que tenemos la cookie antes de hacer la petición
        //if(Object.keys(session).length > 0) {
        if(botIdCookie !== "") {
            const apiResponse = await getAllDesiredGraphsByUserId(botIdCookie);
            if(apiResponse) {
                setUserDesiredGraphs(apiResponse);
            }
        }
    }

    const showAlert = (message) => {
        dispatch({
            type: actionTypes.SET_SHOW_ALERT_BOX,
            value: true
        })
        dispatch({
            type: actionTypes.SET_ALERT_BOX_MESSAGE,
            value: message
        })
        dispatch({
            type: actionTypes.SET_ALERT_BOX_TYPE,
            value: ALERT_BOX_TYPES.ALERT
        })
    }

    const renderUserGraphs = () => {
        return (
            <div className='usergraphsgrid__container'>
                {userDesiredGraphs.map(userDesiredGraph => (
                    <div className='usergraph__item' key={userDesiredGraph.id}>
                        <div className='usergraph__firstrow'>
                            <button className='usergraph__delete' title='Delete' onClick={function () {
                                deleteDesiredGraphAndState(userDesiredGraph)
                            }}>
                                <DeleteIcon style={{ color: '#f14668' }} />
                            </button>
                            {renderTimestamp(userDesiredGraph)}
                            <div className='usergraph__selecttag'>
                                <SelectGraphTag
                                    desiredGraphId={userDesiredGraph.id}
                                    botId={userDesiredGraph.botId}
                                    graphType={userDesiredGraph.type}
                                    defaultTag={userDesiredGraph.tag}
                                    updateStateFunction={fetchUserDesiredGraphs}
                                />
                            </div>
                            <button className='usergraph__reload' title='Update' onClick={async function () {
                                // setGraphIsUpdating(true)
                                if(getUserGraphByType(userGraphs, userDesiredGraph.type) != null) {
                                    try {
                                        const updatedGraphResponse = await reloadDesiredGraphAndReturnUpdatedGraph(userDesiredGraph.botId, userDesiredGraph.type, getUserGraphByType(userGraphs, userDesiredGraph.type));
                                        const updatedUserGraphs = userGraphs.map((userGraph) => { // Just update this new userGraph
                                            if(userGraph.id === updatedGraphResponse.id) {
                                                return updatedGraphResponse;
                                            }
                                            return userGraph;
                                        });
                                        setUserGraphs(updatedUserGraphs);
                                    } catch(error) {
                                        showAlert(error.message);
                                    }   
                                }
                                else {
                                    try {
                                        const newGraphResponse = await reloadDesiredGraphAndReturnNewGraph(userDesiredGraph.botId, userDesiredGraph.type);
                                        setUserGraphs([...userGraphs, newGraphResponse]);
                                    } catch(error) {
                                        showAlert(error.message);
                                    }
                                }
                                // setGraphIsUpdating(false)
                            }}>
                                <CachedIcon />
                                {/* {(graphIsUpdating) ? <ClipLoader size={20}/> : <CachedIcon />} */}
                            </button>
                        </div>
                        {renderGraph(userDesiredGraph)}
                    </div>
                ))}
                <CreateGraph
                    botId={botIdCookie}
                    updateStateFunction={fetchUserDesiredGraphs}
                />
            </div>
        )
    }

    const renderDashboardForUser = () => {
        if(botIdCookie === "" && !isLoggingIn) {   // Not logged in or no session
            return (
                <div className='landingpagecontent'>
                    <div className='loginandfakegraphs'>
                        <LoginBox />
                        <div className='fakegraphs'>
                            <img src={process.env.PUBLIC_URL+'/fakegraphs.png'} alt=''></img>
                        </div>
                    </div>
                    <LandingPageFooter />
                </div>
                
            )
        }
        else {
            if(isLoggingIn) {
                return (    // TODO: change to loading graphs screen
                    // <EmptyGraphsDashboard />
                    <LoadingGraphsScreen />
                )
            }
            else {  // User has session
                return (
                    <div>
                        <GetProButton />
                        <UserCircle />
                        {renderUserGraphs()}
                    </div>
                )
            }
        }
    }

    const deleteDesiredGraphAndState = (userDesiredGraph) => {
        const userDesiredGraphId = userDesiredGraph.id
        deleteDesiredGraph(userDesiredGraphId)
        deleteGraphByUserIdAndType(userDesiredGraph.botId, userDesiredGraph.type)

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
                    <p className='usergraph__timestamp__first' title='Last update'>
                        {getRelativeTimestamp(getUserGraphByType(userGraphs, userDesiredGraph.type).lastUpdated)+" ago ・"}
                    </p>
                    <p className='usergraph__timestamp__second' title='Next update'>
                        {"In "+getRelativeTimeToUpdate(userDesiredGraph.tag)}
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
                    <p className='usergraph__loadinggraph__type'>
                        {userDesiredGraph.type}
                    </p>
                    <div className='usergraph__loadinggraph__info'>
                        <p>
                            {"This graph will update in "+getRelativeTimeToUpdate(userDesiredGraph.tag)}
                        </p>
                        <CachedIcon fontSize="large" style={{ color: '#6d6d6d' }} />
                    </div>
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
