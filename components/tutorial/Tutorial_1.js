// Tutorial step 1
import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
const { height, width } = Dimensions.get("window");

//component 이름이랑, library 이름이랑 겹쳐서 main calendar라고 이름 지어줌.
export default function firstTutorial() {
  return (
    <>
      <Text>Tutorial 1</Text>
      <Calendar
          theme={calendarTheme}
          style={styles.calendarStyle}
      />
      <View style={styles.container}>
      </View>
    </>

  );
}

/* Calendar Theme Overriding: 색, 폰트, 글자 크기 */
const calendarTheme = {
  backgroundColor: '#ffff',
  calendarBackground: '#ffff',
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: '#ffff',
  arrowColor: 'grey',
  disabledArrowColor: '#d9e1e8',
  monthTextColor: 'grey',
  indicatorColor: 'grey',
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
        width: width-20,
        height: height-200,
        position: "absolute",
        backgroundColor: 'rgba(0,0,200,0.02)'
        // opacity: 10

    },
    calendarStyle: {
        height: height-200,
        width: width-20,
        borderWidth: 2,
        borderColor: 'skyblue'
    },
});
