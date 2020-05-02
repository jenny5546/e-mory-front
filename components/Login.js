import 'react-native-gesture-handler';
import React, {useState, useEffect}  from 'react';
import { StyleSheet, Dimensions, Button, View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import Logo from './../images/Logo.png';
import Copy from './../images/Copy1.png';
const { height, width } = Dimensions.get("window");

export default function Login({ navigation }) {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const onLogin = e => {
        // navigation.push('MainCalendar'); //for android test(android fetch doesn't work)
        fetch(`http://127.0.0.1:8000/accounts/login/`, {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'applications/json'
            }
            }).then((res) => {
                return res.json();
            }).then((resJSON) => {
                const { uid } = resJSON
                if(uid > 0) {
                    navigation.push('MainCalendar');
                } else {
                    Alert.alert(
                        '아이다가 비밀번호와 일치하지 않습니다',
                    )
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.logo} source={Logo} />
                <Image style={styles.copy} source={Copy} />
            </View>
            <TextInput
                style={styles.input}
                placeholder={"아이디를 입력해주세요"}
                value={email}
                onChange={(e)=>{setEmail(e.nativeEvent.text)}}
            />
            <TextInput
                style={styles.input}
                placeholder={"비밀번호를 입력해주세요"}
                value={password}
                onChange={(e)=>{setPassword(e.nativeEvent.text)}}
            />
            <View style={styles.loginButtonWrapper}>
                <TouchableOpacity onPress={onLogin}>
                    <Text style={styles.loginButton}>로그인</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginHelpWrapper}>
                <TouchableOpacity onPress={()=>{navigation.push('PasswordFind')}}>
                    <Text style={styles.loginHelpButton}>아이디 | 비밀번호 찾기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signupButtonWrapper}>
                <TouchableOpacity onPress={() => navigation.push('SignUp')}>
                    <Text style={styles.signupButton}>회원가입</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.kakaoButtonWrapper}>
                <Button title={"카카오톡으로 시작하기"} color="#000"/>
            </View>
            <View style={styles.naverButtonWrapper}>
                <Button title={"네이버로 시작하기"} color="#fff"/>
            </View>
            <View style={styles.facebookButtonWrapper}>
                <Button title={"페이스북으로 시작하기"} color= "white"/>
            </View> */}
        </View>
    );
}
const buttonWrapper = StyleSheet.create({
    buttonWrap:{
        width: width*0.9,
        borderRadius: 5,
        marginBottom: 10,
        padding: 5,
    }
})

const button = StyleSheet.create({
    button: {
        fontSize:14,
        alignItems:'center',
        justifyContent:'center',
        textAlign: 'center',
        padding: 8
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    headerContainer: {
        marginBottom: 30,
        marginTop: height * 0.1,
        justifyContent: "center"
    },
    logo: {
        height: 45,
        width: 120,
        marginBottom: 15,
        position: "relative",
        left: "15%"
    },
    copy: {
        height: 17,
        width: 250,
    },
    input:{
        padding: 12,
        borderColor: "#bbb",
        borderWidth: 1,
        fontSize: 14,
        width: width*0.9,
        borderRadius: 5,
        marginBottom: 10
    },
    loginButtonWrapper:{
        width: width*0.9,
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#bbb',
    },
    loginHelpWrapper:{
        padding: 5,
        marginBottom: 10,
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
    },
    loginHelpButton: {
        ...button.button,
        fontWeight: '400',
        color: "#bbb",
    },
    signupButton: {
        ...button.button,
        fontWeight: '600',
        color: "#bbb",
    },
    loginButton: {
        ...button.button,
        fontWeight: '600',
        color: "#fff",
        backgroundColor: "#bbb",
    }
});