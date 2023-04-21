import styled from "styled-components";
import {Link} from "react-router-dom";

export const LinkNavButtonStyles = styled(Link)`
    color: #fff;
    background-color: #fc3404;
    display: inline-block;
    transition: all 0.3s ease-in-out 0s;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight:400;
    padding:.575rem .75rem;
    &:hover{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px 0px;
    color: #fff;
    background-color: #b72300;
    }
`;
