import { useGlobalStateValue } from "./context/GlobalStateProvider";
import { actionTypes } from "./context/globalReducer";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function GetProButton({  }) {

    // Context
    const [{isSubscribedToNotionGraphsPro}, dispatch] = useGlobalStateValue();

    const showProBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_PRO_BOX,
            value: true
        })
    }

    const renderGetProButton = () => {
        if(!isSubscribedToNotionGraphsPro) { // If user didnt buy pro yet
            return (
                <div className='getpro__notbought'>
                    <LocalFireDepartmentIcon style={{ color: '#fffff' }} />
                    <h2>Get Pro</h2>
                </div>
            )
        }
        else {
            return (
                <div className='getpro__bought'>
                    <LocalFireDepartmentIcon style={{ color: '#fffff' }} />
                    <h2>Pro</h2>
                </div>
            )
        }
    }

    return (
        <button disabled={false} className="getpro__button header__item" onClick={() => showProBox()}>
            {renderGetProButton()}
        </button>
    )
}