//나의 활동
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import BackButton from './../images/BackIcon.png';
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
    const {uid} = route.params;
    const [notiList, setNotiList] = useState([]);
    console.log(uid.uid);

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
        fetch(`https://cryptic-journey-73348.herokuapp.com/feeds/notification/${uid.uid}/`, {
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
          }).catch((err) => {
            console.log(err);
          });  
    },[]);

    console.log(notiList);
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
                                <TouchableOpacity style={styles.commentContent} onPress={()=>{navigation.navigate('Comment',{feed_id: {id}, uid: uid.uid})}}>
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