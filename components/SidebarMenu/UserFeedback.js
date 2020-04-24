// 고객센터
import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const { height, width } = Dimensions.get("window");

export default function UserFeedback() {
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backBtn}>
                    <AntDesign name="back" size={20}/>
                </TouchableOpacity> 
                <Text style={styles.title}>피드백을 남겨주세요</Text>
                <View style = {styles.lineStyle} />

                
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
        marginBottom: 10,
    },
    title:{
        fontSize: 15,
        padding: 20
    },
    lineStyle:{
        borderBottomColor: "black", 
        borderBottomWidth: StyleSheet.hairlineWidth, 
        alignSelf:'stretch',
        width: "100%"
    },

    
});