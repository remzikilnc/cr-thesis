import React, {useState} from "react";
import {MdRefresh} from "react-icons/all";
import {useDebounce} from "@/utils/useDebounce";

function SingleCardWithIcon(props) {
    const {transparent} = props;
    const [isSpinning, setIsSpinning] = useState(false);
    const debouncedIsSpinning = useDebounce(isSpinning, 1000);

    const handleLocalClick = () => {
        if (!debouncedIsSpinning) {
            setIsSpinning(true);
            props.handleClick();
            setTimeout(() => {
                setIsSpinning(false);
            }, 1000);
        }
    };
    return (

        <button
            onClick={handleLocalClick}
            disabled={isSpinning}
            className={`flex items-center text-xl hover:cursor-pointer ${
                transparent
                    ? "bg-none text-white hover:bg-none active:bg-none"
                    : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
            } linear justify-center rounded-lg font-bold transition duration-200`}
        >
            <MdRefresh className={`${isSpinning ? "animate-spin" : ""} h-6 w-6`}/>
        </button>
    );
}

export default SingleCardWithIcon;
