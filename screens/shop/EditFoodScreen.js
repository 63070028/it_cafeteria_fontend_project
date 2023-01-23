import React, { useEffect, useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import { Text, View, TextInput, Button, TouchableOpacity, StyleSheet, Image, Alert} from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { updeteFood } from '../../features/FoodsSlice';
import { useDispatch, useSelector } from 'react-redux';



const EditFoodScreen = ({route, navigation}) => {
  const dispatch = useDispatch();

  let radioButtonsData;
  if(route.params.category === 'delicatessen'){
   radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'อาหารปรุงสำเร็จ',
    value: 'delicatessen',
    selected: true
  }, {
    id: '2',
    label: 'อาหารตามสั่ง',
    value: 'cookeorder'
  }]
  }
  else{
    radioButtonsData = [{
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'อาหารปรุงสำเร็จ',
      value: 'delicatessen',
    }, {
      id: '2',
      label: 'อาหารตามสั่ง',
      value: 'cookeorder',
      selected: true
    }]
  }

  let radioButtonsDataDetails;
  if(route.params.optionDetails==="true"){
    radioButtonsDataDetails = [{
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'มี',
      value: "Y",
      selected: true
    }, {
      id: '2',
      label: 'ไม่มี',
      value: "N",
    }]
  }
  else{
    radioButtonsDataDetails = [{
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'มี',
      value: "Y",
    }, {
      id: '2',
      label: 'ไม่มี',
      value: "N",
      selected: true
    }]
  }
  
  const {prev, name, price, category, uri, optionDetails, imageName, visible, timestamp} = route.params;
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [radioButtonsDetails, setRadioButtonsDetails] = useState(radioButtonsDataDetails)
  const [image, setImage] = useState(route.params.uri);
  const [imageChange, setImageChange] = useState(false);
  const {user_data} = useSelector((state) => state.user)
  const shop_id = user_data.id;


  function onPressRadioButton(radioButtonsArray) { 
      let obj = radioButtons.find(e=>e.selected === true);  
      return obj.value;
  }

  function onPressRadioButtonDetils(radioButtonsArray) { 
    let obj = radioButtonsDetails.find(e=>e.selected === true);  
    return obj.value;
  }


  //set เก่าของตัวที่จะ edit
  const {control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id:route.params.id,
      shop_id:shop_id,
      name:route.params.name,
      price:route.params.price,
      category:route.params.category,
      optionDetails:route.params.optionDetails===("true")?"Y":"N"
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
        name: new Date() + '_imageFood',
        uri: image,
        type: 'image/jpg',
      });
      formData.append('id', data.id)
      formData.append('shop_id', data.shop_id);
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('category', data.category);
      formData.append('imageChange', imageChange);
      formData.append('oldImageName', route.params.imageName);
      formData.append('optionDetails', data.optionDetails===("Y")?true:false)
      formData.append('timestamp', timestamp)
      formData.append('visible', visible)
     // console.log(image);
      console.log(formData)
  
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

      await axios.post('http://'+ip+':5000/editFood', formData, config).then(
      res => {
        // console.log(res.data);
        Alert.alert(
          "Edit Food Complete!!!!",
          "",
          [
            {
              text: "Close",
              style: "cancel"
            }
          ]
        );
        const formDataNew = {
          id: data.id,
          shop_id: res.data.food_update.shop_id,
          name: res.data.food_update.name,
          price: res.data.food_update.price,
          category: res.data.food_update.category,
          imageName: res.data.food_update.imageName,
          uri: res.data.food_update.uri,
          optionDetails: res.data.food_update.optionDetails,
          timestamp: res.data.timestamp,
          visible:res.data.food_update.visible
        }
        dispatch(updeteFood(formDataNew));
        setImageChange(false)
        console.log(route.params.imageName);
        route.params.imageName = res.data.food_update.imageName;
        console.log(route.params.imageName);
      },
      error => {
        console.log(error);
      }
      );  



    }
    else{

      const formData = {
        id: data.id,
        shop_id: String(data.shop_id),
        name: data.name,
        price: data.price,
        category: data.category,
        imageName:route.params.imageName,
        uri: image,
        imageChange: imageChange,
        optionDetails: data.optionDetails===("Y")?"true":"false",
        timestamp: timestamp,
        visible:visible
      };
      
      let ip;
      if(Platform.OS === 'android'){
        ip = '10.0.2.2';
      }
      else if(Platform.OS === 'ios'){
        ip = 'localhost';
      }

      axios.post('http://'+ip+':5000/editFood', formData).then(
      res => {
        // console.log(res.data);
        Alert.alert(
          "Edit Food Complete!!!!",
          "",
          [
            {
              text: "Close",
              style: "cancel"
            }
          ]
        );
        dispatch(updeteFood(formData));
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

      <Text style={styles.textLabel}>Price:</Text>
      <Controller
        control={control}
        rules={{
         maxLength: 100,
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.textinput}
            placeholder="Enter Price"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="price"
      />
      {errors.price && <Text style={{color:"red"}}>This is required.</Text>}

        <Text style={styles.textLabel}>Category:</Text>
        <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup 
          radioButtons={radioButtons} 
          onPress={(value)=>(onChange(onPressRadioButton(value)))}
          layout='row' 
      />
        )}
        name="category"
      />
      
      <Text style={styles.textLabel}>OptionDetails:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
         }}
        render={({ field: { onChange, value } }) => (
          <RadioGroup 
          radioButtons={radioButtonsDetails} 
          onPress={(value)=>(onChange(onPressRadioButtonDetils(value)))}
          layout='row'
      />
        )}
        name="optionDetails"
      />
      {errors.optionDetails && <Text style={{color:"red"}}>This is required.</Text>}

      
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text>Submit</Text>
      </TouchableOpacity>


    </View>
  );
}

export default EditFoodScreen;

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
