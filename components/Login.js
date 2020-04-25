import 'react-native-gesture-handler';
import React, {useState, useEffect}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import React from 'react';
import { StyleSheet, Dimensions, Button, View, Text, TextInput } from 'react-native';
import SignUp from './Signup';
const { height, width } = Dimensions.get("window");

const Stack = createStackNavigator();

export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style= {styles.title}>이모리</Text>
                <Text style= {styles.title}>E-MORY</Text>
            </View>
            <TextInput 
                style={styles.input}
                placeholder={"아이디를 입력해주세요"}
            />
            <TextInput 
                style={styles.input}
                placeholder={"비밀번호를 입력해주세요"}
            />

            <View style={styles.loginButtonWrapper}>
                <Button title={"로그인"} color="#fff"/>
            </View>

            <View style={styles.loginHelpWrapper}>
                <Button title={"아이디 | 비밀번호 찾기"} color="#bbb"/>
            </View>

            <View style={styles.signupButtonWrapper}>
                <Button title={"회원가입"} color="#bbb" onPress={() => navigation.push('SignUp')}/>
            </View>

            <View style={styles.kakaoButtonWrapper}>
                <Button title={"카카오톡으로 시작하기"} color="#000"/>
            </View>

            <View style={styles.naverButtonWrapper}>
                <Button title={"네이버로 시작하기"} color="#fff"/>
            </View>

            <View style={styles.facebookButtonWrapper}>
                <Button title={"페이스북으로 시작하기"} color= "white"/>
            </View>
            
        </View>
    );
}
const buttonWrapper = StyleSheet.create({
    buttonWrap:{
        width: width*0.75,
        borderRadius: 5,
        marginBottom: 10,
        padding: 5,
    }
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
      },
    title:{
        color: "black",
        fontSize: 30,
        fontWeight: "900",
        textAlign: 'center'
    },
    headerContainer: {
        marginBottom: 30
    },
    input:{
        padding: 12,
        borderColor: "#bbb",
        borderWidth: 1,
        fontSize: 18,
        width: width*0.75,
        borderRadius: 10,
        marginBottom: 10
    },
    loginButtonWrapper:{
        width: width*0.75,
        borderRadius: 10,
        padding: 5,
        backgroundColor: '#bbb',
    },
    loginHelpWrapper:{
        padding: 5,
        marginBottom: 50,
    },
    signupButtonWrapper:{
        ...buttonWrapper.buttonWrap,
        borderColor: "#bbb",
        borderWidth: 1,
    },
    kakaoButtonWrapper:{
        ...buttonWrapper.buttonWrap,
        backgroundColor: '#F5E04C'
    },
    naverButtonWrapper:{
        ...buttonWrapper.buttonWrap,
        backgroundColor: '#5BB034'
    },
    facebookButtonWrapper:{
        ...buttonWrapper.buttonWrap,
        backgroundColor: '#3578E8'
    }


});