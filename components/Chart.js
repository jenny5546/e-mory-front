import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import {AsyncStorage} from 'react-native';
import CloseIcon from './../images/CloseIconGray.png';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Logo from './../images/SmallLogo.png';
import Alarm from './../images/AlarmIcon.png';
import Home from './../images/HomeIcon.png';
import BackButton from './../images/BackIcon.png';
import ChartIcon from './../images/ChartIconFilled.png';
import Menu from './../images/MenuIcon.png';
import FeedIcon from './../images/FeedIcon.png';
import Setting from './../images/SettingIcon.png';
import HappyIcon from './../images/HappyIcon.png';
import FilledIcon from './../images/FilledIcon.png';
import PeaceIcon from './../images/PeaceIcon.png';
import ThankIcon from './../images/ThankIcon.png';
import LovelyIcon from './../images/LovelyIcon.png';
import SadIcon from './../images/SadIcon.png';
import LonelyIcon from './../images/LonelyIcon.png';
import EmptyIcon from './../images/EmptyIcon.png';
import TiredIcon from './../images/TiredIcon.png';
import DepressedIcon from './../images/DepressedIcon.png';
import WorriedIcon from './../images/WorriedIcon.png';
import AngryIcon from './../images/AngryIcon.png';
import styled from 'styled-components/native';

const { height, width } = Dimensions.get("window");

//component 이름이랑, library 이름이랑 겹쳐서 main calendar라고 이름 지어줌.
//modal 구현 애매하게 되어있음

