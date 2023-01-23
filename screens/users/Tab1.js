import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, TextInput, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";


const PROP = [
	{
		key: 'apple',
		text: 'หมู',
	},
	{
		key: 'motorola',
		text: 'ไก่',
	},
	{
		key: 'lenovo',
		text: 'ปลาหมึก',
  },
  
];

const Tab1 = ({navigation}) =>{
    const [text, onChangeText] = React.useState("");
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imgcontainer}>
                <Image
                source={require('../../assets/icon.png')}
                style={styles.img}
                >
                </Image>
                <Text style={styles.titel}>Hello world !!!</Text>
                <View style={styles.radiocontainer}> 
                    <Text style={styles.titel}>ประเภทเนื้อสัตว์</Text>
                    <RadioButton PROP={PROP}/>
                    <Text style={styles.titel2}>ใส่ผักไหม</Text>
                    <RadioButton PROP={PROP}/>
                    <Text style={styles.titel2}>รายละเอียดเพิ่มเติม</Text>
                    <TextInput 
                    style={{width: '100%', backgroundColor:'grey', height:30,}}
                    onChangeText={onChangeText}
                    value={text}
                    multiline={true}
                    ></TextInput>
                </View>
            </View>
            <View style={{flex:0.1}}>
                <Button style={{width: '100%',}} title='เพิ่มสินค้า'/> 
            </View>
            
        </SafeAreaView>
        
    );
};

// const [fontsLoaded] = useFonts({
//     'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
//   });

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    imgcontainer:{
        flex:0.9,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 20,
    },
    radiocontainer:{
        flex:0.55,
        position: 'absolute',
        fontSize: 14,
        fontWeight: 600,
        marginVertical: '75%',
        marginRight: '30%',
        width:260,

    },
    img: {
        width: '50%',
        height: '40%',
    },
    titel: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12.5,
        marginVertical: 30,
    },
    titel2: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12.5,
    },
  });
export default Tab1;