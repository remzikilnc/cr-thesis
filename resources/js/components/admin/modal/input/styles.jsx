import styled from "styled-components";

export const ModalDefaultInputStyled = styled.input`
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

export const ModalDefaultSelectStyled = styled.select`
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



export const ModalDefaultLabelStyled = styled.label`
    display:flex;
    color:black;
    margin-bottom:0.25rem;
    font-size: 0.875rem;
`;
