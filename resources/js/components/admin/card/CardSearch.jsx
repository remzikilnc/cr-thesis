import React from 'react';
import InlineSearchBar from "@/components/admin/search";
import OrderByComponent from "@/components/admin/card/orderby";
import CreateButton from "@/components/admin/card/createButton";

function CardSearch(props) {
    const {InputChange, placeholder} = props
    const {setOrderBy, setIsDescending} = props
    return (
        <div className="pb-6 pt-4 mt-2 mb-5 rounded-[20px] flex flex-col px-4 md:flex-row bg-white dark:!bg-navy-800">
            <div className="grid h-full w-full ">
                <div
                    className="!z-5 relative flex flex-col  bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:shadow-none w-full h-full">
                    <header className="relative flex items-center justify-between">
                        <InlineSearchBar handleInputChange={InputChange} placeholder={placeholder}></InlineSearchBar>
                        <div className="z-20 flex">
                            <CreateButton />
                            <OrderByComponent setOrderBy={setOrderBy} setIsDescending={setIsDescending}/>
                        </div>
                    </header>
                </div>
            </div>
        </div>
    );
}

export default CardSearch;
