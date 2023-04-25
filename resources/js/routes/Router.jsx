import React from 'react';
import { Route, Routes} from "react-router-dom";
import Register from "@/views/Auth/Register/Register";
import Login from "@/views/Auth/Login/Login";
import Home from "@/views/Home/Home";
import Profile from "@/views/Profile/Profile";
import FrontContainer from "@/containers/FrontContainer";
import AuthLayout from "@/components/Layout/AuthLayout";
import RequireAuth from "@/components/RequireAuth/RequireAuth";

function Main () {
    return(
        <Routes>
            <Route exact path="/" element={<FrontContainer/>}>
                <Route index={true} element={<Home/>}></Route>
            </Route>

            {/*-----Auth-----*/}
            <Route path="/" element={<AuthLayout/>}>
                <Route index={false}></Route>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
            </Route>
            {/*-----Auth END-----*/}
            <Route element={<RequireAuth/>}>
                <Route path="/profil" element={<Profile/>}/>
            </Route>
        </Routes>
    );
}

export default Main;
