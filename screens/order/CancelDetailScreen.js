import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

import { ordersPendingToCancelUpdate } from '../../features/OrdersSlice';


const UselessTextInput = (props) => {


  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={200}
    />
  );
}


const CancelDetailScreen = ({route, navigation}) => {

  const {id, shop_id} = route.params;

  const dispatch = useDispatch();

  // console.log(route.params.id, route.params.shop_id);
  

  const ordersPendingToCancel =  (data) => {
    const formData = {
      id: data.id,
      shop_id: data.shop_id,
      cancelDetail:data.cancelDetail
    }

    let ip;
    if(Platform.OS === 'android'){
      ip = '10.0.2.2';
    }
    else if(Platform.OS === 'ios'){
      ip = 'localhost';
    }

    Alert.alert(
      "Confirm Cancel Orders",
      "Are you sure?",
      [
        {
          text: "NO",
          style: "cancel"
        },
        { text: "YES", onPress: () => {
          axios.post('http://'+ip+':5000/ordersPendingToCancel', formData).then(
          res => {
            console.log(res.data.mag);
            Alert.alert(
              "Cancel Orders to Complete!!!",
              "",
              [
                {
                  text: "Close",
                  style: "cancel"
                },
              ]
            );
            dispatch(ordersPendingToCancelUpdate({id:res.data.id, cancelDetail:res.data.cancelDetail}));
            navigation.popToTop();
          },
          error => {
            console.log(error);
          }
          );
          } 
        }
      ]
    );
  }

  const {control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      cancelDetail:"",
      id:route.params.id,
      shop_id:route.params.shop_id,
    }
  });


  

    return (
    <View style={styles.container}>

      <Text style={{fontSize:20, fontWeight:'bold', marginTop:"5%"}}>ระบุหมายเหตุการยกเลิกคำสั่งซื้อ</Text>

      <Text style={{fontSize:18, fontWeight:'500', marginTop:"5%", color:"gray"}}>Order: {route.params.id}</Text>

      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
      style={{
        marginTop:"10%",
        backgroundColor: "white",
        borderBottomColor: "black",
        borderWidth: 1,
        width:"80%",
        height:200

      }}>
      <UselessTextInput
        placeholder="Enter Cencel Detail"
        multiline = {true}
        numberOfLines={4}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        style={{padding: 10}}
      />
    </View>
        )}
        name="cancelDetail"
      />
      {errors.cancelDetail && <Text  style={{color:"red"}}>This is required.</Text>}

      <TouchableOpacity onPress={handleSubmit(ordersPendingToCancel)} style={styles.button}>
        <Text style={{color:"white"}}>Submit</Text>
      </TouchableOpacity>


    </View>
    
    );
};
export default CancelDetailScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      alignItems: "center",
      marginTop:"5%"
    },
    button: {
        alignItems: "center",
        backgroundColor: "#2196F3",
        padding: 10,
        width:"50%",
        marginTop:"5%",
      }

  });