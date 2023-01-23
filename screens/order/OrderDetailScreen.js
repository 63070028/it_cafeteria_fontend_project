import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import OrderDetailList from "../../components/OrderDetailList";
import { ordersPendingToProcessUpdate, ordersProcessToPaymentUpdate, ordersPendingToCancelUpdate, ordersPaymentToCompleteUpdate, ordersPaymentToBlackListUpdate} from '../../features/OrdersSlice';
import { useDispatch, useSelector } from 'react-redux';

const OrderDetailScreen = ({route, navigation}) => {
  const dispatch = useDispatch();

  const {prev, button, orders, result_money, id, user_id} = route.params;
  
  const [data, setData] = useState(route.params.orders)


  function ordersPendingToProcess(id){    
    const formData = {
      id: id
    }

    let ip;
    if(Platform.OS === 'android'){
      ip = '10.0.2.2';
    }
    else if(Platform.OS === 'ios'){
      ip = 'localhost';
    }

    Alert.alert(
      "Confirm Orders",
      "Are you sure?",
      [
        {
          text: "NO",
          style: "cancel"
        },
        { text: "YES", onPress: () => {
          
          axios.post('http://'+ip+':5000/ordersPendingToProcess', formData).then(
          res => {
            console.log(res.data.mag);
            Alert.alert(
              "Orders to Process Complete!!!",
              "",
              [
                {
                  text: "Close",
                  style: "cancel"
                },
              ]
            );
            dispatch(ordersPendingToProcessUpdate({id:res.data.id}));
            navigation.popToTop();
          },
          error => {
            console.log(error);
          }
          );
        } }
      ]
    );
  }

  function ordersProcessToPayment(id, shop_id){    
    const formData = {
      id: id,
      shop_id:shop_id
    }

    let ip;
    if(Platform.OS === 'android'){
      ip = '10.0.2.2';
    }
    else if(Platform.OS === 'ios'){
      ip = 'localhost';
    }

    Alert.alert(
      "Confirm Orders",
      "Are you sure?",
      [
        {
          text: "NO",
          style: "cancel"
        },
        { text: "YES", onPress: () => {
          axios.post('http://'+ip+':5000/ordersProcessToPayment', formData).then(
          res => {
            console.log(res.data.mag);
            Alert.alert(
              "Orders to Payment Complete!!!",
              "",
              [
                {
                  text: "Close",
                  style: "cancel"
                },
              ]
            );
            dispatch(ordersProcessToPaymentUpdate({id:res.data.id}));
            navigation.popToTop();
          },
          error => {
            console.log(error);
          }
          );
        } }
      ]
    );
  }

  function ordersPaymentToComplete(id, user_id){    
    const formData = {
      id: id,
      user_id:user_id
    }

    let ip;
    if(Platform.OS === 'android'){
      ip = '10.0.2.2';
    }
    else if(Platform.OS === 'ios'){
      ip = 'localhost';
    }

    Alert.alert(
      "Confirm Payment",
      "Are you sure?",
      [
        {
          text: "NO",
          style: "cancel"
        },
        { text: "YES", onPress: () => {
          axios.post('http://'+ip+':5000/ordersPaymentToComplete', formData).then(
          res => {
            console.log(res.data.mag);
            Alert.alert(
              "Orders to Complete!!!",
              "",
              [
                {
                  text: "Close",
                  style: "cancel"
                },
              ]
            );
            dispatch(ordersPaymentToCompleteUpdate({id:res.data.id}));
            navigation.popToTop();
          },
          error => {
            console.log(error);
          }
          );
        } }
      ]
    );
  }

  // function ordersPendingToCancel(id, shop_id){    
  //   const formData = {
  //     id: id,
  //     shop_id: shop_id
  //   }

  //   let ip;
  //   if(Platform.OS === 'android'){
  //     ip = '10.0.2.2';
  //   }
  //   else if(Platform.OS === 'ios'){
  //     ip = 'localhost';
  //   }

  //   Alert.alert(
  //     "Confirm Cancel Orders",
  //     "Are you sure?",
  //     [
  //       {
  //         text: "NO",
  //         style: "cancel"
  //       },
  //       { text: "YES", onPress: () => {
  //         axios.post('http://'+ip+':5000/ordersPendingToCancel', formData).then(
  //         res => {
  //           console.log(res.data.mag);
  //           Alert.alert(
  //             "Cancel Orders to Complete!!!",
  //             "",
  //             [
  //               {
  //                 text: "Close",
  //                 style: "cancel"
  //               },
  //             ]
  //           );
  //           dispatch(ordersPendingToCancelUpdate({id:res.data.id}));
  //           navigation.popToTop();
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //         );
  //       } }
  //     ]
  //   );
  // }

  

  function ordersPaymentToBlackList(id, user_id){   
    const formData = {
      id: id,
      user_id: user_id
    }

    let ip;
    if(Platform.OS === 'android'){
      ip = '10.0.2.2';
    }
    else if(Platform.OS === 'ios'){
      ip = 'localhost';
    }

    Alert.alert(
      "Confirm Orders to BlackList",
      "Are you sure?",
      [
        {
          text: "NO",
          style: "cancel"
        },
        { text: "YES", onPress: () => {
          axios.post('http://'+ip+':5000/ordersPaymentToBlackList', formData).then(
          res => {
            console.log(res.data.mag);
            Alert.alert(
              "Orders to BlackList Complete!!!",
              "",
              [
                {
                  text: "Close",
                  style: "cancel"
                },
              ]
            );
            dispatch(ordersPaymentToBlackListUpdate({id:res.data.id}));
            navigation.popToTop();
          },
          error => {
            console.log(error);
          }
          );
        } }
      ]
    );
  }

  const {user_data} = useSelector((state) => state.user)


  return (


    <View style={styles.screen}>

      <OrderDetailList listData={data}/>
      
      <Text style={styles.text_result} >จำนวนเงินที่ต้องชำระ  : {result_money}</Text>


      <View style={{flexDirection:"row", justifyContent:"space-around"}}>


        {route.params.button==="pending" &&
        <TouchableOpacity style={styles.button_cancel} 
        // onPress={()=>{ordersPendingToCancel(route.params.id, user_data.id)}}
        onPress={()=>{
          navigation.navigate("CancelDetailScreen", {id:route.params.id, shop_id:user_data.id});
        }}
        >
          <Text style={{color:"white"}}>ยกเลิก</Text>
        </TouchableOpacity>
        }
        {route.params.button==="pending" &&
        <TouchableOpacity style={styles.button_confirm} onPress={()=>{ordersPendingToProcess(route.params.id)}}>
          <Text style={{color:"white"}}>ยืนยัน</Text>
        </TouchableOpacity>
        }



        {route.params.button==="process" &&
        <TouchableOpacity style={styles.button} onPress={()=>{ordersProcessToPayment(route.params.id, user_data.id)}}>
          <Text style={{color:"white"}}>ทำเสร็จแล้ว</Text>
        </TouchableOpacity>
        }



        {route.params.button==="payment" &&
        <TouchableOpacity style={styles.button_cancel} onPress={()=>{ordersPaymentToBlackList(route.params.id, route.params.user_id)}}>
          <Text style={{color:"white"}}>ไม่มาจ่าย</Text>
        </TouchableOpacity>
        }
        {route.params.button==="payment" &&
        <TouchableOpacity style={styles.button_confirm} onPress={()=>{ordersPaymentToComplete(route.params.id, route.params.user_id)}}>
          <Text style={{color:"white"}}>จ่ายเงินแล้ว</Text>
        </TouchableOpacity>
        }

        {route.params.button==="blacklist" &&
        <TouchableOpacity style={styles.button_confirm} onPress={()=>{ordersPaymentToComplete(route.params.id, route.params.user_id)}}>
          <Text style={{color:"white"}}>ชำระคืนแล้ว</Text>
        </TouchableOpacity>
        }

        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_result:{
    padding:"2%",
    fontSize:18
  },
  button: {
      alignItems: "center",
      backgroundColor: "#2196F3",
      padding: 10,
      width:"50%",
      marginTop:"5%",
      marginBottom:"2%",
  },
  button_confirm: {
    alignItems: "center",
    backgroundColor: "#229954",
    padding: 10,
    width:"30%",
    marginBottom:"2%",
    marginLeft:"2%"
  },
  button_cancel: {
    alignItems: "center",
    backgroundColor: "#CB4335",
    padding: 10,
    width:"30%",
    marginBottom:"2%",
    marginRight:"2%"
  }
});

export default OrderDetailScreen;