import React from 'react';
import {Link} from "react-router-dom";
import {HeaderLogoStyled} from "@/components/HeaderComponents/HeaderLogo/styles";

function HeaderLogo({logo = '', alt = 'logo'}) {
    return (
        <HeaderLogoStyled>
            <Link to={'/'} className={"px-6 justify-center items-center flex"}>
                <img className="h-11" src={logo} alt={alt}/>
            </Link>
        </HeaderLogoStyled>
    );
}

export default HeaderLogo;
