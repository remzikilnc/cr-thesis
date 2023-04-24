import {createSlice} from '@reduxjs/toolkit'

export const userStore = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        saveUser: (state, action) => {
                state.user = action.payload
        },
        removeUser: (state) => {
            state.user = null
        }
    },
})

export const {saveUser, removeUser} = userStore.actions

export default userStore.reducer
