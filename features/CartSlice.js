import { createSlice } from "@reduxjs/toolkit";

 export const CartSlice = createSlice({
    name:"cart",
    initialState:{
        cart_id: null,
        orders:[]
    },
    reducers:{
        setCart:(state, action)=>{
            state.cart_id = action.payload.id;
            state.orders = action.payload.orders;
        },
    }
 })


 export const {setCart} = CartSlice.actions;
 export default CartSlice.reducer;