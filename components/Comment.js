//댓글 창 - //////////////////////
import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, StatusBar, Image} from 'react-native';
import BackButton from './../images/BackIcon.png';
import ReportIcon from './../images/ReportIcon.png';
import HeartIcon from './../images/HeartIcon.png';

export default function Comment() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.header}>
                <Image style={styles.backButton} source={BackButton}/>
                <Text style={styles.headerContent}>댓글</Text>
                <View></View>
            </View>
            <View style={styles.feed}>
                <View style={styles.content}>
                    <Text style={styles.feedWritter}>snowman39</Text>
                    <Text style={styles.feedContent}>돈을 벌기는 참 힘들다.</Text>
                </View>
                <Text style={styles.date}>6시간</Text>
            </View>
            <View style={styles.comment}>
                <View style={styles.commentWrapper}>
                    <View style={styles.content}>
                        <Text style={styles.feedWritter}>jenny_doobap</Text>
                        <Text style={styles.feedContent}>배고픈데 밥이나 먹고 할까</Text>
                    </View>
                    <View style={styles.heartView}>
                        <Image style={styles.heart} source={HeartIcon} />
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.date}>6시간</Text>

                    <Text style={styles.replyButton}>답글 달기</Text>
                    <Image style={styles.icon} source={ReportIcon} />
                </View>
                <View style={styles.reply}>
                    <View style={styles.content}>
                        <Text style={styles.feedWritter}>jenny_doobap</Text>
                        <Text style={styles.feedContent}>@jenny_doobap 밥은 내가 살게</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.date}>5시간</Text>
                        <Text style={styles.replyButton}>답글 달기</Text>
                        <Image style={styles.icon} source={ReportIcon} />
                    </View>
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
        justifyContent: "space-between",
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
        position: "relative",
        left: -10,
    },
    feed: {
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
    icon:{
        height: 16,
        width: 16,
        marginTop: 6,
        marginLeft: 10,
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
    }
});