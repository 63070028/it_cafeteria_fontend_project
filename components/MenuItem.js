
import React, { useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Alert
} from "react-native";
import axios from 'axios';
import ToggleSwitch from 'toggle-switch-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { delFood, foodSetVisibleUpdate } from '../features/FoodsSlice';



const MenuItem = props => {
  const dispatch = useDispatch();


  function deleteFood(id, imageName, name) { 

    console.log("Delete: "+id, imageName);
    const formData = {
      id: id,
      imageName:imageName,
    };
    
    let ip;
    if(Platform.OS === 'android'){
      ip = '10.0.2.2';
    }
    else if(Platform.OS === 'ios'){
      ip = 'localhost';
    }


    Alert.alert(
      "Confirm Food "+name,
      "Are you sure you want to delete?",
      [
        {
          text: "NO",
          style: "cancel"
        },
        { text: "YES", onPress: () => {
          
          axios.post('http://'+ip+':5000/deleteFood', formData).then(
          res => {
            // console.log(res.data);
            Alert.alert(
              "Delete "+name+" Complete!!!",
              "",
              [
                {
                  text: "Close",
                  style: "cancel"
                },
              ]
            );
            dispatch(delFood({id:res.data.id}))
          },
          error => {
            console.log(error);
          }
          );
        } }
      ]
    );
  }


  const [visibleFood, setVisibleFood] = useState(props.visible);

  function visibleFoodApi(id){
    const formData = {
      id: id,
      visible: !visibleFood
    }

    let ip;
    if(Platform.OS === 'android'){
      ip = '10.0.2.2';
    }
    else if(Platform.OS === 'ios'){
      ip = 'localhost';
    }

    axios.post('http://'+ip+':5000/setVisibleFood', formData).then(
      res => {
        // console.log(res.data);
        setVisibleFood(!visibleFood)
        dispatch(foodSetVisibleUpdate({id:res.data.id, visible:res.data.visible}))
      },
      error => {
        console.log(error);
      }
    );
  
  };

  return (
    <View style={styles.menuItem}>
      
      <Text style={styles.text_name}>{props.name}</Text>

      <View style={styles.itemContainer}>
              <Image
              style={styles.stretch}
            source={{uri: props.uri}}
            />
          <View style={styles.containerInfo}>
            <Text style={styles.text_price}>ราคา: {props.price}</Text>
          </View>

          
      <View style={styles.modify_menu}>

          <ToggleSwitch style={{marginLeft:"5%"}}
          isOn={visibleFood}
          onColor="green"
          offColor="gray"
          size="medium"
          onToggle={()=>{visibleFoodApi(props.id)}}
          />

        <View style={{marginBottom:"20%"}}></View>

      <TouchableOpacity
        style={styles.button_edit} onPress={() => { props.navigation.navigate("EditFood", 
        {id:props.id,
           name:props.name,
           price:props.price, 
           category:props.category, 
           imageName:props.imageName,
           uri:props.uri, 
           optionDetails:props.optionDetails,
           timestamp:props.timestamp,
           visible:visibleFood})}}>
        <Text style={{color:"white", textAlign:"center"}}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button_del} onPress={()=>{deleteFood(props.id,  props.imageName, props.name)}}>
        <Text style={{color:"white", textAlign:"center"}}>Delete</Text>
      </TouchableOpacity>


    
       
       
        </View>

      </View>
                
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    borderWidth:4,
    marginBottom:"5%",
    height: 180,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    borderColor:"gray",
  },
  itemContainer:{
    flexDirection:"row",
    alignItems:"center",
    // width:"100%",
    // height:"100%",
    
  },
  stretch: {
    margin:"5%",
    width: "40%",
    height: "80%",
    resizeMode: 'stretch',
    borderRadius:10,
  },
  modify_menu:{
    alignSelf:"flex-start",
    marginLeft:"8%",
  },
  containerInfo:{
    alignSelf:"flex-start",
    marginTop:"5%",
  },
  button_edit: {
    backgroundColor: "#2196F3",
    padding: 10,
    marginTop:"3%",
    marginBottom:"3%",
    borderRadius:5
  },
  button_del: {
    backgroundColor: "#CB4335",
    padding: 10,
    marginTop:"3%",
    marginBottom:"3%",
    borderRadius:5
  },
  text_name:{
    width:"100%",
    fontSize:25,
    fontWeight:"bold",
    marginLeft:"5%",
    marginTop:"1%"
  },
  text_price:{
    width:90,
    fontSize:16,
    textAlign:"center"
    // fontWeight:"500"
  }
  
});

export default MenuItem;
