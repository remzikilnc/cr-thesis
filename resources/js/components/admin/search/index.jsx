import React, {useEffect, useState} from 'react';
import {FiSearch} from "react-icons/fi";
import {useDebounce} from "@/utils/useDebounce";

function InlineSearchBar({handleInputChange, placeholder = 'Search..'}) {

    useDebounce()

    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue, 750);

    useEffect(() => {
        const trimmedValue = debouncedInputValue.trim();
        handleInputChange(trimmedValue);
    }, [debouncedInputValue, handleInputChange]);

    const handleLocalInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };

    return (
        <div
            className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white w-[50%]">
            <p className="pl-3 pr-2 text-xl">
                <FiSearch className="h-4 w-4 text-gray-400 dark:text-white"/>
            </p>
            <input
                type="text"
                placeholder={placeholder}
                onInput={handleLocalInputChange}
                className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white pr-3"
            />
        </div>
    );
}

export default InlineSearchBar;
