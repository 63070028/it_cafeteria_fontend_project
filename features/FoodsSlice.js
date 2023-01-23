import { createSlice } from "@reduxjs/toolkit";
import { getFoods } from "../data/foodsData";

 export const foodsSlice = createSlice({
    name:"foods",
    initialState:{
        data: [],
        loading: false,

    },
    reducers:{
            addFood:(state, action)=>{
                // console.log(action.payload)
                state.data.push(action.payload);
            },
            delFood:(state, action)=>{
                state.data = state.data.filter((food) => food.id !== action.payload.id)
            },
            updeteFood:(state, action)=>{
                state.data.map((food)=>{
                    if(food.id === action.payload.id){
                        food.id = action.payload.id;
                        food.shop_id = action.payload.shop_id;
                        food.name = action.payload.name;
                        food.price = action.payload.price;
                        food.category = action.payload.category;
                        food.imageName = action.payload.imageName;
                        food.uri = action.payload.uri;
                        food.optionDetails = action.payload.optionDetails;
                        food.timestamp = action.payload.timestamp
                        food.visible = action.payload.visible;
                    }
                })
            },
            foodSetVisibleUpdate:(state, action)=>{
                state.data.map((food)=>{
                    if(food.id === action.payload.id){
                        food.visible = action.payload.visible
                    }
                })
            },
    },
    extraReducers: (builder) => {
        builder.addCase(getFoods.pending, state => {
            state.loading = true
          })
        builder.addCase(getFoods.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
          })
         builder.addCase(getFoods.rejected, state => {
            state.loading = false
        })
    }
 })


 export const {addFood} = foodsSlice.actions;
 export const {delFood} = foodsSlice.actions;
 export const {updeteFood} = foodsSlice.actions;
 export const {foodSetVisibleUpdate} = foodsSlice.actions;
 export default foodsSlice.reducer;