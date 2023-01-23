import React, { useState, useEffect } from "react";
import { StatusBar} from 'expo-status-bar';
import { View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground, 
  SafeAreaView,
  FlatList,
  Image,
  Button,
  Text,
  TextInput,
  Keyboard,
  Alert,
  ScrollView,

} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import RadioGroup from 'react-native-radio-buttons-group';
import { firebase } from '../../config';
import { getFirestore, doc, updateDoc, setDoc, getDoc, onSnapshot} from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-native-uuid';


const radioButtonsData = [{
  id: '1', // acts as primary key, should be unique and non-empty string
  label: 'ธรรมดา',
  value: 'ธรรมดา',
  selected: true,
}, {
  id: '2',
  label: 'พิเศษ',
  value: 'พิเศษ',
  selected: false,
}]

const radioButtonsMeatData = [{
  id: '1', // acts as primary key, should be unique and non-empty string
  label: 'หมู',
  value: 'หมู',
  selected: true,
}, {
  id: '2',
  label: 'ไก่',
  value: 'ไก่',
  selected: false,
}, {
  id: '3',
  label: 'ปลาหมึก',
  value: 'ปลาหมึก',
  selected: false,
}, {
  id: '4',
  label: 'กุ้ง',
  value: 'กุ้ง',
  selected: false,
}]

const radioButtonsQuantityData = [{
  id: '1', // acts as primary key, should be unique and non-empty string
  label: '1',
  value: '1',
  selected: true,
}, {
  id: '2',
  label: '2',
  value: '2',
  selected: false,
}, {
  id: '3',
  label: '3',
  value: '3',
  selected: false,
}, {
  id: '4',
  label: '4',
  value: '4',
  selected: false,
}, {
  id: '5',
  label: '5',
  value: '5',
  selected: false,
}]


// const Item = ({onSelectgotocart, addField}) =>{
//   const [addData, setAddData] = useState('');
//   // const [text, onChangeText] = React.useState("");
//   return(
//       <SafeAreaView style={styles.container}>
//         <Text>อาหาร</Text>
//           <View style={styles.imgcontainer}>
//               <Image
//               source={require('../assets/icon.png')}
//               style={styles.img}
//               >
//               </Image>
//               <Text style={styles.titel}>Hello world !!!</Text>
//               <View style={styles.radiocontainer}> 
//                   <Text style={styles.titel}>ประเภทเนื้อสัตว์</Text>
//                   <RadioButton PROP={PROP}/>
//                   <Text style={styles.titel2}>ใส่ผักไหม</Text>
//                   <RadioButton PROP={PROP}/>
//                   <Text style={styles.titel2}>รายละเอียดเพิ่มเติม</Text>
//                   <TextInput 
//                   style={{width: '100%', backgroundColor:'grey', height:30,}}
//                   onChangeText={(heading) => setAddData(heading)}
//                   value={addData}
//                   multiline={true}
//                   ></TextInput>
//               </View>
//           </View>
//           <View style={{flex:0.05}}>
//               <Button style={{width: '100%',}} title='ใส่ตระกร้าของฉัน                                     ราคา xxx'
//               onPress={addField}
//               /> 
//           </View>
          
//       </SafeAreaView>
      
//   );
// };

