import { useGlobalStateValue } from "./context/GlobalStateProvider";
import { useCookie } from "./useCookie";
import { useSessionStorage } from './useSessionStorage';

export default function UserBox({  }) {

    const [botIdCookie, setBotIdCookie, deleteBotIdCookie] = useCookie("bot_id");
    const [sessionValue, setSessionStorage, deleteSessionStorage] = useSessionStorage("bot_id");
    // Context
    const [{session}, dispatch] = useGlobalStateValue();

    return (
        <div className="logout__container">
            <div>
                <p>
                    {session.notionOwner.name}
                </p>
                <p>
                    {session.notionOwner.avatar_url}
                </p>
            </div>
            <button onClick={function() {
                deleteBotIdCookie();
                deleteSessionStorage();
            }}>
                Logout
            </button>
        </div>
    )
}

// SAMPLE SESSION DATA
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