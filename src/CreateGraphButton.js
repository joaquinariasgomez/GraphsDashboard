import { useGlobalStateValue } from "./context/GlobalStateProvider";
import { actionTypes } from "./context/globalReducer";
import AddRoundedIcon from '@mui/icons-material/AddRounded';


export default function CreateGraphButton({  }) {

    // Context
    const [{}, dispatch] = useGlobalStateValue();

    const showCreateGraphBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_CREATE_GRAPH_BOX,
            value: true
        })
    }

    return (
        <button className="creategraph__button" onClick={() => showCreateGraphBox()}>
            <div className="creategraphbutton__container">
                <AddRoundedIcon sx={{ color: "#28282B" }} fontSize="medium" />
                <h2>Create Graph</h2>
            </div>
        </button>
    )
}