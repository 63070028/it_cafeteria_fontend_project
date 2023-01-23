import { createSlice } from "@reduxjs/toolkit";
import { login } from "../data/userData";
import axios from 'axios';

 export const UserSlice = createSlice({
    name:"user",
    initialState:{
        user_data: null,
        loading: false,

    },
    reducers:{
        shopSetVisibleUpdate:(state, action)=>{
            state.user_data.visible = action.payload.visible;
        },
        updateProfileShop:(state, action)=>{
            state.user_data.name = action.payload.name;
            state.user_data.phone = action.payload.phone;
            state.user_data.shop_name = action.payload.shop_name;
            state.user_data.imageName = action.payload.imageName;
            state.user_data.uri = action.payload.uri;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, state => {
            state.loading = true
          })
        builder.addCase(login.fulfilled, (state, action) => {
            state.user_data = action.payload
            state.loading = false
          })
         builder.addCase(login.rejected, state => {
            state.loading = false
        })
    }
 })

 export const {userRefreshData} = UserSlice.actions;
export const {updateProfileShop} = UserSlice.actions;
export const {shopSetVisibleUpdate} = UserSlice.actions;
export default UserSlice.reducer;