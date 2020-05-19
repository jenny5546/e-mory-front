import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Back from './../../images/BackIconWhite.png';
import Alarm from './../../images/AlarmIcon.png';
import Logo from './../../images/SmallLogo.png';
import Home from './../../images/HomeIconFilled.png';
import Chart from './../../images/ChartIcon.png';
import Menu from './../../images/MenuIcon.png';
import Feed from './../../images/FeedIcon.png';
import Setting from './../../images/SettingIcon.png';
import ShortArrow from './../../images/ShortArrow.png';
import Next from './../../images/NextIcon.png';
import FeedNew from './../FeedNew';
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
export default function secondTutorial({ navigation }) {

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.backButton} source={Menu}/>
          <Image style={styles.logo} source={Logo}/>
          <Image style={styles.backButton} source={Alarm}/>
        </View>
          <FeedNew 
            pressedDate={"2020-05-05"}
          />
        <Calendar
            theme={calendarTheme}
            style={styles.calendarStyle}
            monthFormat={'M월'}
        />
        <View style={styles.background}>
          <View style={styles.slideHeader}>
            <View style={styles.circle}></View>
            <View style={styles.filledCircle}></View>
          </View>
          <Image style={styles.arrow} source={ShortArrow} />
          <Text style={styles.description}>버튼 눌러서 그 날의 이모티콘 선택하기</Text>
          <Image style={styles.lockArrow} source={ShortArrow} />
          <Text style={styles.lockDescription}>공개 여부 선택하기</Text>
          <TouchableOpacity onPressIn={()=>{navigation.push('MainCalendar')}}>
            <Image style={styles.next} source={Next} />
          </TouchableOpacity>
          <TouchableOpacity onPressIn={()=>{navigation.goBack()}}>
            <Image style={styles.back} source={Back} />
          </TouchableOpacity>
        </View>
        <View style={styles.navigationbar}>
          <TouchableOpacity>
            <Image style={styles.icon} source={Home} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.icon} source={Chart} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.icon} source={Feed} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.icon} source={Setting} />
          </TouchableOpacity>
        </View>
      </View>
  );
}

/* Calendar Theme Overriding: 색, 폰트, 글자 크기 */
const calendarTheme = {
  // calendarBackground: 'rgba(196, 196, 196, 0.5)',
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150', //
  textDisabledColor: '#d9e1e8', //#d9e1e8
  // dotColor: '#00adf5',
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
  'stylesheet.day.basic': {
    base: {
      width: 32,
      height: 80,
      alignItems: 'center'
    },
  }
}

/* Calendar Style Overriding: 크기, 테두리, 등등 */
const styles = StyleSheet.create({
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
      justifyContent: "center",
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
      height: 20,
      width: 20,
    },
    background: {
      backgroundColor: "rgba(153, 153, 153, 0.3);",
      height: height,
      width: width,
      position: "absolute",
      zIndex: 2,
      // justifyContent:"center",
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
    arrow: {
      height: 20,
      width: 6,
      transform: [{ rotate: '-225deg' }],
      position: "absolute",
      alignSelf: "center",
      top: height*0.27,
      left: width * 0.575,
    },
    description: {
      color: "#25a7f0",
      position: "absolute",
      alignSelf: "center",
      top: height*0.29,
      left: width * 0.62,
      width: 110,
      textAlign: "center",
    },
    lockArrow: {
      height: 20,
      width: 6,
      transform: [{ rotate: '-180deg' }],
      position: "absolute",
      left: width*0.07,
      top: height*0.12,
    },
    lockDescription: {
      color: "#25a7f0",
      position: "absolute",
      left: width*0.02,
      top: height*0.16,
      width: 60,
      textAlign: "center",
    },
    next: {
      alignSelf: "flex-end",
      height: 60,
      width: 60,
      position:"absolute",
      right: 10,
      top: height * 0.45,
    },
    back: {
      height: 50,
      width: 50,
      position:"absolute",
      left: 10,
      top: height * 0.46,
    }
});
