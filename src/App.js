import React, { useEffect, useState } from 'react';
import { Chart } from "chart.js/auto";
import DeleteIcon from '@mui/icons-material/Delete';
import CachedIcon from '@mui/icons-material/Cached';
import AddIcon from '@mui/icons-material/Add';
import { connectToNotion, deleteDesiredGraph, deleteGraphByUserIdAndDesiredGraphId, getAllDesiredGraphsByUserId, getAllGraphsByUserId, reloadDesiredGraphAndReturnNewGraph, reloadDesiredGraphAndReturnUpdatedGraph, loginToNotionWithCode, getUsingNotionTemplates, createSessionsSearch } from './RequestUtils';
import { delay, getGraphTitleFromGraphOptions, getRelativeTimeToUpdate, getRelativeTimestamp, getUserGraphByDesiredGraphId } from './Utils';
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
import CreateGraphButton from './CreateGraphButton';
import LandingPageFooter from './LandingPageFooter';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SyncLoader from "react-spinners/SyncLoader";

function App() {

    const [userGraphs, setUserGraphs] = useState([]);
    const [userDesiredGraphs, setUserDesiredGraphs] = useState([]);

    const [usingNotionTemplates, setUsingNotionTemplates] = useState(true);

    const [cookieValue, setBotIdCookie, deleteBotIdCookie] = useCookie("bot_id");   // Value from actual cookie from browser application
    const [sessionValue, setSessionStorage, deleteSessionStorage] = useSessionStorage("bot_id");

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    //const [graphIsUpdating, setGraphIsUpdating] = useState([]); // [{id: desiredGraphId, updating: false}]

    const authorization_url = process.env.REACT_APP_NOTION_AUTH_URL;

    // Context
    const [{botIdCookie, session}, dispatch] = useGlobalStateValue();

    const navigate = useNavigate();


    useEffect(() => {
        const params = new URL(window.document.location).searchParams;
        const notionCode = params.get("code");
        if (!notionCode) return;
        navigate("/GraphsDashboard");
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

    useEffect(() => {
        fetchUsingNotionTemplates();
    }, [botIdCookie]);

    const getLoginDataFromNotion = async (code) => {
        try {
            setIsLoggingIn(true);
            const apiResponse = await loginToNotionWithCode(code);
            if(apiResponse) {
                setBotIdCookie(apiResponse.bot_id, 7);   // Set Cookie for next reloads, for 7 days
                setSessionStorage(apiResponse);
                setIsLoggingIn(false);
            }
        } catch(error) {
            setIsLoggingIn(false);
            if(error.message === "409") {
                showAlert("Máximo número de usuarios creados para el MVP. Inténtalo e nuevo más tarde y perdona las molestias.");
            }
            else {
                showAlert("There was a problem with the service. Please try again later");
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

    const manualCreateGraph = async (desiredGraphType, botId) => {
        try {
            const newGraphResponse = await reloadDesiredGraphAndReturnNewGraph(botId, desiredGraphType);
            setUserGraphs([...userGraphs, newGraphResponse]);
        } catch(error) {
            showAlert(error.message);
        }
    }

    const fetchUsingNotionTemplates = async () => {
        if(botIdCookie !== "") {
            const apiResponse = await getUsingNotionTemplates(botIdCookie);
            setUsingNotionTemplates(apiResponse);
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
                                    graphOptions={userDesiredGraph.graphOptions}
                                    defaultTag={userDesiredGraph.graphOptions.graphTag}
                                    updateStateFunction={fetchUserDesiredGraphs}
                                />
                            </div>
                            <button className='usergraph__reload' title='Update' onClick={async function () {
                                // setGraphIsUpdating(true)
                                if(getUserGraphByDesiredGraphId(userGraphs, userDesiredGraph.id) != null) {
                                    console.log("DEBUG JOAQUIN esto no deberia pasar")
                                    try {
                                        const updatedGraphResponse = await reloadDesiredGraphAndReturnUpdatedGraph(userDesiredGraph.botId, userDesiredGraph.id, getUserGraphByDesiredGraphId(userGraphs, userDesiredGraph.id));
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
                                } else {
                                    try {
                                        const newGraphResponse = await reloadDesiredGraphAndReturnNewGraph(userDesiredGraph.botId, userDesiredGraph.id);
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
                {/* <CreateGraph
                    botId={botIdCookie}
                    updateStateFunction={fetchUserDesiredGraphs}
                    createGraphFunction={manualCreateGraph}
                /> */}
            </div>
        )
    }

    const renderDashboardForUser = () => {
        if(botIdCookie === "" && !isLoggingIn) {   // Not logged in or no session
            return renderLandingPage()
        }
        else {
            if(isLoggingIn) {
                return (
                    <LoadingGraphsScreen />
                )
            }
            else {  // User has session
                return (
                    <div className='header_and_body'>
                        <div className='header'>
                            <CreateGraphButton />
                            <GetProButton />
                            <UserCircle />
                        </div>
                        {renderGetTemplateWizard()}
                        {renderUserGraphs()}
                    </div>
                )
            }
        }
    }

    const renderLandingPage = () => {
        return (
            <div className='landingpage__backgroundwrapper'>
                <div className='landingpagecontent'>
                    <div className='loginandfakegraphs'>
                        <a className='builtbyjoaquin__button' href='https://www.joaquinariasgomez.com/' target="_blank">
                            Built by Joaquín
                        </a>
                        <h1 className='landingpage__title'>
                            Turn your finance Notion databases
                            <br></br>
                            into insightful graphs
                        </h1>
                        <p className='landingpage__subtitle'>
                            Create automatically-updating graphs from your Notion account with no code.
                        </p>
                        <LoginBox />
                        <div className='landingpage__fakegraphs'>
                            <img src={process.env.PUBLIC_URL+'/fakegraphs.png'} alt=''></img>
                        </div>
                        <div className='landingpage__templateshow'>
                            <div className='landingpage__templatedescription'>
                                <h2>
                                    You don't need to create any databases.
                                    <br/>
                                    We provide them for you.
                                </h2>
                                <p>
                                    We provide you beautiful templates already configured to add your expenses and incomes.
                                </p>
                                <p>
                                    You can <a href='https://joaquinariasgomez.notion.site/Control-de-Gastos-e-Ingresos-60684847132e414188ac80e55001340d' target="_blank">get here</a> your Expense and Income Tracker Notion templates for free.
                                </p>
                                <p>
                                    After loging in, your dashboard will be saved with your favorite graphs.
                                </p>
                            </div>
                            <div className='landingpage__templateimagesstack'>
                                <div className='templateimagestacksquare'></div>
                                <img className="templateimage image1" src={process.env.PUBLIC_URL+'/ControlDeGastosTemplate.png'} alt=''></img>
                                <img className="templateimage image2" src={process.env.PUBLIC_URL+'/ControlDeIngresosTemplate.png'} alt=''></img>
                            </div>
                        </div>
                        <div className='landingpage__instructions__container'>
                            <div className='landingpage__instructions'>
                                <h2>Template setup instructions</h2>
                                <p>
                                    In order to create beautiful graphs, you must first use my Notion template.
                                </p>
                                <p>
                                    To do that:
                                </p>
                                <ol>
                                    <li>Go to <a href='https://joaquinariasgomez.notion.site/Control-de-Gastos-e-Ingresos-60684847132e414188ac80e55001340d' target="_blank">my Notion Template page</a>.</li>
                                    <li>Duplicate the template into your workspace with <ContentCopyIcon fontSize='small'/> button.</li>
                                    <li><a href={authorization_url}>Login with Notion</a> and connect your new (or existing) template to the Notion Graphs integration.</li>
                                </ol>
                            </div>
                            <div className='landingpage__instructionsimage'>
                                <div className='templateimagestackrectangle'></div>
                                <img src={process.env.PUBLIC_URL+'/LoginWithNotion.png'} alt=''></img>
                            </div>
                        </div>
                        {/* <div className='landingpage__dashboardshowoff'>
                            <h2>
                                Your own finance dashboard 
                            </h2>
                        </div> */}
                    </div>
                    <LandingPageFooter />
                </div>
            </div>
        )
    }

    const renderGetTemplateWizard = () => {
        if(!usingNotionTemplates) {
        // if(true) {
            return (
                <div className='gettemplatewizard__container'>
                    <WarningAmberRoundedIcon fontSize='large' className='wizardwarningicon'/>
                    <h2>You are not using my <a href='https://joaquinariasgomez.notion.site/Control-de-Gastos-e-Ingresos-60684847132e414188ac80e55001340d' target="_blank">Notion Template</a> yet!</h2>
                    <h3>Download instructions</h3>
                    <ol>
                        <li>Go to <a href='https://joaquinariasgomez.notion.site/Control-de-Gastos-e-Ingresos-60684847132e414188ac80e55001340d' target="_blank">my Notion Template page</a>.</li>
                        <li>Duplicate the template into your workspace with <ContentCopyIcon fontSize='small'/> button.</li>
                        <li><a href={authorization_url}>Login with Notion</a> and connect your new (or existing) template to the Notion Graphs integration.</li>
                    </ol>
                    <p>If you did everything, try reloading!</p>
                </div>
            )
        }
    }

    const deleteDesiredGraphAndState = (userDesiredGraph) => {
        const userDesiredGraphId = userDesiredGraph.id
        deleteDesiredGraph(userDesiredGraphId)
        deleteGraphByUserIdAndDesiredGraphId(userDesiredGraph.botId, userDesiredGraphId)

        // Delete userDesiredGraph and userGraph for that type that is being deleted
        const updatedUserDesiredGraphs = userDesiredGraphs.filter((userDesiredGraph) => userDesiredGraph.id !== userDesiredGraphId);
        setUserDesiredGraphs(updatedUserDesiredGraphs);
        const updatedUserGraphs = userGraphs.filter((userGraph) => userGraph.id !== userDesiredGraph.id);
        setUserGraphs(updatedUserGraphs);
    }

    const renderTimestamp = (userDesiredGraph) => {
        if(getUserGraphByDesiredGraphId(userGraphs, userDesiredGraph.id) != null) {
            return (
                <div className='usergraph__middleinfo'>
                    <p className='usergraph__timestamp__first' title='Last update'>
                        {getRelativeTimestamp(getUserGraphByDesiredGraphId(userGraphs, userDesiredGraph.id).lastUpdated)+" ago ・"}
                    </p>
                    <p className='usergraph__timestamp__second' title='Next update'>
                        {"In "+getRelativeTimeToUpdate(userDesiredGraph.graphOptions.graphTag)}
                    </p>
                </div>
            )
        }
    }

    const renderGraph = (userDesiredGraph) => {
        if(getUserGraphByDesiredGraphId(userGraphs, userDesiredGraph.id) != null) {
            return (
                <div className='usergraph__graphcontainer'>
                    <GraphFactory
                        graphData={getUserGraphByDesiredGraphId(userGraphs, userDesiredGraph.id)}
                        desiredGraphOptions={userDesiredGraph.graphOptions}
                    />
                </div>
            )
        }
        else {
            return (
                <div className='usergraph__loadinggraph'>
                    <p className='usergraph__loadinggraph__type'>
                        {getGraphTitleFromGraphOptions(userDesiredGraph.graphOptions)}
                    </p>
                    <div className='usergraph__loadinggraph__info'>
                        <SyncLoader size={14} style={{ color: '#6d6d6d' }} />
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
