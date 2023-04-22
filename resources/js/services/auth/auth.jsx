import {post} from "../main/request"
export const attemptUserLogin = (data) => post(import.meta.env.VITE_APP_API_URL + 'auth/login', data);
export const attemptUserLogout = (customHeaders = {}) => post(import.meta.env.VITE_APP_API_URL + 'auth/logout', false, customHeaders);
export const attemptUserRegister = (data) => post(import.meta.env.VITE_APP_API_URL + 'auth/register', data);
