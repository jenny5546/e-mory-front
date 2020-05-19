// 회원가입 정보 기입 form
import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, TextInput, Alert, Image } from 'react-native';
import BackButton from './../images/BackIcon.png';
import { Entypo, AntDesign } from '@expo/vector-icons';
import CompleteButton from './../images/CompleteButton.png';
import {AsyncStorage} from 'react-native';

const { height, width } = Dimensions.get("window");

export default function PasswordFind({ navigation }) {

    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');

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
    })

    const _showAlert = () => {
        Alert.alert(
        '축하드립니다!',
        '회원가입이 완료되었습니다',
        [
            {text: '이모리 시작하기', onPress: () => navigation.push('TutorialOne')},
        ],
        { cancelable: false }
        )
    }

    const emailValidation = () => {

        fetch(`http://127.0.0.1:8000/accounts/password/temp/${uid}/`, {
            method: 'POST',
            body: JSON.stringify({email: email}),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }}).then((res) => {
                Alert.alert(
                    '이메일이 발송되었습니다',
                    '임시 비밀번호를 확인해주세요'
                )
                return res.json()
            }).catch((err) => {
            console.log(err);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <TouchableOpacity onPress={() => navigation.goBack()}>            
                    <Image style={styles.backButton} source={BackButton}/>
                </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
                <Text style={{textAlign: "center", fontSize: 16, marginBottom: 15,}}>임시 비밀번호 발송</Text>
                <TextInput 
                    style={styles.input}
                    value={email}
                    onChange={(e)=>{setEmail(e.nativeEvent.text)}}
                    placeholder={"가입했던 이메일 주소를 입력해주세요"}
                    autoCorrect={false}
                    autoCapitalize={false}
                />
                    <View style={styles.emailCheckBtn}>
                        <TouchableOpacity onPress={emailValidation}>
                            <Text style={styles.checkText}>메일 보내기</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            <View></View>
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
        justifyContent: 'space-between',
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
        width: 100,
        alignSelf: "center",
    },
    nicknameCheckBtn: {
        ...checkButton.checkBtn,
        marginLeft: width*0.02,
    },
    checkText: {
        color: "#fff",
        textAlign: "center",
    },
    completeBtn:{
        marginTop: 30,
        paddingHorizontal: width*0.04,
        alignSelf: "center",
        height: 25,
        width: 7,
    },
    contentWrapper:{
        position: "relative",
        top: -50,
    }
});