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
import { ScrollView } from 'react-native-gesture-handler';
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

    const parseDate=(string)=>{
        let stringArray = string.substring(0,10).split("-"); 
        let year = stringArray[0];
        let month = stringArray[1];
        let day = stringArray[2];
        return year+'년 '+month + '월 '+ day + '일';
    }
    

    var timeSince = function(date) {
        if (typeof date !== 'object') {
          date = new Date(date);
        }
      
        var seconds = Math.floor((new Date() - date) / 1000);
        var intervalType;
      
        var interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
        //   intervalType = '년';
          return 'date';
        } else {
          interval = Math.floor(seconds / 2592000);
          if (interval >= 1) {
            // intervalType = '개월 ';
            return 'date';
          } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
            //   intervalType = '일 ';
            return 'date';
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
      
        return interval + ' ' + intervalType;
    };


    useEffect(() => {
        _storeUid();
        if (uid){
            fetch(`https://young-dusk-44488.herokuapp.com/feeds/notification/${uid}/`, {
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
                    <ScrollView>
                    {notiList.reverse().map((item)=>{
                        if (item.type==='like'){
                            let id = item.feed
                            return(
                                <TouchableOpacity style={styles.likeContent} onPress={()=>{navigation.push('MyActivityComment',{feed_id: {id}, uid: uid})}}>
                                        <Text style={styles.feedWritter}>{item.from}</Text>
                                        <Text style={styles.feedContent}>{item.title}</Text>
                                        {timeSince(item.timelapse) == 'date' ?
                                            <Text style={styles.feedTime}>{parseDate(item.timelapse)}</Text>
                                            :
                                            <Text style={styles.feedTime}>{timeSince(item.timelapse)}전</Text>
                                        }
                                        
                                </TouchableOpacity>
                            )
                        }
                        else{
                            let id = item.feed
                            return(
                                <TouchableOpacity style={styles.commentContent} onPress={()=>{navigation.push('Comment',{feed_id: {id}, uid: {uid}})}}>
                                        <View style={styles.flexbox}>
                                            <Text style={styles.feedWritter}>{item.from}</Text>
                                            <Text style={styles.feedContent}>{item.title} :</Text>
                                            
                                        </View>
                                        <View style={styles.flexbox}>
                                            {(String(item.content).length > 10) ? 
                                                
                                                <Text style={styles.feedComment}>
                                                    {String(item.content).substring(0,10).concat('...')}
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
                    </ScrollView>
                </View>
                :
                <ActivityIndicator style={styles.loadingbar}/>
            
                }
                
            </View>


            <View style={styles.navigationbar}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={Home} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.push('Chart')}}>
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
        marginTop: 30,
        // marginBottom: 20,
        paddingTop: 20,
        paddingHorizontal: width*0.1,
        borderTopColor: "#fafafa",
        borderTopWidth: 2,
        width: width,
        height: 70,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FEFAE4',
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
        borderBottomColor: "#fafafa", 
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: width,
        height: 70,
        alignItems: 'center'

    },
    flexbox: {
        flexDirection: "row",
        alignItems:'center',
        width: width*0.9
    },
    feedComment:{
        fontSize: 14,
        fontWeight: "300",
    },
    commentContent: {
        // marginHorizontal: 20,
        padding: 20,
        borderBottomColor: "#fafafa", 
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
    loadingbar:{
        position: 'absolute',
        top: height*0.36,
        alignSelf: "center"
      },

});