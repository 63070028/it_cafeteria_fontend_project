import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import CategoryGridTile from '../../components/CategoryGridTile';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomerShop } from "../../features/CustomerFoodSlice";

import { firebase } from '../../config';

export var thisshop_id = '';

const CategoriesScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection('Users');
  const {user_data} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  useEffect( () => {
    todoRef.onSnapshot(
      querySnapshot =>{
        const users = []
        querySnapshot.forEach((doc) =>{
          const {name, uri, visible, shop_name,shop_queue,type_shop} = doc.data()
          if (doc.data().role == 'owner') {
            users.push({
              id:doc.id,
              name,
              uri,
              visible,
              shop_name,
              shop_queue,
              type_shop
            })
          }else{}
        })
        setUsers(users)
        // console.log(users)
      }
    )
  }, [])

  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile 
        title={itemData.item.shop_name}
        shop_id={itemData.item.id}
        visible ={itemData.item.visible}
        shop_queue={itemData.item.shop_queue}
        uri={itemData.item.uri}
        shop_type={itemData.item.type_shop}
        onSelect={() => {
        // เขียนโค้ดเพิ่ม
          navigation.navigate("Menu");
          dispatch(setCustomerShop({shop_id:itemData.item.id, shop_type:itemData.item.type_shop}));
        }}
      />

    );
  };

  return (
    <FlatList data={users} renderItem={renderGridItem} numColumns={2} />


  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesScreen;