import React from 'react';
import {MdDangerous, MdDone, MdInfo, MdWarning} from "react-icons/md";
import {background} from "@chakra-ui/system";

function LayoutAlert({type, head, desc}) {

    const getIconPath = (type) => {
        switch (type) {
            case 'success':
                return (
                    <MdDone color={'#42ba96'} size={"18"} className={"text-blue-400"}/>
                );
            case 'warning':
                return (
                    <MdWarning color={'#e25656'} size={"18"} className={"text-blue-400"}/>
                )
            case 'error':
                return (
                    <MdDangerous color={'#bb2124'} size={"18"} className={"text-blue-400"}/>
                )
            default:
                return (
                    <MdInfo color={'#5bc0de'} size={"18"} className={"text-blue-400"}/>
                );
        }
    };

    const getAlertBoxColor = (type) => {
        switch (type) {
            case 'success':
                return (
                    'bg-green-200'
                );
            case 'warning':
                return (
                    'bg-yellow-100'
                )
            case 'error':
                return (
                    'bg-red-100'
                )
            default:
                return (
                    'bg-blue-100'
                );
        }
    };

    return (<div className={`border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md ${getAlertBoxColor(type)}`}
                 role="alert">
            <div className="flex">
                <div className="py-1">
                    {getIconPath(type)}
                </div>
                <div>
                    <p className="font-bold">{head}</p>
                    <p className="text-sm">{desc}</p>
                </div>
            </div>
        </div>);
}

export default LayoutAlert;
