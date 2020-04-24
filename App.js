import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MainCalendar from './components/Calendar';
import Cover from './components/CoverPage';
const { height, width } = Dimensions.get("window");

export default function App(){
  //3 초 뒤에 사라지는 cover page state 관리
  const [cover, setCover] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setCover(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* <MainCalendar/> */}
      {cover ? <Cover style={styles.coverPage}/> : <MainCalendar/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverPage:{
    display: 'none'
  }
});
