import React, { useEffect, useState } from 'react'
import './paymentSuccess.scss'
import { useDispatch, useSelector } from 'react-redux'
import { cleanCart } from '../../Redux/cartSlice'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'

const PaymentSuccess = () => {
const dispatch = useDispatch()
const [orderId, setOrderId] = useState(null)
const [details, setDetails] = useState([])
const user = useSelector((state) => state.user.currentUser)
const cart = useSelector(state => state.cart)
const location = useLocation()
const data = location.state.stripeData;
const date = new Date();

let currentDay= String(date.getDate()).padStart(2, '0');

let currentMonth = String(date.getMonth()+1).padStart(2,"0");

let currentYear = date.getFullYear();

let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;


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
    setOrderId(res.data._id)
    dispatch(cleanCart())
  }
  createOrder()
}, [user, data])


{/*useEffect(() => {
  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_SERVER_URL + '/order', {
        orderId: orderId
      })
      setDetails(res.data)
      console.log(res.data)
    }catch (error) {
      console.log(error)
    }
  }
  fetchOrderDetails()
}, [orderId])*/}


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
              <h3>Payment Number: {data.id}</h3>
              <h3>Order ID: {orderId}</h3>
              <h3>Order date: {currentDate}</h3>
              <h3>Card Details: **** **** **** {data.payment_method_details.card.last4}</h3>
              <h3>Status: {data.outcome.seller_message}</h3>
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