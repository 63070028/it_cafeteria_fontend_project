import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput, Platform, Alert, StatusBar} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../data/userData';


const LoginScreen = ({navigation}) => {  
  const dispatch = useDispatch();
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')    

    return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/it.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#2E2E2E"
          onChangeText={username => setUsername(username)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#2E2E2E"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <TouchableOpacity 
        onPress={()=>{
            dispatch(login({navigation, username, password}));
        }}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>login</Text>
      </TouchableOpacity>
    </View>
    );
};
export default LoginScreen;

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
    width: "80%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 1,
    marginLeft: 5,
    textAlign:'center'
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
    backgroundColor: "#0BA4F7",
  },
});