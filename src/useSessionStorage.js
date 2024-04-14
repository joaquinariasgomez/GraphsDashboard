import { useState, useEffect } from "react";
import { useGlobalStateValue } from './context/GlobalStateProvider';
import { actionTypes } from './context/globalReducer';

export const useSessionStorage = (sessionKey) => {
    const [sessionValue, setSessionValue] = useState({});
    const [{session}, dispatch] = useGlobalStateValue();

    useEffect(() => {
        const currentValue = JSON.parse(localStorage.getItem(sessionKey));
        setSessionValue(currentValue ? currentValue : {});
    }, [sessionKey]);

    const setSessionStorage = (value) => {
        localStorage.setItem(sessionKey, JSON.stringify(value));
        dispatch({
            type: actionTypes.SET_SESSION,
            value: value
        })
    }

    const deleteSessionStorage = () => {
        localStorage.removeItem(sessionKey);
        dispatch({
            type: actionTypes.SET_SESSION,
            value: {}
        })
    }

    return [sessionValue, setSessionStorage, deleteSessionStorage];
}