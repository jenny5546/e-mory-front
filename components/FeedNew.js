import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, TextInput, Text, Button, TouchableOpacity, Image } from 'react-native';
import CloseIcon from './../images/CloseIconGray.png';

const { height, width } = Dimensions.get("window");

export default function FeedNew() {

    const [feed, setFeed] = useState(1);

    return (
        <View style={styles.background}>
            {feed===1 &&
            <View style={styles.container}>
                <View style={styles.popup}>
                    <View style={styles.header}>
                        <Text style={styles.date}>2020년 4월 9일</Text>
                        <TouchableOpacity onPress={()=>{setFeed(0)}}>
                                <Image style={styles.closeBtn} source={CloseIcon} />
                        </TouchableOpacity>
                    </View>
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
            }
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        height: height,
        zIndex: 2,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        width: width,
        paddingHorizontal: 10,
        paddingTop: 60,
        backgroundColor: "rgba(153, 153, 153, 0.5);",
    },
    popup: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        height: "80%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
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
    closeBtn: {
        height: 17,
        width: 17,
        marginTop: 1,
    },
});