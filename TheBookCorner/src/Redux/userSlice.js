import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        currentUser: null,
        isFetching: false,
        error: false
    },

    reducers: {
        loginStart:(state)=>{
            state.isFetching = true
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false,
            state.currentUser = action.payload
        },
        loginFail:(state)=>{    
            state.isFetching = false,
            state.error = true
        },

        updateStart:(state)=>{
            state.isFetching = true
        },

        update: (state, action) => {
            state.currentUser.username = action.payload.username;
            state.currentUser.email = action.payload.email,
            state.currentUser.img = action.payload.img,
            state.isFetching = false
        },

        updateFail:(state)=>{
            state.isFetching = false,
            state.error = true
        },

        logout:(state, action)=>{
            state.isFetching = false,
            state.currentUser = null,
            state.error = false
        },
    }
})


export const {loginStart, loginSuccess, loginFail, logout, update, updateStart, updateFail} = userSlice.actions
export default userSlice.reducer