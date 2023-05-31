const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: false},
    author: {type: String, required: true, unique: false},
    desc: {type: String, required: true, unique: false},
    img: {type: String, required: true, unique: true},
    genres: {type: Array, required: false, unique: false, default: []},
    pages: {type: Number, required: false, unique: false},
    published: {type: Number, required: false, unique: false},
    inStock: {type: Boolean, default: true},
    price: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Books', BookSchema)

