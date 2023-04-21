import React from 'react';
import {LinkNavButtonStyles}  from "./styles";

function LinkButton({to, className,title, style}) {
    return (
        <LinkNavButtonStyles style={style} to={to} className={className}>{title}</LinkNavButtonStyles>
    );
}

export default LinkButton;
