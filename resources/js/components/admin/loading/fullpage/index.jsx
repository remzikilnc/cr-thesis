import React from 'react';
import {HashLoader} from "react-spinners";

function FullPageLoading(props) {
    return (
        <div className="absolute bg-white top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center">
           <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">CR</h1>
            <HashLoader color="#422AFB"/>
        </div>
  );
}

export default FullPageLoading;
