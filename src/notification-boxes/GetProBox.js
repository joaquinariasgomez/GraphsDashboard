import React, {useEffect, useState } from 'react';
import { createStripeCheckoutSession } from "../RequestUtils";
import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function GetProBox() {

    // Context
    const [{botIdCookie}, dispatch] = useGlobalStateValue();

    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    useEffect(() => {
        console.log(message);
    }, [message]);

    const closeBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_PRO_BOX,
            value: false
        })
    }

    async function handleStripeCheckout() {
        // const apiResponse = await createStripeCheckoutSession(botIdCookie);
        // if(apiResponse) {
        //     console.log(apiResponse);   
        // }
        createStripeCheckoutSession(botIdCookie);
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
                <div className="getprobox__body__row">
                    <h2>What you get with Free account</h2>
                    <ul>
                        <li>It's only possible to create one graph.</li>
                        <li>Updating graphs on demand as many times as you want.</li>
                        <li>Restricted access to old data.</li>
                    </ul>
                    <h2>What you get with Pro account</h2>
                    <ul>
                        <li>Unlimited amount of graphs.</li>
                        <li>Updating graphs on demand as many times as you want.</li>
                        <li>Unlimited access to old data.</li>
                        <li>Priority email support.</li>
                        <li>New option to update graphs hourly (COMING SOON).</li>
                        <li>Show averages and statistical regressions on your graphs (COMING SOON).</li>
                    </ul>
                </div>
                <div className="getprobox__options__row">
                    <button className="getprobox__getprobutton" onClick={handleStripeCheckout}>
                        Get Pro
                    </button>
                </div>
            </div>
        </div>
    );
}