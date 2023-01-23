import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios';

import { IconButton } from 'react-native-paper';
import { Datacheckusersid } from "../../data/userData"
import { firebase } from '../../config';
import { getFirestore, doc, updateDoc, setDoc, getDoc, onSnapshot} from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Pancake',
    price: 50,
    url: 'https://cdn.pixabay.com/photo/2018/07/10/21/23/pancake-3529653_1280.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Soup',
    price: 100,
    url: 'https://cdn.pixabay.com/photo/2018/06/18/16/05/indian-food-3482749_1280.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Cupcake',
    price: 200,
    url: 'https://cdn.pixabay.com/photo/2014/08/07/21/07/souffle-412785_1280.jpg',
  },
];

const Item = ({ title, url, price, quantity, cart_1, id, onDelete}) => (
   
    <View style={styles.item}>
        <Image
            style={styles.tinyLogo}
            source={{uri: url}}
            />
        <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>ราคาเริ่มต้น{price}</Text>
            <Text style={styles.title}>จำนวน {quantity}</Text>
            {/* <TouchableOpacity>
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => console.log('Pressed')}
                />
            </TouchableOpacity> */}
            {/* <Button style={{width: '100%',}} title='ลบเลย'
              onPress={ () => {
                const result = cart;
                console.log(result)
                setCart(result);
              
                const data ={
                  orders:result,
                  // creatAt: timestamp,
                }
                updateDoc(docRef, data)
                  .then(() => {
                  })
                  .catch((error) => {
                    alert(error);
                  })
                }}
                color={'#ff5c5c'}
            /> */}
        </View>
        <TouchableOpacity>
                <IconButton
                  icon="delete"
                  size={20}
                  style={{marginLeft: 70}}
                  onPress={() => {
                    onDelete(id);}}
                />
            </TouchableOpacity>
        
    </View>
    
    
);

const CartMenu = ({navigation}) => {
  const {cart_id} = useSelector((state) => state.cart_id)
  const {user_data} = useSelector((state) => state.user)
  const [cart, setCart] = useState([]);
  const db = getFirestore();
  const docRef = doc(db, "Carts", cart_id);
  var databasecart = [];

  useEffect( () => {
    onSnapshot(doc(db, "Carts", cart_id), (doc) => {
      console.log(doc.data)
      databasecart = doc.data();
      setCart(databasecart.orders)
      })
    },[])

    // console.log(cart.length)
  
  function addtoOrders(cart, user_data){    
      const formData = {
        orders:cart,
        shop_id:cart[0].shop_id,
        user_id:user_data.id,
        phone:user_data.phone,
        status:'pending',
        user_name:user_data.name,
        timestamp:new Date().toLocaleString('en-GB').toString(),
        result_money:addData(cart),
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
            
            axios.post('http://'+ip+':5000/addOrders', formData).then(
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
              var emptycart = [];
              const data ={
                orders:emptycart,
                // creatAt: timestamp,
              }
              updateDoc(docRef, data )
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
  
  function addData(cart) {
    var result = 0;
    for (let i = 0; i < cart.length; i++) {
       result += (Number(cart[i].price) * Number(cart[i].quantity));
    }
    return result
  }

  // function deleteData(id) {
  //   const result = cart.filter((item) => item.id !== id );
  //   console.log(result)
  //   setCart(result);
  //   // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //   const data ={
  //       orders:result,
  //       // creatAt: timestamp,
  //   }
  //   updateDoc(docRef, data)
  //    .then(() => {
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     })
  // }

  var cartcount = cart.length;
//  var deletecart = cart;
  const renderItem = ({ item }) => (
    <Item title={item.name} url={item.uri} price={item.price} 
    quantity={item.quantity} cart_1={item} id={item.id}
    onDelete={(id) =>{
      const result = cart.filter((item) => item.id !== id );
      console.log(result)
      setCart(result);
      const data ={
          orders:result,
      }
      updateDoc(docRef, data)
      .then(() => {
        })
        .catch((error) => {
          alert(error);
        })
    }}
    // ondelete={() => {
    //   setCart((current) =>
    //     current.splice(0, 1)
    //   );
    //   const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    //   const data ={
    //     cart:cart,
    //     creatAt: timestamp,
    //   }
    //   updateDoc(docRef, data)
    //     .then(() => {
    //     })
    //     .catch((error) => {
    //       alert(error);
    //     })
    //   }}
    
    />
    
  );

  // const ongetdata=()=>{
  //   getDoc(doc(db, "User-test", "stu01")).then(docSnap => {
  //     databasecart = docSnap.data();
  //     setCart(databasecart.cart)
  //     },[]);
  // }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id}

      />
      <View style={{alignItems:'center',justifyContent:'center',marginBottom:10}}>
        <Text style={{fontSize:20}}>ราคารวมทั้งหมด:{addData(cart)}</Text>
      </View>
      <TouchableOpacity 
      disabled={(cart.length == 0)}>
          {/* <Button style={{width: '100%',}} title='ลบเลย'
          disabled={(cart.length == 0)}
          onPress={ () => {
            const result = cart.filter((item) => item.id !== cartcount );
            console.log(result)
            setCart(result);
            // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data ={
              orders:result,
              // creatAt: timestamp,
            }
            updateDoc(docRef, data)
              .then(() => {
              })
              .catch((error) => {
                alert(error);
              })
            }}
            color={'#ff5c5c'}
        /> */}
      </TouchableOpacity>
      <View style={{alignItems:'center',justifyContent:'center',marginBottom:20}}>
        <TouchableOpacity 
        style={{width:'50%',backgroundColor:'#006EF5',padding:10,borderRadius:25,}} 
            disabled={(cart.length == 0)}
            onPress={ ()=>{addtoOrders(cart, user_data)}}>
          <Text style={{fontSize:20,color:"white",textAlign:'center'}}>สั่งเลย</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#eab676',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row', 
    textAlign: 'left', 
    fontSize: 15, 
    borderRadius: 10,
    overflow: 'hidden'
  },
  title: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 30,
    fontWeight: "bold",
    
  },
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 4,
  },
  button:{
    marginLeft:15,
    alignItems: 'center',
    paddingTop: 15,
    paddingLeft: 0,
  },
});

export default CartMenu;
