import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CreateGraphStep1 from "../components/CreateGraphStep1";
import CreateGraphStep2 from "../components/CreateGraphStep2";
import CreateGraphStep3 from "../components/CreateGraphStep3";
import { useEffect, useState } from "react";
import { getGraphTypeAccess } from "../RequestUtils";

export default function CreateGraphBox() {

    // Context
    const [{botIdCookie}, dispatch] = useGlobalStateValue();

    // State to manage form data
    const [step, setStep] = useState(1);
    const [createGraphData, setCreateGraphData] = useState({
        graphType: 'EXPENSES',
        graphTag: 'DAILY'
    });
    const [graphTypeAccessLoading, setGraphTypeAccessLoading] = useState(true);
    const [graphTypeAccess, setGraphTypeAccess] = useState("");
    
    useEffect(() => {
        console.log("createGraphData data: ", createGraphData);
    }, [createGraphData]);

    // Do all the necessary requests at the beginning of the form
    useEffect(() => {
        fetchGraphTypeAccess();
    }, [botIdCookie]);

    const closeBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_CREATE_GRAPH_BOX,
            value: false
        })
    }

    const fetchGraphTypeAccess = async () => {
        if(botIdCookie !== "") {
            const apiResponse = await getGraphTypeAccess(botIdCookie);
            if(apiResponse) {
                setGraphTypeAccess(apiResponse);
                setGraphTypeAccessLoading(false);
            }
        }
    }

    const handleNextStep = () => {
        setStep(step + 1);
    }

    const handlePrevStep = () => {
        setStep(step - 1);
    }

    const handleDataChange = (data) => {
        setCreateGraphData({ ...createGraphData, ...data});
    }

    const handleCreateGraph = () => {
        // 1. Check that everything is setup okay
        // 2. Send POST request to backend
    }

    return (
        <div className='creategraphbox__backdrop' onClick={closeBox}>
            <div className="creategraphbox__container" onClick={e => {e.stopPropagation(); }}>
                <button className="creategraphbox__cancelbutton" onClick={function() {
                        closeBox();
                }}>
                    <CloseRoundedIcon fontSize="medium" />
                </button>
                <h1>New Graph</h1>
                {/* TODO: add indicator of current step here */}
                {step === 1 && <CreateGraphStep1 onNext={handleNextStep} onChange={handleDataChange} dataLoading={graphTypeAccessLoading} graphTypeAccess={graphTypeAccess} />}
                {step === 2 && <CreateGraphStep2 onPrev={handlePrevStep} onNext={handleNextStep} onChange={handleDataChange} />}
                {step === 3 && <CreateGraphStep3 onPrev={handlePrevStep} onCreateGraph={handleCreateGraph} onChange={handleDataChange} />}
            </div>
        </div>
    );
}