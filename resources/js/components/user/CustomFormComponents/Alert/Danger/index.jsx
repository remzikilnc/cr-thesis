import React from 'react';

function AlertDanger({text}) {
    return (
        <div
            className="bg-red-100 border border-red-400 text-red-700 px-1 py-2 rounded relative mt-4"
            role="alert">
            <span className="block sm:inline">{text}</span>
        </div>
    );
}

export default AlertDanger;
