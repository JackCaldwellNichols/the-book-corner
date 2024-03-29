const router = require('express').Router()
const Stripe = require('stripe')
const express = require('express')

require('dotenv').config()

const stripe = Stripe(process.env.STRIPE_KEY)


{/*router.post('/create-checkout-session', async (req, res) => {

    const customer = await stripe.customers.create({
        metadata:{
            userId: req.body.userId.toString(),
            cart: JSON.stringify(req.body.toString()),
        }
    })

    const  line_items = req.body.products.map(item =>{
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,   
                    images: [item.img],
                    metadata: {
                        id:item._id
                },
            },
                unit_amount: item.price*100,
              },
              quantity: item.quantity,
        }
    })
    const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    res.send({url: session.url})
})

*/}


router.post('/payment', (req, res)=> {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd'
    }, (stripeErr, stripeRes)=> {
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json(stripeRes)
        }
    })
})



module.exports = router