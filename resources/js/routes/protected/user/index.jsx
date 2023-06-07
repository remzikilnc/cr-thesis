import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentUserToken} from "@/store/auth/authSlice";
import {Navigate, useLocation} from "react-router-dom";

function RequireAuth({children}) {
    const token = useSelector(selectCurrentUserToken)
    const location = useLocation()

    return (
        token ? children : <Navigate to={"/auth/login"} state={{from: location}} replace />
    );
}

export default RequireAuth;
