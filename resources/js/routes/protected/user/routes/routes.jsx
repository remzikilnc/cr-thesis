import React from "react";

import {
    MdHome,
    MdPerson,
} from "react-icons/md";
import UserHome from "@/views/user/home";
import UserProfileOverview from "@/views/user/profile";

const userRoutes = [
    {
        name: "Home",
        layout: "",
        path: "",
        auth: false,
        icon: <MdHome className="h-6 w-6" />,
        component: <UserHome />,
    },
    {
        name: "Profile",
        layout: "",
        path: "profile",
        auth: true,
        icon: <MdPerson className="h-6 w-6"/>,
        component: <UserProfileOverview/>,
    }
];
export default userRoutes;
