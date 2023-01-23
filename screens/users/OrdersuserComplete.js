import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import { firebase } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { getFirestore, doc, updateDoc, setDoc, getDoc, onSnapshot, collection,deleteDoc} from "firebase/firestore";


const Item = ({ id, user_name, phone, status, result_money, timestamp,navigation,gotoOrderdetail }) =>{
  const db = getFirestore();
  
  return(
    <TouchableOpacity
    onPress={() => {
      gotoOrderdetail();
    }}
    >
    <View style={styles.orderItem}>
    <View style={styles.itemContainer}>
        <View style={{ ...styles.infoContainer, ...{ backgroundColor: status === "complete" ? "#83f570" : '#9e9e9e' }}}>
          <Text>Order: {id}</Text>
          <Text>ชื่อ: {user_name}</Text>
          <Text>เงินที่ต้องชำระ: {result_money}</Text>
          <Text>เบอร์ติดต่อ: {phone}</Text>
          <Text>เวลา: {timestamp}</Text>
          <Text>สถานะ: {status}</Text>
          </View>
      </View>
  </View>
  </TouchableOpacity>
);
};

const CategoriesScreen = ({navigation}) => {
  const {user_data} = useSelector((state) => state.user)
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection('Orders');

  useEffect( () => {
    todoRef.onSnapshot(
      querySnapshot =>{
        const users = []
        querySnapshot.forEach((doc) =>{
          const {user_name, phone, status, result_money, timestamp, user_id, orders} = doc.data()
          if (doc.data().status == 'payment'||doc.data().status == 'complete' && user_data.id == doc.data().user_id) {
            users.push({
              id:doc.id,
              user_name,
              phone,
              status,
              result_money,
              timestamp,
              orders
            })
          }else{}
        })
        setUsers(users)
      }
    )
  }, [])

  const renderGridItem = (itemData) => {
    return (
      <Item
      id={itemData.item.id}
      user_name={itemData.item.user_name}
      phone={itemData.item.phone}
      status={itemData.item.status}
      result_money={itemData.item.result_money}
      timestamp={itemData.item.timestamp}
      gotoOrderdetail={() =>{
        navigation.navigate("OrderUserDetail", {listdata:itemData.item.orders});
      }}
      />

    );
  };

  return (
    <FlatList data={users.sort((a, b) => a.timestamp > b.timestamp)} 
    renderItem={renderGridItem}/>


  );
};

const styles = StyleSheet.create({
  infoContainer:{
    padding:"5%",
    borderWidth:2,
    borderRadius: 10,
    borderColor:'#2f5704',
    alignSelf:"flex-start",
    marginTop:"10%",
    width:"90%",
    marginLeft:"5%",
  },
  orderItem: {
    backgroundColor: "#f5f5f5",
    width:"100%",
    overflow: "hidden",
  },
  itemContainer:{
    flexDirection:"row",
    alignItems:"center",
  },
  modify_menu:{
    marginLeft:"15%",
    marginRight:"15%",
    marginTop:"8%",
  }
});

export default CategoriesScreen;