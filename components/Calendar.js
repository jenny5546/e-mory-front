import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import BackButton from './../images/BackIcon.png';
import Alarm from './../images/AlarmIcon.png';
import Logo from './../images/SmallLogo.png';
import Home from './../images/HomeIconFilled.png';
import Chart from './../images/ChartIcon.png';
import Menu from './../images/MenuIcon.png';
import Feed from './../images/FeedIcon.png';
import Setting from './../images/SettingIcon.png';
import ChartComponent from './Chart';
import FeedNew from './FeedNew';
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
export default function MainCalendar({ navigation }) {

  const [chart, setChart] = useState(null);
  const [newFeed, setNewFeed] = useState(null);

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.backButton} source={Menu}/>
          <Image style={styles.logo} source={Logo}/>
          <TouchableOpacity onPress={()=>{navigation.push('MyActivity')}}>
            <Image style={styles.backButton} source={Alarm}/>
          </TouchableOpacity>
        </View>
        {chart &&
          <ChartComponent />
        }
        {newFeed &&
          <FeedNew />
        }
        <Calendar
            theme={calendarTheme}
            style={styles.calendarStyle}
            onDayPress={()=>{setNewFeed(1)}}
            monthFormat={'M월'}
        />
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
      height: height*0.09,
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
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'space-between',
    },
    calendarStyle: {
      // height: height*0.55,
      width: width,
      justifyContent: "center",
      // position: "relative",
      // top: height*-0.2,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
      // marginBottom: 5,
      paddingHorizontal: width*0.04,
      paddingBottom: 10,
      borderBottomColor: "#fafafa",
      borderBottomWidth: 2,
      width: width,
    },
    navigationbar: {
      flexDirection: "row",
      justifyContent: "space-between",
      // marginTop: 10,
      marginBottom: 20,
      position: 'absolute',
      bottom: 0,
      paddingTop: 20,
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
    }
});
