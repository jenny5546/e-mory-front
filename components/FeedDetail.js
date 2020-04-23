import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, StatusBar, Image } from 'react-native';
import EditIcon from './../images/EditIcon.png';
import DeleteIcon from './../images/DeleteIcon.png';
import Emoji from './../images/EmojiTemp.png';

export default function FeedNew() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.popup}>
                <View style={styles.feedHeader}>
                    <Text style={styles.date}>2020년 4월 9일</Text>
                    <View style={styles.icons}>
                        <Image style={styles.icon} source={EditIcon} />
                        <Image style={styles.icon} source={DeleteIcon} />
                    </View>
                </View>
                
                <Text style={styles.text}>오늘은 기분이 좋다!</Text>
                <Image style={styles.emoji} source={Emoji} />
                {/* <TextInput
                
                placeholder="오늘의 감정일기 100자"
                placeholderTextColor={"#999"}
                returnKeyType={"done"}
                autoCorrect={false}
                /> */}
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
    feedHeader: {
        flex: 1,
        flexDirection: "row",
        // justifyContent: "space-around",
    },
    text: {
        paddingTop: 20,
        fontSize: 10,
        color: "#999999",
        // flexWrap: "wrap",
    },
    icon: {
        height: 20,
        width: 20,
    },
    icons: {
        flex: 1,
        flexDirection: "row",
    },
    emoji: {
        height: 50,
        width: 50,
    },
});