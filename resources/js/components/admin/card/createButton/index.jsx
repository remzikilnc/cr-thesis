import React from "react";
import Dropdown from "@/components/admin/dropdown";
import {BsFilePlus} from "react-icons/bs";

function CreateButton(props) {
    const [open, setOpen] = React.useState(false);
    return (
        <Dropdown
            button={
                <button
                    onClick={() => setOpen(!open)}
                    open={open}
                    className={"flex mx-2 items-center text-xl hover:cursor-pointer bg-lightPrimary p-2 text-black hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 linear justify-center rounded-lg font-bold transition duration-200"}
                >
                    <BsFilePlus className="h-6 w-6" />
                </button>
            }
            animation={"origin-top-right transition-all duration-300 ease-in-out"}
            classNames={'right-0 w-max'}
        />
    );
}

export default CreateButton;
