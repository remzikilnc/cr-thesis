import { configureStore } from '@reduxjs/toolkit'
import authStore from "@/store/AuthStore";

export const store = configureStore({
    reducer: {
        auth: authStore,
    },
})
