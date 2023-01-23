import React from "react";
import { StatusBar } from 'expo-status-bar';
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

} from 'react-native';

import ChooseDetailMenu from "./ChooseDetailMenu";
import ChooseDetailMenuNum from "./ChooseDetailMenuNum";
import ChooseDetailMenuDelicatessen from "./ChooseDetailMenuDelicatessen"
import ChooseDetailMenuNumOrders from "./ChooseDetailMenuNumOrders"


const App = ({navigation ,route}) => {
    const {Type,Name,Price,uri,shop_id,category,Type_shop,optionDetails} = route.params;
    if (Type_shop === 'Food' && category == 'cookeorder') {
        return ( <ChooseDetailMenu
        Name={Name}
        Price={Price}
        uri={uri}
        shop_id={shop_id}
        back={() => {navigation.goBack();}}
        /> );
    }else if(Type_shop === 'Food' && category == 'delicatessen'){
        return ( <ChooseDetailMenuDelicatessen
            Name={Name}
            Price={Price}
            uri={uri}
            shop_id={shop_id}
            back={() => {navigation.goBack();}}
        /> );
    }
    else if (Type_shop === 'Drink' && category == 'delicatessen') {
        return ( <ChooseDetailMenuNum
            Name={Name}
            Price={Price}
            uri={uri}
            shop_id={shop_id}
            back={() => {navigation.goBack();}}
        /> );
    }else if(Type_shop === 'Drink' && category == 'cookeorder'){
        return ( <ChooseDetailMenuNumOrders
            Name={Name}
            Price={Price}
            uri={uri}
            shop_id={shop_id}
            back={() => {navigation.goBack();}}
        /> );
    }
}

export default App;