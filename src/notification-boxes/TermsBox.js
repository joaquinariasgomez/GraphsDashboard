import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";

export default function TermsBox() {

    // Context
    const [{}, dispatch] = useGlobalStateValue();

    const closeBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_TERMS_BOX,
            value: false
        })
    }

    return (
        <div className='termsbox__backdrop' onClick={closeBox}>
            <div className="termsbox__container" onClick={e => {e.stopPropagation(); }}>
                <div className="termsbox__text__row">
                    <h1>To fill</h1>
                    <p>- To fill</p>
                </div>
                <div className="termsbox__options__row">
                    <button className="termsbox__cancelbutton" onClick={function() {
                        closeBox();
                    }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}