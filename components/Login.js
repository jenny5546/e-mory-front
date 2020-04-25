// LOGIN Component
import React from 'react';
import { StyleSheet, Dimensions, Button, View, Text, TextInput } from 'react-native';
const { width } = Dimensions.get("window");


export default function Login() {
    return (
        <View>
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
                <Button title={"회원가입"} color="#bbb"/>
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
        width: width-100,
        borderRadius: 5,
        marginBottom: 10,
        padding: 5,
    }
})
const styles = StyleSheet.create({
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
        width: width-100,
        borderRadius: 10,
        marginBottom: 10
    },
    loginButtonWrapper:{
        width: width-100,
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