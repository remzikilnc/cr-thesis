import crypto from "crypto-js";
import jwt_decode from "jwt-decode";

export const getDecodedUser = () => {
    let localAppState = localStorage.getItem('authUser')
    if (localAppState) {
        let bytes = crypto.AES.decrypt(localAppState, 'crcrypto')
        try {
            let jwtEncodedData = bytes.toString(crypto.enc.Utf8)
            return jwt_decode(jwtEncodedData)
        } catch (e) {
            return null;
        }
    }
}
