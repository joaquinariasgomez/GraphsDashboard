import { useGlobalStateValue } from "./context/GlobalStateProvider";
import { actionTypes } from "./context/globalReducer";

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
                <div className='usercircle__name'>
                    <h2>Pepito</h2>
                </div>
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