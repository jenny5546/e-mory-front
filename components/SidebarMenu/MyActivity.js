//나의 활동
import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const { height, width } = Dimensions.get("window");

export default function MyActivity() {
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backBtn}>
                    <AntDesign name="back" size={20}/>
                </TouchableOpacity> 
                <Text style={styles.title}>이번주</Text>
                <View style = {styles.lineStyle} />
                <Text style={styles.explanation}>snowman이 답글을 달았습니다</Text> 
                <Text style={styles.explanation}>jenny_doobap이 공감을 했습니다</Text> 
                <Text style={styles.explanation}>snowman이 답글을 달았습니다</Text> 
                <Text style={styles.explanation}>snowman이 답글을 달았습니다</Text> 

                
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
    explanation:{
        fontSize: 15,
        padding: 10,
        color: 'grey',
    }
    
});