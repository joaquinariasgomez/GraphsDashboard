import { useGlobalStateValue } from "./context/GlobalStateProvider";
import { actionTypes } from "./context/globalReducer";
import PersonIcon from '@mui/icons-material/Person';

export default function UserCircle({  }) {

    // Context
    const [{session}, dispatch] = useGlobalStateValue();

    const activateProfileBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_PROFILE_BOX,
            value: true
        })
    }

    const renderUserImageOrName = () => {
        if(session.notionOwner.avatar_url === "") {   // Not logged in or no session
            return (
                <PersonIcon fontSize="large" />
            )
        }
        else {
            return (
                <img src={session.notionOwner.avatar_url} alt=''></img>
            )
        }
    }

    return (
        <button className="usercircle__button" onClick={() => activateProfileBox()}>
            {renderUserImageOrName()}
        </button>
    )
}