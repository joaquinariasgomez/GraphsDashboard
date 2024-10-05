import React, {useEffect, useState } from 'react';
import { createStripeCheckoutSession } from "../RequestUtils";
import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function GetProBox() {

    // Context
    const [{botIdCookie}, dispatch] = useGlobalStateValue();

    const closeBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_PRO_BOX,
            value: false
        })
    }

    async function handleStripeCheckout() {
        // TODO: while waiting, put a spinner in Get Pro button
        const apiResponse = await createStripeCheckoutSession(
            botIdCookie,
            JSON.stringify(
                {
                    productName: "NOTION_GRAPHS_PRO",
                    subscriptionType: "ONE_PAYMENT"
                }
            )
        );
        if(apiResponse) {
            //console.log("Respuesta de Stripe: ", apiResponse);
            window.location.href = apiResponse.checkoutUrl;
        }
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
                        <li>You can create up to three graphs.</li>
                        <li>Restricted access to old data.</li>
                    </ul>
                    <h2>What you get with Pro account</h2>
                    <ul>
                        <li>Unlimited amount of graphs.</li>
                        <li>Complete access to old data.</li>
                        <li>Exclusive new graphs.</li>
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