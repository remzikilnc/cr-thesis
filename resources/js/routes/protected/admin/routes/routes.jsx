import React from "react";

// Admin Imports
import MainDashboard from "@/views/admin/default";
import AdminProducts from "@/views/admin/products";
import Profile from "@/views/admin/profile";
import DataTables from "@/views/admin/tables";
import UsersList from "@/views/admin/users";
import EditProduct from "@/views/admin/products/edit";

// Icon Imports
import {
    MdHome,
    MdOutlineShoppingCart,
    MdBarChart,
    MdPerson,
    MdLock, MdPeopleAlt,
} from "react-icons/md";

const adminRoutes = [
    {
        name: "Main Dashboard",
        layout: "/admin",
        path: "default",
        icon: <MdHome className="h-6 w-6" />,
        component: <MainDashboard />,
    },
    {
        name: "Users",
        layout: "/admin",
        icon: <MdPeopleAlt className="h-6 w-6" />,
        path: "users",
        component: <UsersList />,
    },
    {
        name: "Products",
        layout: "/admin",
        path: "products",
        icon: <MdOutlineShoppingCart className="h-6 w-6" />,
        component: <AdminProducts />,
        secondary: true,
    },
    {
        name: "Edit Product",
        layout: "/admin",
        path: "products/:id",
        component: <EditProduct/>,
        hidden: true,
    },
    {
        name: "Data Tables",
        layout: "/admin",
        icon: <MdBarChart className="h-6 w-6" />,
        path: "data-tables",
        component: <DataTables />,
    },

    {
        name: "Profile",
        layout: "/admin",
        path: "profile",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profile />,
    }
];
export default adminRoutes;
