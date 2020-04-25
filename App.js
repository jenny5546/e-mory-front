import React, {useState, useEffect}  from 'react';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
// import MainCalendar from './components/Calendar';
import Cover from './components/CoverPage';
import TutorialOne from './components/tutorial/Tutorial_1';
import ProfileSetting from './components/SidebarMenu/ProfileSetting';
import UserFeedback from './components/SidebarMenu/UserFeedback';
import ServiceTerm from './components/SidebarMenu/ServiceTerm';
import AlarmSetting from './components/SidebarMenu/AlarmSetting';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Signup from './components/Signup';
import Statistics from './components/Statistics';
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
      <StatusBar/>
      {cover ? <Cover/> : <Login/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});