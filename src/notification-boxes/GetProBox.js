import React, {useEffect, useState } from 'react';
import { createStripeCheckoutSession } from "../RequestUtils";
import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ClipLoader from "react-spinners/ClipLoader";
import ConfettiExplosion from 'react-confetti-explosion';

export default function GetProBox() {

    // Context
    const [{botIdCookie, isSubscribedToNotionGraphsPro}, dispatch] = useGlobalStateValue();
    const [isLoadingStripePage, setIsLoadingStripePage] = useState(false);

    const closeBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_PRO_BOX,
            value: false
        })
    }

    async function handleStripeCheckout() {
        setIsLoadingStripePage(true);
        const apiResponse = await createStripeCheckoutSession(
            botIdCookie,
            JSON.stringify(
                {
                    productName: "NOTION_GRAPHS_PRO",
                    subscriptionType: "ONE_PAYMENT"
                }
            )
        );
        setIsLoadingStripePage(false);
        if(apiResponse) {
            window.location.href = apiResponse.checkoutUrl;
        }
    }

    const renderBodyAndButtonForNonProUser = () => {
        return (
            <>
                <div className="getprobox__body__row nonprouser">
                    <h2>What you get with Free account</h2>
                    <ul>
                        <li>You can create up to three graphs.</li>
                        <li>Restricted access to old data.</li>
                    </ul>
                    <h2>What you get with Pro account</h2>
                    {renderProAdvantages()}
                </div>
                <div className="getprobox__options__row">
                    {!isLoadingStripePage ?
                    <button className="getprobox__getprobutton" onClick={handleStripeCheckout}>
                        Get Pro
                    </button> : 
                    <button className="getprobox__getprobutton" onClick={handleStripeCheckout}>
                        <ClipLoader size={20}/>
                    </button>}
                </div>
            </>
        )
    }

    const renderBodyAndButtonForProUser = () => {
        return (
            <>
                <ConfettiExplosion
                    force={0.8}
                    duration={3000}
                    particleCount={250}
                    width={1600}
                />
                <div className="getprobox__body__row">
                    <h2>You are subscribed to Pro 🔥</h2>
                    <h3>This is what you have</h3>
                    {renderProAdvantages()}
                </div>
            </>
        )
    }

    const renderProAdvantages = () => {
        return (
            <ul>
                <li>Unlimited amount of graphs.</li>
                <li>Complete access to old data.</li>
                <li>Exclusive new graphs.</li>
                <li>Priority email support.</li>
                <li>New option to update graphs hourly <b><i>Coming soon</i></b>.</li>
                <li>Show averages and statistical regressions <b><i>Coming soon</i></b>.</li>
            </ul>
        )
    }

    return (
        <div className='getprobox__backdrop' onClick={closeBox}>
            <div className="getprobox__container" onClick={e => {e.stopPropagation(); }}>
                <button className="getprobox__cancelbutton" onClick={function() {
                        closeBox();
                }}>
                    <CloseRoundedIcon fontSize="medium" />
                </button>
                <div className="getpro__notbought getprotitle">
                    <LocalFireDepartmentIcon fontSize="large" style={{ color: '#fffff' }} />
                    <h1>Pro</h1>
                </div>
                {!isSubscribedToNotionGraphsPro ?
                renderBodyAndButtonForNonProUser() : renderBodyAndButtonForProUser()}
            </div>
        </div>
    );
}