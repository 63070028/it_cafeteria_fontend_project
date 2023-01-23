import React from "react";
import { FlatList, View, StyleSheet, ScrollView } from "react-native";

import MenuItem from "./MenuItem";

import { useDispatch, useSelector } from 'react-redux';
import { getFoods } from "../data/foodsData";
import { getOrders } from "../data/ordersData";

const MenuList = (props) => {

  const {data, loading} = useSelector((state) => state.foods)
  const {user_data} = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const renderMealItem = (itemData) => {
    return (
      <MenuItem
        id={itemData.item.id}
        name={itemData.item.name}
        price={itemData.item.price}
        imageName={itemData.item.imageName}
        uri={itemData.item.uri}
        category={itemData.item.category} 
        optionDetails={itemData.item.optionDetails}
        timestamp={itemData.item.timestamp}
        visible={itemData.item.visible}
        navigation={props.navigation}
      />
    );
  };

  function refresh(){
    dispatch(getFoods(user_data.id));
    // dispatch(getOrders(user_data.id));
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

export default MenuList;
