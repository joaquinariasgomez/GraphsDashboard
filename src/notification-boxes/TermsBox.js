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
                    <h1>Terms</h1>
                    <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws, and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
                    <h2>Memberships</h2>
                    <p>Billing: Fees for the Notion Graphs Pro Lifetime Membership are charged once, and membership begins upon successful payment. Subscription fees for the Notion Graphs Monthly Membership are recurring payments. Your subscription begins upon payment of the first installment of subscription fees. The subscription renews at the specified interval upon the payment of automatically recurring subscription fees. Fees are charged on the same day of the month that the subscription began.</p>
                    <p>Cancellations: You can cancel any of your subscriptions (Lifetime or Monthly memberships) at any time. If you purchase a subscription that automatically renews, you may cancel the subscription any time before the end of the current billing period, and the cancellation will take effect at the end of the current billing period.</p>
                    <p>Sign-up: By signing up for Notion Graphs, we guarantee that you are not going to receive promotional emails from us.</p>
                    <h2>Disclaimer</h2>
                    <p>The materials on this website are provided “as is”. Notion Graphs makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Notion Graphs does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet website or otherwise relating to such materials or on any sites linked to this site.</p>
                </div>
                <button className="termsbox__cancelbutton" onClick={function() {
                    closeBox();
                }}>
                    Close
                </button>
            </div>
        </div>
    );
}