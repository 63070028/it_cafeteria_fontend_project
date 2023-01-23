import React, { useEffect, useState} from 'react';
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

import { getFoods } from "../data/foodsData";
import { firebase } from '../config';
import { getOrdersRealTime } from '../features/OrdersSlice';
// import { getOrders } from '../data/ordersData';

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import library ที่จำเป็น

// import screen ที่เกี่ยวข้อง
import ProfileShopScreen from '../screens/shop/ProfileShopScreen';
import DelicatessenScreen from "../screens/shop/DelicatessenScreen";
import CookeOrderScreen from "../screens/shop/CookeOrderScreen";
import AddFoodScreen from "../screens/shop/AddFoodScreen";
import EditFoodScreen from "../screens/shop/EditFoodScreen";
import EditProfileScreen from '../screens/shop/EditProfileScreen';



import OrderScreen from "../screens/order/OrderScreen";
import InProgressScreen from "../screens/order/InProgressScreen";
import PendingPaymentScreen from "../screens/order/PendingPaymentScreen";
import CancelScreen from "../screens/order/CancelScreen";
import CancelDetailScreen from '../screens/order/CancelDetailScreen';

import BlackListScreen from "../screens/blacklist/BlackListScreen";
import OrderDetailScreen from "../screens/order/OrderDetailScreen";
import LoginScreen from "../screens/login/LoginScreen";
// สร้าง navigator ตามโจทย์กำหนด

import CategoriesScreen from "../screens/users/CategoriesScreen";
import ChooseMenu from "../screens/users/ChooseMenu";
import CartMenu from "../screens/users/CartMenu";
import ChooseDetailMenu from "../screens/users/ChooseDetailMenu";
import ChooseDetail from "../screens/users/ChooseDetail";
import Tab1 from "../screens/users/Tab1";
import Tab2 from "../screens/users/Tab3";
import Tab3 from "../screens/users/Tab2";
import OrdersuserPending from "../screens/users/OrdersuserPending"
import OrdersuserProcess from "../screens/users/OrdersuserProcess"
import OrdersuserComplete from "../screens/users/OrdersuserComplete"
import OrdersDetailUser from "../screens/users/OrdersDetailUser"
import OrdersuserCancle from "../screens/users/OrderuserCancle"
import ChooseMenuDelicatessen from "../screens/users/ChooseMenuDelicatessen"
import ChooseDetailMenuMore from "../screens/users/ChooseDetailMenuMore"

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { Badge } from 'react-native-paper';


const MenuShopNavigator = createMaterialTopTabNavigator();
// const AddFoodNavigator = createNativeStackNavigator();
const MyShopNavigator = createNativeStackNavigator();
const BlackListNavigator = createNativeStackNavigator();


const OrderStackNavigator = createNativeStackNavigator();
const OrderTopNavigator = createMaterialTopTabNavigator();


const MainNavigator = createBottomTabNavigator();
const LoingNavigator = createNativeStackNavigator();

const stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const OrderUserTopNavigator = createMaterialTopTabNavigator();

// const [switchOnShop, setSwitchOnShop] = useState(false)

// สร้าง function สำหรับการกำหนด Navigator แต่ละตัว เช่น




function MyMenuShopNavigator(){
  return(
    <MenuShopNavigator.Navigator>
       <MenuShopNavigator.Screen name="ProfileShop" component={ProfileShopScreen}/>
      <MenuShopNavigator.Screen name="Delicatessen" component={DelicatessenScreen}/>
      <MenuShopNavigator.Screen name="CookeOrder" component={CookeOrderScreen}/>
    </MenuShopNavigator.Navigator>
  );
}

// function MyAddFoodNavigator(){
//   return(
//     <AddFoodNavigator.Navigator>
//       <AddFoodNavigator.Screen name="m_AddFood" component={AddFoodScreen}/>
//     </AddFoodNavigator.Navigator>
//   );
// }

