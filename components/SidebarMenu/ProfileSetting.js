// 개인정보 설정 가능 한 페이지
import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, TextInput, Alert, Image } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo, AntDesign } from '@expo/vector-icons';
import BackButton from './../../images/BackIcon.png';
import CompleteButton from './../../images/CompleteButton.png';
const { height, width } = Dimensions.get("window");

class Profile {
    constructor(name, email, password, birthday, nickname) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.birthday = birthday;
      this.nickname = nickname;
    }
  }

export default function ProfileSetting({route, navigation}) {
    const {uid} = route.params;
    const [name, setName] =useState('');
    const [email, setEmail] =useState('');
    const [password, setPassword] =useState('********');
    const [birthday, setBirthday] = useState('');
    const [nickname, setNickname] = useState('');



    // console.log('profile settings');
    // console.log(uid.uid);

    const _showAlert = () => {
        Alert.alert(
            '수정 완료',
            '수정 사항이 반영되었습니다',
            [
            {text: '확인', onPress: () => {navigation.goBack()}},
            ],
            { cancelable: false }
        )
    }
    useEffect(() => {
          fetch(`http://127.0.0.1:8000/feeds/profile/${uid.uid}/`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }}).then((res) => {
                return res.json();
            }).then(context=> {

            //   profile= JSON.parse(profile);
              setBirthday(context.birthday);
              setEmail(context.email);
              setName(context.name);
              setNickname(context.nickname);
              setPassword(context.password);
              console.log(context);
    
            }).catch((err) => {
              console.log(err);
            });  
    },[]);

    const _editProfile = () => {

        const editedProfile = new Profile(name, email, password, birthday, nickname);

        fetch(`http://127.0.0.1:8000/feeds/profile/${uid.uid}/`, {
            method: 'POST',
            body: JSON.stringify(editedProfile),
            headers:{
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            }}).then((res) => {
                return res.text();
            }).then(resjson=> {
              console.log('edited done');
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
            <View>
                <Text>이름</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"이름을 입력해주세요"}
                    value = {name}
                    onChangeText={text => setName(text)}
                />
            </View>
            <View>
                <Text>이메일</Text>
                <View style={styles.idContainer}>
                    <TextInput 
                        style={styles.emailInput}
                        // placeholder={"예: e-mory1@mory.com"}
                        value = {email}
                        onChangeText={text => setEmail(text)}
                    />
                    <View style={styles.emailCheckBtn}>
                        <TouchableOpacity>
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
                    value = {password}
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <View>
                <Text>비밀번호 확인</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                />
            </View>
            <View>
                <Text>생년월일</Text>
                <TextInput 
                    style={styles.input}
                    // placeholder={"YYYY/MM/DD"}
                    value = {birthday}
                    onChangeText={text => setBirthday(text)}
                />
            </View>
            <View>
                <Text>닉네임</Text>
                <View style={styles.idContainer}>
                    <TextInput 
                        style={styles.nicknameInput}
                        // placeholder={nickname}
                        value = {nickname}
                        onChangeText={text => setNickname(text)}
                    />
                    <View style={styles.nicknameCheckBtn}>
                        <TouchableOpacity>
                            <Text style={styles.checkText}>중복확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.belowBtn} onPress={()=>{_editProfile()}}>
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