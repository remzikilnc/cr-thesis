import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {selectCurrentUserToken, setUser} from "@/store/auth/authSlice";
import {useAuthenticateQuery} from "@/store/api/authApiSlice";

import FrontContainer from "@/containers/FrontContainer";
import Home from "@/views/Home/Home";
import Login from "@/views/auth/login";
import Register from "@/views/auth/register";
import RequireAuth from "@/routes/protected/user";
import Profile from "@/views/user/profile";
import RequireAdmin from "@/routes/protected/admin";
import AuthLayout from "@/layouts/auth";
import AdminLayout from "@/layouts/admin";



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

        {/*-----MAIN PAGES-----*/}
        <Route exact path="/" element={<FrontContainer/>}>
            <Route index={true} element={<Home/>}></Route>
        </Route>
        {/*-----MAIN PAGES END-----*/}

        {/*-----AUTH PAGES-----*/}
        <Route path="/" element={<AuthLayout/>}>
            <Route index={false}></Route>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
        </Route>
        {/*-----AUTH PAGES END-----*/}

        {/*-----NEEDED AUTH -----*/}
        <Route element={<RequireAuth/>}>
            <Route path="/profil" element={<Profile/>}/>
        </Route>
        {/*-----NEEDED AUTH END-----*/}

        {/*-----NEEDED ADMIN ROLE-----*/}
        <Route element={<RequireAdmin/>}>
            <Route path="admin/*" element={<AdminLayout />} />
        </Route>
        {/*-----NEEDED ADMIN ROLE END-----*/}

    </Routes>);
}

export default MainRoutes;
