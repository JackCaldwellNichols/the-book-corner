const Cart = require('../Models/Cart.js')
const router = require('express').Router()


router.post('/', async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(201).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router