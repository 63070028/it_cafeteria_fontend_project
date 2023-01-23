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
import OrderDetailList from "../../components/OrderDetailList";

const Item = ({ id, user_name, phone, status, result_money, timestamp, shop_id, orders, navigation, gotoOrderdetail}) =>{
  const db = getFirestore();
  console.log(orders)

  async function shopqueue (shop_id) {
    deleteDoc(doc(db,'Orders', id))
    console.log(shop_id)

    const docRef = doc(db, "Users", shop_id);
    const docSnap =  await getDoc(docRef);
    const queue = docSnap.data().shop_queue -1
    
    await updateDoc(docRef, {
      shop_queue: queue
    });  
  }
  

//   async function shopqueue (shop_id) {
//     // deleteDoc(doc(db,'Orders', id))
//     console.log(shop_id)

//     const docRef = doc(db, "Users", shop_id);
//     const docSnap =  await getDoc(docRef);
//     setQueue(docSnap.data().shop_queue)
//     console.log(docSnap.data().shop_queue);
  
//     await updateDoc(docRef, {
//       shop_queue: queue-1
//     });  
// }
  
  return(
    <TouchableOpacity
    onPress={() => {
      gotoOrderdetail();
    }}
    >
    <View style={styles.orderItem}>
    <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <Text>Order: {id}</Text>
          <Text>ชื่อ: {user_name}</Text>
          <Text>เงินที่ต้องชำระ: {result_money}</Text>
          <Text>เบอร์ติดต่อ: {phone}</Text>
          <Text>เวลา: {timestamp}</Text>
          <Text>สถานะ: {status}</Text>
          <View style={styles.modify_menu}>
              <TouchableOpacity style={{backgroundColor:"red",alignItems:'center',padding:5,borderRadius:20}}
              
              onPress={ () => {shopqueue(shop_id)}
          }
            >
              <Text style={{fontSize:20}}>ยกเลิกคำสั่งซื้อ</Text>
            </TouchableOpacity>
          </View>
          
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
          const {user_name, phone, status, result_money, timestamp, user_id, shop_id, orders} = doc.data()
          if (doc.data().status == 'pending' && user_data.id == doc.data().user_id) {
            users.push({
              id:doc.id,
              user_name,
              phone,
              status,
              result_money,
              timestamp,
              shop_id,
              orders,
            })
          }else{}
        })
        setUsers(users)
      }
    )
  }, [])

  function shopqueue() {
    getDoc(doc(db, "Users", shop_id), (doc) => {
       setQueue(doc.data().shop_queue)
      })
    
      const data1 ={
        shop_queue:queue()-1
      }
      updateDoc(doc(db,'Users',shop_id ),data1)
  }

  const renderGridItem = (itemData) => {
    return (
      <Item
      id={itemData.item.id}
      user_name={itemData.item.user_name}
      phone={itemData.item.phone}
      status={itemData.item.status}
      result_money={itemData.item.result_money}
      timestamp={itemData.item.timestamp}
      shop_id={itemData.item.shop_id}
      orders={itemData.item.orders}
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
    alignSelf:"flex-start",
    marginTop:"10%",
    width:"90%",
    marginLeft:"5%",
    borderColor:'#eab676'
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