import React, { useEffect, useState } from 'react'
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeProduct } from '../../Redux/cartSlice'
import PayButton from '../../Components/PayButton/PayButton'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'


const Cart = () => {

    const user = useSelector(state => state.user.currentUser)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [stripeToken, setStripeToken] = useState(null)
    const navigate = useNavigate()
    const onToken = (token) => {
        setStripeToken(token)
    }


    const handleClick = (product) => {
        dispatch(removeProduct(product))
    }

    useEffect(() => {
        const makeReq = async () => {
            try {
                const res = await axios.post(import.meta.env.VITE_SERVER_URL + '/checkout/payment', {
                    tokenId:stripeToken.id,
                    amount:cart.total*100,
                })
                
                navigate('/checkout-success', {state :{
                    stripeData: res.data,
                    products: cart
                }})
            } catch (error) {
                console.log(error)
            }
        }
       stripeToken && cart.total >= 1 && makeReq()
    }, [stripeToken, cart.total, navigate])

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
                        {/*<PayButton  products={cart.products}/>*/}
                        <StripeCheckout 
                            name='MERN E-Shop' 
                            image=''
                            billingAddress
                            shippingAddress
                            description='total'
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey='pk_test_51MriahJM3D2igcBNkgLmyiYI5n27e1o8MrO9EHNovGL72CaTQGWgMKhgjGNoruRitwrczUKzArmzB5INOUzYoXIu00QIPF4YJR'
                        >
                            <button>Checkout</button>
                        </StripeCheckout>
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
