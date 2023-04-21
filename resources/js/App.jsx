// resources/js/App.jsx
import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import Main from "./routes/Router";

export default function App(){
    return(
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    );
}
