import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import OrderDetailItem from "../../components/OrderDetailItem";


const OrderDetailList = ({route}) => {
const {listdata} = route.params;
  const renderMealItem = (itemData) => {
    return (
    <OrderDetailItem 
       id={itemData.item.id}
       name={itemData.item.name}
       price={itemData.item.price}
       imageName={itemData.item.imageName}
       uri={itemData.item.uri}
       category={itemData.item.category} 
       optionDetails={itemData.item.optionDetails}
       visible={itemData.item.visible}
       quantity={itemData.item.quantity}
       shop_id={itemData.item.shop_id}
       details={itemData.item.details}
       />
    );
  };

  return (
    <View style={styles.list}>
        <FlatList
        style={{ width: "80%"}}
        data={listdata}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:"5%",
  },
});

export default OrderDetailList;
