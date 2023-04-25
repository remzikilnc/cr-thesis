import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/store/auth/authSlice";


function Profile(props) {

    const user = useSelector(selectCurrentUser)
    console.log(user)

    return (
        <>
            <div className="mb-10 text-white">{user.email}</div>

        </>
    );
}

export default Profile;
