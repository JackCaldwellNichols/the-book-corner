import axios from 'axios'
import {loginStart, loginSuccess, loginFail, logout, update, updateStart, updateFail} from './userSlice.js'



export const login = async (dispatch, {email, password}, navigate, setErr, setMessage ) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(import.meta.env.VITE_SERVER_URL + '/auth/login', {email, password})
        dispatch(loginSuccess(res.data))
        navigate('/')
    } catch (error) {
        console.log(error)
        dispatch(loginFail())
        setErr(true)
        setMessage(error.response.data)
    }
}

export const updateDetails = async (dispatch, path, {userId, email, username, password, img}) => {
     dispatch(updateStart())
    try {
        const res = await axios.put(import.meta.env.VITE_SERVER_URL + `/user/${path}`, {userId, email, username, password, img})
        dispatch(update(res.data))
    } catch (error) {
        console.log(error)
        dispatch(updateFail())
    }
}


export const leave = async (dispatch, user) => {
    try {
        await dispatch(logout())
        navigate('/')
    } catch (error) {
        console.log(error)
     
    }
}


