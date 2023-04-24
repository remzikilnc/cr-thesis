import crypto from "crypto-js";
import jwt_decode from "jwt-decode";

export const getTokenFromLocal = () => {
    let localAppState = localStorage.getItem('token')
    if (localAppState) {
        let bytes = crypto.AES.decrypt(localAppState, 'crthesisSecret')
        try {
            let jwtEncodedData = bytes.toString(crypto.enc.Utf8)
            return jwt_decode(jwtEncodedData)
        } catch (e) {
            return null;
        }
    }
}
