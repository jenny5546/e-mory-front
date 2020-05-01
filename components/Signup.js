// 회원가입 정보 기입 form
import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, TextInput, Alert, Image } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import BackButton from './../images/BackIcon.png';
import { Entypo, AntDesign } from '@expo/vector-icons';
import CompleteButton from './../images/CompleteButton.png';
const { height, width } = Dimensions.get("window");

export default function Signup({ navigation }) {
    const _showAlert = () => {
        onSignup();
        // Alert.alert(
        // '축하드립니다!',
        // '회원가입이 완료되었습니다',
        // [
        //     {text: '이모리 시작하기', onPress: () => navigation.push('TutorialOne')},
        // ],
        // { cancelable: false }
        // )
    }

    const emailValidation = () => {
        Alert.alert(
            '이메일이 발송되었습니다',
            '발송된 메일을 통해 인증을 완료해주세요'
        )
    }

    const onSignup = e => {
        fetch(`http://127.0.0.1:8000/signup/`, {
            method: 'POST',
            body: JSON.stringify({name:name, email: email, password: password, date: date, nickname:nickname }),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'applications/json'
            }
            }).then((res) => {
                return res.json();
            }).then((resJSON) => {
                console.log(resJSON);
                // const { uid } = resJSON
                // const crypto = require('crypto');
                // var cipher = crypto.createCipher('aes128', 'committer')
                // cipher.update(`${uid}`, 'ascii', 'hex');
                // var cipherd=cipher.final('hex')
                // let headers = {
                //     "Content-Type": "application/json",
                // };
                // axios.post(`http://127.0.0.1:8000/account/${cipherd}/`, {
                //     "email": email
                // }, {headers: headers}).then((res) => {
                //     const {error} = res.data
                //     if (error) {
                //         alert(error);
                //     }
                //     alert('메일이 발송 되었습니다.');
                //     setLoading(0);
                // }).catch((err) => {
                //     console.log(err);
                // })
            }).catch((err) => {
                console.log(err);
            })
    }

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordCheck, setPasswordCheck] = useState(null);
    const [date, setDate] = useState(null);
    const [nickname, setNickname] = useState(null);

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
                />
            </View>
            <View>
                <Text>비밀번호 확인</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                    value={passwordCheck}
                    onChange={(e)=>{setPasswordCheck(e.nativeEvent.text)}}
                />
            </View>
            <View>
                <Text>생년월일</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"YYYY/MM/DD"}
                    value={date}
                    onChange={(e)=>{setDate(e.nativeEvent.text)}}
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
                    />
                    <View style={styles.nicknameCheckBtn}>
                        <TouchableOpacity>
                            <Text style={styles.checkText}>중복확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.belowBtn} onPress={_showAlert}>
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