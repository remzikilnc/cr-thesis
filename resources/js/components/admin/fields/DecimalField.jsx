import React from 'react';
import TextField from '@mui/material/TextField';

export default function DecimalField(props) {
    const handleChange = (event) => {
        const value = event.target.value;
        if (isNaN(value) || value < 0) {
            // Not a number or negative, ignore
            return;
        }

        const parts = value.split('.');
        if (parts.length > 2 || (parts.length === 2 && parts[1].length > 2)) {
            // More than one decimal point, or more than two decimal places, ignore
            return;
        }

        // Pass the valid decimal up
        if (props.onChange) {
            props.onChange(event);
        }
    }

    return (
        <TextField
            {...props}
            onChange={handleChange}
        />
    );
}
