//알람 온오프 가능한 페이지
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, Text, Switch, TouchableOpacity, Image, Alert } from 'react-native';
import BackButton from './../../images/BackIcon.png';
import {AsyncStorage} from 'react-native';


const { height, width } = Dimensions.get("window");

export default function AlarmSetting({navigation}) {

    // const [value, setValue] = useState(false);
    const [uid, setUid] = useState('');
    const [alarm, setAlarm] = useState(false);

    const _storeUid = async () =>{
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            setUid(String(value));
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
    }
    const _getAlarmState = async () =>{
        try {
          const value = await AsyncStorage.getItem('alarm');
          if (value !== null) {
            setAlarm(value);
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
    }
    
    useEffect(()=>{
        _storeUid();
        _getAlarmState();

    },[]);

    console.log(uid)

    const _setAlarm = () => {
        // console.log(id, uid)
        Alert.alert(
        '푸쉬 알람 설정',
        '푸쉬 알람을 다시 설정하시겠습니까?',
        [
            {
            text: "네",
            onPress: () => {
                fetch(`http://127.0.0.1:8000/feeds/pushalarm/${uid}/${alarm}`, {
                    method: 'GET',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }}).then((res) => {
                        return res.text()
                    }).catch((err) => {
                    console.log(err);
                    });
            },
            style: "cancel"
            },
            { text: "아니요",
            }
        ],
        { cancelable: false }
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() =>{navigation.goBack()}}>
                    <Image style={styles.menuIcon} source={BackButton}/>
                </TouchableOpacity>
                <Text style={styles.headerContent}>알림 설정</Text>
                <View></View>
            </View>
            <View style={styles.contentWrapper}>
                <View style={styles.lineStyle}></View>
                <View style={styles.pushContainer}>
                    <Text style={styles.title}>푸쉬 알림</Text>
                    <Switch
                        value={alarm}
                        onValueChange={v => {
                        // setValue(v);
                        _setAlarm(v);
                        }}
                        style={styles.switch}
                    /> 
                </View>
                <View style={styles.lineStyle}></View>
                <Text style={styles.explanation}>이모리 앱에서 보내는 알림을 받을 수 있습니다.</Text> 
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    backBtn:{
        marginBottom: 50,
    },
    container:{
        backgroundColor: '#fff',
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'space-between',
    },
    title:{
        fontSize: 15,
        padding: 10
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
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    switch:{
        marginLeft: 'auto'
    },
    explanation:{
        fontSize: 12,
        padding: 20,
        color: 'grey',
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 10,
        paddingHorizontal: width*0.04,
        paddingBottom: 10,
        borderBottomColor: "#fafafa",
        borderBottomWidth: 2,
        width: width,
    },
    menuWrapper: {
        height: height - 180,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    menuIcon: {
        height: 20,
        width: 20,
    },
    contentWrapper: {
        height: height - 180,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    headerContent: {
        fontSize: 18,
        position: "relative",
        left: -10,
    },
});