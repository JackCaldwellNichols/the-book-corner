const router = require('express').Router()
const Books = require('../Models/Books.js')



//get book by name

router.get('/:key', async (req, res)=> {
    try {
  
        const books = await Books.find({
            "$or": [
                {title: {$regex: req.params.key, $options: 'i'}},
            ]
        })
      res.status(200).json(books)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})







module.exports = router