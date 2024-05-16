import { useGlobalStateValue } from "./context/GlobalStateProvider"
import { actionTypes } from "./context/globalReducer";


export default function LandingPageFooter({}) {

    // Context
    const [{}, dispatch] = useGlobalStateValue();

    const showPrivacyBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_PRIVACY_BOX,
            value: true
        })
    }

    const showTermsBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_TERMS_BOX,
            value: true
        })
    }

    return (
        <div className="landingpagefooter__container">
            <div className="landingpagefooter__icons">

            </div>
            <div className="landingpagefooter__text">
                <p>Copyright © 2024 pagename.com All rights reserved.</p>
                <p>Contact: joaquinariasgomezcal@gmail.com</p>
            </div>
            <div className="landingpagefooter__privacyterms">
                <button className="landingpagefooter__privacybutton" onClick={() => showPrivacyBox()}>
                    Privacy
                </button>
                <button className="landingpagefooter__termsbutton" onClick={() => showTermsBox()}>
                    Terms
                </button>
            </div>
        </div>
    )
}