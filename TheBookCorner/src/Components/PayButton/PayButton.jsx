import React from 'react'
import './paybutton.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'

const PayButton = ({products}) => {
    const user = useSelector((state) => state.user.currentUser)
    const handleCheckout = () => {
        axios.post(import.meta.env.VITE_SERVER_URL + '/stripe/create-checkout-session', {
            products,
            userId:user._id,
        }).then((res) => {
            console.log(res.data)
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err) => console.log(err.message))
    }

  return (
    <div>
        <button onClick={() =>handleCheckout()}>Checkout</button>
    </div>
  )
}

export default PayButton