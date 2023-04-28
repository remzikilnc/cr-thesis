import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {AuthDiv, AuthMain, AuthNav, AuthPresentation, NavbarBrand} from "./styles";
import {useSelector} from "react-redux";
import {Icon} from "@/assets/icons/Icons";
import ParticlesEffect from "@/components/user/Particles/ParticlesEffect";

function AuthLayout(props, {appName = "CRThesis"}) {
    const navigate = useNavigate();

    const { authUser } = useSelector((state) => state.auth);
    useEffect(() => {
        if (authUser?.isLoggedIn){
            navigate('/')
        }
    }, [authUser]);


    return (
        <>
            <main className={"flex-auto overflow-auto"}>
                <AuthMain>
                    <AuthDiv>
                        <div className="mb-9">
                            <NavbarBrand className="text-white">
                        <span className={"inline-block align-top mr-2"}>
                        <Icon name={"favicon"} size={"30"}></Icon>
                        </span>
                                {appName}
                            </NavbarBrand>
                        </div>
                        <AuthNav className={"mb-5"}>
                            <AuthPresentation to={"login"} end>
                                Giriş Yap
                            </AuthPresentation>
                            <AuthPresentation to={"register"}>
                                Kayıt Ol
                            </AuthPresentation>
                        </AuthNav>
                        <Outlet></Outlet>
                    </AuthDiv>
                </AuthMain>
                <ParticlesEffect/>
            </main>
        </>
       );
}

export default AuthLayout;
