import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import OrderItem from "./OrderItem";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from "../data/ordersData";
import { getFoods } from "../data/foodsData";

const OrderList = (props) => {

  const {data, loading} = useSelector((state) => state.orders)
  const {user_data} = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const renderMealItem = (itemData) => {
    return (
      <OrderItem
      id={itemData.item.id} 
      orders={itemData.item.orders} 
      status={itemData.item.status} 
      phone={itemData.item.phone} 
      shop_id={itemData.item.shop_id} 
      user_name={itemData.item.user_name}
      result_money={itemData.item.result_money}
      user_id={itemData.item.user_id}
      timestamp={itemData.item.timestamp}

      cancelDetail={itemData.item.cancelDetail}

      onSelect={()=>{props.navigation.navigate("OrderDetail", {id:itemData.item.id, button:props.button, orders:itemData.item.orders, result_money:itemData.item.result_money, user_id:itemData.item.user_id, cancelDetail:itemData.item.cancelDetail})}}
      />
    );
  };

  function refresh(){
    dispatch(getOrders(user_data.id));
    // dispatch(getFoods(user_data.id));
  }

  return (
    <View style={styles.list}>
        <FlatList
        style={{ width: "100%" }}
        data={props.listData}
        renderItem={renderMealItem}

        refreshing={loading}
        onRefresh={()=>{refresh();}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderList;
