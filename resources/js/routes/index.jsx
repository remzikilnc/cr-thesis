import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {selectCurrentUserToken, setUser} from "@/store/auth/authSlice";
import {useAuthenticateQuery} from "@/store/api/auth/authApiSlice";

import Login from "@/views/auth/login";
import Register from "@/views/auth/register";
import RequireAdmin from "@/routes/protected/admin";
import AuthLayout from "@/layouts/auth";
import AdminLayout from "@/layouts/admin";
import UserLayout from "@/layouts/user";

function MainRoutes() {
    const dispatch = useDispatch()
    const token = useSelector(selectCurrentUserToken)
    const {data: userData, error, isLoading} = useAuthenticateQuery(token, {skip: !token})

    useEffect(() => {
        if (!isLoading && userData?.data) {
            dispatch(setUser(userData.data))
        }
    }, [dispatch, userData]);

    return (<Routes>

        <Route exact path="/*" element={<UserLayout/>}/>
        <Route path="/auth" element={<AuthLayout/>}>
            <Route index={false}></Route>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
        </Route>
        <Route element={<RequireAdmin/>}>
            <Route path="admin/*" element={<AdminLayout />} />
        </Route>
    </Routes>);
}

export default MainRoutes;
