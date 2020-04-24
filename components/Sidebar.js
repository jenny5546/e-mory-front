// 개인 정보 ~ 알림 설정 등이 들어갈 사이드 바
import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { height, width } = Dimensions.get("window");

export default function Sidebar() {
  return (
    <>
      <View style={styles.container}>
            <TouchableOpacity style={styles.sidebarItem}>
                <Ionicons name="md-checkmark-circle" size={20} />
                <Text style={styles.itemTitle}>개인정보관리</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.sidebarItem}>
                <Text style={styles.itemTitle}>나의 활동</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.sidebarItem}>
                <Text style={styles.itemTitle}>알림설정</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.sidebarItem}>
                <Text style={styles.itemTitle}>리뷰쓰기</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.sidebarItem}>
                <Text style={styles.itemTitle}>고객센터</Text>
            </TouchableOpacity>  
            <TouchableOpacity style={styles.sidebarItem}>
                <Text style={styles.itemTitle}>이용약관</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.sidebarItem}>
                <Text style={styles.itemTitle}>앱정보</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.sidebarItem}>
                <Text style={styles.itemTitle}>로그아웃</Text>
            </TouchableOpacity>  
      </View>
    </>

  );
}

const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        alignItems: "flex-start",
        width: width-50,
        height: height-200,
        borderColor: 'grey',
        borderWidth: 0.3,
    },
    sidebarItem:{
        padding:15,
        margin: 5,
        flexDirection: 'row',
        // backgroundColor: 'rgba(0,0,200,0.01)',
        width: width-70,
    },
    itemTitle:{
        fontSize: 20,
        marginLeft: 10,
        
    }
});