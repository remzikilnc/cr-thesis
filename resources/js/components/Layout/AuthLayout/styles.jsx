import styled, {css} from "styled-components"
import {NavLink} from "react-router-dom";

export const AuthMain = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
`;

export const AuthNav = styled.div`
    display: inline-flex;
    width: 100%;
    background-color: rgb(145, 145, 145);
    font-weight:600;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
`;

export const AuthPresentation = styled(NavLink)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px 0;
    cursor: pointer;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    &.active{
    background:white;
  }
`;

export const AuthDiv = styled.div`
    width: 360px;
    z-index: 999;
    -webkit-animation-name: popIn;
    animation-name: popIn;
    -webkit-animation-duration: .8s;
    -webkit-animation-fill-mode: both;
    animation-duration: .8s;
    animation-fill-mode: both;
`;

export const NavbarBrand = styled.span`
    display: inline-block;
    padding-top: .3125rem;
    padding-bottom: .3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
`;


