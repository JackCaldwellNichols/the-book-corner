import React, { useEffect, useState } from 'react'
import { useLocation, Link} from 'react-router-dom'
import axios from 'axios'
import './book.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../Redux/cartSlice'
import {PlusCircleOutlined, MinusCircleOutlined} from '@ant-design/icons'

const Book = () => {

const path = useLocation()
const bookId = path.pathname.split('/')[2]
const [book, setBook] = useState([])
const [quantity, setQuantity] = useState(1)
const dispatch = useDispatch()
const user = useSelector(state => state.user.currentUser)

useEffect(() => {
    const fetchBook = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_SERVER_URL + `/books/${bookId}`)
            setBook(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchBook()
}, [bookId])

const handleClick = () => {
    dispatch(
        addProduct({...book, quantity})
    )
}

const handleQuantity = (type) => {
    if(type==='dec'){
        quantity > 1 && setQuantity(quantity - 1)
    }else{
        setQuantity(quantity + 1)
    }
}



  return (
    <div className='singleBook'>
        <div className="left">
            <img src={book.img} alt={book.title}/>
        </div>
        <div className="right">
            <h2 className='item'>Title: {book.title}</h2>
            <h3 className='item'>By: {book.author}</h3>
            <h4 className='itemDesc'>Overview: {book.desc}</h4>
            <h4 className='item'>Price: ${book.price}</h4>
            <h4 className='item'>Page Count: {book.pages}</h4>
            <h4 className='item'>Publish Year: {book.published}</h4>
            <h4 className='item'>ID: {book._id}</h4>
            {book.genres ?  ( book.genres.map((genre, index)=>(
                <ul key={index}>
                    <li>{genre}</li>
                </ul>
            ))) : (
                null
            )}
            {book.inStock ? (
                <h4 className='item'>In stock</h4>
            ) : (
                <h4 className='item'>Out of stock</h4>
            )}
                <div className="buttonWrapper">
                    {user && (
                        <button className='addBtn' onClick={handleClick}>Add to Cart</button>
                    ) }
             
                     <Link to='/' className='link'>
                        <button className='addBtn'>Back Home</button>
                     </Link>
                </div>

        </div>
    </div>
  )
}

export default Book