// Tutorial step 1
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import Alarm from './../../images/AlarmIcon.png';
import Logo from './../../images/SmallLogo.png';
import Home from './../../images/HomeIconFilled.png';
import Chart from './../../images/ChartIcon.png';
import Next from './../../images/NextIcon.png';
import Feed from './../../images/FeedIcon.png';
import { isSunday, getWeeksInMonth } from "date-fns";
import Setting from './../../images/SettingIcon.png';
import LongArrow from './../../images/LongArrow.png';
import ShortArrow from './../../images/ShortArrow.png';
const { height, width } = Dimensions.get("window");

LocaleConfig.locales['kr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'],
  dayNamesShort: ['월','화','수','목','금','토','일'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'kr';

//component 이름이랑, library 이름이랑 겹쳐서 main calendar라고 이름 지어줌.
export default function firstTutorial({ navigation }) {
  const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  const [uid, setUid] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickedDate, setPickedDate] = useState(formatDate(Date()));
  const [feedList, setFeedList] = useState([]);
  // const [date, setDate] = useState([]);
  
  
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View></View>
        <Image style={styles.logo} source={Logo}/>
        <Image style={styles.backButton} source={Alarm}/>
      </View>
      <CalendarList
            // onVisibleMonthsChange = {(months)=>console.log(months)}
            current={new Date()}
            horizontal={true}
            calendarHeight={height}
            pagingEnabled={true}
            calendarWidth={width}
            showScrollIndicator={false}
            theme={calendarTheme}
            style={styles.calendarStyle}
            // markedDates = {logFeeds()}
            monthFormat={'M월'}
            markingType = {'custom'}
            dayComponent={({date, state, marking, onPress}) => {
                return (
                <TouchableOpacity style={styles.dayContainer}>
                  <Text 
                    style={{
                      width: 32, 
                      // height: height*0.1, 
                      height: getWeeksInMonth(Date.parse(date.dateString))==4 ? 
                        height*0.14: 
                        getWeeksInMonth(Date.parse(date.dateString))==5 ? height*0.125 : height*0.1,
                      alignItems: 'center', 
                      textAlign: 'center',
                      fontSize: 13,
                      // color: state === 'disabled' ? 'gray' : 'black'
                      color: isSunday(Date.parse(date.dateString))==true ? 'red' : 'black'
                    }}>
                    {date.day}
                  </Text>
                
                </TouchableOpacity>
              );
            }}
        />
      <View style={styles.background}>
        <View style={styles.pseudoHeader}>
          <View></View>
          <View></View>
          <View style={styles.descriptionWrapperAll}>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.description}>나의 활동 확인하기</Text>
              <Image style={styles.shortArrow} source={ShortArrow} />
            </View>
            <View style={styles.circleAlarm}>
              <Image style={styles.pseudoIcon} source={Alarm}/>
            </View>
          </View>
        </View>
        <View style={styles.slideHeader}>
          <View style={styles.filledCircle}></View>
          <View style={styles.circle}></View>
        </View>
        <View style={styles.feedDescriptionWrapper}>
          <Text style={styles.feedDescription}>날짜 선택하여 그날의 감정일기 작성하기</Text>
          <Image style={styles.feedArrow} source={ShortArrow} />
        </View>
        <View style={styles.square}></View>
        <TouchableOpacity onPressIn={()=>{navigation.push('TutorialTwo')}}>
          <Image style={styles.next} source={Next} />
        </TouchableOpacity>
        <View style={styles.pseudoNavigationBar}>
          <View style={{alignSelf: "flex-end"}}>
            <View>
              <Text style={styles.calendarDescription}>달력 가기</Text>
              <Image style={styles.calendarArrow} source={LongArrow} />
            </View>
            <View style={styles.circleAlarm}>
              <Image style={styles.pseudoIcon} source={Home} />
            </View>
          </View>
          <View style={{alignSelf: "flex-end"}}>
            <Text style={styles.chartDescription}>월별 감정차트 확인하기</Text>
            <Image style={styles.chartArrow} source={ShortArrow} />
            <View style={styles.circleAlarm}>
              <Image style={styles.pseudoIcon} source={Chart} />
            </View>
          </View>
          <View style={{alignSelf: "flex-end"}}>
            <Text style={styles.feedsDescription}>공개 감정일기 피드로 보기</Text>
            <Image style={styles.calendarArrow} source={LongArrow} />
            <View style={styles.circleAlarm}>
              <Image style={styles.pseudoIcon} source={Feed} />
            </View>
          </View>
          <View style={{alignSelf: "flex-end"}}>
            <Text style={styles.chartDescription}>설정 가기</Text>
            <Image style={styles.chartArrow} source={ShortArrow} />
            <View style={styles.circleAlarm}>
              <Image style={styles.pseudoIcon} source={Setting} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.navigationbar}>
        <TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.icon} source={Chart} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.icon} source={Feed} />
        </TouchableOpacity>
        <TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* Calendar Theme Overriding: 색, 폰트, 글자 크기 */
