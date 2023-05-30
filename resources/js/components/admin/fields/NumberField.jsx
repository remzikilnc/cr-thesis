import React from 'react';
import TextField from '@mui/material/TextField';

export default function NumberField(props) {
    const handleChange = (event) => {
        const value = event.target.value;
        if (isNaN(value) || value < 0) {
            // Not a number or negative, ignore
            return;
        }

        // Pass the valid number up
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
