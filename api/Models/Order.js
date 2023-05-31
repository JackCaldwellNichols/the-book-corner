const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    products: [
        { 
            bookId: {type: String},
            quantity: {type: Number},
        }
    ],
    amount: {type: Number, required: true},
    status: {type: String, default: "Order being prepared"}
}, {timestamps: true})

module.exports = mongoose.model('Order', OrderSchema)