const calendarTheme = {
  // calendarBackground: 'rgba(196, 196, 196, 0.5)',
  // selectedDayBackgroundColor: '#00adf5',
  // selectedDayTextColor: '#ffffff',
  // todayTextColor: '#00adf5',
  // dayTextColor: '#2d4150', //
  // textDisabledColor: '#d9e1e8', //#d9e1e8
  dotColor: 'pink',
  // selectedDotColor: '#ffff',
  arrowColor: 'grey',
  disabledArrowColor: '#d9e1e8',
  monthTextColor: '#626262',
  indicatorColor: 'grey',
  textSectionTitleColor: '#afafaf',
  // textDayFontFamily: 'monospace',
  // textMonthFontFamily: 'monospace',
  // textDayHeaderFontFamily: 'monospace',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
  'stylesheet.day.single': {
    base: {
      width: 32,
      height: height*0.2,
      alignItems: 'center'
    },
  }
}

/* Calendar Style Overriding: 크기, 테두리, 등등 */
const styles = StyleSheet.create({
    background: {
      backgroundColor: "rgba(153, 153, 153, 0.5);",
      height: height,
      width: width,
      position: "absolute",
      zIndex: 2,
      // justifyContent:"center",
    },
    container:{
        backgroundColor: '#fff',
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    calendarStyle: {
      height: height*0.6,
      width: width,
      // justifyContent: "center",
      // position: "relative",
      // top: height*-0.2,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: '10%',
      // marginBottom: 5,
      // paddingTop: 10,
      // backgroundColor: '#FEFAE4',
      paddingHorizontal: width*0.04,
      paddingBottom: 10,
      borderBottomColor: "#fafafa",
      borderBottomWidth: 2,
      width: width,
    },
    navigationbar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
      marginBottom: 25,
      paddingTop: 10,
      paddingHorizontal: width*0.04,
      borderTopColor: "#fafafa",
      borderTopWidth: 2,
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
    icons: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    icon: {
      height: 10,
      width: 10,
    },
    logo: {
      position: "relative",
      right: -5,
    },
    next: {
      alignSelf: "flex-end",
      height: 60,
      width: 60,
      position:"absolute",
      right: 10,
      top: height * 0.29,
    },
    slideHeader: {
      alignSelf: "center",
      flexDirection: "row",
      position: "absolute",
      top: 65,
    },
    circle: {
      width: 13,
      height: 13,
      backgroundColor: "#fff",
      borderRadius: 13,
      marginRight: 8,
    },
    filledCircle: {
      width: 13,
      height: 13,
      backgroundColor: "#999",
      borderRadius: 13,
      marginRight: 8,
    },
    circleAlarm: {
      width: 40,
      height: 40,
      backgroundColor: "#fff",
      borderRadius: 20,
      zIndex: 4,
      position: "relative",
      right: -5,
      alignSelf: "flex-end",
    },
    pseudoHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
      marginBottom: 20,
      paddingHorizontal: width*0.04,
      paddingBottom: 10,
      width: width,
    },
    pseudoIcon: {
      height: 20,
      width: 20,
      position: "relative",
      top: 10,
      left: 9,
    },
    pseudoNavigationBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
      marginBottom: 30,
      paddingTop: 10,
      paddingHorizontal: width*0.04,
      width: width,
      position: "absolute",
      bottom: -10,
      left: -6,
    },
    square: {
      height: 55,
      width: 55,
      borderWidth: 3,
      borderColor: "#fff",
      position: "absolute",
      top: height*0.405,
      alignSelf: "center",
    },
    description: {
      color: "#25a7f0",
      position: "relative",
      top: 20,
      left: 13,
    },
    feedDescription: {
      color: "#25a7f0",
      width: 90,
      textAlign: "center",
      position: "absolute",
      top: height*0.235,
      left: width*0.1,
    },
    feedsDescription: {
      color: "#25a7f0",
      position: "absolute",
      width: 90,
      left: -20,
      bottom: 120,
      textAlign: "center",
    },
    calendarDescription: {
      color: "#25a7f0",
      position: "absolute",
      width: 60,
      left: 6,
      bottom: 80,
    },
    chartDescription: {
      color: "#25a7f0",
      position: "absolute",
      left: -20,
      bottom: 80,
      width: 90,
      textAlign: "center",
    },
    shortArrow: {
      height: 15,
      width: 6,
      transform: [{ rotate: '-135deg' }],
      position: "relative",
      left: 17,
      top: 5,
    },
    feedArrow: {
      height: 23,
      width: 6,
      transform: [{ rotate: '-60deg' }],
      position: "absolute",
      top: height*0.26,
      left: width*0.38,
    },
    chartArrow: {
      height: 20,
      width: 6,
      position: "relative",
      left: 20,
      bottom: 10,
    },
    descriptionWrapper: {
      flexDirection: "row",
      position: "relative",
      right: 15,
      top: 25,
    },
    feedDescriptionWrapper: {
      flexDirection: "row",
    },
    descriptionWrapperAll: {
      flexDirection: "row",
      position: "relative",
      top: -7,
    },
    calendarArrow: {
      height: 70,
      width: 5,
      position: "relative",
      left: 22,
      bottom: 10,
    }
});