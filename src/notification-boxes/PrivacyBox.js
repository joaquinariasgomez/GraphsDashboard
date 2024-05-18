import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";

export default function PrivacyBox() {

    // Context
    const [{}, dispatch] = useGlobalStateValue();

    const closeBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_PRIVACY_BOX,
            value: false
        })
    }

    return (
        <div className='privacybox__backdrop' onClick={closeBox}>
            <div className="privacybox__container" onClick={e => {e.stopPropagation(); }}>
                <div className="privacybox__text__row">
                    <h1>Privacy Policy</h1>
                    <p>Last updated: 18/05/2024</p>
                    <p>Last updated: 18/05/2024</p>
                </div>
                <div className="privacybox__options__row">
                    <button className="privacybox__cancelbutton" onClick={function() {
                        closeBox();
                    }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}