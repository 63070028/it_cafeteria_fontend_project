import { createSlice } from "@reduxjs/toolkit";

 export const CustomerFoodsSlice = createSlice({
    name:"customerfoods",
    initialState:{
        customer_shop_id:null,
        customer_shop_type:null,
    },
    reducers:{
        setCustomerShop:(state, action)=>{
            customer_shop_id = action.payload.shop_id;
            customer_shop_type = action.payload.shop_type;
        },
    }
 })


 export const {setCustomerShop} = CustomerFoodsSlice.actions;
 export default CustomerFoodsSlice.reducer;