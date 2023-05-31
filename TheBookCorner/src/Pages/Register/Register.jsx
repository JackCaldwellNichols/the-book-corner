import React, { useState } from 'react'
import './register.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Spin } from 'antd';

const Register = () => {

const [email, setEmail] = useState('')
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [checkPassword, setCheckPassword] = useState('')
const [message, setMessage] = useState(null)
const [error, setError] = useState(false)
const navigate = useNavigate()




const handleSubmit = async (e) => {
    e.preventDefault()
        try {
            const res = await axios.post(import.meta.env.VITE_SERVER_URL + `/auth/register`, {email, username, password})
            console.log(res.data)
            navigate('/login')
        }catch (error) {
        console.log(error)
        setMessage(error.response.data)
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 5000)
        clearTimeout()

    }
}

  return (
    <div className='register'>
        <div className="wrapper">
            <h1>The Book Corner</h1>
            <form onSubmit={handleSubmit}>
                <div className="top">
                    <label htmlFor="email">Email</label>
                    <input type='email' id='email' placeholder='Email' onChange={(e) =>setEmail(e.target.value)} required/>
 
                    <label htmlFor="text">Username</label>
                    <input type='username' id='username' placeholder='Username' onChange={(e) =>setUsername(e.target.value)} required/>
                </div>
                <div className="bottom">
                    <label htmlFor="password">Password</label>
                    <input type='password' id='password' placeholder='Password' onChange={(e) =>setPassword(e.target.value)} required/>
                    <label htmlFor="checkPassword">Repeat Password</label>
                    <input type='password' id='checkPassword' placeholder='Repeat Password' onChange={(e) =>setPassword(e.target.value)} required/>
                </div>
                <div className='btnDiv'>
                    <button className='regBtn' type='submit'>Sign Up</button>
                    {error && <span className='errMess' style={{color: 'red'}}>{message}</span>}
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register