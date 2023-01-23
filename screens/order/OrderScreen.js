import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, Button} from "react-native";
import OrderList from "../../components/OrderList";
import { useDispatch, useSelector } from 'react-redux';
import { getFoods } from '../../data/foodsData';
import { getOrders } from '../../data/ordersData';



const OrderScreen = ({navigation}) => {

  const {data, loading} = useSelector((state) => state.orders)
  const {user_data} = useSelector((state) => state.user)
  const dispatch = useDispatch();

  function refresh(){
    dispatch(getOrders(user_data.id));
    // dispatch(getFoods(user_data.id));
  }

    return (
    <View style={styles.container}>

      {data.filter(orders=>orders.status === "pending").length === 0 &&
        <TouchableOpacity style={styles.button}
        onPress={()=>{refresh();}}>
          <Text style={{color:"white"}}>Refresh</Text>
        </TouchableOpacity>
        }

      {loading && <Text>Loading...</Text>}

      {data.filter(orders=>orders.status === "pending").length === 0 &&
        <Text style={{marginTop:"50%", fontWeight:"bold", fontSize:18}}>ไม่มีคำสั่งซื้อ</Text>
        }
        

          {!loading && (
                <OrderList navigation={navigation} listData={data.filter(orders=>orders.status === "pending")} button={"pending"}/>
            )}
        
    </View>
    );
};
export default OrderScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      alignItems: "center",
      marginTop:"5%"
    },
    // toggle_container:{
    //     alignItems: "center",
    //   justifyContent: "center",
    // }
    button: {
        alignItems: "center",
        backgroundColor: "#2196F3",
        padding: 10,
        width:"50%",
        marginTop:"5%",
      }

  });