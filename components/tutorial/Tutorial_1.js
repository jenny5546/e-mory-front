// Tutorial step 1
import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Calendar, Agenda, LocaleConfig } from 'react-native-calendars';
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
  return (
      <View style={styles.container}>
        <Calendar
            theme={calendarTheme}
            style={styles.calendarStyle}
            onDayPress={(day) => {console.log('selected day', day)}}
            monthFormat={'M월'}
        />
        {/* <TouchableOpacity style={styles.completeBtn} onPress={()=> {navigation.push('TutorialTwo')}}>
          <AntDesign name="checkcircleo" size={20}/>
        </TouchableOpacity> */}
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
  textDayHeaderFontSize: 16
}

/* Calendar Style Overriding: 크기, 테두리, 등등 */
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(196, 196, 196, 0);',
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarStyle: {
      height: height*1.2,
      width: width,
      justifyContent: "center",
      position: "relative",
      top: height*-0.2,
    },
});
