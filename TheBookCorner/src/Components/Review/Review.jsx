import React from 'react'
import './review.scss'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';



const Review = ({reviews}) => {
  const user = useSelector((state) => state.user.currentUser)
  const handleDelete = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_SERVER_URL + `/reviews/${id}`)
      window.location.replace(`/profile/${user._id}`)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='reviewCard'>
        {reviews.map((review) => (
            <div className="reviewBody">
                <h3><strong>{review.title}</strong></h3>
                <p>{review.desc}</p>
                <div className='reviewIconsWrapper'>
                  <DeleteOutlined onClick={() => handleDelete(review._id)}/>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Review