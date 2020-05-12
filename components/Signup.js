// 회원가입 정보 기입 form
import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, TextInput, Alert, Image } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import BackButton from './../images/BackIcon.png';
import { AntDesign } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';

const { height, width } = Dimensions.get("window");

export default function Signup({ navigation }) {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordCheck, setPasswordCheck] = useState(null);
    const [date, setDate] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [validEmail, setValidEmail] = useState(false);
    const [validNickname, setValidNickname] = useState(false);

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
                        '이메일이 발송되었습니다',
                        '발송된 메일을 통해 인증을 완료해주세요'
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
            <View style={styles.header} >
                <TouchableOpacity onPress={() => navigation.goBack()}>            
                    <Image style={styles.backButton} source={BackButton}/>
                </TouchableOpacity>
            </View>
            <View>
                <Text>이름</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"이름을 입력해주세요"}
                    value={name}
                    onChange={(e)=>{setName(e.nativeEvent.text)}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                />
            </View>
            <View>
                <Text>이메일</Text>
                <View style={styles.idContainer}>
                    <TextInput 
                        style={styles.emailInput}
                        placeholder={"예: e-mory1@mory.com"}
                        value={email}
                        onChange={(e)=>{setEmail(e.nativeEvent.text)}}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <View style={styles.emailCheckBtn}>
                        <TouchableOpacity onPress={emailValidation}>
                            <Text style={styles.checkText}>이메일 인증</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
                <Text>비밀번호</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"비밀번호를 입력해주세요"}
                    value={password}
                    onChange={(e)=>{setPassword(e.nativeEvent.text)}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <View>
                <Text>비밀번호 확인</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                    value={passwordCheck}
                    onChange={(e)=>{setPasswordCheck(e.nativeEvent.text)}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <View>
                <Text>생년월일</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"YYYY/MM/DD"}
                    value={date}
                    onChange={(e)=>{setDate(e.nativeEvent.text)}}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <View>
                <Text>닉네임</Text>
                <View style={styles.idContainer}>
                    <TextInput 
                        style={styles.nicknameInput}
                        placeholder={"예: emory_mory"}
                        value={nickname}
                        onChange={(e)=>{setNickname(e.nativeEvent.text)}}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <View style={styles.nicknameCheckBtn}>
                        <TouchableOpacity onPress={nicknameValidation}>
                            <Text style={styles.checkText}>중복확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.belowBtn} onPress={onSignup}>
                    <AntDesign name="checkcircleo" size={20}/>
                </TouchableOpacity>
            </View>
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
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 30,
        marginBottom: 20,
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
    completeBtn:{
        marginTop: 30,
        paddingHorizontal: width*0.04,
        alignSelf: "center",
        height: 25,
        width: 7,
    },
    buttonContainer: {
        marginTop: 30,
    }
});