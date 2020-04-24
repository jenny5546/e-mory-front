//이모리 하면서 딱 커버페이지 보여줬다 사라지는 부분
import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
const { height, width } = Dimensions.get("window");

export default function Cover() {
    return (
      <View style={styles.container}>
        <Text>This is a Cover Page that will disappear in 3 seconds</Text>
        <Text>E-mory</Text>
        <Text>Logo</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height, 
      backgroundColor: '#f6da73',
      alignItems: 'center',
      justifyContent: 'center',
    },
});