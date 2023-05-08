import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentUserToken} from "@/store/auth/authSlice";
import {useCurrentUserRolesQuery} from "@/store/api/auth/authApiSlice";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import FullPageLoading from "@/components/admin/loading/fullpage";


function RequireAdmin() {
    const token = useSelector(selectCurrentUserToken)
    const location = useLocation()
    const {data: userRole, error, isLoading} = useCurrentUserRolesQuery(token, {skip: !token})

    if (isLoading) {
        return (
            <FullPageLoading/>
        );
    }

    if (error) {
        return <Navigate to={"/"} state={{from: location}} replace/>
    }

    return (token && userRole && userRole.data && userRole.data.includes("admin") ? (<Outlet/>) : (
        <Navigate to={"/"} state={{from: location}} replace/>));
}

export default RequireAdmin;
