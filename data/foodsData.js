import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFoods = createAsyncThunk('foods/getFoods', async (shop_id) => {

   try {
       let ip;
       console.log(Platform.OS);
       if(Platform.OS === 'android'){
         ip = '10.0.2.2';
       }
       else if(Platform.OS === 'ios'){
         ip = 'localhost';
       }
   
       const {data: response} =  await axios.get('http://'+ip+':5000/getFoods', 
         {
           params: {
             shop_id: shop_id
           }
         });
      // console.log(response)
       return response;
     } catch (error) {
       console.error(error.message);
     }

});
