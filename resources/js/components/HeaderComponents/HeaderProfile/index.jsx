import React, {useEffect} from 'react';
import {Icon} from '@/assets/icons/Icons';
import {
    NavbarCollopseMenuButton,
    NavbarCollopseMenuNavLink,
    NavbarProfileAvatar,
    NavbarProfilStyled
} from "./styles";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeAuthUser} from "@/store/AuthStore";
import {Menu} from '@headlessui/react'
import Avatar from "@/assets/images/marvel.jpg"
import {attemptUserLogout} from "@/services/index";

function HeaderProfile() {
    const dispatch = useDispatch();
    const {authUser} = useSelector((state) => state.auth);
    const user = authUser.user;
    useEffect(() => {
    }, [authUser]);

    function logout() {
        attemptUserLogout({ Authorization: 'Bearer ' + authUser?.token?.access_token })
            .then(res => res)
            .catch(e => e)
        dispatch(removeAuthUser());
    }

    return (
        <Menu as="nav" className={"relative flex items-center w-full mx-4"}>
            <div className="user-infos flex items-center justify-center">
                            <span className="avatar min-w-[48px]">
                <NavLink to={'/profil'}>
                    {user.avatar && <NavbarProfileAvatar src={user.avatar} alt="logo"/>}
                    {/*Silinecek*/}
                    <NavbarProfileAvatar src={Avatar} alt="logo"/>
                    {/*Silinecek*/}
                </NavLink>
            </span>
            </div>
            <Menu.Button className={"flex text-left justify-center items-center h-full"}>
                <div className="user mr-2 ml-3 w-[172px]">
                    {user.first_name && user.last_name && <p className="truncate text-themeLighterPassive font-semibold text-sm break-words">{user.first_name +' '+ user.last_name}</p>}
                </div>
                    <span className={"dropdownIcon ml-auto cursor-pointer"}>
                        <Icon name={'dropdown'} fill={'#ffffff'} size={20}></Icon>
                    </span>
            </Menu.Button>
            <Menu.Items className={"absolute top-full right-0 bg-gray-100 rounded p-1  w-48 z-10"}>
                <Menu.Item>
                    {({active}) => (
                        <NavbarCollopseMenuNavLink to={'/profil'} activebgcolor={"#d0cece"} className={`${active && 'active'}`} href="#">
                            Profil
                        </NavbarCollopseMenuNavLink>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                        <NavbarCollopseMenuNavLink to={'/ayarlar'} activebgcolor={"#d0cece"} className={`${active && 'active'}`} href="#">
                            Ayarlar
                        </NavbarCollopseMenuNavLink>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                        <NavbarCollopseMenuButton onClick={logout} className={`${active && 'active'}`} activebgcolor={"#d0cece"}>
                            Oturumu Kapat
                        </NavbarCollopseMenuButton>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
}

export default HeaderProfile;
