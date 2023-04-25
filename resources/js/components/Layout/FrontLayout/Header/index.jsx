import React, {memo, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Icon} from '@/assets/icons/Icons';
import MainLogo from "@/assets/logos/logo.svg"
import {MobileMenu, NavbarVertical, VerticalMenu} from "./styles";
import LinkButton from "@/components/CustomFormComponents/LinkButton";
import {useNavigate} from "react-router-dom";
import HeaderLogo from "@/components/HeaderComponents/HeaderLogo";
import HeaderMenuNavigation from "@/components/HeaderComponents/HeaderMenuNavigation";
import HeaderProfile from "@/components/HeaderComponents/HeaderProfile";
import HeaderAuthButtons from "@/components/HeaderComponents/HeaderAuthButtons";
import Color from "@/constants/colors";
import color from "@/constants/colors";
import {selectCurrentUser} from "@/store/auth/authSlice";


function FrontHeader() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser)
/*
    useEffect(() => {
        window.addEventListener('storage', function () {
            navigate('/login');
        });
    }, []);*/

    /*
            const handleLocalStorageChange = () => {
                const localStorageAuthUser = localStorage.getItem('authUser');
                console.log(localStorageAuthUser)
                console.log(authUser)
                if (localStorageAuthUser && localStorageAuthUser !== JSON.stringify(authUser)) {
                    console.log('q')
                    dispatch(removeToken());
                    navigate('/');
                }
            };*/

    const headerMenuItems={
        title:'Home',
        items:[
            {
                id:1,
                name:"Test",
                slug:'Test',
                link:'/',
                color:'transparent',
                activeColor:'transparent',
                textColor:color.themePassive,
                textActiveColor:color.themeActive
            },
            {
                id:2,
                name:"Test2",
                slug:'Test2',
                link:'/Test2',
                color:'transparent',
                activeColor:'transparent',
                textColor:color.themePassive,
                textActiveColor:color.themeActive
            },
            {
                id:3,
                name:"Test33",
                slug:'Test33',
                link:'/Test33',
                color:'transparent',
                activeColor:'transparent',
                textColor:color.themePassive,
                textActiveColor:color.themeActive
            }
        ]

    }

    return (
        <header className={"flex flex-row w-full"}>
        <div className="min-w-[260px]" style={{background:color.themeDarkPrimary}}>
            <HeaderLogo logo={MainLogo} alt={"logo"}></HeaderLogo>
        </div>
        <NavbarVertical bg={color.themeBlack} border={'#17161b'}>
            <VerticalMenu>
                <MobileMenu className="lg:hidden" data-toggle="modal" data-target="#aside">
                    {/*styyle lazm*/}
                </MobileMenu>
                <HeaderMenuNavigation items={headerMenuItems.items} title={headerMenuItems.title}/>
            </VerticalMenu>
            <VerticalMenu>
                <MobileMenu>{/*styyle lazm*/}</MobileMenu>
                {user && <ul className={"flex flex-row items-center "}>
                    <li className={"mr-[25px] ml-[25px] items-center flex"}>
                        <button>
                            <Icon name={'notification'} fill={Color.themeLighterPassive} size={21}></Icon>
                        </button>
                    </li>
                    <li className={"mr-[25px] ml-[25px] items-center flex"}>
                        <button>
                            <Icon name={'bookmark'} fill={Color.themeLighterPassive} size={21}></Icon>
                        </button>
                    </li>
                </ul>}
            </VerticalMenu>
        </NavbarVertical>
        <div className="shrink-0 flex min-w-[300px]" style={{background:color.themeDarkPrimary}}>
            {user ? <HeaderProfile/> :
                <nav className={"flex items-center justify-end w-full"}>
                <HeaderAuthButtons title={'Oturum Aç'} link={'/login'} bgColor={Color.darkdrop} />
                    <HeaderAuthButtons title={'Kayıt ol'} link={'/register'} />
                </nav>
            }
        </div>
    </header>
    );
}

export default memo(FrontHeader);
