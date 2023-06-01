import React, { useEffect, useState } from 'react'
import './paymentSuccess.scss'
import { useDispatch, useSelector } from 'react-redux'
import { cleanCart } from '../../Redux/cartSlice'
import axios from 'axios'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
const dispatch = useDispatch()
const [orderId, setOrderId] = useState(null)
const [details, setDetails] = useState([])
const user = useSelector((state) => state.user.currentUser)
const cart = useSelector(state => state.cart)
let dateFormat = new Date(details.createdAt)


useEffect(() => {
  const createOrder = async () => {
    const res = await axios.post(import.meta.env.VITE_SERVER_URL + '/order', {
      userId: user._id,
      products: cart.products.map((item) => ({
        bookId: item._id,
        quantity: item.quantity
      })),
      amount: cart.total,
      status: "Order complete"
    })
    setOrderId(res._id)
  }
  createOrder()
  dispatch(cleanCart())
}, [])

useEffect(() => {
  const fetchOrderDetails = async () => {
    const res = await axios.get(import.meta.env.VITE_SERVER_URL + '/order', {
      orderId: orderId
    })
    setDetails(res.data)
    
  }
  fetchOrderDetails()
}, [orderId])


  return (
    <div className='paymentSuccess'>
      <div className="wrapper">
        <div className="top">
          <h1>Thanks for your order, {user.username}! </h1>
        </div>
        <div className="bottom">
          <h2>Here are your orer details:</h2>
          {details ? (
            <div className="details">
              <h3>Order ID: {details._id}</h3>
              <h3>Order date: {dateFormat.getDate() +  " " + dateFormat.toLocaleString('en-GB', { month: 'long' }) + " " + dateFormat.getFullYear()}</h3>
              <h3>Status: {details.status}</h3>
              <h3>Estimated shipping time: 3 days</h3>
            </div>
          ) : (
            "Loading details..."
          )}
        </div>
      </div>
          <Link to='/'>
            <button>Return Home</button>
          </Link>
    </div>
  
  )
}

export default PaymentSuccess