function MyShopFoodNavigator(){
  return(
  <MyShopNavigator.Navigator>
    <MyShopNavigator.Screen name="m_Shop" component={MyMenuShopNavigator} options={{ headerShown: false}}/>
    <MyShopNavigator.Screen name="AddFood" component={AddFoodScreen}/>
    <MyShopNavigator.Screen name="EditFood" component={EditFoodScreen}/>
    <MyShopNavigator.Screen name="EditProfile" component={EditProfileScreen}/>
  </MyShopNavigator.Navigator>
  );
}

function MyOrderTopNavigator(){
  return(
    <OrderTopNavigator.Navigator>
      <OrderTopNavigator.Screen name="Order" component={OrderScreen}/>
      <OrderTopNavigator.Screen name="Process" component={InProgressScreen}/>
      <OrderTopNavigator.Screen name="Payment" component={PendingPaymentScreen}/>
      <OrderTopNavigator.Screen name="Cancel" component={CancelScreen}/>
    </OrderTopNavigator.Navigator>
  );
}


function MyOrderStackNavigator(){
  return(
    <OrderStackNavigator.Navigator>
      <OrderStackNavigator.Screen name="Top_Order" component={MyOrderTopNavigator} options={{ headerShown: false}}/>
      <OrderStackNavigator.Screen  name="OrderDetail" component={OrderDetailScreen}/>
      <OrderStackNavigator.Screen  name="CancelDetailScreen" component={CancelDetailScreen}/>
    </OrderStackNavigator.Navigator>
  );
}

function MyBlackListNavigator(){
  return(
    <BlackListNavigator.Navigator>
      <BlackListNavigator.Screen  name="m_Blacklist" component={BlackListScreen} options={{ headerShown: false}}/>
      <BlackListNavigator.Screen  name="OrderDetail" component={OrderDetailScreen}/>
    </BlackListNavigator.Navigator>
  );
}

