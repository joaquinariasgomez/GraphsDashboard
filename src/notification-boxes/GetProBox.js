import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";

export default function GetProBox() {

    // Context
    const [{}, dispatch] = useGlobalStateValue();

    const closeBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_PRO_BOX,
            value: false
        })
    }

    return (
        <div className='getprobox__backdrop' onClick={closeBox}>
            <div className="getprobox__container" onClick={e => {e.stopPropagation(); }}>
                <div className="getprobox__text__row">
                    <h1>Free plan (included by default)</h1>
                    <p>- Unlimited graphs</p>
                </div>
                <div className="getprobox__options__row">
                    <button className="getprobox__cancelbutton" onClick={function() {
                        closeBox();
                    }}>
                        Cancel
                    </button>
                    <button className="getprobox__getprobutton" onClick={function() {}}>
                        Get Pro
                    </button>
                </div>
            </div>
        </div>
    );
}