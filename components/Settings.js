// 개인 정보 ~ 알림 설정 등이 들어갈 사이드 바
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Button, View, Image, Dimensions, Alert } from 'react-native';

import Filter from './../images/FilterIcon.png';
import ChartComponent from './Chart';
import BackButton from './../images/BackIcon.png';
import Logo from './../images/SmallLogo.png';
import Home from './../images/HomeIcon.png';
import Chart from './../images/ChartIcon.png';
import Menu from './../images/MenuIcon.png';
import Feed from './../images/FeedIcon.png';
import Setting from './../images/SettingIconFilled.png';
import Profile from './../images/ProfileIcon.png';
import Alarm from './../images/AlarmIcon.png';
import Write from './../images/WriteIcon.png';
import Mail from './../images/MailIcon.png';
import Document from './../images/DocumentIcon.png';
import Info from './../images/InfoIcon.png';
import Logout from './../images/LogoutIcon.png';
import {AsyncStorage} from 'react-native';

const { height, width } = Dimensions.get("window");

export default function Settings({route, navigation}) {

    // const {uid} = route.params;
    const {allFeeds} = route.params;
    const [uid, setUid] = useState('');
    const [chart, openChartModal] = useState(false);
    console.log('settings')
    console.log(uid.uid);

    const _showAlert = () => {
        Alert.alert(
            '로그 아웃',
            '로그 아웃 하시겠습니까?',
            [
                {text: '네', onPress: () => {
                    _logOut();
                    navigation.push('Login')
                }},
                {text: "아니요", onPress: () => console.log("No Pressed") }
            ],
            { cancelable: false }
        )
    }

    const _logOut = () => {
        try {
            AsyncStorage.clear;
        } catch (error) {
            console.log(error)
        }
    }


    const _storeUid = async () =>{
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            setUid(value);
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
    }
    useEffect(()=>{
        _storeUid();
    },[]);
    
    console.log('uid is');
    console.log(uid);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>            
                    <Image style={styles.menuIcon} source={BackButton}/>
                </TouchableOpacity>
                <Image style={styles.logo} source={Logo}/>
                <View></View>
            </View>
            {chart &&
                <ChartComponent 
                    closeChart={() => openChartModal(false)}
                    allFeeds = {allFeeds.feedList}
                />
            }
            <View style={styles.menuWrapper}>
                <TouchableOpacity style={styles.sidebarItem} onPress={()=>{navigation.navigate('ProfileSetting',{uid: uid})}}>
                    <Image style={styles.menuIcon} source={Profile} />
                    <Text style={styles.itemTitle}>개인정보관리</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem} onPress={()=>{navigation.push('AlarmSetting')}}>
                    <Image style={styles.menuIcon} source={Alarm} />
                    <Text style={styles.itemTitle}>알림설정</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.sidebarItem}>
                    <Image style={styles.menuIcon} source={Write} />
                    <Text style={styles.itemTitle}>리뷰쓰기</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.sidebarItem}>
                    <Image style={styles.menuIcon} source={Mail} />
                    <Text style={styles.itemTitle}>고객센터</Text>
                </TouchableOpacity>  
                <TouchableOpacity style={styles.sidebarItem}>
                    <Image style={styles.menuIcon} source={Document} />
                    <Text style={styles.itemTitle}>이용약관</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.sidebarItem}>
                    <Image style={styles.menuIcon} source={Info} />
                    <Text style={styles.itemTitle}>앱정보</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.sidebarItem} onPress={_showAlert}>
                    <Image style={styles.menuIcon} source={Logout} />
                    <Text style={styles.itemTitle}>로그아웃</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.navigationbar}>
                <TouchableOpacity onPress={()=>{navigation.push('MainCalendar')}}>
                    <Image style={styles.menuIcon} source={Home} />
                </TouchableOpacity>
                <TouchableOpacity onPress={async()=>{openChartModal(true);}}>
                    <Image style={styles.menuIcon} source={Chart} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('FeedListAll',{allFeeds: allFeeds})}}>
                    <Image style={styles.menuIcon} source={Feed} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('Settings',{allFeeds:allFeeds})}}>
                    <Image style={styles.menuIcon} source={Setting} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'space-between',
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '12%',
        // marginBottom: 5,
        // paddingTop: 10,
        // backgroundColor: '#FEFAE4',
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
        position: "relative",
        top: 20,
        // marginTop: '10%'
    },
    menuIcon: {
        height: 20,
        width: 20,
    },
    sidebarItem:{
        paddingLeft: 25,
        paddingBottom: 15,
        marginBottom: 20,
        flexDirection: 'row',
        width: width-70,
    },
    itemTitle:{
        fontSize: 18,
        fontWeight: "400",
        marginLeft: 10,
        
    },
    navigationbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 20,
        paddingTop: 20,
        paddingHorizontal: width*0.1,
        borderTopColor: "#fafafa",
        borderTopWidth: 2,
        width: width,
    },
});