export default function Chart({navigation}) {

    LocaleConfig.locales['kr'] = {
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
        dayNamesShort: ['일','월','화','수','목','금','토'],
        today: '오늘'
    };
    LocaleConfig.defaultLocale = 'kr';

    //현재 달을 갖고오기
    const _getCurrMonth = () =>{

        var result = '';
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        String(month).length ===1 ? 
            result = String(year)+'-0'+String(month) :  result = String(year)+'-'+String(month);
        return result;
    }

    // const {allFeeds} = route.params;
    const [month, setMonth] = useState(_getCurrMonth());
    const [countHappy, setCountHappy] = useState(0);
    const [countFilled, setCountFilled] = useState(0);
    const [countPeace, setCountPeace] = useState(0);
    const [countThank, setCountThank] = useState(0);
    const [countLovely, setCountLovely] = useState(0);
    const [countEmpty, setCountEmpty] = useState(0);
    const [countSad, setCountSad] = useState(0);
    const [countLonely, setCountLonely] = useState(0);
    const [countTired, setCountTired] = useState(0);
    const [countDepressed, setCountDepressed] = useState(0);
    const [countWorried, setCountWorried] = useState(0);
    const [countAngry, setCountAngry] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [storageFeeds, setStorageFeeds] = useState(null);
    const [loadingFinished, setLoadingFinished] = useState(false);

    const emojiColor= (emoji) =>{
        switch(emoji){
          case 'Happy':
            return '#FADC4A';
          case 'Filled':
            return '#F2A64E';
          case 'Peace':
            return '#91F7A6';
          case 'Thank':
            return '#8DCA9A';
          case 'Lovely':
            return '#E9B1BF';
          case 'Empty':
            return '#C4C4C5';
          case 'Sad':
            return '#BBEBDE';
          case 'Lonely':
            return '#6AE7DB';
          case 'Tired':
            return '#6B93C8';
          case 'Depressed':
            return '#9177C0';
          case 'Worried':
            return '#9E9BE5';
          case 'Angry':
            return '#D05C58';
          default:
            return '#FFFFFF';
        }
    }

    const countEmojis = (currMonthArray, emoji) =>{
        const count = currMonthArray.filter(feed => feed.emoji === emoji).length;
        return count;
    }

    const ChartBar = styled.View`
        borderWidth: 4px;
        width: ${props =>props.count*width*0.03}px;
        borderColor: ${props => emojiColor(props.emoji)}
        position: relative;
        top: 15px;
        left: 15px;
        marginRight: 25px;
        height: 0px;
        borderRadius: 20px;
    `;
    const ChartNum = styled.Text`
        position: relative;
        top: 10px;
        fontWeight: 700;
        color: ${props => emojiColor(props.emoji)}
    `;

    const _storeStorageFeeds = async () =>{
        console.log('hi')
        try {
          const value = await AsyncStorage.getItem('feedlist').then(
              (response)=>{
                //   console.log(response)
                  var list = JSON.parse(response);
                  setStorageFeeds(list)
                  console.log(storageFeeds)
                }
            );
          
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
    }

    setTimeout(() => {setLoaded(true)}, 1000)
    // console.log(storageFeeds)
    // _storeStorageFeeds();

    // 달이 바뀔 때마다, 새로운 데이터를 로딩해 온다. 
    useEffect(() => {

        _storeStorageFeeds();

        if (storageFeeds){
            // console.log('chart')
            console.log(storageFeeds)
            var currMonthFeeds = storageFeeds.filter(feed => {
                return String(feed.date).substr(0,7) === month;
            });
            // console.log(currMonthFeeds);
            setCountHappy(countEmojis(currMonthFeeds,'Happy'));
            setCountFilled(countEmojis(currMonthFeeds,'Filled'));
            setCountPeace(countEmojis(currMonthFeeds,'Peace'));
            setCountThank(countEmojis(currMonthFeeds,'Thank'));
            setCountLovely(countEmojis(currMonthFeeds,'Lovely'));
            setCountEmpty(countEmojis(currMonthFeeds,'Empty'));
            setCountSad(countEmojis(currMonthFeeds,'Sad'));
            setCountLonely(countEmojis(currMonthFeeds,'Lonely'));
            setCountTired(countEmojis(currMonthFeeds,'Tired'));
            setCountDepressed(countEmojis(currMonthFeeds,'Depressed'));
            setCountWorried(countEmojis(currMonthFeeds,'Worried'));
            setCountAngry(countEmojis(currMonthFeeds,'Angry'));
            setLoadingFinished(true);
        } 
        // setLoaded(false);

    },[loaded, month]);

    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()} hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
                    <Image style={styles.backButton} source={BackButton}/>
                </TouchableOpacity>
                <View style={{position: "relative"}}>
                    <Image style={styles.logo} source={Logo}/>
                </View>

                <TouchableOpacity onPress={()=>{navigation.push('MyActivity')}} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                    <Image style={styles.backButton} source={Alarm}/>
                </TouchableOpacity>
            </View>
            <View style={styles.popup}>
                
                    <View style={styles.body}>
                    <View style={styles.monthPicker}>
                        <Calendar
                            dayComponent={() => {
                                return (<></>)
                            }}
                            hideDayNames={true}
                            style={styles.calendarStyle} 
                            onMonthChange={(month) => setMonth(month.dateString.substr(0,7))} 
                            theme={{
                                arrowColor: '#cccccc',
                            }}
                        />
                    </View>
                    { loadingFinished ? 
                    <View style={styles.monthStatistics}>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={HappyIcon} />
                            <ChartBar count={countHappy} emoji='Happy'></ChartBar>
                            <ChartNum emoji='Happy'>{countHappy}</ChartNum>
                        </View>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={FilledIcon} />
                            <ChartBar count={countFilled} emoji='Filled'></ChartBar>
                            <ChartNum emoji='Filled'>{countFilled}</ChartNum>
                        </View>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={PeaceIcon} />
                            <ChartBar count={countPeace} emoji='Peace'></ChartBar>
                            <ChartNum emoji='Peace'>{countPeace}</ChartNum>
                        </View>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={ThankIcon} />
                            <ChartBar count={countThank} emoji='Thank'></ChartBar>
                            <ChartNum emoji='Thank'>{countThank}</ChartNum>
                        </View>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={LovelyIcon} />
                            <ChartBar count={countLovely} emoji='Lovely'></ChartBar>
                            <ChartNum emoji='Lovely'>{countLovely}</ChartNum>
                        </View>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={EmptyIcon} />
                            <ChartBar count={countEmpty} emoji='Empty'></ChartBar>
                            <ChartNum emoji='Empty'>{countEmpty}</ChartNum>
                        </View>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={SadIcon} />
                            <ChartBar count={countSad} emoji='Sad'></ChartBar>
                            <ChartNum emoji='Sad'>{countSad}</ChartNum>
                        </View>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={LonelyIcon} />
                            <ChartBar count={countLonely} emoji='Lonely'></ChartBar>
                            <ChartNum emoji='Lonely'>{countLonely}</ChartNum>
                        </View>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={TiredIcon} />
                            <ChartBar count={countTired} emoji='Tired'></ChartBar>
                            <ChartNum emoji='Tired'>{countTired}</ChartNum>
                        </View>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={DepressedIcon} />
                            <ChartBar count={countDepressed} emoji='Depressed'></ChartBar>
                            <ChartNum emoji='Depressed'>{countDepressed}</ChartNum>
                        </View>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={WorriedIcon} />
                            <ChartBar count={countWorried} emoji='Worried'></ChartBar>
                            <ChartNum emoji='Worried'>{countWorried}</ChartNum>
                        </View>
                        <View style={styles.emojiRow}>
                            <Image style={styles.icon} source={AngryIcon} />
                            <ChartBar count={countAngry} emoji='Angry'></ChartBar>
                            <ChartNum emoji='Angry' count={countAngry}>{countAngry}</ChartNum>
                            {/* {countAngry ===0 ?
                            <></>: <ChartNum emoji='Angry' count={countAngry}>{countAngry}</ChartNum>
                            } */}
                            
                        </View>
                    </View>
                    :
                    <ActivityIndicator style={styles.loadingbar}/>
                    }
                    
                </View>
                

            </View>
            <View style={styles.navigationbar}>
                <TouchableOpacity onPress={()=>{navigation.push('MainCalendar')}} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                    <Image style={styles.navicon} source={Home} />
                </TouchableOpacity>
                <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                    <Image style={styles.navicon} source={ChartIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.push('FeedListAll')}} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                    <Image style={styles.navicon} source={FeedIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.push('Settings')}} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                    <Image style={styles.navicon} source={Setting} />
                </TouchableOpacity>
            </View>
        </View>  
    );
}


