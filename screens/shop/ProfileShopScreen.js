import React, { useEffect, useState, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, Image, RefreshControl, SafeAreaView, ScrollView} from "react-native";
import ToggleSwitch from 'toggle-switch-react-native'
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
// import { getFoods } from '../../data/foodsData';
// import { getOrders } from '../../data/ordersData';
// import { firebase } from '../../config';
// import { getOrdersRealTime } from '../../features/OrdersSlice';

const ProfileShopScreen = ({navigation}) => {  

    
  
    const {user_data, loading} = useSelector((state) => state.user)
    const {data} = useSelector((state) => state.orders)
    const [switchOnShop, setSwitchOnShop] = useState(false);

    const dispatch = useDispatch();


    useEffect(() => {
      if(user_data != null){
        setSwitchOnShop(user_data.visible)
      }
    }, [user_data]);



    
    function logout(){
      navigation.navigate("Login", {});
    }

    function visibleShopApi(id){
      const formData = {
        id: id,
        visible: !switchOnShop
      }
  
      let ip;
      if(Platform.OS === 'android'){
        ip = '10.0.2.2';
      }
      else if(Platform.OS === 'ios'){
        ip = 'localhost';
      }
  
      axios.post('http://'+ip+':5000/setVisibleShop', formData).then(
        res => {
          // console.log(res.data);
          setSwitchOnShop(!switchOnShop)
          // dispatch(shopSetVisibleUpdate({id:res.data.id, visible:res.data.visible}))
        },
        error => {
          console.log(error);
        }
      );
    }






    return (
    <View style={styles.container}>


        <Text style={{fontSize:30, fontWeight:"bold", marginBottom:"5%"}}>Profile Shop</Text>
        {loading && <Text>Loading...</Text>}

        <ToggleSwitch
        isOn={switchOnShop}
        onColor="green"
        offColor="gray"
        label="On/Off Shop"
        labelStyle={{ color: "black", fontWeight: "900" }}
        size="large"
        onToggle={() => {visibleShopApi(user_data.id)}}
        />

      <View style={{alignItems:"center", borderWidth:4, borderRadius:5, marginTop:"5%", borderColor:"gray"}}>

        {!loading &&  <Image
              source={{ uri: user_data.uri }}
              style={{ width: 240, height: 150, resizeMode: "contain", borderRadius:10, marginTop:"5%"}}
               
        />}

        <View style={{width:320, margin:"5%"}}>
        {!loading && <Text style={styles.text_profile_info}>ชื่อ: {user_data.name}</Text>}
        {!loading && <Text style={styles.text_profile_info}>เบอร์ติดต่อ: {user_data.phone}</Text>}
        {!loading && <Text style={styles.text_profile_info}>ชื่อร้าน: {user_data.shop_name}</Text>}
        {!loading && <Text style={styles.text_profile_info}>ประเภทร้าน: {user_data.type_shop}</Text>}
        </View>

        {!loading && <TouchableOpacity 
        onPress={ () => { navigation.navigate("EditProfile"); } }
        style={styles.button}>
        <Text style={{color:"white", textAlign:"center"}}>Edit</Text>
        </TouchableOpacity>}

      </View>
        
        

        {!loading && <TouchableOpacity 
        onPress={()=>{logout()}}
        style={styles.button_logout}>
        <Text style={{color:"white"}}>Logout</Text>
      </TouchableOpacity>}
      
  
      
    </View>
    );
};
export default ProfileShopScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      alignItems: "center",
      margin:"0.5%",
      padding:"5%",
      borderWidth:1,
      borderRadius: 5,
      borderColor:"#e6e6e8",
      backgroundColor:"white"
    },
    button: {
        backgroundColor: "#2196F3",
        padding: 10,
        width:100,
        marginBottom:"3%",
        borderRadius:5
    },
    button_logout: {
    alignItems: "center",
    backgroundColor: "#CB4335",
    padding: 10,
    width:"80%",
    marginTop:"15%",
    marginBottom:"3%",
    borderRadius:25
    },
    text_profile_info:{
        fontSize:18,
        marginTop:"2%",
        marginLeft:"15%"
    },

  });