import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './fantasy.scss'
import axios from 'axios'

const Fantasy = () => {


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
    <div className='mystery'>
        <h1>Fantasy</h1>
        <div className="wrapper">
            {books.map((book) => {
                if(book.genres.includes('fantasy')){
                    return (
                    <div className="card" key={book._id}>
                        <Link to={`/book/${book._id}`}>
                         <img src={book.img} alt={book.title}/>
                        </Link>
                        <div className="span">{book.title}</div>
                    </div>
                    )
                }
            })}
        </div>
    </div>
  )
}

export default Fantasy