//댓글 창 - //////////////////////
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Dimensions,TouchableOpacity, ScrollView, View, StatusBar, Image} from 'react-native';
import BackButton from './../images/BackIcon.png';
import ReportIcon from './../images/ReportIcon.png';
import HeartIcon from './../images/HeartIcon.png';
const { height, width } = Dimensions.get("window");

export default function Comment({ route, navigation }) {
    const {feed_id} = route.params;
    console.log(feed_id.id)
    const {uid} = route.params;
    // console.log(uid.uid)
    const [content, setContent] = useState('');
    // const [commentMode, setCommentMode] = useState(false);

    const _createComment= () =>{
        fetch(`http://127.0.0.1:8000/feeds/comment/${feed_id.id}/${uid.uid}/`, {
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'applications/json'
            }
        }).then((res) => {
                    return res.text();
        }).then((resJSON) => {
            // const { title, content, emoji, date } = resJSON
            // console.log(content);
            console.log('Comment Success');
            // setCommentMode(false);
            // console.log(title);
            // console.log(content);
            // console.log(emoji);
            // console.log(date);
        }).catch((err) => {
                console.log(err);
        });
    }

    useEffect(() =>{
        fetch(`http://127.0.0.1:8000/feeds/load/${feed_id.id}/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'applications/json'
            }
        }).then((res) => {
            return res.json();
        }).then((resJSON) => {
            console.log('get')
            const { load_comment } = resJSON
            console.log(JSON.parse(load_comment));

        }).catch((err) => {
                console.log(err);
        });
    })


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <Image style={styles.backButton} source={BackButton}/>
                </TouchableOpacity>
                <Text style={styles.headerContent}>댓글</Text>
                <View></View>
            </View>
            <ScrollView>
            <View style={styles.contentWrapper}>
                <View style={styles.feed}>
                    <View style={styles.content}>
                        <Text style={styles.feedWritter}>snowman39</Text>
                        <Text style={styles.feedContent}>돈을 벌기는 참 힘들다.</Text>
                    </View>
                    <Text style={styles.date}>6시간</Text>
                </View>
                {/* <View style={styles.comment}> */}
                    {/* <View style={styles.commentWrapper}>
                        <View style={styles.content}>
                            <Text style={styles.feedWritter}>jenny_doobap</Text>
                            <Text style={styles.feedContent}>배고픈데 밥이나 먹고 할까</Text>
                        </View>
                        <View style={styles.heartView}>
                            <Image style={styles.heart} source={HeartIcon} />
                        </View>
                    </View> */}
                    {/* <View style={styles.content}>
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
                    </View> */}
                {/* </View> */}
            </View>
            </ScrollView>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="댓글 달기..."
                    placeholderTextColor={"#999"}
                    returnKeyType={"done"}
                    autoCorrect={false}
                    onChangeText={text => setContent(text)}
                />
                <TouchableOpacity 
                style={styles.submitButton}
                onPress={()=>_createComment()}
                >
                {/* <AntDesign name="checkcircleo" size={20}/> */}
                <Text stlye={styles.emojiText}>댓글 작성하기</Text>
                </TouchableOpacity>
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
    },
    inputWrapper:{
        position: "absolute",
        bottom: 0,
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: width*0.04,
        paddingVertical: 10,
        borderTopColor: "#fafafa",
        backgroundColor: "#fafafa",
        borderTopWidth: 2,
        width: width,
        height: 80,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    input: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#f9f9f9",
        padding: 10,
        backgroundColor: "#fff",
        width: width*0.7,
        // marginTop: 30,
        // marginBottom: 20,
        // paddingTop: 10,
        // paddingHorizontal: width*0.04,
        // borderTopColor: "#fafafa",
        // borderTopWidth: 2,
        // width: width,
    },
    submitButton:{
        // position: 'absolute',
        // bottom: 25,
        padding: 20,
        // left: width*0.43
    }
});
