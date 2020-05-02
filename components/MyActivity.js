//나의 활동
import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import BackButton from './../images/BackIcon.png';
import Home from './../images/HomeIconFilled.png';
import Chart from './../images/ChartIcon.png';
import Menu from './../images/MenuIcon.png';
import Feed from './../images/FeedIcon.png';
import Setting from './../images/SettingIcon.png';
const { height, width } = Dimensions.get("window");

export default function MyActivity({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <Image style={styles.backButton} source={BackButton}/>
                </TouchableOpacity>
                <Text style={styles.headerContent}>나의 활동</Text>
                <View></View>
            </View>
            <View style={styles.contentWrapper}>
                <View style={styles.activityWrapper}>
                    <View style={styles.content}>
                        <Text style={styles.feedWritter}>jenny_doobap</Text>
                        <Text style={styles.feedContent}>님이 내 글에 답글을 달았습니다</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.feedWritter}>suuuum36</Text>
                        <Text style={styles.feedContent}>님의 글에 공감을 했습니다</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.feedWritter}>snowman39</Text>
                        <Text style={styles.feedContent}>님이 글을 작성했습니다</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.feedWritter}>suuuum36</Text>
                        <Text style={styles.feedContent}>님이 댓글에 답장을 했습니다</Text>
                    </View>
                </View>
            </View>
            <View style={styles.navigationbar}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={Home} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setChart(1)}}>
                    <Image style={styles.icon} source={Chart} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.push('FeedListAll')}}>
                    <Image style={styles.icon} source={Feed} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.push('Settings')}}>
                    <Image style={styles.icon} source={Setting} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        width: width,
        height: height,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: width*0.04,
        paddingBottom: 10,
        borderBottomColor: "#fafafa",
        borderBottomWidth: 2,
        width: width,
    },
    backButton: {
        height: 20,
        width: 20,
    },
    headerContent: {
        fontSize: 18,
        position: "relative",
        left: -10,
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
        color: 'grey',
    },
    activityWrapper: {
        justifyContent: "flex-start",
    },
    icon: {
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
    content: {
        flexDirection: "row",
        marginHorizontal: 20,
    },
    feedWritter: {
        fontSize: 14,
        fontWeight: "500",
        marginRight: 5,
        marginBottom: 20,
    },
    headerContent: {
        fontSize: 18,
        position: "relative",
        left: -10,
    },
});