function MyMainNavigator(){
  const {data} = useSelector((state) => state.orders)
  return(
    <MainNavigator.Navigator>
        <MainNavigator.Screen name="Shop" component={MyShopFoodNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
          return <Ionicons name="restaurant" size={size} color={color} />;
          }, 
          headerStyle: {
            backgroundColor: '#006EF5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          }}
        />
        <MainNavigator.Screen name="Order" component={MyOrderStackNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => {
          return <AntDesign name="filetext1" size={size} color={color} />;
          },
          tabBarBadge: data.filter(orders=>orders.status === "pending").length>0?data.filter(orders=>orders.status === "pending").length:null,
          headerStyle: {
            backgroundColor: '#006EF5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          }}
        />
        <MainNavigator.Screen name="Blacklist" component={MyBlackListNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
          return <FontAwesome name="list" size={size} color={color} />;
          },
          headerStyle: {
            backgroundColor: '#006EF5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          }}
        />
    </MainNavigator.Navigator>
  )
}



//UserScreen

function MymaninFunction({navigation, route}) {
  const {orders} = useSelector((state) => state.cart_id)
  return(
    <stack.Navigator>
      <stack.Screen
      name="Restuarant" 
      component={CategoriesScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#006EF5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      />
      <stack.Screen
      name='Menu'
      component={MyFoodTopTap}
      options={{
        headerRight: () => (
          <HeaderButtons style={styles.headerbuttons} HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Tab_1" iconName="ios-cart" onPress={() =>{navigation.navigate('Cart');}}/>
            <Badge style={styles.badge}>{orders.length}</Badge>
          </HeaderButtons>

        ),
        headerStyle: {
          backgroundColor: '#006EF5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      />
      <stack.Screen
      name='Detail'
      component={ChooseDetail}
      />
      <stack.Screen
      name='Cart'
      component={CartMenu}
      />
      <stack.Screen
      name='DetailMore'
      component={ChooseDetailMenuMore}
      />
    </stack.Navigator>
  ); 
}


function MyTab() {
  const {data} = useSelector((state) => state.orders)
  return (
  <Tab.Navigator>
    <Tab.Screen name="Shop" component={MymaninFunction} options={
      { headerShown: false,
        tabBarIcon: ({ color, size }) => {
          return <FontAwesome name="shopping-basket" size={size} color={color} />;
          },
      }}/>
    <Tab.Screen name="Order" component={MyUserToptapNavigator}
    options={{
      tabBarIcon: ({ color, size }) => {
      return <AntDesign name="filetext1" size={size} color={color} />;
      },headerStyle: {
        backgroundColor: '#006EF5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    />
    <Tab.Screen name="Profile" component={Tab3} 
    options={{
      tabBarIcon: ({ color, size }) => {
      return <AntDesign name="user" size={size} color={color} />;
      },headerStyle: {
        backgroundColor: '#006EF5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },}}
    />
  </Tab.Navigator>
  ); }

  function MyUserToptapNavigator(){
    return(
      <BlackListNavigator.Navigator>
        <BlackListNavigator.Screen  name="m_Blacklist" component={MyOrderTopTap} options={{ headerShown: false}}/>
        <BlackListNavigator.Screen  name="OrderUserDetail" component={OrdersDetailUser}/>
      </BlackListNavigator.Navigator>
    );
  }

function MyOrderTopTap() {
  return(
  <OrderUserTopNavigator.Navigator>
    <OrderUserTopNavigator.Screen name="Pending" component={OrdersuserPending} options={{ headerShown: false}}/>
    <OrderUserTopNavigator.Screen name="Process" component={OrdersuserProcess} options={{ headerShown: false}}/>
    <OrderUserTopNavigator.Screen name="Complete" component={OrdersuserComplete} options={{ headerShown: false}}/>
    <OrderUserTopNavigator.Screen name="Cancle" component={OrdersuserCancle} options={{ headerShown: false}}/>
  </OrderUserTopNavigator.Navigator>
  )
  
}

function MyFoodTopTap() {
  return(
  <OrderUserTopNavigator.Navigator>
    <OrderUserTopNavigator.Screen name="อาหารสำเร็จ" component={ChooseMenuDelicatessen} options={{ headerShown: false}}/>
    <OrderUserTopNavigator.Screen name="อาหารตามสั่ง" component={ChooseMenu} options={{ headerShown: false}}/>
  </OrderUserTopNavigator.Navigator>
  )
  
}




// สร้าง Navigator หลัก
export default function MyNavigator() {

  const {user_data, loading} = useSelector((state) => state.user)
  const {data} = useSelector((state) => state.orders)

  const dispatch = useDispatch();

  useEffect(() => {
    if(user_data != null && user_data.role == "owner"){
      dispatch(getFoods(user_data.id));
      // dispatch(getOrders(user_data.id));
      firebase.firestore().collection('Orders').where("shop_id", "==", user_data.id)
      .onSnapshot((querySnapshot) => {
          const orders = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));

          orders.sort(function(a,b){
            return new Date(a.timestamp) - new Date(b.timestamp);
          });

          dispatch(getOrdersRealTime(orders));
      });
      
    }
  }, [user_data]);


  return (
    <NavigationContainer>
      <LoingNavigator.Navigator>
          <LoingNavigator.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
          <LoingNavigator.Screen name="MainUser" component={MyTab} options={{ headerShown: false}}/>
          <LoingNavigator.Screen name="MainShop" component={MyMainNavigator} options={{ headerShown: false}}/>
          <LoingNavigator.Screen name="Blacklist" component={Tab2} options={{ headerShown: false}}/>
          <LoingNavigator.Screen name="OrderUserDetail" component={OrdersDetailUser} options={{headerStyle: {
        backgroundColor: '#006EF5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },}}/>
      </LoingNavigator.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  badge:{
    backgroundColor:"#D60265",
    right: 18,
    bottom: 9
  },
});