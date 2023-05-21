import React, {useState} from "react";
import Card from "@/components/admin/card";
import {MdClose, MdModeEditOutline} from "react-icons/md";

const ProductCard = ({title, description, price, quantity, code, poster, images, backdrop, extra, handleDelete}) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleModify = () => {

    }
    const posterImage = images.find(image => image.type === 'poster');
    const backdrops = images.filter(image => image.type === 'backdrop');
    return (
        <div className="flex flex-row-reverse relative">
            {isHovered &&
                <p className={"flex justify-center items-center w-full h-full absolute mr-10 text-xl font-semibold text-red-500 dark:text-red-500"}>
                    <span className="z-10">This item will be deleted.</span></p>}
            <button
                className={"bg-red-200 hover:px-5 dark:bg-pink-950 z-10 right-0 rounded-l-none px-1 xl:px-2 rounded-[20px] items-center justify-center text-gray-600 dark:text-white"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleDelete}>
                <MdClose size={"18"} className={"text-red-400 dark:text-white"}/>
            </button>
            <button
                className={"hover:px-5 bg-blue-200 dark:bg-blue-800 right-0 px-1 xl:px-2 z-10 items-center justify-center text-gray-600 dark:text-white"}
                onClick={() => handleModify()}>
                <MdModeEditOutline size={"18"} className={"text-blue-400 dark:text-white"}/>
            </button>
            <Card
                extra={`flex flex-col w-full h-full !rounded-r-none ${isHovered ? 'blur-sm' : ''} !p-4 3xl:p-![18px] bg-white ${extra}`}
            >
                <div className="h-full w-full flex flex-row">
                    <div className="h-full relative w-1/6">
                        <img
                            src={posterImage ? window.location.origin + '/' + posterImage.url : poster}
                            className="h-full w-full rounded object-cover rounded-xl"
                            style={{ width: "300px", height: "230px" }}
                            alt={title + ' poster'}
                        />
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <div
                            className="ml-3 flex items-center justify-between px-1 flex-col items-start flex-col items-start ">
                            <div className="mb-2">
                                <p className="xl:text-lg text-xs font-bold text-navy-700 dark:text-white ">
                                    {" "}
                                    {title}{" "}
                                </p>
                                <p className="mt-1 pr-10 text-xs xl:text-md font-medium text-gray-600 md:mt-2 line-clamp-2 ">
                                    {description}
                                </p>
                            </div>
                            <div className="flex start-0 self-start md:mt-2 lg:mt-0 flex-row-reverse">
                                {backdrops.length > 3 && <span
                                    className="z-0 ml-[-2px] xl:ml-[-10px] w-[50px]
                                    ml-px inline-flex max-h-[90px] xl:w-[90px] items-center
                                    justify-center rounded border-2 border-white bg-[#E0E5F2]
                                    text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800
                                    dark:text-white"
                                >
                                    +{backdrops.length - 3}
                                </span>}
                                {backdrops.slice(0, 3).map((img, key) => (
                                    <span
                                    key={key}
                                    className="z-10 -mr-5 max-h-[100px] max-w-[100px] rounded border-2
                                     border-white dark:!border-navy-800 shadow-2xl"
                                >
                                    <img
                                    className="h-full w-full rounded object-cover"
                                    src={`${window.location.origin}/${img.url}`}
                                    style={{width: "90px", height: "85px"}}
                                    alt={title + ' images'}
                                />
                                </span>))}
                            </div>
                        </div>
                        <div className="flex items-center flex-col justify-center">
                            <div className="flex items-center w-full mb-5 rounded drop-shadow-2xl shadow-inner ">
                                <p className="text-sm font-bold text-black dark:text-white linear text-base font-medium transition duration-200 drop-shadow-2xl">
                                    <span className=" flex flex-row justify-center items-center shadow-xl">
                                        <span
                                            className={"bg-navy-700 text-white dark:bg-navy-700 rounded items-center justify-center flex p-1 mr-1 shadow-inner text-xs xl:text-md"}>Price:</span> {price}TL
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center w-full mb-5 rounded drop-shadow-2xl shadow-inner">
                                <p className="text-sm font-bold text-black dark:text-white linear text-base font-medium transition duration-200 drop-shadow-2xl">
                                    <span className="flex flex-row justify-center items-center shadow-xl">
                                        <span
                                            className={"bg-navy-700 text-white dark:bg-navy-700 rounded items-center justify-center flex p-1 mr-1 shadow-inner text-xs xl:text-md"}>Code:</span> {code}TL
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center w-full mb-5 rounded drop-shadow-2xl shadow-inner">
                                <p className="text-sm font-bold text-black dark:text-white linear text-base font-medium transition duration-200 drop-shadow-2xl">
                                    <span className="flex flex-row justify-center items-center shadow-xl">
                                        <span
                                            className={"bg-navy-700 text-white dark:bg-navy-700 rounded items-center justify-center flex p-1 mr-1 shadow-inner text-xs xl:text-md"}>Quantity:</span> {quantity}
                                    </span>
                                </p>
                            </div>
                            {/*                            <button
                                className="linear rounded-md bg-navy-700 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
                            >
                                Details
                            </button>*/}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProductCard;
