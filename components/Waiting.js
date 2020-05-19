// 회원가입 정보 기입 form
import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, TextInput, Alert, Image, Button, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BackButton from './../images/BackIcon.png';
import { AntDesign } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';

const { height, width } = Dimensions.get("window");

export default function Waiting({ navigation }) {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordCheck, setPasswordCheck] = useState(null);
    const [date, setDate] = useState('YYYY-MM-DD');
    const [nickname, setNickname] = useState(null);
    const [validEmail, setValidEmail] = useState(false);
    const [validNickname, setValidNickname] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    let today = new Date();
    const [pickedDate, setPickedDate] = useState(today);
    const [uid, setUid] = useState('');

    const _storeUid = async () =>{

        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null){
            setUid(value);
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
    }

useEffect(() => {

    _storeUid();

    setTimeout(() => {
        fetch(`http://127.0.0.1:8000/feeds/user/valid/${uid}/`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}).then((res) => {
            return res.json();
        }).then(resJSON=> {
            const {valid} = resJSON
            if(valid) {
                navigation.push('TutorialOne')
            }
        }).catch((err) => {
            console.log(err);
        })
    }, 1000)

},[]);

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const emailValidation = (e) => {

        fetch(`http://127.0.0.1:8000/accounts/email/valid/`, {
            method: 'POST',
            body: JSON.stringify({email:email}),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'applications/json'
            }
            }).then((res) => {
                return res.json();
            }).then((resJSON) => {
                const { valid } = resJSON;
                if(valid) {
                    Alert.alert(
                        '사용 가능한 이메일입니다'
                    )
                } else {
                    Alert.alert(
                        '이미 사용중인 이메일입니다',
                    )
                }
            }).catch((err) => {
                console.log(err);
            })
        setValidEmail(true);
    }

    const nicknameValidation = (e) => {
        const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if(check_kor.test(nickname)) {
            Alert.alert(
                '형식 오류',
                '닉네임은 영어, 숫자, 특수문자만 사용가능합니다'
            )
            return;
        }
    
        fetch(`http://127.0.0.1:8000/accounts/nickname/valid/`, {
            method: 'POST',
            body: JSON.stringify({nickname:nickname}),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'applications/json'
            }
            }).then((res) => {
                return res.json();
            }).then((resJSON) => {
                const { valid } = resJSON;
                if(valid) {
                    Alert.alert(
                        '사용 가능한 닉네임입니다',
                    )
                    setValidNickname(true);
                } else {
                    Alert.alert(
                        '이미 사용중인 닉네임입니다',
                    )
                }
            }).catch((err) => {
                console.log(err);
            })

    }

    const pwdValidCheck = (pwd) => {
        const regPwd = /^[A-Za-z0-9]{6,12}$/;
        if(!regPwd.test(pwd)) {
            return false;
        }else{
            return true;
        }
    }

    const _storeData = async (uid) => {
        try {
            await AsyncStorage.setItem('user', String(uid));
        } catch (error) {
          // Error saving data
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

    const onSignup = e => {
        if(validEmail === false) {
            return (
                Alert.alert(
                    '이메일 인증',
                    '이메일 인증을 완료해주세요'
                )
            );
        }
        if(password !== passwordCheck) {
            return (
                Alert.alert(
                    '입력오류',
                    '비밀번호가 일치하지 않습니다'
                )
            );
        }
        if(pwdValidCheck(password) === false) {
            return (
                Alert.alert(
                    '비밀번호는 숫자, 영문 포함 6자 이상'
                )
            );
        }

        if(validNickname === false) {
            return (
                Alert.alert(
                    '닉네임',
                    '중복되지 않는 닉네임을 사용해주세요'
                )
            );
        }
        fetch(`http://127.0.0.1:8000/accounts/signup/`, {
            method: 'POST',
            body: JSON.stringify({name:name, email: email, password: password, date: date, nickname:nickname }),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'applications/json'
            }
            }).then((res) => {
                return res.json();
            }).then((resJSON) => {
                const { uid , nickname } = resJSON;
                if(uid > 0) {
                    _storeData(uid);
                    _storeName(nickname);
                    Alert.alert(
                        '축하드립니다!',
                        '회원가입이 완료되었습니다',
                        [
                            {text: '이모리 시작하기', onPress: () => navigation.push('TutorialOne')},
                        ],
                        { cancelable: false }
                    )
                }
            }).catch((err) => {
                console.log(err);
            })
    }


    return (
        <View style={styles.container}>
            <Text style={{fontSize: 15, marginBottom: 10,}}>가입한 메일으로 발송된 메일을 통해서 인증을 완료해주세요</Text>
            <ActivityIndicator style={styles.loadingbar}/>
        </View>
    );
}
const inputStyle = StyleSheet.create({
    inputContainer:{
        padding: 10,
        borderColor: "#bbb",
        borderWidth: 1,
        fontSize: 14,
        borderRadius: 3,
        marginBottom: 10,
        marginTop: 10,
        height: 40,
    }
})

const checkButton = StyleSheet.create({
    checkBtn:{
        justifyContent: "center",
        marginTop: 10,
        padding: 5,
        backgroundColor: "rgba(146, 136, 136, 0.8);",
        height: 40,
        borderRadius: 3,
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    header: {
        // flexDirection: "row",
        // justifyContent: "flex-start",
        // marginTop: 30,
        // marginBottom: 20,
        // paddingHorizontal: width*0.04,
        // paddingBottom: 10,
        // borderBottomColor: "#fafafa",
        // borderBottomWidth: 2,
        // width: width,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '10%',
        // marginBottom: 5,
        // paddingTop: 10,
        // backgroundColor: '#FEFAE4',
        paddingHorizontal: width*0.04,
        paddingBottom: 10,
        borderBottomColor: "#fafafa",
        borderBottomWidth: 2,
        width: width,
    },
    backButton: {
        height: 20,
        width: 20,
        alignItems: "flex-start",
    },
    input:{
        ...inputStyle.inputContainer,
        width: width*0.9,
    },
    idContainer:{
        flexDirection: 'row',
    },
    emailInput: {
        ...inputStyle.inputContainer,
        width: width*0.70,
    },
    nicknameInput:{
        ...inputStyle.inputContainer,
        width: width*0.72,
    },
    emailCheckBtn: {
        ...checkButton.checkBtn,
        marginLeft: width*0.02,
    },
    nicknameCheckBtn: {
        ...checkButton.checkBtn,
        marginLeft: width*0.02,
    },
    checkText: {
        color: "#fff",
    },
    belowBtn:{
        marginTop: 30,
        alignSelf: "center",
        height: 25,
        width: 25,
    },
    buttonContainer: {
        marginTop: 30,
    },
    dateTimePicker: {
        position: "absolute",
        bottom: 0,
    },
    dateInput: {
        padding: 10,
        borderColor: "#bbb",
        borderWidth: 1,
        fontSize: 14,
        borderRadius: 3,
        marginBottom: 10,
        marginTop: 10,
        height: 40,
        backgroundColor: "#fff",
    },
    dateInit:{
        color: "#c4c4c6",
    },
    dateAfter: {
        color: "#000",
    },
    description: {
        fontSize: 9,
        marginLeft: 5,
        position: "relative",
        top: 2,
    },
    term:{
        fontSize: 10,
        textAlign: "center",
        color: "#5a5a5a",
        position: "relative",
        top: 30,
    },
    termpage: {
        fontSize: 10,
        textAlign: "center",
        color: "#0066cc",
        position: "relative",
        top: 30,
    }
});