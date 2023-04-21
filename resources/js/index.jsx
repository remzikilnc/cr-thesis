import './bootstrap';
import '../css/app.css'
import ReactDOM from 'react-dom/client';
import React from "react";
import App from "./App";
import { store } from './store/Store'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App/>
    </Provider>,
);
