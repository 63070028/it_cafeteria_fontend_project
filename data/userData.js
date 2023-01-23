import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

export var Datacheckusersid = '';

export const login = createAsyncThunk('user/login', async ({navigation, username, password}) => {
   try {
       let ip;
       console.log(Platform.OS);
       if(Platform.OS === 'android'){
         ip = '10.0.2.2';
       }
       else if(Platform.OS === 'ios'){
         ip = 'localhost';
       }
       const formData = {username:username, password:password};

       const {data: response} =  await axios.post('http://'+ip+':5000/login', formData);
       console.log("RoleUser: "+response.role);
       console.log(response.blacklist);
       Datacheckusersid = response.id
       console.log(Datacheckusersid)
       if(response.role === "owner"){
        //ไปหน้า owner
        navigation.navigate("MainShop", {});
       }
       else if(response.role === "customer" && response.blacklist === false){
        console.log(1)
        navigation.navigate("MainUser", {});
       }
       else if(response.role === "customer" && response.blacklist === true){
        console.log(1)
        navigation.navigate("Blacklist", {});
       }
       return response;       
     } catch (error) {
       console.error(error.message);
       console.log("กรอบผิด")
       Alert.alert(
        "กรอบผิด!!!",
        "",
        [
          {
            text: "Close",
            style: "cancel"
          },
        ]
      );
     }

});