//나의 활동
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import BackButton from './../images/BackIcon.png';
import Logo from './../images/SmallLogo.png';
import {AsyncStorage} from 'react-native';
import ChartComponent from './Chart';
import Home from './../images/HomeIconFilled.png';
import Chart from './../images/ChartIcon.png';
import Menu from './../images/MenuIcon.png';
import Feed from './../images/FeedIcon.png';
import Setting from './../images/SettingIcon.png';
const { height, width } = Dimensions.get("window");

class Notification {

    constructor(title, content, from, type, timelapse, feed) {
      this.title =title;
      this.content= content;
      this.from =from;
      this.type= type;
      this.timelapse= timelapse;
      this.feed = feed;
    }

}
export default function MyActivity({route, navigation}) {

    const [notiList, setNotiList] = useState([]);
    const [uid, setUid] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [loadingFinished, setLoadingFinished] = useState(false);
    // const [chart, openChartModal] = useState(false);

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
    setTimeout(() => {setLoaded(true)}, 1000)



    var timeSince = function(date) {
        if (typeof date !== 'object') {
          date = new Date(date);
        }
      
        var seconds = Math.floor((new Date() - date) / 1000);
        var intervalType;
      
        var interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
          intervalType = 'year';
        } else {
          interval = Math.floor(seconds / 2592000);
          if (interval >= 1) {
            intervalType = '개월 ';
          } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
              intervalType = '일 ';
            } else {
              interval = Math.floor(seconds / 3600);
              if (interval >= 1) {
                intervalType = "시간 ";
              } else {
                interval = Math.floor(seconds / 60);
                if (interval >= 1) {
                  intervalType = "분 ";
                } else {
                  interval = seconds;
                  intervalType = "초 ";
                }
              }
            }
          }
        }
      
        // if (interval > 1 || interval === 0) {
        //   intervalType += 's';
        // }
      
        return interval + ' ' + intervalType;
    };

    

    useEffect(() => {
        _storeUid();
        if (uid){
            fetch(`http://127.0.0.1:8000/feeds/notification/${uid}/`, {
          method: 'GET',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }}).then((res) => {
              return res.json();
          }).then(context=> {
                const notifications = JSON.parse(context.notifications);
                console.log(notifications)
                setNotiList(
                    notifications.map((noti) => 
                      new Notification(noti.fields.title, noti.fields.message, noti.fields.by, noti.fields.notiType, noti.fields.created_at, noti.fields.feed)),
                )
                setLoadingFinished(true);
          }).catch((err) => {
            console.log(err);
          });  
        }
        
    },[loaded]);

    console.log(notiList);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image style={styles.backButton} source={BackButton}/>
                </TouchableOpacity>
                <Image style={styles.logo} source={Logo}/>
                <View></View>
            </View>

            <View style={styles.contentWrapper}>
                { loadingFinished ?
                    <View style={styles.activityWrapper}>
                    {notiList.reverse().map((item)=>{
                        if (item.type==='like'){
                            let id = item.feed
                            return(
                                <TouchableOpacity style={styles.likeContent} onPress={()=>{navigation.navigate('Comment',{feed_id: {id}, uid: uid.uid})}}>
                                        <Text style={styles.feedWritter}>{item.from}</Text>
                                        <Text style={styles.feedContent}>{item.title}</Text>
                                        <Text style={styles.feedTime}>{timeSince(item.timelapse)}전</Text>
                                </TouchableOpacity>
                            )
                        }
                        else{
                            let id = item.feed
                            return(
                                <TouchableOpacity style={styles.commentContent} onPress={()=>{navigation.navigate('Comment',{feed_id: {id}, uid: {uid}})}}>
                                        <View style={styles.flexbox}>
                                            <Text style={styles.feedWritter}>{item.from}</Text>
                                            <Text style={styles.feedContent}>{item.title} :</Text>
                                            {(String(item.content).length > 10) ? 
                                                
                                                <Text style={styles.feedComment}>
                                                    {String(item.content).substring(0,6).concat('...')}
                                                </Text>
                                                :
                                                <Text style={styles.feedComment}>
                                                    {String(item.content)}
                                                </Text>
                                                
                                            }
                                            
                                            {/* <Text style={styles.feedComment}> 긴댓글긴댓글긴댓글긴댓글긴댓글긴댓글긴댓글긴댓글ㅋㅋㅋㅋㅋㅋ</Text> */}
                                            <Text style={styles.feedTime}>{timeSince(item.timelapse)}전</Text>
                                        </View>

                                </TouchableOpacity>
                            )
                        }
                        
                    })}
                </View>
                :
                <ActivityIndicator style={styles.loadingbar}/>
            
                }
                
            </View>


            <View style={styles.navigationbar}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={Home} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('Chart')}}>
                    <Image style={styles.icon} source={Chart} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('FeedListAll')}}>
                    <Image style={styles.icon} source={Feed} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('Settings')}}>
                    <Image style={styles.icon} source={Setting} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEFAE4',
        flex: 1,
        width: width,
        height: height,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '10%',
        // marginBottom: 5,
        // paddingTop: 10,
        backgroundColor: '#FEFAE4',
        paddingHorizontal: width*0.04,
        paddingBottom: 10,
        borderBottomColor: "#fafafa",
        borderBottomWidth: 2,
        width: width,
    },
    backButton: {
        height: 20,
        width: 20,
        marginLeft: 'auto'
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
        height: height,
        backgroundColor: 'white'
        
        
    },
    icon: {
        height: 20,
        width: 20,
        // zIndex:99,
    },
    navigationbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        // marginTop: 30,
        // height: 100,
        backgroundColor: "white",
        marginBottom: 20,
        paddingTop: 10,
        paddingHorizontal: width*0.1,
        borderTopColor: "#fafafa",
        borderTopWidth: 2,
        width: width,
        zIndex:99,
        // position: "absolute"
        position: 'absolute',
        bottom: 0,
    },
    contentWrapper: {
        height: height,
        width: width,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "white",
        // zIndex: 5,

    },
    likeContent: {
        flexDirection: "row",
        // marginHorizontal: 20,
        padding: 20,
        borderBottomColor: "black", 
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: width,
        height: 70,
        alignItems: 'center'

    },
    flexbox: {
        flexDirection: "row",
        alignItems:'center',
    },
    feedComment:{
        fontSize: 14,
        fontWeight: "300",
    },
    commentContent: {
        // marginHorizontal: 20,
        padding: 20,
        borderBottomColor: "black", 
        borderBottomWidth: StyleSheet.hairlineWidth, 
        width: width, 
        height: 70,
        justifyContent: 'center'
    },
    feedWritter: {
        fontSize: 14,
        fontWeight: "500",
        marginRight: 5,
    },
    feedTime: {
        fontSize: 13,
        fontWeight: "100",
        marginLeft: 5,
    },
    headerContent: {
        fontSize: 18,
        position: "relative",
        left: -10,
    },

});