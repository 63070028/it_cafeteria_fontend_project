import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Button
} from "react-native";


const OrderItem = (props) => {
  return (
    <View style={styles.orderItem}>
      <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.itemContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.text_info_order}>Order: {props.id}</Text>
            <Text style={styles.text_info}>ชื่อ: {props.user_name}</Text>
            <Text style={styles.text_info}>เงินที่ต้องชำระ: {props.result_money}</Text>
            <Text style={styles.text_info}>เบอร์ติดต่อ: {props.phone}</Text>
            <Text style={styles.text_info}>เวลา: {props.timestamp}</Text>
            <Text style={styles.text_info}>สถานะ: {props.status}</Text>
            <Text style={styles.text_info}>หมายเหตุการยกเลิก: {props.cancelDetail}</Text>
            </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer:{
    padding:"5%",
    borderWidth:2,
    borderRadius: 10,
    borderColor:"gray",
    alignSelf:"flex-start",
    marginTop:"5%",
    marginBottom:"5%",
    width:"90%",
    marginLeft:"5%",
    backgroundColor:"#fcedcf"
  },
  orderItem: {
    width:"100%",
    overflow: "hidden",
  },
  itemContainer:{
    flexDirection:"row",
    alignItems:"center",
  },
  modify_menu:{
    marginLeft:"8%",
    marginTop:"2%"
  },
  text_info:{
    fontSize:16
  },
  text_info_order:{
    fontSize:16,
    fontWeight:"bold"
  }

});

export default OrderItem;
