//알람 온오프 가능한 페이지
import React, {useState, version} from 'react';
import { View, StyleSheet, Dimensions, Text, Switch, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import BackButton from './../../images/BackIcon.png';
import Logo from './../../images/SmallLogo.png';
import Home from './../../images/HomeIcon.png';
import Chart from './../../images/ChartIcon.png';
import Menu from './../../images/MenuIcon.png';
import Feed from './../../images/FeedIcon.png';
import Setting from './../../images/SettingIconFilled.png';
const { height, width } = Dimensions.get("window");

export default function AlarmSetting({navigation}) {
    const [value, setValue] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigation.goBack()}>
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
                        value={value}
                        onValueChange={v => {
                        setValue(v);
                        }}
                        style={styles.switch}
                    /> 
                </View>
                <View style={styles.lineStyle}></View>
                <Text style={styles.explanation}>이모리 앱에서 보내는 알림을 받을 수 있습니다.</Text> 
            </View>
            <View style={styles.navigationbar}>
                <TouchableOpacity onPress={()=>{navigation.push('MainCalendar')}}>
                    <Image style={styles.menuIcon} source={Home} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.menuIcon} source={Chart} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.push('FeedListAll')}}>
                    <Image style={styles.menuIcon} source={Feed} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.push('Settings')}}>
                    <Image style={styles.menuIcon} source={Setting} />
                </TouchableOpacity>
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
    navigationbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 20,
        paddingTop: 10,
        paddingHorizontal: width*0.04,
        borderTopColor: "#fafafa",
        borderTopWidth: 2,
        width: width,
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