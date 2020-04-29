import 'react-native-gesture-handler';
import React, {useState, useEffect}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Dimensions, Text, Button, StatusBar } from 'react-native';
// import MainCalendar from './components/Calendar';
import Cover from './components/CoverPage';
import Login from './components/Login';
import TutorialOne from './components/tutorial/Tutorial_1';
import TutorialTwo from './components/tutorial/Tutorial_2';
import TutorialThree from './components/tutorial/Tutorial_3';
import MainCalendar from './components/Calendar';
import FeedListAll from './components/FeedListAll';
import FeedListSpecific from './components/FeedListSpecific';
import Sidebar from './components/Settings';

import Chart from './components/Chart';
import ProfileSetting from './components/SidebarMenu/ProfileSetting';
import UserFeedback from './components/SidebarMenu/UserFeedback';
import ServiceTerm from './components/SidebarMenu/ServiceTerm';
import AlarmSetting from './components/SidebarMenu/AlarmSetting';


import Signup from './components/Signup';
import Statistics from './components/Statistics';
const { height, width } = Dimensions.get("window");

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App(){
  //3 초 뒤에 사라지는 cover page state 관리
  const [cover, setCover] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setCover(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {cover &&
          <Stack.Screen name="Cover" component={Cover} />
        }
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="TutorialOne" component={TutorialOne} />
        <Stack.Screen name="TutorialTwo" component={TutorialTwo} />
        <Stack.Screen name="TutorialThree" component={TutorialThree} />
        <Stack.Screen name="MainCalendar" component={MainCalendar} />
        <Stack.Screen name="FeedListAll" component={FeedListAll} />
        <Stack.Screen name="FeedListSpecific" component={FeedListSpecific} />
        <Stack.Screen name="Settings" component={Sidebar} />
        {/* <Stack.Screen name="Chart" component={Chart} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: width,
//     height: height,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });