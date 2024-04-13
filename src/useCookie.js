import { useState, useEffect } from "react";

export const useCookie = (cookieName) => {
    const [cookieValue, setCookieValue] = useState("");

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
    };

    const deleteCookie = () => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    };

    return [cookieValue, setCookie, deleteCookie];
}