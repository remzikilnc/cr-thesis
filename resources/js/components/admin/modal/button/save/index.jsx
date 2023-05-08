import React from 'react';

function ModalDefaultButton({name = 'Save', onClick, disabled, className = ''}) {
    return (
        <button
            type="submit"
            onClick={onClick}
            disabled={disabled}
                className={`${className} linear rounded-xl bg-green-400 px-5 py-2 !text-black font-medium transition
                duration-200 hover:bg-green-500 dark:bg-green-800 dark:hover:bg-green-500 dark:text-white`}>
            {name}
        </button>
    );
}

export default ModalDefaultButton;
