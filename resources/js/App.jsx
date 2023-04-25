// resources/js/App.jsx
import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import Main from "./routes/Router";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectCurrentUser, selectCurrentUserToken, setUser} from "@/store/auth/authSlice";
import {useAuthenticateQuery} from "@/store/api/authApiSlice";

export default function App(){
    const token = useSelector(selectCurrentUserToken);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const { data: userData, error, refetch } = useAuthenticateQuery(null, {
        skip: !token || user
    });


    useEffect(() => {
        if (userData?.data) {
            dispatch(setUser(userData.data));
        }
    }, [userData, dispatch]);

    useEffect(() => {
        if (error) {
            dispatch(logOut());
        }
    }, [error, dispatch]);
    return(

        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    );
}
