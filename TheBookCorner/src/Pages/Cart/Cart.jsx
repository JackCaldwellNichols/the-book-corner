import React, { useEffect, useState } from 'react'
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeProduct } from '../../Redux/cartSlice'
import PayButton from '../../Components/PayButton/PayButton'


const Cart = () => {

    const user = useSelector(state => state.user.currentUser)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()


    const handleClick = (product) => {
        dispatch(removeProduct(product))
    }
    console.log(cart.products)

  return (
    <div className='cartPage'>
        <div className="wrapper">
            <div className="top">
                 <h1>Your Cart</h1>
            </div>  
            <div className="bottom">
                <div className="product">
                    {cart.quantity !== 0 ? (
                      <> 
                    {cart.products.map((product) => (
                        <div className="productDetails" key={product._id}>
                            <img src={product.img} alt={product.title} />
                            <div className="details">
                                <h3>{product.title}</h3>
                                <h4>{product.author}</h4>
                                <h4>ID: {product.cartId}</h4>
                                <h4>Price: {product.price}</h4>
                                <h4>Amount: {product.quantity}</h4>
                            </div>
                            <button onClick={() =>handleClick(product)}>Remove from Cart</button>
                        </div>
                    ))}
                    </>  
                    ):(
                        <h4>Your cart is empty.</h4>
                    )}
                </div>
                <div className="summary">
                        <h3>Order Summary</h3>
                        <h4>Estimated shipping: $5.99</h4>
                        <h4>Special shipping discount: $5.99</h4>
                        <h4>Total: ${Math.floor(cart.total * 100) / 100}</h4>
                        <PayButton  products={cart.products}/>
                        <Link to='/'>
                            <button>Keep Browsing</button>
                        </Link>
                        
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Cart
