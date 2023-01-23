import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput, Platform, Alert, StatusBar} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../data/userData';
import { firebase } from '../../config';
import { getFirestore, doc, updateDoc, setDoc, getDoc, onSnapshot, collection,deleteDoc} from "firebase/firestore";


const Tab2 = ({navigation}) => {  


  const {user_data} = useSelector((state) => state.user)
  const [phone, setPhone] = useState(user_data.phone) 
  const db = getFirestore();
  async function changephone(){
    const docRef = doc(db, "Users", user_data.id);
      await updateDoc(docRef, {
      phone: phone
    });
  }

  function logout(){
    navigation.navigate("Login", {});
  }
    return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/it.png")} />
      <View style={styles.inputView}>
        <TextInput
          numberOfLines={1}
          style={styles.TextInput}
          placeholder={"name : "+user_data.name}
          placeholderTextColor="#2E2E2E"
          editable={false}
          selectTextOnFocus={false}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          numberOfLines={1}
          style={styles.TextInput}
          placeholder={"username : "+user_data.username}
          placeholderTextColor="#2E2E2E"
          secureTextEntry={true}
          editable={false}
          selectTextOnFocus={false}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          numberOfLines={1}
          style={styles.TextInput}
          value = {phone}
          placeholder={"phone(แก้ไขได้) : "+user_data.phone}
          onChangeText={phone => setPhone(phone)}
          placeholderTextColor="#2E2E2E"
        />
      </View>
      <TouchableOpacity
        numberOfLines={1} 
        onPress={()=>{changephone()}}
        style={styles.saveNumBtn} >
        <Text style={styles.loginText}>save เบอร์ใหม่</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={()=>{logout()}}
        style={styles.loginBtn} >
        <Text style={styles.loginText}>logout</Text>
      </TouchableOpacity>
    </View>
    );
};
export default Tab2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    width: 220,
    height: 120,
    marginLeft:20
  },
 
  inputView: {
    backgroundColor: "#A7A7A7",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft:20
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#F03A00",
  },
  saveNumBtn: {
    width: "50%",
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -15,
    backgroundColor: "#006EF5",
  },
});