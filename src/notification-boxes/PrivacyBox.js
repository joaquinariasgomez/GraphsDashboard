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
                    <p>Notion Graphs is commited to protecting your privacy. This Privacy Policy explains the methods and reasons we collect, use, disclose, transfer, and store your information. If you have any questions about the contents of this policy, don't hesitate to contact us.</p>
                    <h2>Information We Collect</h2>
                    <p>We collect basic user information provided by Notion through Notion API, such as email address and name. We do not store any other private information.</p>
                    <p>Cookies: We use cookies and related technologies to keep track of user preferences and activity. Cookies are small text files created by a web server, delivered through a web browser, and stored on your computer. Most Internet browsers automatically accept cookies. You can instruct your browser, by changing its settings, to stop accepting cookies or to prompt you before accepting a cookie from the websites you visit.</p>
                    <h2>Contact Us</h2>
                    <p>At Notion Graphs, our talented customer service staff will be able to resolve any issues you may have using the our services. If you have any issues or any ideas to improve our services, please send a mail to joaquinariasgomez@gmail.com.</p>
                </div>
                <button className="privacybox__cancelbutton" onClick={function() {
                    closeBox();
                }}>
                    Close
                </button>
            </div>
        </div>
    );
}