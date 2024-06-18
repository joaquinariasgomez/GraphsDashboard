import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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
                <div className="creategraphbox__nextprevrow">
                    <button className="creategraphbox__prevbutton">
                        Previous
                    </button>
                    <button className="creategraphbox__nextbutton">
                        Next
                    </button>
                </div>
                {/* <div className="getprobox__text__row">
                    <h1>Get Pro</h1>
                    <p>Esto es un texto de ejemplo</p>
                </div>
                <div className="getprobox__options__row">
                    <button className="getprobox__getprobutton" onClick={function() {}}>
                        Get Pro
                    </button>
                </div> */}
            </div>
        </div>
    );
}