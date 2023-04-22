import {createSlice} from '@reduxjs/toolkit'
import crypto from "crypto-js";
import JWTEncode from "jwt-encode";
import jwt_decode from "jwt-decode";
import {getDecodedUser} from "@/utils/AuthUtils";

const initialState = {
    authUser: getDecodedUser(), //todo bunu app.blade içinde sağlanan window'dan al.
}

export const authStore = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveAuthUser: (state, action) => {
            try {
                const data = action.payload;
                const jwtEncodedData = JWTEncode(data, 'secret');
                const encryptedAppState = crypto.AES.encrypt(jwtEncodedData, "crthesisSecret").toString();
                localStorage.setItem('authUser', encryptedAppState);
                state.authUser = jwt_decode(jwtEncodedData)
            } catch (e) {

            }
        },
        removeAuthUser: (state) => {
            state.authUser = null
            let localAppState = localStorage.getItem('authUser')
            if (localAppState) {
                state.authUser = null
                localStorage.removeItem('authUser');
            }
        }
    },
})

export const {saveAuthUser, removeAuthUser} = authStore.actions

export default authStore.reducer
