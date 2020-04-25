import 'react-native-gesture-handler';
import React, {useState, useEffect}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Dimensions, Text, Button, StatusBar } from 'react-native';
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

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}

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