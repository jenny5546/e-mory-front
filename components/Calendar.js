import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
const { height, width } = Dimensions.get("window");

export default function Calendar() {
  return (
    <View style={styles.container}>
      <Calendar
        theme={{
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
          indicatorColor: 'blue',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 15,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 10
        }}
        style={{
          height: 600,
          borderWidth: 1,
          borderColor: 'gray'
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: width,
    // height: height,
    backgroundColor: '#ffff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
