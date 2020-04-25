//알람 온오프 가능한 페이지
import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, Text, Switch, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const { height, width } = Dimensions.get("window");

export default function AlarmSetting() {
    const [value, setValue] = useState(false);
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backBtn}>
                    <AntDesign name="back" size={20}/>
                </TouchableOpacity> 
                <Text style={styles.title}>알림설정</Text>
                <View style = {styles.lineStyle} />
                <View style={styles.pushContainer}>
                    <Text style={styles.title}>푸쉬 알림</Text>
                    <Switch
                        value={value}
                        onValueChange={v => {
                        setValue(v);
                        }}
                        style={styles.switch}
                    />  
                </View>
                <Text style={styles.explanation}>이모리 앱에서 보내는 알림을 받을 수 있습니다.</Text> 
            </View>
        
        </>

    );
}
const styles = StyleSheet.create({
    backBtn:{
        marginBottom: 50,
    },
    container:{
        alignItems: "flex-start",
        width: width-50,
        height: height-200,
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
    pushContainer:{
        width: '100%',
        flexDirection:'row',
        alignItems: 'center',
    },
    switch:{
        marginLeft: 'auto'
    },
    explanation:{
        fontSize: 12,
        padding: 20,
        color: 'grey',
    }

});