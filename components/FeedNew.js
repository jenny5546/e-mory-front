import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, StatusBar } from 'react-native';

export default function FeedNew() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.popup}>
                <Text style={styles.date}>2020년 4월 9일</Text>
                <TextInput
                style={styles.input}
                placeholder="오늘의 감정일기 100자"
                placeholderTextColor={"#999"}
                returnKeyType={"done"}
                autoCorrect={false}
                />
                <Button
                // onPress={onPressLearnMore}
                title="오늘의 감정은?"
                color="#e5e5e5"
                backgroundColor="rgb(247, 247, 247)"
                accessibilityLabel="Learn more about this purple button"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 120,
        backgroundColor: "rgba(153, 153, 153, 0.5);",
    },
    popup: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        height: "100%",
    },
    date: {
        color: "#999999",
        fontSize: 15,
    },
    input: {
        paddingTop: 20,
        fontSize: 10,
        // flexWrap: "wrap",
    },
});