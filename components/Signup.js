// 회원가입 정보 기입 form
// LOGIN Component
import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, TextInput } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
const { width } = Dimensions.get("window");

export default function Signup() {
    return (
        <View>
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
                    placeholder={"YYY/MM/DD"}
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
            <TouchableOpacity style={styles.completeBtn}>
                <Text>완료</Text>
            </TouchableOpacity>   
        </View>
    );
}
const inputStyle= StyleSheet.create({
    inputContainer:{
        padding: 10,
        borderColor: "#bbb",
        borderWidth: 1,
        fontSize: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10
    }
})

const styles = StyleSheet.create({
    input:{
        ...inputStyle.inputContainer,
        width: width-100,
    },
    idContainer:{
        flexDirection: 'row',
    },
    idInput:{
        ...inputStyle.inputContainer,
        width: width-150,
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