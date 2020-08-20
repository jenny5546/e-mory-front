import 'react-native-gesture-handler';
import React, {useState, useEffect}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Dimensions, Text, Button, StatusBar, Platform } from 'react-native';
// import MainCalendar from './components/Calendar';
import Cover from './components/CoverPage';
import Login from './components/Login';
import TutorialOne from './components/tutorial/Tutorial_1';
import TutorialTwo from './components/tutorial/Tutorial_2';
import TutorialThree from './components/tutorial/Tutorial_3';
import MainCalendar from './components/Calendar';
import Chart from './components/Chart';
import FeedListAll from './components/FeedListAll';
import FeedListSpecific from './components/FeedListSpecific';
import Sidebar from './components/Settings';
import Comment from './components/Comment';
import MyActivityComment from './components/MyAcitivityComment';
import MyActivity from './components/MyActivity';
import Waiting from './components/Waiting';

import ProfileSetting from './components/SidebarMenu/ProfileSetting';
import AlarmSetting from './components/SidebarMenu/AlarmSetting';
import PasswordFind from './components/PasswordFind';
import Terms from './components/Terms';
import AppInfo from './components/AppInfo';
import UserFeedback from './components/SidebarMenu/UserFeedback';
import ServiceTerm from './components/SidebarMenu/ServiceTerm';
import {AsyncStorage} from 'react-native';



import Signup from './components/Signup';
import Statistics from './components/Statistics';

// import { Notifications } from 'expo';
// import * as Permissions from 'expo-permissions';

const { height, width } = Dimensions.get("window");

// const PUSH_REGISTRATION_ENDPOINT = 'http://generated-ngrok-url/token';
// const MESSAGE_ENPOINT = 'http://generated-ngrok-url/message';

const Stack = createStackNavigator();

export default function App(){
  //3 초 뒤에 사라지는 cover page state 관리
  const [cover, setCover] = useState(true);
  // const [tokenValue, setTokenValue] = useState('none');

  // const getPushNotificationPermissions = async () => {

  //   const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //   let finalStatus = existingStatus;

  //   // only ask if permissions have not already been determined, because
  //   // iOS won't necessarily prompt the user a second time.
  //   if (existingStatus !== 'granted') {
  //     // Android remote notification permissions are granted during the app
  //     // install, so this will only ask on iOS
  //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus = status;
  //   }
  //   // Stop here if the user did not grant permissions
  //   if (finalStatus !== 'granted') {
  //     return;
  //   }
  //   console.log(finalStatus)
  //   // Get the token that uniquely identifies this device'
  //   const token = await Notifications.getExpoPushTokenAsync()
  //   console.log("Notification Token: ", token);
  //   setTokenValue(token);

  //   return (
  //     <View style={styles.container}>
  //       <Text>...</Text>
  //     </View>
  //   );
  // }

  // const _storeToken = async () => {
  //   try {
  //         await AsyncStorage.setItem('token', String(tokenValue));
  //         console.log('token set complete')

  //   } catch (error) {
  //       console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getPushNotificationPermissions();
  //   _storeToken();
  // });

  useEffect(() => {
    const timer = setTimeout(() => setCover(false), 300);
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
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="TutorialOne" component={TutorialOne} />
        <Stack.Screen name="TutorialTwo" component={TutorialTwo} />
        <Stack.Screen name="TutorialThree" component={TutorialThree} />
        <Stack.Screen name="MainCalendar" component={MainCalendar} />
        <Stack.Screen name="Chart" component={Chart} />
        <Stack.Screen name="FeedListAll" component={FeedListAll} />
        {/* <Stack.Screen name="FeedListSpecific" component={FeedListSpecific} /> */}
        <Stack.Screen name="AlarmSetting" component={AlarmSetting} />
        <Stack.Screen name="Settings" component={Sidebar} />
        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="MyActivity" component={MyActivity} />
        <Stack.Screen name="AppInfo" component={AppInfo} />
        <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
        <Stack.Screen name="MyActivityComment" component={MyActivityComment} />
        <Stack.Screen name="PasswordFind" component={PasswordFind} />
        <Stack.Screen name="Waiting" component={Waiting} />
        {/* <Stack.Screen name="Chart" component={Chart} /> */}
      </Stack.Navigator>
    </NavigationContainer>
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