import { useCookie } from "./useCookie"

export default function LogoutBox({  }) {

    const [botIdCookie, setBotIdCookie, deleteBotIdCookie] = useCookie("bot_id");

    return (
        <div className="logout__container">
            <button onClick={function() {
                deleteBotIdCookie();
            }}>
                Logout
            </button>
        </div>
    )
}