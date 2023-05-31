const Order = require('../Models/Order.js')
const router = require('express').Router()



//create Order
router.post('/', async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(201).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get Order
router.get('/', async (req, res) => {
    try {
        const order = await Order.findOne(req.body.orderId)
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router