import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CreateGraphStep1 from "../components/CreateGraphStep1";

export default function CreateGraphBox() {

    // Context
    const [{}, dispatch] = useGlobalStateValue();

    const closeBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_CREATE_GRAPH_BOX,
            value: false
        })
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
                <div className="creategraphbox__contentrow">

                </div>
                {/* <div className="creategraphbox__nextbackrow">
                    <button className="creategraphbox__backbutton">
                        Back
                    </button>
                    <button className="creategraphbox__nextbutton">
                        Next
                    </button>
                </div> */}
            </div>
        </div>
    );
}