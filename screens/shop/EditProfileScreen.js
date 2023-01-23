import React, { useEffect, useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import { Text, View, TextInput, Button, TouchableOpacity, StyleSheet, Image, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { updateProfileShop } from '../../features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';



const EditProfileScreen = ({route, navigation}) => {

  const dispatch = useDispatch();
  const {user_data} = useSelector((state) => state.user)


  const [imageChange, setImageChange] = useState(false);
  const [image, setImage] = useState(user_data.uri);





  //set เก่าของตัวที่จะ edit
  const {control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id:user_data.id,
      name:user_data.name,
      phone:user_data.phone,
      shop_name:user_data.shop_name
    }
  });


  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      }
      );

      if (!response.cancelled) {
        setImage(response.uri);
        setImageChange(true);
      }
    }
  };


  const onSubmit = async (data) => {
    console.log("imageChange: "+imageChange);

    if(imageChange){
      const formData = new FormData();

      formData.append('myImage', {
        name: new Date() + '_imageShop',
        uri: image,
        type: 'image/jpg',
      });

      formData.append('id', data.id)
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('shop_name', data.shop_name);
      formData.append('imageChange', imageChange);
      formData.append('oldImageName', user_data.imageName);

      // console.log(formData)
  
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      };

      let ip;
      if(Platform.OS === 'android'){
        ip = '10.0.2.2';
      }
      else if(Platform.OS === 'ios'){
        ip = 'localhost';
      }

      await axios.post('http://'+ip+':5000/editProfileShop', formData, config).then(
      res => {
        // console.log(res.data);
        Alert.alert(
          "Edit Shop Complete!!!!",
          "",
          [
            {
              text: "Close",
              style: "cancel"
            }
          ]
        );

        dispatch(updateProfileShop(res.data.food_update));
        setImageChange(false)
        //  res.data.food_update.imageName;
        navigation.goBack();
      },
      error => {
        console.log(error);
      }
      );  



    }
    else{

      const formData = {
        id: data.id,
        name: data.name,
        phone: data.phone,
        shop_name: data.shop_name,
        imageChange: imageChange,
        uri: user_data.uri
      };

      
      let ip;
      if(Platform.OS === 'android'){
        ip = '10.0.2.2';
      }
      else if(Platform.OS === 'ios'){
        ip = 'localhost';
      }

      axios.post('http://'+ip+':5000/editProfileShop', formData).then(
      res => {
        // console.log(res.data);
        Alert.alert(
          "Edit Shop Complete!!!!",
          "",
          [
            {
              text: "Close",
              style: "cancel"
            }
          ]
        );
        dispatch(updateProfileShop(res.data.food_update));
        navigation.goBack();
      },
      error => {
        console.log(error);
      }
      );
    
    }
    
    
  };
  


  return (
    
    <View style={styles.container}>

      <View>
        <TouchableOpacity
          onPress={openImageLibrary}
          style={styles.uploadBtnContainer}
        >
          {image ?(
            <Image
              source={{ uri: image }}
              style={{ width: 140, height: 100 }} 
            />
          ):(<Text style={styles.uploadBtn}>Upload Image</Text>)
          }
        </TouchableOpacity>
      </View>

      <Text style={styles.textLabel}>Name:</Text>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.textinput}
            placeholder="Enter Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && <Text  style={{color:"red"}}>This is required.</Text>}

      <Text style={styles.textLabel}>Phone:</Text>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.textinput}
            placeholder="Enter Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="phone"
      />
      {errors.phone && <Text  style={{color:"red"}}>This is required.</Text>}

      <Text style={styles.textLabel}>Shop Name:</Text>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.textinput}
            placeholder="Enter Shop Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="shop_name"
      />
      {errors.shop_name && <Text  style={{color:"red"}}>This is required.</Text>}


      
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text>Submit</Text>
      </TouchableOpacity>


    </View>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems: "center",
    marginTop:"5%"
  },
  button: {
      alignItems: "center",
      backgroundColor: "#2196F3",
      padding: 10,
      width:"50%",
      marginTop:"5%",
  },
  textinput:{
    height: 40,
    margin: 12,
    borderWidth:1,
    padding: 10,
    backgroundColor:"white",
    width:"80%"
  },
  textLabel:{
    alignSelf:"flex-start",
    marginLeft:"10%",
    fontSize:20
  },
  uploadBtnContainer: {
    height: 100,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    overflow: 'hidden',
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.5,
    fontWeight: 'bold',
    color:"#2196F3"
  },
  skip: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.5,
  },


});
