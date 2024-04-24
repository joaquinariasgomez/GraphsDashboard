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

    return (
        <div className="usercircle__container">
            <button onClick={() => activateProfileBox()}>
                <p>
                    {session.notionOwner.name}
                </p>
                <p>
                    {session.notionOwner.avatar_url}
                </p>
            </button>
        </div>
    )
}