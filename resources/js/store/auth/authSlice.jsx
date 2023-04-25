import {createSlice} from '@reduxjs/toolkit'
import crypto from "crypto-js";
import JWTEncode from "jwt-encode";
import jwt_decode from "jwt-decode";
import {getTokenFromLocal} from "@/utils/AuthUtils";

export const authStore = createSlice({
    name: 'auth',
    initialState: {
        token:getTokenFromLocal,
        user: null
    } ,
    reducers: {
        saveToken: (state, action) => {
            try {
                const data = action.payload;
                const token = data.token;
                const jwtEncodedData = JWTEncode(token, 'secret');
                const encryptedAppState = crypto.AES.encrypt(jwtEncodedData, "crthesisSecret").toString();
                localStorage.setItem('cr.personal.token', encryptedAppState);
                state.token = jwt_decode(jwtEncodedData)
                state.user = data.user
            } catch (e) {

            }
        },
        removeToken: (state) => {
            state.token = null
            state.user = null
            localStorage.removeItem('cr.personal.token');
        }
    },
})

export const {saveToken, removeToken} = authStore.actions

export default authStore.reducer
