import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";
import { useCookie } from "../useCookie";
import { useSessionStorage } from "../useSessionStorage";

export default function ProfileBox() {

    const [botIdCookie, setBotIdCookie, deleteBotIdCookie] = useCookie("bot_id");
    const [sessionValue, setSessionStorage, deleteSessionStorage] = useSessionStorage("bot_id");

    // Context
    const [{session}, dispatch] = useGlobalStateValue();

    const closeBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_PROFILE_BOX,
            value: false
        })
    }

    return (
        <div className='profilebox__backdrop' onClick={closeBox}>
            <div className="profilebox__container" onClick={e => {e.stopPropagation(); }}>
                <div className="profilebox__title__row">
                    <h2>👋 {session.notionOwner.name}</h2>
                </div>
                {/* <div className="profilebox__configuration__row">
                    <button className="profilebox__logoutbutton">
                        Random button 1
                    </button>
                    <button className="profilebox__logoutbutton">
                        Random button 2
                    </button>
                </div> */}
                <div className="profilebox__options__row">
                    <button className="profilebox__cancelbutton" onClick={function() {
                        closeBox();
                    }}>
                        Cancel
                    </button>
                    <button className="profilebox__logoutbutton" onClick={function() {
                        deleteBotIdCookie();
                        deleteSessionStorage();
                        closeBox();
                    }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

// SAMPLE SESSION DATA (session)
// {
//     "bot_id": "d948e9fa-cfd9-4ca7-bfec-b2cfa820364a",
//     "duplicated_template_id": "",
//     "notionOwner": {
//         "id": "20086e4f-5507-4009-baec-bb2a81b2c34e",
//         "name": "Joaquín",
//         "avatar_url": "https://s3-us-west-2.amazonaws.com/public.notion-static.com/5966859c-3df2-4846-9fb4-40cf0af3c5da/joaquin_coding_4.jpg",
//         "type": "person",
//         "email": "joaquinariasgomezcal@gmail.com"
//     },
//     "workspace_icon": "https://s3-us-west-2.amazonaws.com/public.notion-static.com/5966859c-3df2-4846-9fb4-40cf0af3c5da/joaquin_coding_4.jpg",
//     "workspace_id": "681abda1-366b-4fc1-9161-f0a3991618cc",
//     "workspace_name": "Joaquín's Notion"
// }