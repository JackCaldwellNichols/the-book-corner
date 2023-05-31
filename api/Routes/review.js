const Review = require('../Models/Review.js')
const router = require('express').Router()



//create review
router.post('/', async (req, res) => {
    const newReview = new Review(req.body)
    try {
        const savedReview = await newReview.save()
        res.status(201).json(savedReview)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get reviews
router.get('/:userId', async (req, res) => {
    try {
        const reviews = await Review.find({userId: req.params.userId})
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete review
router.delete('/:id', async (req, res) => {

    try {
        await Review.findByIdAndDelete(req.params.id)
        res.status(200).json("Review deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router