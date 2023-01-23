import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground, 
  SafeAreaView,
  FlatList,
  Image,
  Button,

} from 'react-native';

import { firebase } from '../../config';
import { setDoc, collection, getFirestore, addDoc, onSnapshot, where, query, getDoc } from "firebase/firestore";
import { Datacheckusersid } from "../../data/userData"
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from "../../features/CartSlice";





const Item = ({ name, uri, price, onSelectgotodetail, visible}) =>{
  
    return(
    <TouchableOpacity
    disabled={!visible}
    onPress={ () => { onSelectgotodetail(); } }
    >
    <View style={styles.item}>
        <Image
            style={{ ...styles.tinyLogo, ...{ opacity: visible ? 1 : 0.2 } }}
            source={{uri: uri}}
            />
        {/* <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.title}>ราคาเริ่มต้น{price}</Text>
        </View> */}
    </View>
    <View><Text style={styles.title}>{name}:{price}฿</Text></View>
    </TouchableOpacity> 
  );
};

const App = ({navigation, route}) => {
//   const { thisshop_id, Type_shop} = route.params;
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const todoRef = firebase.firestore().collection('Foods');
  const createcart = firebase.firestore().collection('Carts');
  const db = getFirestore(); // initialize Firestore
  const docRef = collection(db, "Carts");
  const {user_data} = useSelector((state) => state.user)
  const {customer_shop_id} = useSelector((state) => state.shop_id)
  const {customer_shop_type} = useSelector((state) => state.shop_id)
  const dispatch = useDispatch();

  // console.log(user_data)
  useEffect( () => {
    todoRef.onSnapshot(
      querySnapshot =>{
        const users = []
        querySnapshot.forEach((doc) =>{
          const {category, name, optionDetails, price, shop_id, uri, visible, Type} = doc.data()
          // console.log(thisshop_id)
          if (doc.data().shop_id == customer_shop_id && doc.data().category == "delicatessen") {
            users.push({
              id: doc.id,
              category,
              name,
              optionDetails,
              price,
              shop_id: shop_id,
              uri,
              visible,
              Type,
            })
          }else{}
        })
        // console.log(users)
        setUsers(users)

      }
    )
  
  
  // const cart = [];
  const q = query(collection(db, "Carts"), where("shop_id", "==", customer_shop_id), where("user_id", "==", user_data.id));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const cart = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id)
        cart.push({id: doc.id, ...doc.data()}

        );
    });
    // snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    console.log(cart)
    if (cart.length == 0) {
      addDoc(docRef, {
        user_id: user_data.id,
        shop_id:customer_shop_id,
        orders:[]
      })
    }else{
      // createcart.onSnapshot(
      //   querySnapshot =>{
      //     const order = []
      //     querySnapshot.forEach((doc) =>{
      //       const {orders} = doc.data()
      //       // console.log(thisshop_id)
      //         order.push({
      //           id:doc.id
      //         })
      //       }
      //     )
      //     // console.log(users)
      //     dispatch(setCart(order))
      //     console.log(order)
      //     con
      //   })
      dispatch(setCart({id:cart[0].id, orders:cart[0].orders}))

    }
  });

  
  
  // if (cart.length = 0) {
  //   // addDoc(docRef, {
  //   //   user_id: user_data.id,
  //   //   shop_id:thisshop_id,
  //   //   orders:[]
  //   // })
  // }else{
  //   console.log(cart)
    
  // }
  
  }, [])
  
  const renderItem = ({ item }) => (
    <Item 
    name={item.name} 
    uri={item.uri} 
    price={item.price} 
    type={item.Type}
    visible={item.visible}
    category={item.category}
    onSelectgotodetail={ () => { navigation.navigate("Detail",{Type: item.Type, Name:item.name, Price:item.price, uri:item.uri, shop_id:item.shop_id,
      category:item.category, optionDetails:item.optionDetails , Type_shop:customer_shop_type});}}
    />
    
  );

  


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    borderRadius: 10,
    overflow: 'hidden'
  },
  item: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 13,
    flexDirection: 'row', 
    textAlign: 'left', 
    fontSize: 15, 
    borderRadius: 25,
    overflow: 'hidden'
  },
    
  title: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 30,
    
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
});

export default App;