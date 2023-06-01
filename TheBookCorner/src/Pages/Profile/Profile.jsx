import React, { useState, useEffect } from 'react'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import storage from '../../Firebase/firebase'
import './profile.scss'
import { useSelector, useDispatch} from 'react-redux'
import { EditOutlined } from '@ant-design/icons'
import { useLocation, Link } from 'react-router-dom'
import { updateDetails } from '../../Redux/apiCalls'
import { Spin } from 'antd';
import axios from 'axios'
import Review from '../../Components/Review/Review.jsx'




const Profile = () => {

const user = useSelector((state) => state.user.currentUser)    
const location = useLocation()
const path = location.pathname.split('/')[2]
const dispatch = useDispatch()
const [username, setUserName] = useState(user.username)
const [email, setEmail] = useState(user.email)
const [password, setPassword] = useState(user.password)
const [file, setFile] = useState(null)
const [img, setImg] = useState('')
const [reviews, setReviews] = useState([])
const {isFetching, error} = useSelector((state) => state.user)

const handleSubmitImage = async (e) => {
  e.preventDefault()
  const imageRef = ref(storage, `${user.username}/image`)
  await uploadBytes(imageRef, file).then(() => {
    getDownloadURL(imageRef).then((url) => {
      setImg(url)
      try {
         updateDetails(dispatch, path, {userId:user._id, img})
      } catch (error) {
        console.log(error)
      }
    }).catch(error   => {
      console.log(error.message, "Error obtaining image URL")
    })

    setFile(null)
  })
  .catch(error   => {
    console.log(error.message, "Error obtaining image URL")
  })
}

const handleSubmitDetails = (e) => {
  e.preventDefault()
  updateDetails(dispatch, path, {userId:user._id, username, email, password})
}


useEffect(() => {
  const fetchReviews = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_SERVER_URL + `/reviews/${path}`)
      setReviews(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  fetchReviews()
}, [])


console.log(img)

  return (
    <div className='profile'>
      <div className="wrapper">
        <div className="top" >
          <h2>Hi, {user.username}!</h2>
          <img src={file ? URL.createObjectURL(file) :  (user.img ? user.img : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')} alt={user.username} className='profilePic'/>
          <label htmlFor="image" className='editPencil'> <EditOutlined /></label>
          <input type="file" hidden id='image' onChange={(e)=>setFile(e.target.files[0])}/>
          {file && (
           
            <button type='submit' onClick={handleSubmitImage}>Update Picture</button>
          )}
          
        </div>
        <form className="bottom" onSubmit={handleSubmitDetails}>
          <div className="bioItem">
            <label htmlFor="email">Email</label>
            <input type="email"  id='email' placeholder={user.email} value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="bioItem">
            <label htmlFor="username">Username</label>
            <input type="text"  id='username' placeholder={user.username} value={username} onChange={(e) => setUserName(e.target.value)}/>
          </div>
          <div className="bioItem">
            <label htmlFor="password">Password</label>
            <input type="password"  id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          {isFetching ? (
            <button type='submit'><Spin /></button>
          ) : (
            <button type='submit'>Update</button>
          )}
        </form>
      </div>
      <div className="reviews">
        <div className="top">
          <h2>Your reviews</h2>
        </div>
        <div className="reviewList">
            <Review reviews={reviews}/>
        </div>
        <div className="addReview">
          <Link to={`/write`}>
            <button>Add a review</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile