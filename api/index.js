const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const bookRoute = require('./Routes/books.js')
const authRoute = require('./Routes/auth.js')
const userRoute = require('./Routes/user.js')
const cartRoute = require('./Routes/cart.js')
const searchRoute = require('./Routes/search.js')
const stripeRoute = require('./Routes/stripe.js')
const orderRoute = require('./Routes/order.js')
const reviewRoute = require('./Routes/review.js')


const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

const port = process.env.PORT

app.get('/', (req, res) => {
    res.send("API running")
})
app.use('/api/books', bookRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/cart', cartRoute)
app.use('/api/search', searchRoute)
//app.use('/api/stripe', stripeRoute)
app.use('/api/checkout', stripeRoute)
app.use('/api/order', orderRoute)
app.use('/api/reviews', reviewRoute)


const StartServer = async () => {
    await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo ok")
    app.listen(port, () => {
        console.log(`API listening on ${port}`)
    })
}


StartServer()






