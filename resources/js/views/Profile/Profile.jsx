import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";


function Profile(props) {
    const [count, setCount] = useState(1);

    useEffect(()=>{
    })

    const increment = () =>{
        setCount(count+1);
    }
    const decrement = () =>{
        setCount(count-1);
    }

    const {authUser} = useSelector((state) => state.auth);
    return (
        <>
            <div className="mb-10 text-white">{authUser.user.email}</div>
        </>
    );
}

export default Profile;
