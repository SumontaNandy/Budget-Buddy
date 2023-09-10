import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

export const LogOut = () => {
    const history = useHistory();

    const handleLogout = () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        history.push("/");
    };

    return (
        <>
            <h1>Please Confirm Logout</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};