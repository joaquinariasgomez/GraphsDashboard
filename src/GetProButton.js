import { useGlobalStateValue } from "./context/GlobalStateProvider";
import { actionTypes } from "./context/globalReducer";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function GetProButton({  }) {

    // Context
    const [{}, dispatch] = useGlobalStateValue();

    const showProBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_PRO_BOX,
            value: true
        })
    }

    const renderGetProButton = () => {
        if(true) { // If user didnt buy pro yet
            return (
                <div className='getpro__notbought'>
                    <LocalFireDepartmentIcon style={{ color: '#fffff' }} />
                    <h2>Pro</h2>
                </div>
            )
        }
        else {
            return (
                <></>
            )
        }
    }

    return (
        <button className="getpro__button" onClick={() => showProBox()}>
            {renderGetProButton()}
        </button>
    )
}