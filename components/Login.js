import 'react-native-gesture-handler';
import React, {useState}  from 'react';
import { StyleSheet, Dimensions, View, Text, TextInput, Image, TouchableOpacity, Alert, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Logo from './../images/Logo.png';
import Copy from './../images/Copy1.png';
const { height, width } = Dimensions.get("window");
import { AsyncStorage } from 'react-native';

export default function Login({ navigation }) {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    
    const _storeData = async (uid) => {
        try {
            await AsyncStorage.setItem('user', String(uid));
        } catch (error) {
            console.log(error);
        }
    };

    const _storeName = async (nickname) => {
        // let user_object = {
        //     'uid': uid
        // };
        try {
            await AsyncStorage.setItem('name', String(nickname));
        } catch (error) {
          // Error saving data
            console.log(error);
        }
    };

    const onLogin = e => {
        // navigation.push('MainCalendar'); //for android test(android fetch doesn't work)
        fetch(`https://enigmatic-bastion-65203.herokuapp.com/accounts/login/`, {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'applications/json'
            }
            }).then((res) => {
                return res.json();
            }).then((resJSON) => {
                const { uid, nickname } = resJSON
                console.log(uid, nickname)
                if(uid > 0) {
                    _storeData(uid);
                    _storeName(nickname);
                    navigation.push('MainCalendar');
                } else if(uid == 0) {
                    Alert.alert(
                        '아이디와 비밀번호가 일치하지 않습니다',
                    )
                } else {
                    // _storeData(uid);
                    // _storeName(nickname);
                    // navigation.push('MainCalendar');
                    Alert.alert(
                        '이메일 인증을 먼저 완료해주세요',
                    )
                }
            }).catch((err) => {
                console.log(err);
            })
    }
    // console.log(_retrieveData());
    // _retrieveData()


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.logo} source={Logo} />
                <Image style={styles.copy} source={Copy} />
            </View>

                <View>
                <TextInput
                    style={styles.input}
                    placeholder={"닉네임을 입력해주세요"}
                    value={email}
                    onChange={(e)=>{setEmail(e.nativeEvent.text)}}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder={"비밀번호를 입력해주세요"}
                    value={password}
                    onChange={(e)=>{setPassword(e.nativeEvent.text)}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
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
                </View>
                

        </View>
        </TouchableWithoutFeedback>
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
        position: "relative",
        // top: -40,
        // paddingTop: height*0.01,
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