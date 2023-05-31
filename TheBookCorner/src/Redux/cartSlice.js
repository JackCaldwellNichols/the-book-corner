import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        cartId: null
    },
    reducers: {
        addProduct:(state, action) =>{

           const itemIndex = state.products.findIndex(
            item => item._id === action.payload._id)
            if(itemIndex >= 0){
                state.products[itemIndex].quantity += 1
                state.total += action.payload.price * action.payload.quantity
            }else{

            const tempProduct = {...action.payload, quantity: 1} 
            state.quantity += 1,
            state.products.push(tempProduct);
            state.total += action.payload.price * action.payload.quantity
            }
        },
        removeProduct:(state, action) =>{
            const newProductList = state.products.filter(
                product => product._id !== action.payload._id
            )
            state.products = newProductList;
            state.quantity = state.quantity - 1
            state.total = state.total - (action.payload.price * action.payload.quantity)

        },
        cleanCart: (state) => {
            state.products = [],
            state.quantity = 0,
            state.total = 0

        }
    }
})

export const {addProduct, removeProduct,  cleanCart} = cartSlice.actions
export default cartSlice.reducer