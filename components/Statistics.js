// 월별 데이터 보여주는 부분
import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, Image } from 'react-native';
const { height, width } = Dimensions.get("window");

export default function Statistics() {
    // return (
        // <>
        //     <ScrollView style={styles.container}>
        //         <Text style={styles.title}>2020년 4월</Text>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //         <View style={styles.items}>
        //             <Image style={styles.imageStyle} source={require('../assets/testimg.png')}></Image>
        //             <View style = {styles.lineStyle}/>
        //         </View>
        //     </ScrollView>
            
        // </>
    // );
}
const styles = StyleSheet.create({
    container:{
        marginTop: 70,
    },
    title:{
        fontSize: 20,
        marginBottom: 10,
    },
    items: {
        flexDirection: 'row',
        padding: 3,
        alignContent: 'center',
    },
    lineStyle:{
        borderBottomColor: "pink", 
        borderBottomWidth: 3, 
        alignSelf:'stretch',
        width: "60%"
    },
    imageStyle: {
        marginRight: 20,
        width: 50,
        height: 50
    }


    
});