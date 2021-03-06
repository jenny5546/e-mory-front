//이용약관
import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const { height, width } = Dimensions.get("window");

export default function ServiceTerm() {
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backBtn} hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
                    <AntDesign name="back" size={20}/>
                </TouchableOpacity> 
                <Text>이용약관 어쩌고저쩌고</Text>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container:{
        alignItems: "flex-start",
        width: width-50,
        height: height-200,
    },
    backBtn:{
        marginBottom: 50,

    }
    
});