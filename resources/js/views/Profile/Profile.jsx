import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";


function Profile(props) {
    const [count, setCount] = useState(1);
    const [count2, setCount2] = useState(5);

    useEffect(()=>{
        console.log('BURASI ÇALIŞTI')
    },[])

    const increment = () =>{
        setCount(count+1);
    }
    const decrement = () =>{
        setCount(count-1);
    }

    const increment2 = () =>{
        setCount2(count2+1);
    }
    const decrement2 = () =>{
        setCount2(count2-1);
    }

    const {authUser} = useSelector((state) => state.auth);
    return (
        <>
            <div className="mb-10 text-white">{authUser.user.email}</div>
            <div className="flex justify-center items-center">
                <button className={"p-5 bg-blue-50"} onClick={increment}>ARTIR</button>
                <div className="p-5 bg-blue-50">{count}</div>
                <button className={"p-5 bg-blue-50"} onClick={decrement}>AZALT</button>

                <button className={"p-5 bg-blue-50 ml-5"} onClick={increment2}>ARTIR</button>
                <div className="p-5 bg-blue-50">{count2}</div>
                <button className={"p-5 bg-blue-50"} onClick={decrement2}>AZALT</button>

            </div>

        </>
    );
}

export default Profile;
