//이모리 하면서 딱 커버페이지 보여줬다 사라지는 부분
import React from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';
import Logo from './../images/Logo.png';
import Copy from './../images/Copy2.png';
const { height, width } = Dimensions.get("window");

export default function Cover() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={Logo} />
        <Image style={styles.copy} source={Copy} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      height: 45,
      width: 120,
      marginBottom: 15,
    },
    copy: {
        height: 20,
        width: 250,
    },
});