import {createSlice} from '@reduxjs/toolkit'
import crypto from "crypto-js";
import JWTEncode from "jwt-encode";
import jwt_decode from "jwt-decode";

const getTokenFromLocal = () => {
    let localAppState = localStorage.getItem('cr.personal.token');
    if (localAppState) {
        let bytes = crypto.AES.decrypt(localAppState, 'crthesisSecret');
        try {
            let jwtEncodedData = bytes.toString(crypto.enc.Utf8);
            return jwt_decode(jwtEncodedData);
        } catch (error) {
            // Eğer hata olursa, token değeri null döndürün.
            return null;
        }
    } else {
        return null;
    }
};


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: getTokenFromLocal(),
        user: null,
    } ,
    reducers: {
        setCredentials: (state, action) => {
            try {
                const data = action.payload;
                const jwtEncodedData = JWTEncode(data.token, 'secret');
                localStorage.setItem('cr.personal.token', crypto.AES.encrypt(jwtEncodedData, "crthesisSecret").toString());
                state.token = jwt_decode(jwtEncodedData)
                state.user = data.user
            } catch (e) {
                state.token = null
                state.user = null
            }
        },
        logOut: (state) => {
            state.token = null
            state.user = null
            localStorage.removeItem('cr.personal.token');
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
})

export const {setCredentials, logOut, setUser} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentUserToken = (state) => state.auth.token
