import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './login.scss'
import { login } from '../../Redux/apiCalls'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd';
import Footer from '../../Components/Footer/Footer'

const Login = () => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [err, setErr] = useState(false)
const [message, setMessage] = useState('')
const navigate = useNavigate()
const dispatch = useDispatch()
const {isFetching, error} = useSelector((state) => state.user)


const handleSubmit = (e) => {
    e.preventDefault()
    login(dispatch, {email, password}, navigate, setErr, setMessage)
}
  return (
    <div className='login'>
        <div className="wrapper">
            <h1>The Book Corner</h1>
            <form onSubmit={handleSubmit}>
                <div className="top">
                    <label htmlFor="email">Email</label>
                    <input type='email' id='email' placeholder='Email' onChange={(e) =>setEmail(e.target.value)}/>
                </div>
                <div className="bottom">
                    <label htmlFor="password">Password</label>
                    <input type='password' id='password' placeholder='Password' onChange={(e) =>setPassword(e.target.value)}/>
                </div>
                <div className="logBtnContainer">
                    {isFetching ? (
                        <button className='loginBtn' type='submit'><Spin /></button>
                        
                    ) : (
                        <button className='loginBtn' type='submit'>Login</button>
                    )}
                    {err && <span className='loginError'>{message}</span>}
                </div>
                
            </form>

        </div>
    </div>
  )
}

export default Login