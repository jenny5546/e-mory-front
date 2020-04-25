// 개인정보 설정 가능 한 페이지
import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo, AntDesign } from '@expo/vector-icons';
const { width } = Dimensions.get("window");

export default function ProfileSetting() {
    const _showAlert = () => {
        Alert.alert(
          '수정 완료',
          '수정 사항이 반영되었습니다',
          [
            //누르면 Tutorial로 이동
            {text: '확인', onPress: () => console.log('Main page로 이동해야됨')},
          ],
          { cancelable: false }
        )
    }
    return (
        <View>
            <TouchableOpacity style={styles.backBtn}>
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.belowBtn}>
                    <Entypo name="pencil" size={20}/>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.belowBtn} onPress={_showAlert}>
                    <AntDesign name="checkcircleo" size={20}/>
                </TouchableOpacity>   
            </View>
            
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
    backBtn:{
        marginBottom: 50,
    },
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
    buttonContainer:{
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    belowBtn:{
        marginTop: 30,
        marginLeft: 20,
        alignSelf: "flex-end",
    }

    
});