import React from 'react';
import {ModalDefaultInputStyled, ModalDefaultLabelStyled} from "@/components/admin/modal/input/styles";
import LayoutAlert from "@/components/admin/alert";

function ModalDefaultInput({
                               name = '',
                               label = '',
                               placeholder = '',
                               type = 'text',
                               value,
                               onChange,
                               errors,
                               touched,
                               onBlur
                           }) {
    return (<div className="mb-4 ">
        <ModalDefaultLabelStyled htmlFor={name}>{label}</ModalDefaultLabelStyled>
        <ModalDefaultInputStyled
            className={errors && touched ? "border border-red-400 placeholder-red-400" : ""}
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onBlur={onBlur}
            value={value}
            onChange={onChange}>
        </ModalDefaultInputStyled>
        {(errors && touched) && <LayoutAlert type={'warning'} desc={errors}/>}
    </div>);
}

export default ModalDefaultInput;