const App = ({navigation, route}) => {
    const {uri , shop_id} = route.params;
  const {cart_id} = useSelector((state) => state.cart_id)
  const [addData, setAddData] = useState('');
  const db = getFirestore(); // initialize Firestore
  const docRef = doc(db, "Carts", cart_id);
  const [cart, setCart] = useState([]);
  var databasecart = [];
  var count=1;
  const [onshop_id, setOnshop_id] = useState('')
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const {customer_shop_id} = useSelector((state) => state.shop_id)

  
  useEffect( () => {
    // if (count == 0) {
    //   const data ={
    //     orders:[shop_id]
    //   }
    //   updateDoc(docRef, data);
    // }else{}
    
    getDoc(doc(db, "Carts", cart_id)).then(docSnap => {
      databasecart = docSnap.data();
      setCart(databasecart.orders)
      setOnshop_id(databasecart.useshop_id)
      });
    },[])
  
  // console.log(Datacheckusersid)
  // console.log(Name)
  // console.log(onshop_id)
  
  
  // function getdata(){
  //   onSnapshot(doc(db, "User-test", "stu01"), (doc) => {
  //     databasecart = doc.data();
  //     setCart(databasecart.cart)
  //     });
  // }
  // getdata();
  function addCart(){ 
    console.log(shop_id)
    var cartcount = cart.length;
    count = cartcount;
    // var describtionmeat = onPressRadioButtonvaleMeat();
    // var describtionType= onPressRadioButtonvale();
    // var describtionquantity = 0;
      cart.push({
        id:uuid.v4(),
        name:'อาหารเพิ่มเติม',
        price:'0',
        quantity:quantity,
        uri:"https://firebasestorage.googleapis.com/v0/b/mobileproject-2d0b3.appspot.com/o/images%2FdefaultFood.png?alt=media&token=78bf36c7-0b62-46cf-87f1-bccc15d26e8c",
        shop_id:customer_shop_id,
        details:addData
        })
    // console.log(cart)
    // console.log(shop_id)
  
    if (addData.length >= 0){
      const data ={
        orders:cart,
      }
      const data1 ={
        orders:cart,
      }
      if (cartcount == 0) {
        updateDoc(docRef, data1)
        .then(() => {
        navigation.goBack();
          setAddData('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        })
      }else {
        updateDoc(docRef, data)
        .then(() => {
         navigation.goBack();
          setAddData('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        })
      }
      // updateDoc(docRef, data)
      //   .then(() => {
      //     count += 1;
      //     setAddData('');
      //     Keyboard.dismiss();
      //   })
      //   .catch((error) => {
      //     alert(error);
      //   })
    }

    onSnapshot(doc(db, "Carts", cart_id), (doc) => {
      databasecart = doc.data();
      setCart(databasecart.cart)
      });
  };


  // User Radio Function
  const [radioButtons, setRadioButtons] = useState(radioButtonsData)
  const [radioButtonsMeat, setRadioButtonsMeat] = useState(radioButtonsMeatData)
  // const [radioButtonsQuantity, setRadioButtonsQuantity] = useState(radioButtonsQuantityData)

  ///ประเภทอาหาร
  function onPressRadioButton(radioButtonsArray) {
      setRadioButtons(radioButtonsArray);
  }

  function onPressRadioButtonvale() {
    let obj = radioButtons.find(e=>e.selected === true);  
    return obj.value;
}

///เนื้อสัตว์
//   function onPressRadioButtonMeat(radioButtonsMeatArray) {
//     setRadioButtonsMeat(radioButtonsMeatArray);
//   }

//   function onPressRadioButtonvaleMeat() {
//   let obj = radioButtonsMeat.find(e=>e.selected === true);  
//   return obj.value;
//   }

///จำนวนจาน
  // function onPressRadioButtonQuantity(radioButtonsQuantityArray) {
  //   setRadioButtonsQuantity(radioButtonsQuantityArray);
  // }

  // function onPressRadioButtonvaleQuantity() {
  // let obj = radioButtonsQuantity.find(e=>e.selected === true);  
  // return obj.value;
  // }

//   console.log(radioButtons)
//   console.log(onPressRadioButtonvale())
//   console.log(onPressRadioButtonvaleMeat())
  // console.log(onPressRadioButtonvaleQuantity())
  const UselessTextInput = (props) => {
    return (
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={40}
      />
    );
  }
  return (
<ScrollView>
    <View style={styles.container}>
        <Image
            style={styles.image}
            source={{uri: "https://firebasestorage.googleapis.com/v0/b/mobileproject-2d0b3.appspot.com/o/images%2FdefaultFood.png?alt=media&token=78bf36c7-0b62-46cf-87f1-bccc15d26e8c"}}
            />
            <View style={styles.detailcontainner}>
        <View style={styles.radioContainners}>
            <Text style={styles.titleFood}>สั่งอาหารเพิ่มเติม</Text>
            <Text style={styles.titleFood2}>หมายเหตุ: การสั่งอาหารเพิ่มเติมคือการสั่งอาหารตามสั่งที่ไม่มีใน List Menu ของร้าน
            ราคาอาหารขึ้นอยู่กับแต่ล่ะร้านและรายละเอียดต่างๆของอาหารที่ลูกค้าจะสั่งควรพิมพ์ให้ครบถ้วนด้วย
            </Text>
            <Text style={styles.title}>จำนวน</Text>
            <View style={{marginLeft:45}} >
              <NumericInput  
              onChange={value => setQuantity(value)}
              rounded
              />
            </View>
            <Text style={styles.title}>รายละเอียดเพิ่มเติม</Text>
            <TextInput
            style={{width: '80%', backgroundColor:'grey',marginLeft:40, borderRadius:5}}
             onChangeText={(heading) => setAddData(heading)}
             value={addData}
             multiline
            numberOfLines={6}
            />
           
            <Text style={styles.title}>ราคา: ตามราคาหน้าร้าน</Text>
            
            <View style={{marginTop: 10,justifyContent:'center',alignItems: "center",marginBottom:30}}>
              <TouchableOpacity style={{width:'50%',backgroundColor:'#006EF5',padding:10,borderRadius:25}}
                onPress={() => addCart()}
                >
                  <Text style={{fontSize:20,color:"white",textAlign:'center'}}>ใส่ตระกร้าของฉัน</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
</ScrollView>
  
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
  },detailcontainner:{
    margin:10,
    padding:10,
    borderWidth:2,
    borderColor:'black',
    backgroundColor:'#B8E8FC',
    borderRadius:5
  },
  image: {
    width:420,
    height:240, 
},
radioContainners:{
  marginTop:30
},
titleFood:{
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom:15,
    marginLeft:10
},titleFood2:{
    fontSize: 20,
    marginBottom:15,
    marginLeft:10
},
title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:20,
    marginLeft:10,
    marginTop:20,
},
radio:{
  marginLeft:30
}
});


export default App;