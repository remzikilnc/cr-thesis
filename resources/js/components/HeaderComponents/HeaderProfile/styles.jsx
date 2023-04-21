import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const NavbarProfilStyled = styled.div`
    display: flex;
    flex-direction:row;
    align-items:center;
  }
`;
export const NavbarProfileAvatar = styled.img`
    object-fit:cover;
    border-radius:9999px;
    height:3rem;
    width:3rem;
`

export const NavbarCollopseMenuNavLink = styled(NavLink).attrs((props) => ({
    activebgcolor: props.activebgcolor || '#111111',
    islastitem: props.islastitem,
}))`
    font-size:0.875rem;
    line-height:1.25rem;
    align-items:center;
    padding:0 0.5rem 0 0.5rem;
    height:2.5rem;
    display:flex;
    border-radius:5px;
        &.active {
            background: ${(props) => props.activebgcolor};
        }
`;

export const NavbarCollopseMenuButton = styled.button`
    width:100%;
    font-size:0.875rem;
    line-height:1.25rem;
    align-items:center;
    padding:0 0.5rem 0 0.5rem;
    height:2.5rem;
    display:flex;
    border-radius:5px;
    border-top:1px solid  ${props => props.activebgcolor ?? '#111111'};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
        &.active {
            background: ${props => props.activebgcolor ?? '#111111'};
        }
`;
