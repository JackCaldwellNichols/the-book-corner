const router = require('express').Router()
const Books = require('../Models/Books.js')

//add book

router.post('/', async (req, res) => {
    const newBook = new Books(req.body)
    try {
        const savedBook = await newBook.save()
        res.status(201).json(savedBook)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get all books

router.get('/', async (req, res) => {
    try {
        const books = await Books.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json(error)
    
    }
})


//get individual book

router.get('/:id', async (req, res) => {
    try {
        const book = await Books.findById(req.params.id)
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router