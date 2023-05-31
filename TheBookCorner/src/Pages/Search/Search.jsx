import React, { useEffect, useState } from 'react'
import './search.scss'
import axios from 'axios'
import Card from '../../Components/SeachCard/Card'

const SearchResults = () => {

const [allBooks, setAllBooks] = useState([])
const [searchText, setSearchText] = useState('')

useEffect(() => {
  const fetchAll = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_SERVER_URL + '/books')
      setAllBooks(res.data)
    } catch (error) {
      console.log(error)
    }

  }
  fetchAll()
}, [searchText])

  return (
    <div className='search'>
      <div className="top">
        <input type='search' placeholder='Search by title or author...' onChange={(e) => setSearchText(e.target.value)}/>
      </div>
      <div className="bottom">
        {allBooks.filter((book) => {
          if(searchText === ''){
            return allBooks
          }else if(book.title.toLowerCase().includes(searchText.toLowerCase())){
            return book
          }else if(book.author.toLowerCase().includes(searchText.toLowerCase())){
            return book
          }
          
        })
        .map((book) => (
          <Card book={book} key={book._id}/>
        ))
        }
      </div>

    </div>
  )
}

export default SearchResults