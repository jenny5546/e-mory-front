//댓글 창 - //////////////////////
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Dimensions,TouchableOpacity, ScrollView, View, StatusBar, Image, Alert} from 'react-native';
import {AsyncStorage} from 'react-native';
import BackButton from './../images/BackIcon.png';
import ReportIcon from './../images/ReportIcon.png';
import HeartIcon from './../images/HeartIcon.png';

import HappyIcon from './../images/HappyIcon.png';
import FilledIcon from './../images/FilledIcon.png';
import PeaceIcon from './../images/PeaceIcon.png';
import ThankIcon from './../images/ThankIcon.png';
import LovelyIcon from './../images/LovelyIcon.png';
import SadIcon from './../images/SadIcon.png';
import LonelyIcon from './../images/LonelyIcon.png';
import EmptyIcon from './../images/EmptyIcon.png';
import TiredIcon from './../images/TiredIcon.png';
import DepressedIcon from './../images/DepressedIcon.png';
import WorriedIcon from './../images/WorriedIcon.png';
import AngryIcon from './../images/AngryIcon.png';

const { height, width } = Dimensions.get("window");

export default function Comment({ route, navigation }) {
    const {feed_id} = route.params;
    const {uid} = route.params;
    const {_commentWrite} = route.params;
    const [nickname, setNickname] = useState(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [feedContent, setFeedContent] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [emoji, setEmoji] = useState('');
    const [comments, setComments] = useState([]);
    // const [commentMode, setCommentMode] = useState(false);
    const _storeNickname = async () =>{
        try {
            const value = await AsyncStorage.getItem('name');
            if (value !== null) {
                setNickname(value);
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    }
    _storeNickname();

    console.log(feed_id)

    const _createComment= () =>{

        console.log(content)

        fetch(`https://cryptic-journey-73348.herokuapp.com/${feed_id.id}/${uid.uid}/`, {
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
            let today = new Date();   
            let hours = today.getHours(); // 시
            let minutes = today.getMinutes();  // 분
            console.log('Comment Success');
            let updatedComments = [...comments,{ 'content': content, 'author':nickname, 'date': 'soon'}]
            setComments(updatedComments); //원래는 <Comment ~넣어줘야하는데, 알아서 fetch해서 반영하는듯? />
            setContent(null)
            _commentWrite;
        }).catch((err) => {
                console.log(err);
        });
    }

    const renderEmoji=(emoji) =>{
        switch(emoji) {
            case 'Happy':
                return (
                <>
                    <Image style= {styles.emojiIcon} source={HappyIcon}/>
                    {/* <Text style={styles.emojiText}>행복해요</Text> */}
                </>
                )
            case 'Filled':
                return (
                <>
                    <Image style= {styles.emojiIcon} source={FilledIcon}/>
                    {/* <Text style={styles.emojiText}>뿌듯해요</Text> */}
                </>
                )
            case 'Peace':
                return (
                <>
                    <Image style= {styles.emojiIcon} source={PeaceIcon}/>
                    {/* <Text style={styles.emojiText}>평온해요</Text> */}
                </>
                )
            case 'Thank':
                return (
                <>
                    <Image style= {styles.emojiIcon} source={ThankIcon}/>
                    {/* <Text style={styles.emojiText}>감사해요</Text> */}
                </>
                )
            case 'Lovely':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={LovelyIcon}/>
                        {/* <Text style={styles.emojiText}>설레요</Text> */}
                    </>
                )
            case 'Sad':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={SadIcon}/>
                        {/* <Text style={styles.emojiText}>슬퍼요</Text> */}
                    </>
                )
            case 'Lonely':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={LonelyIcon}/>
                        {/* <Text style={styles.emojiText}>외로워요</Text> */}
                    </>
                )
            case 'Empty':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={EmptyIcon}/>
                        {/* <Text style={styles.emojiText}>공허해요</Text> */}
                    </>
                )
            case 'Tired':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={TiredIcon}/>
                        {/* <Text style={styles.emojiText}>지쳐요</Text> */}
                    </>
                )
            case 'Depressed':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={DepressedIcon}/>
                        {/* <Text style={styles.emojiText}>우울해요</Text> */}
                    </>
                )
            case 'Worried':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={WorriedIcon}/>
                        {/* <Text style={styles.emojiText}>걱정돼요</Text> */}
                    </>
                )
            case 'Angry':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={AngryIcon}/>
                        {/* <Text style={styles.emojiText}>화나요</Text> */}
                    </>
                )
            default:
                return <View></View>
        }
    }

    const parseDate=(string)=>{
        if(string=='soon') {
            return '방금 전';
        }
        let stringArray = string.split("-"); 
        let year = stringArray[0];
        let month = stringArray[1];
        let day = stringArray[2];
        return year+'년 '+month + '월 '+ day + '일';
    }

    useEffect(() =>{
        fetch(`https://cryptic-journey-73348.herokuapp.com/feeds/load/${feed_id.id}/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'applications/json'
            }
        }).then((res) => {
            return res.json();
        }).then((resJSON) => {
            const { title, content, author, date, emoji, comments } = resJSON
            setTitle(title);
            setFeedContent(content);
            setAuthor(author);
            setDate(date);
            setEmoji(emoji);
            setComments(comments);
        }).catch((err) => {
                console.log(err);
        });
    }, [])

    const _reportComment = (id) => {
        console.log(id, uid)
        Alert.alert(
        '신고',
        '이 댓글을 신고하시겠습니까?',
        [
            {
            text: "네",
            onPress: () => {
                fetch(`https://cryptic-journey-73348.herokuapp.com/feeds/comment/report/${id}/${uid.uid}/`, {
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }}).then((res) => {
                        return res.json()
                    }).then((resJSON) => {
                        const {already} = resJSON
                        console.log(already)
                        if(already) {
                            Alert.alert(
                                '이미 신고가 접수된 상태입니다'
                            )
                        } else {
                            Alert.alert(
                                '신고 접수가 완료되었습니다'
                            )
                        }
                    }).catch((err) => {
                    console.log(err);
                    });
            },
            style: "cancel"
            },
            { text: "아니요",
            }
        ],
        { cancelable: false }
        )
    }

    const Comment=({id, title, content, emoji, date, likes, comments, author, liked})=>{

        return (
            <View style={styles.comment}>
                <View style={styles.commentContent}>
                    <Text style={styles.commentAuthor}>{author}</Text>
                    <Text style={styles.feedContent}>{content}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.date}>{parseDate(date)}</Text>
                    <TouchableOpacity onPress={()=>{_reportComment(id)}}>
                        <Image style={styles.reportBtn} source={ReportIcon} />
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.icons}>
                    <TouchableOpacity onPress={()=>{_likeFeed(id)}}>
                        {liked &&
                            <Image style={styles.icon} source={HeartIconFilled} />
                        }
                        {!liked && 
                            <Image style={styles.icon} source={HeartIcon} />
                        }
                    </TouchableOpacity>
                    <Text style={styles.iconNum}>{likes.length}</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Comment',{feed_id: {id}, uid: {uid}})}}>
                        <Image style={styles.icon} source={CommentIcon} />
                    </TouchableOpacity>
                    <Text style={styles.iconNum}>{comments.length}</Text>
                    <TouchableOpacity onPress={onReport}>
                        <Image style={styles.icon} source={ReportIcon} />
                    </TouchableOpacity>
                </View> */}
                </View>
        )
    }

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
                    <View>
                        {renderEmoji(emoji)}
                        <Text style={styles.feedAuthor}>{author}</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.feedTitle}>{title}</Text>
                        <Text style={styles.feedContent}>{feedContent}</Text>
                        <Text style={styles.date}>{parseDate(date)}</Text>
                    </View>
                </View>
                <View style={styles.commentWrapper}>
                    {/* <ScrollView> */}
                        {comments.map((item)=>(
                            <Comment
                                content={item.content}
                                date={item.date}
                                author={item.author}
                                id={item.id}
                            />
                        ))}
                    {/* </ScrollView> */}
                    <View style={{height:80}}></View>
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
                    autoCapitalize={false}
                    onChangeText={text => setContent(text)}
                    value={content}
                />
                <TouchableOpacity 
                style={styles.submitButton}
                onPress={()=>_createComment()}
                >
                {/* <AntDesign name="checkcircleo" size={20}/> */}
                    <Text stlye={styles.btnText}>게시</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 40,
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
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: 25,
        paddingRight: 25,
        height: "auto",
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: "#fafafa",
        paddingTop: 20,
        paddingBottom: 10,
    },
    comment: {
        justifyContent: "flex-start",
        paddingLeft: 30,
        paddingRight: 25,
        height: "auto",
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: "#fafafa",
        paddingTop: 15,
        paddingBottom: 5,
    },
    content: {
        flexDirection: "column"
    },
    commentContent: {
        flexDirection: "row"
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
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#f9f9f9",
        padding: 10,
        backgroundColor: "#fff",
        width: width*0.8,
        alignItems: "flex-end",
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
        // backgroundColor: "#fff",
        // left: width*0.43
    },
    emojiIcon: {
        height: 40,
        width: 40,
        marginRight: 15,
    },
    feedAuthor: {
        fontWeight: "300",
        textAlign: "center",
        position: "relative",
        left: -7,
        top: 5
    },
    feedTitle: {
        fontWeight: "600",
        marginBottom: 10,
        fontSize: 16,
    },
    feedContent: {
        fontWeight: "400",
        fontSize: 14,
    },
    date: {
        color: "#aaaaaa",
        fontSize: 14,
        marginTop: 6,
        marginBottom: 20,
    },
    commentAuthor: {
        fontWeight: "600",
        fontSize: 14,
        marginRight: 10,
    },
    btnText: {
        color: "#3f95ef",
    },
    reportBtn: {
        height: 16,
        width: 16,
        marginLeft: 7,
        position: "relative",
        top: 5,
    },
    contentWrapper: {
    
    },
});
