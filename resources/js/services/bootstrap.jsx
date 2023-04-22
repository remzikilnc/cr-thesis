import {get} from './Main/request'
import crypto from "crypto-js";

export const getBootstrap = async () => {
    try {
        const res = await get(import.meta.env.VITE_APP_API_URL + 'bootstrap-data');
        return JSON.parse(crypto.enc.Utf8.stringify(crypto.enc.Base64.parse(res.data)))
    } catch (error) {
        return error
    }
}
