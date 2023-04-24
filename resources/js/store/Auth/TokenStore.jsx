import {createSlice} from '@reduxjs/toolkit'
import crypto from "crypto-js";
import JWTEncode from "jwt-encode";
import jwt_decode from "jwt-decode";
import {getTokenFromLocal} from "@/utils/AuthUtils";

export const tokenStore = createSlice({
    name: 'token',
    initialState: getTokenFromLocal,
    reducers: {
        saveToken: (state, action) => {
            try {
                const data = action.payload;
                const jwtEncodedData = JWTEncode(data, 'secret');
                const encryptedAppState = crypto.AES.encrypt(jwtEncodedData, "crthesisSecret").toString();
                localStorage.setItem('token', encryptedAppState);
                state.token = jwt_decode(jwtEncodedData)
            } catch (e) {

            }
        },
        removeToken: (state) => {
            state.token = null
            localStorage.removeItem('token')
        }
    },
})

export const {saveToken, removeToken} = tokenStore.actions

export default tokenStore.reducer
