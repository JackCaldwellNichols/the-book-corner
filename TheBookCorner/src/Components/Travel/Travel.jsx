import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './travel.scss'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Travel = () => {


const [books, setBooks] = useState([])

useEffect(() => {
    const getBooks = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_SERVER_URL + '/books')
            setBooks(res.data)
        } catch (error) {
            console.log(error)
    }}
    getBooks()
}, [])


  return (
    <div className='travel'>
        <h1>Travel and Adventure</h1>
        <div className="wrapper">
            {books.map((book) => {
                if(book.genres.includes( 'travel')){
                    return (
                    <div className="card" key={book._id}>
                        <Link to={`/book/${book._id}`}>
                         <img src={book.img} alt={book.title}/>
                        </Link>
                        <div className="span">{book.title.length > 25 ? book.title.slice(0, 23) + '...' : book.title}</div>
                    </div>
                    )}
            })}
        </div>
    </div>
  )
}

export default Travel