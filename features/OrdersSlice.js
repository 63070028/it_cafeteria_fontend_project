import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../data/ordersData";

 export const OrdersSlice = createSlice({
    name:"orders",
    initialState:{
        data: [],
        loading: false,

    },
    reducers:{
        ordersPendingToProcessUpdate:(state, action)=>{
            state.data.map((order)=>{
                if(order.id === action.payload.id){
                    order.status = "process"
                }
            })
        },
        ordersProcessToPaymentUpdate:(state, action)=>{
            state.data.map((order)=>{
                if(order.id === action.payload.id){
                    order.status = "payment"
                }
            })
        },
        ordersPaymentToCompleteUpdate:(state, action)=>{
            state.data.map((order)=>{
                if(order.id === action.payload.id){
                    order.status = "complete"
                }
            })
        },
        ordersPendingToCancelUpdate:(state, action)=>{
            state.data.map((order)=>{
                if(order.id === action.payload.id){
                    order.status = "cancel"
                    order.cancelDetail = action.payload.cancelDetail
                }
            })
        },
        ordersPaymentToBlackListUpdate:(state, action)=>{
            state.data.map((order)=>{
                if(order.id === action.payload.id){
                    order.status = "blacklist"
                }
            })
        },
        getOrdersRealTime:(state, action)=>{
            state.data = action.payload;
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, state => {
            state.loading = true
          })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
          })
         builder.addCase(getOrders.rejected, state => {
            state.loading = false
        })
    }
 })


 export const {getOrdersRealTime} = OrdersSlice.actions;
 export const {ordersPendingToProcessUpdate} = OrdersSlice.actions;
 export const {ordersProcessToPaymentUpdate} = OrdersSlice.actions;
 export const {ordersPaymentToCompleteUpdate} = OrdersSlice.actions;
 export const {ordersPendingToCancelUpdate} = OrdersSlice.actions;
 export const {ordersPaymentToBlackListUpdate} = OrdersSlice.actions;
 export default OrdersSlice.reducer;