import { useState, useEffect } from "react";
import { useGlobalStateValue } from './context/GlobalStateProvider';
import { actionTypes } from './context/globalReducer';

export const useCookie = (cookieName) => {
    const [cookieValue, setCookieValue] = useState("");
    const [{botIdCookie}, dispatch] = useGlobalStateValue();

    useEffect(() => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${cookieName}`));

        setCookieValue(cookie ? cookie.split("=")[1] : "");
    }, [cookieName]);

    const setCookie = (value, days) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
        document.cookie = `${cookieName}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
        dispatch({
            type: actionTypes.SET_BOT_ID_COOKIE,
            value: value
        })
    };

    const deleteCookie = () => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        dispatch({
            type: actionTypes.SET_BOT_ID_COOKIE,
            value: ""
        })
    };

    return [cookieValue, setCookie, deleteCookie];
}