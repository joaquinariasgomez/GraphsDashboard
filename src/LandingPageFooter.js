import { useGlobalStateValue } from "./context/GlobalStateProvider"
import { actionTypes } from "./context/globalReducer";
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


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
                <a href="https://www.youtube.com/@joaquinariasgomez">
                    <YouTubeIcon fontSize="medium" style={{ color: '#28282B' }} onClick={() => {console.log("dem")}} />
                </a>
                <a href="http://github.com/joaquinariasgomez">
                    <GitHubIcon fontSize="medium" style={{ color: '#28282B' }}/>
                </a>
                <a href="http://linkedin.com/in/joaquinariasgomez">
                    <LinkedInIcon fontSize="medium" style={{ color: '#28282B' }}/>
                </a>
            </div>
            <div className="landingpagefooter__text">
                <p>Contact: joaquinariasgomezcal@gmail.com</p>
                <p>© 2024 Joaquín Arias</p>
            </div>
            <div className="landingpagefooter__privacyterms">
                <a className="landingpagefooter__button" onClick={() => showPrivacyBox()}>
                    Privacy
                </a>
                <a className="landingpagefooter__button" onClick={() => showTermsBox()}>
                    Terms
                </a>
            </div>
        </div>
    )
}