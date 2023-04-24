import { configureStore } from '@reduxjs/toolkit'
import {tokenStore} from "@/store/Auth/AuthStore";
import {userStore} from "@/store/Auth/UserStore";
import authMiddleware from "@/middlewares/authMiddleware";

export const store = configureStore({
    reducer: {
        token: tokenStore,
        user: userStore,
    },
    middleware:authMiddleware,
})
