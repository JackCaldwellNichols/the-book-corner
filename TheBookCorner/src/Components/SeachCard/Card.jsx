import React from 'react'
import './card.scss'
import { Link } from 'react-router-dom'


const Card = ({book}) => {
  return (
    <div className='card'>
        <Link to={`/book/${book._id}`} className='link'>
            <img src={book.img} alt={book.title} className='searchCardImg'/>
        </Link>
        <h5 className='searchCartTitle'>{book.title.length > 25 ? book.title.slice(0, 23) + '...' : book.title}</h5>
    </div>
  )
}

export default Card