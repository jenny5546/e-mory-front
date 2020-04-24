import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainCalendar from './components/Calendar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Main</Text>
      <MainCalendar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
