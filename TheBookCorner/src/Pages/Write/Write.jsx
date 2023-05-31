import React, {useState, useEffect} from 'react'
import './write.scss'
import axios from 'axios'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Spin } from 'antd';

const Write = () => {
const user = useSelector((state) => state.user.currentUser)
const location = useLocation()
const path = location.pathname.split('/')[2]
const navigate = useNavigate('')
const [loading, setLoading] = useState(false)
const [title, setTitle] = useState('')
const [desc, setDesc] = useState('')

const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const newReview = {
        userId: user._id,
        title: title,
        desc: desc
    }
    try {
        await axios.post(import.meta.env.VITE_SERVER_URL + `/reviews/`, newReview)
        setLoading(false)
        setDesc('')
        setTitle('')
    } catch (error) {
        console.log(error)
    }
}


  return (
    <div className='write'>
        <div className="wrapper">
            <h1>Your Review</h1>
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <input type="text" placeholder='Book Title' className='writeInput' autoFocus={true} value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="writeFormGroup">
                    <textarea type="text" placeholder='Your review...' className='writeInput writeText' value={desc} id="" cols="30" rows="10" onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
                {loading ? (
                   <button><Spin /></button>
                ) : (
                    <button type='submit'>Post</button>
                )}
                <Link to={`/profile/${path}`}>
                    <button>Back to Profile</button>
                </Link>
            </form>
        </div>

    </div>
  )
}

export default Write