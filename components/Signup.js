// 회원가입 정보 기입 form
import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, AntDesign } from '@expo/vector-icons';
const { height, width } = Dimensions.get("window");

export default function Signup({ navigation }) {
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
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <AntDesign name="back" size={20}/>
            </TouchableOpacity> 
            <View>
                <Text>이름</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"이름을 입력해주세요"}
                />
            </View>
            <View>
                <Text>아이디</Text>
                <View style={styles.idContainer}>
                    <TextInput 
                        style={styles.idInput}
                        placeholder={"예: emory1"}
                    />
                    <TouchableOpacity style={styles.idBtn}>
                        <Text>중복확인</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            <View>
                <Text>비밀번호</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"비밀번호를 입력해주세요"}
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
                    placeholder={"YYYY/MM/DD"}
                />
                {/* <DateTimePicker value={new Date()}  /> */}
            </View>
            <View>
                <Text>이메일</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"예: e-mory1@mory.com"}
                />
            </View> 
            <TouchableOpacity style={styles.completeBtn} onPress={_showAlert}>
                <AntDesign name="checkcircleo" size={20}/>
            </TouchableOpacity>
        </View>
    );
}
const inputStyle= StyleSheet.create({
    inputContainer:{
        padding: 10,
        borderColor: "#bbb",
        borderWidth: 1,
        fontSize: 14,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10
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
    backBtn:{
        marginBottom: 20,
    },
    input:{
        ...inputStyle.inputContainer,
        width: width*0.9,
    },
    idContainer:{
        flexDirection: 'row',
    },
    idInput:{
        ...inputStyle.inputContainer,
        width: width*0.75,
    },
    idBtn:{
        justifyContent: "center",
        marginLeft: 10,

    },
    completeBtn:{
        marginTop: 30,
        alignSelf: "flex-end"
    }
});