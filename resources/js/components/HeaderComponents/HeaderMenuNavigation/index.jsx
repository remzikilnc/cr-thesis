import React from 'react';
import {HeaderMenuItem, HeaderMenuText} from "@/components/HeaderComponents/HeaderMenuNavigation/styles";

function HeaderMenuNavigation({items = [], title}) {
    return (
        <ul className={"flex flex-row items-center bg-transparent rounded-full"}>
            {items.map((item) => (
            <HeaderMenuItem key={item.id}>
                <HeaderMenuText to={item.link} textcolor={item.textColor} textactivecolor={item.textActiveColor} color={item.color} activecolor={item.activeColor}>{item.name}</HeaderMenuText>
            </HeaderMenuItem>
            ))}
        </ul>
    );
}

export default HeaderMenuNavigation;
