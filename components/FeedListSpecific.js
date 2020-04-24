//카테고리 별 공개된 감정일기 /////////////
import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, StatusBar, Image} from 'react-native';
import BackButton from './../images/BackIcon.png';
import ReportIcon from './../images/ReportIconBlack.png';
import HeartIcon from './../images/HeartIconBlack.png';
import CommentIcon from './../images/CommentIcon.png';
import SmileIcon from './../images/SmileIcon.png';

export default function FeedListSpecific() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.header}>
                <Text style={styles.headerContent}>로고</Text>
            </View>
            <View style={styles.emoticonWrapper}>
                <Image style={styles.emoticon} source={SmileIcon} />
            </View>
            <View style={styles.feed}>
                <View>
                    <View style={styles.content}>
                        <Text style={styles.feedWritter}>snowman39</Text>
                        <Text style={styles.feedContent}>돈을 벌기는 참 힘들다.</Text>
                    </View>
                    <View style={styles.icons}>
                        <Image style={styles.icon} source={HeartIcon} />
                        <Text style={styles.iconNum}>11</Text>
                        <Image style={styles.icon} source={CommentIcon} />
                        <Text style={styles.iconNum}>5</Text>
                        <Image style={styles.icon} source={ReportIcon} />
                    </View>
                    <Text style={styles.date}>6시간</Text>
                </View>
            </View>
            <View style={styles.feed}>
                <View>
                    <View style={styles.content}>
                        <Text style={styles.feedWritter}>jenny_doobap</Text>
                        <Text style={styles.feedContent}>밥을 먹고 싶다.</Text>
                    </View>
                    <View style={styles.icons}>
                        <Image style={styles.icon} source={HeartIcon} />
                        <Text style={styles.iconNum}>2</Text>
                        <Image style={styles.icon} source={CommentIcon} />
                        <Text style={styles.iconNum}>1</Text>
                        <Image style={styles.icon} source={ReportIcon} />
                    </View>
                    <Text style={styles.date}>7시간</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingVertical: 40,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomColor: "#fafafa",
        borderBottomWidth: 2,
    },
    backButton: {
        height: 20,
        width: 20,
    },
    headerContent: {
        fontSize: 18,
    },
    feed: {
        flexDirection: "row",
        padding: 13,
        height: "auto",
        borderBottomWidth: 1,
        borderBottomColor: "#fafafa",
        paddingRight: 30,
    },
    content: {
        // flex: 4,
        flexDirection: "row",
    },
    date: {
        color: "#aaaaaa",
        fontSize: 14,
        marginTop: 6,
    },
    feedWritter: {
        fontSize: 14,
        fontWeight: "500",
        marginRight: 5,
    },
    comment: {
        padding: 13,
        height: "auto",
    },
    commentWrapper: {
        flexDirection: "row",
    },
    icons: {
        flexDirection: "row",
        // justifyContent: "space-between",
    },
    icon:{
        height: 16,
        width: 16,
        marginTop: 11,
        marginRight: 3,
    },
    iconNum: {
        marginTop: 10,
        marginRight: 10,
    },
    heartView: {
        flex: 1,
    },
    heart:{
        height: 16,
        width: 16,
        position: "absolute",
        right: 5,
        top: 5,
    },
    replyButton: {
        color: "#aaaaaa",
        fontSize: 14,
        marginTop: 6,
        marginLeft: 15,
        fontWeight: "500",
    },
    reply: {
        padding: 10,
        paddingLeft: 30,
    },
    emoticon: {
        height: 30,
        width: 30,
        marginRight: 13,
        position: "relative",
        left: 5,
        marginTop: 10,
    },
    emoticonWrapper: {
        flexDirection: "row",
        justifyContent: "center",
    }
});