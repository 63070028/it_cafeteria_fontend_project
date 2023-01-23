import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setCustomerShop } from "../features/CustomerFoodSlice";


const CategoryGridTile = (props) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      disabled={!props.visible}
      style={styles.gridItem}
      onPress={() => {
        props.onSelect();
      }}
    >
      <View>
        <Image
            style={{ ...styles.tinyLogo, ...{ opacity: props.visible ? 1 : 0.2 }}}
            source={{uri: props.uri}}
            />
        {/* <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.title}>ราคาเริ่มต้น{price}</Text>
        </View> */}
    </View>
      <View>
      <Text style={styles.title} numberOfLines={2}>
          {props.title}
        </Text>
      <Text style={styles.title} numberOfLines={2}>
          คิวก่อนหน้า:{props.shop_queue}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 25,
    height: 200,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
  },tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },item: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 13,
    flexDirection: 'row', 
    textAlign: 'left', 
    fontSize: 15, 
    borderRadius: 25,
    overflow: 'hidden'
  },
});

export default CategoryGridTile;