/* Calendar Style Overriding: 크기, 테두리, 등등 */
const styles = StyleSheet.create({

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '11%',
        // marginBottom: 5,
        // paddingTop: 10,
        backgroundColor: '#FEFAE4',
        paddingHorizontal: width*0.04,
        paddingBottom: 10,
        borderBottomColor: "#fafafa",
        borderBottomWidth: 2,
        width: width,
    },
    monthPicker: {
        // position: "relative",
        // top: 10,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        width: width,
        // alignContent: 'center',
        // paddingHorizontal: 10,
        // paddingTop: 60,
        backgroundColor: '#FEFAE4',
        // zIndex: 99,
    },

    popup: {
        backgroundColor: "#fff",
        padding: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // height: height-100,
        width: width
        // height: height*0.8,
    },
    body: {
        minHeight: height,
        backgroundColor: "#fff",
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
    navicon: {
        height: 20,
        width: 20,
    },
    logo: {
        position: "relative",
        left: 0,
    },
    date: {
        color: "#999999",
        fontSize: 15,
    },
    icon: {
        height: 35,
        width: 35,
        marginBottom: height*0.009,
    },
    backButton: {
        height: 20,
        width: 20,
    },
    monthStatistics: {
        paddingLeft: 20,
        // marginTop: height*0.01,
    },
    input: {
        paddingTop: 20,
        fontSize: 10,
    },
    calendarStyle :{
        height: 0.08* height
    },
    emojiRow:{
        flexDirection: 'row'
    },
    chartNum:{
        // marginTop: 20,
        position: 'relative',
        top: 15,
        fontWeight: '200'
        

    },
    loadingbar: {
        position: 'absolute',
        top: height*0.36,
        alignSelf: "center"
    }
});

