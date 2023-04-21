import styled from "styled-components";

export const Card = styled.div`
    transition: all 0.4s ease-in-out 0s;
    display: inline-block;
    vertical-align: middle;
    background: transparent;
    border-color: transparent;
    margin-bottom: 30px;
    position: relative;
    width: 100%;
`;
export const Body = styled.div`
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    font-weight: 400;
    color: rgb(165, 168, 173);
    background: white;
    padding: 22px;
    border-top: 1px solid rgba(255, 255, 255, 0.09);
`;

export const LeadFont = styled.p`
    font-size: 20px;
    color:black;
    font-weight: 300;
`;

export const DefaultInput = styled.input`
    box-shadow: none;
    background-color: transparent;
    font-size: 14px;
    color: rgb(119, 121, 124);
    border-radius: 10px;
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-weight: 400;
    line-height: 1.5;
    background-clip: padding-box;
    border: 1px solid rgb(57, 61, 66);
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    &:focus{
    box-shadow: none;
    background: transparent;
    outline: none;
    border-color: rgb(87, 89, 93);
    }
`;

export const DefaultButton = styled.button`
    color: #fff;
    background-color: #fc3404;
    display: block;
    transition: all 0.3s ease-in-out 0s;
    border-radius: 10px;
    cursor: pointer;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    width: 100%;
    font-size: 14px;
    font-weight:600;
    padding:.575rem .75rem;
    &:hover{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px 0px;
    color: #fff;
    background-color: #b72300;
    }
`;

export const DefaultLabel = styled.label`
    display:flex;
    color:black;
    margin-bottom:0.25rem;
    font-size: 0.875rem;
`;

export const Link = styled.a`
    color: #fc3404;
    text-decoration: underline;
    font-weight:300;
    background-color: transparent;
    &:hover{
    color: #b72300;
    }
`;
