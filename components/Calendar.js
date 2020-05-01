import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
const { height, width } = Dimensions.get("window");

//component 이름이랑, library 이름이랑 겹쳐서 main calendar라고 이름 지어줌.
export default function MainCalendar() {
  return (
      <Calendar
        theme={calendarTheme}
        style={styles.calendarStyle}
        // dayComponent={({date, state}) => {
        //   return (
        //     <View>
        //       <Text style={{paddingBottom:20}}>
        //         {date.day}
        //       </Text>
        //     </View>
        //   );
        // }}
      />
  );
}

/* Calendar Theme Overriding: 색, 폰트, 글자 크기 */
const calendarTheme = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  arrowColor: 'orange',
  disabledArrowColor: '#d9e1e8',
  monthTextColor: 'black',
  indicatorColor: 'black',
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
      height: 100, //늘리고 싶으면 이거를 늘려보기
      alignItems: 'center'
    },
  }
}

/* Calendar Style Overriding: 크기, 테두리, 등등 */
const styles = StyleSheet.create({
  calendarStyle: {
    height: height-200,
    width: width-20,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
