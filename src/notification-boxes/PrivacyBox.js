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
                    <h1>To fill</h1>
                    <p>- To fill</p>
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