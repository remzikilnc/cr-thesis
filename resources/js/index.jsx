import './bootstrap';
import '../css/app.css'
import ReactDOM from 'react-dom/client';
import React from "react";
import App from "./App";
import { Provider } from 'react-redux'
import {store} from "@/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App/>
    </Provider>,
);
