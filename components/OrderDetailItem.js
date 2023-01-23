import React, { useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Alert
} from "react-native";
import axios from 'axios';
import ToggleSwitch from 'toggle-switch-react-native';



const OrderDetailItem = props => {



 


  return (
    <View style={styles.orderDetailItem}>

        <View style={styles.itemContainer}>
            <View style={styles.foodContainer}>
                    <Image
                    style={styles.stretch}
                    source={{uri:props.uri}}
                    />
                    <View style={styles.containerInfo}>
                        <Text style={styles.text_info}>ชื่อ: {props.name}</Text>
                        <Text style={styles.text_info}>ราคา:  {props.price}</Text>
                        <Text style={styles.text_info}>จำนวน: {props.quantity}</Text>
                    </View> 
              
            </View>
            <View style={{marginLeft:"5%", paddingTop:"5%"}}>
              <Text style={styles.text_details}>รายละเอียด: {props.details}</Text>
            </View> 
        </View>


        



      

     
                
    </View>
  );
};

const styles = StyleSheet.create({
  orderDetailItem: {
    marginTop:"5%",
    marginBottom:"5%",
    height: 250 ,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth:2,
    borderColor:"gray"
  },
  foodContainer:{
    borderBottomWidth:2,
    flexDirection:"row",
    height: "60%",
    borderColor:"gray"
  },
  itemContainer:{
    width:"100%",
    height:"100%"
  },
  stretch: {
    margin:"5%",
    width: "40%",
    resizeMode: 'stretch',
  },
  containerInfo:{
    alignSelf:"flex-start",
    marginTop:"5%",
  },
  text_info:{
    fontSize:16,
    fontWeight:"bold"
  },
  // text_details:{
  //   fontWeight:"bold"
  // }
  
});

export default OrderDetailItem;