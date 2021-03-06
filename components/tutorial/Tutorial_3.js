// Tutorial step 3
import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
const { height, width } = Dimensions.get("window");

//component 이름이랑, library 이름이랑 겹쳐서 main calendar라고 이름 지어줌.
export default function thirdTutorial({ navigation }) {
  return (
    <>
      <Text>Tutorial 3 민기꺼 나중에 갖다쓰기</Text>
      <TouchableOpacity onPress={()=> {navigation.push('MainCalendar')}}>
        <AntDesign name="checkcircleo" size={20}/>
      </TouchableOpacity>
    </>
  );
}