import React from 'react';
import LinkButton from "@/components/CustomFormComponents/LinkButton";

function HeaderAuthButtons({title, link, bgColor}) {
    return (
            <LinkButton to={link} className={`mr-4 text-xsm font-semibold text-white`} style={{background:bgColor}} title={title}/>
    );
}

export default HeaderAuthButtons;
