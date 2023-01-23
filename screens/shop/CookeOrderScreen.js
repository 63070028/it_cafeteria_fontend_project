import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import ToggleSwitch from 'toggle-switch-react-native'

import MenuList from "../../components/MenuList";
import { useDispatch, useSelector } from 'react-redux';


const CookeOrderScreen = ({navigation}) => {
    const [switchOnShop, setSwitchOnShop] = useState(false);

    // const {data, loading} = useSelector((state) => {console.log(state.foods);return state.foods})
    const {data, loading} = useSelector((state) => state.foods)


    
    return (
      <View style={styles.container}>
        {loading && <Text>Loading...</Text>}
            {!loading && (
                <MenuList navigation={navigation} listData={data.filter(foods=>foods.category === "cookeorder")}/>
            )}

        <TouchableOpacity onPress={ () => { navigation.navigate("AddFood"); } }
        style={styles.button}>
        <Text style={{color:"white"}}>Add Food</Text>
      </TouchableOpacity>
        
    </View>
      );
  };
  export default CookeOrderScreen;
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection:"column",
        alignItems: "center",
        paddingTop:"5%"
      },
      button: {
          alignItems: "center",
          backgroundColor: "#2196F3",
          padding: 10,
          width:"50%",
          marginTop:"3%",
          marginBottom:"3%",
          borderRadius:8
        }
  
    });