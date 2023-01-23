import { createSlice } from "@reduxjs/toolkit";

 export const CustomerFoodSlice = createSlice({
    name:"customerfoods",
    initialState:{
        customer_shop_id:null,
        customer_shop_type:null,
    },
    reducers:{
        setCustomerShop:(state, action)=>{
            state.customer_shop_id = action.payload.shop_id;
            state.customer_shop_type = action.payload.shop_type;
        },
    }
 })


 export const {setCustomerShop} = CustomerFoodSlice.actions;
 export default CustomerFoodSlice.reducer;