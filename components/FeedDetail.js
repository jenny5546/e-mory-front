import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, Button, View, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native';
import {AsyncStorage} from 'react-native';
import EditIcon from './../images/EditIcon.png';
import DeleteIcon from './../images/DeleteIcon.png';
import CloseIcon from './../images/CloseIconGray.png';
import LockDisabled from './../images/LockIconGray.png';
import LockEnabled from './../images/LockIcon.png';
import Emoji from './../images/EmojiTemp.png';
import FeedEmoji from './FeedEmoji';

import HeartIconFilled from './../images/HeartIconBlack.png';
import CommentIcon from './../images/CommentIcon.png';

const { height, width } = Dimensions.get("window");
// Emoji Icons 

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

class Feed {
    constructor(emoji, title, content, date, privacy,  comment, like) {
        this.emoji = emoji;
        this.title = title;
        this.content = content;
        this.date = date;
        // this.author = author;
        this.privacy = privacy;
        this.comment = comment;
        this.like = like;
      // ** 댓글, 좋아요 갖고오기도 추가하자. 나중에 **
    }
}
export default function FeedDetail(props) {

    const [editMode, setEditMode] = useState(false);
    const [emojiModal, openEmojiModal] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.matchingFeed.title);
    const [editedContent, setEditedContent] = useState(props.matchingFeed.content);
    const [editedPrivacy, setEditedPrivacy] = useState(props.matchingFeed.privacy);
    const [editedEmoji, setEditedEmoji] = useState(props.matchingFeed.emoji);
    const [likes, setLikes] = useState(props.matchingFeed.like);
    const [comments, setComments] = useState(props.matchingFeed.comment);
    const [id, setId] = useState(props.matchingFeed.id);
    const [uid, setUid] = useState(null);

    const _storeUid = async () =>{
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                setUid(value);
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    }
    _storeUid();

    const parseDate=(string)=>{
        let stringArray = string.split("-"); 
        let year = stringArray[0];
        let month = stringArray[1];
        let day = stringArray[2];
        return year+'년 '+month + '월 '+ day + '일';
    }
    const renderEmoji=(emoji) =>{
        switch(emoji) {
            case 'Happy':
                return (
                <>
                    <Image style= {styles.emojiIcon} source={HappyIcon}/>
                    <Text style={styles.emojiText}>행복해요</Text>
                </>
                )
            case 'Filled':
                return (
                <>
                    <Image style= {styles.emojiIcon} source={FilledIcon}/>
                    <Text style={styles.emojiText}>뿌듯해요</Text>
                </>
                )
            case 'Peace':
                return (
                <>
                    <Image style= {styles.emojiIcon} source={PeaceIcon}/>
                    <Text style={styles.emojiText}>평온해요</Text>
                </>
                )
            case 'Thank':
                return (
                <>
                    <Image style= {styles.emojiIcon} source={ThankIcon}/>
                    <Text style={styles.emojiText}>감사해요</Text>
                </>
                )
            case 'Lovely':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={LovelyIcon}/>
                        <Text style={styles.emojiText}>설레요</Text>
                    </>
                )
            case 'Sad':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={SadIcon}/>
                        <Text style={styles.emojiText}>슬퍼요</Text>
                    </>
                )
            case 'Lonely':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={LonelyIcon}/>
                        <Text style={styles.emojiText}>외로워요</Text>
                    </>
                )
            case 'Empty':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={EmptyIcon}/>
                        <Text style={styles.emojiText}>공허해요</Text>
                    </>
                )
            case 'Tired':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={TiredIcon}/>
                        <Text style={styles.emojiText}>지쳐요</Text>
                    </>
                )
            case 'Depressed':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={DepressedIcon}/>
                        <Text style={styles.emojiText}>우울해요</Text>
                    </>
                )
            case 'Worried':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={WorriedIcon}/>
                        <Text style={styles.emojiText}>걱정돼요</Text>
                    </>
                )
            case 'Angry':
                return (
                    <>
                        <Image style= {styles.emojiIcon} source={AngryIcon}/>
                        <Text style={styles.emojiText}>화나요</Text>
                    </>
                )
            default:
                return <View></View>
        }
    }

    const _delete = () =>{
        fetch(`http://127.0.0.1:8000/feeds/delete/${props.uid}/${props.matchingFeed.date}/`, {
        method: 'POST',
        headers:{
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}).then((res) => {
            return res.text();
        }).then(resjson=> {
            console.log('deleted successfully');
            props.closeFeedDetail();
            props.loadAgain();
        }).catch((err) => {
        console.log(err);
        });
    }

    const _edit = () => {

        const editedFeed= new Feed(editedEmoji, editedTitle, editedContent, props.pressedDate, editedPrivacy);
        fetch(`http://127.0.0.1:8000/feeds/edit/${props.uid}/${props.matchingFeed.date}/`, {
        method: 'POST',
        body: JSON.stringify(editedFeed),
        headers:{
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}).then((res) => {
            return res.text();
        }).then(resjson=> {
            console.log('edited successfully');
            props.loadAgain();
            props.closeFeedDetail();
            
        }).catch((err) => {
        console.log(err);
        });
    }

    const navigation = props.navigation;
    // console.log(props.matchingFeed.content);
    return (
        <View style={styles.background}>
            {/* {feed===1 && */}
            <View style={styles.container}>
                <View style={styles.popup}>
                    <View style={styles.header}>
                        <Text style={styles.date}>{parseDate(props.pressedDate)}</Text>
                        <View style={{flexDirection: "row", marginBottom: 10}}>
                            {editMode && 
                                <TouchableOpacity onPress={()=>{setEditedPrivacy(!editedPrivacy)}}>
                                {editedPrivacy ? 
                                    <Image style={styles.lockBtn} source={LockEnabled} />:
                                    <Image style={styles.lockBtn} source={LockDisabled} />
                                }
                                </TouchableOpacity>
                            }
                            <TouchableOpacity onPress={()=>{props.closeFeedDetail()}}>
                                <Image style={styles.closeBtn} source={CloseIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {editMode ? 
                        <>
                            {/* 수정 모드 */}
                            <Button
                            onPress={()=>{openEmojiModal(true)}}
                            title="오늘의 감정은?"
                            color="#e5e5e5"
                            backgroundColor="rgb(247, 247, 247)"
                            accessibilityLabel="Learn more about this purple button"
                            />
                            {editedEmoji!==null &&
                                <View style={styles.emojiContainer}>{renderEmoji(editedEmoji)}</View>
                            }
                            <TextInput
                                style={styles.titleInput}
                                placeholder="제목을 입력해주세요"
                                value = {editedTitle}
                                placeholderTextColor={"#999"}
                                returnKeyType={"done"}
                                autoCorrect={false}
                                onChangeText={text => setEditedTitle(text)}
                            />
                            <TextInput
                                style={styles.contentInput}
                                placeholder="오늘의 감정일기 100자"
                                value = {editedContent}
                                placeholderTextColor={"#999"}
                                returnKeyType={"done"}
                                autoCorrect={false}
                                onChangeText={text => setEditedContent(text)}
                            />

                            {emojiModal===true &&
                            <FeedEmoji 
                                closeEmojiModal={() => openEmojiModal(false)}
                                passEmoji={(evt) => {setEditedEmoji(evt); openEmojiModal(false)}}
                            />
                            }
                        </> 
                        : 
                        <>
                            {/* 보기 모드 */}

                            <View style={styles.emojiContainer}>{renderEmoji(editedEmoji)}</View>
                            <Text style={styles.title}>{editedTitle}</Text>
                            <Text style={styles.content}>{editedContent}</Text>

                        </>
                    }
                    <View style={styles.reactionWrapper}>
                        <TouchableOpacity>
                            <Image style={styles.reactionBtn} source={HeartIconFilled} />
                        </TouchableOpacity>
                        <Text style={styles.reactionNum}>{likes.length}</Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Comment',{feed_id: {id}, uid: {uid}})}}>
                            <Image style={styles.reactionBtn} source={CommentIcon} />
                        </TouchableOpacity>
                        <Text style={styles.reactionNum}>{comments.length}</Text>
                    </View>
                    
                    <View style={styles.btnContainer}>
                        {editMode && 
                        <TouchableOpacity 
                        onPress={()=>{_edit()}}
                        style={styles.submitButton}
                        >
                            <Text style={styles.emojiText}>저장</Text>
                        </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={()=>setEditMode(!editMode)}>
                            <Image style={styles.editBtn} source={EditIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>_delete()}>
                            <Image style={styles.deleteBtn} source={DeleteIcon} />
                        </TouchableOpacity>
                        
                        
                    </View>
                    
                </View>
            </View>

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
        flexDirection: 'column',
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
    title: {
        paddingTop: 20,
        fontSize: 17,
        marginTop: 20,
        fontWeight: '500'
        // flexWrap: "wrap",
    },
    content: {
        paddingTop: 20,
        fontSize: 16,
        marginTop: 20,
        color: "#999999",
        // flexWrap: "wrap",
    },
    btnContainer:{
        justifyContent:"flex-end",
        flexDirection: 'row',
        marginTop: 'auto'
    },
    closeBtn: {
        height: 20,
        width: 20,
        marginTop: 1,
    },
    lockBtn: {
        height: 20,
        width: 20,
        marginTop: 1,
        marginRight: 10,
        position: "relative",
        bottom: 1,
    },
    editBtn: {
        height: 20,
        width: 20,
        marginTop: 1,
        marginRight: 20,
    },
    deleteBtn:{
        height: 20,
        width: 20,
        marginTop: 1,
        marginRight: 10,
        // alignSelf: 'flex-end'
    },
    titleInput: {
        paddingTop: 20,
        fontSize: 14,
        marginTop: 20
        // flexWrap: "wrap",
    },
    contentInput: {
        paddingTop: 20,
        fontSize: 14,
        marginTop: 20
        // flexWrap: "wrap",
    },
    emojiContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    emojiIcon: {
        height: 60,
        width: 60,
    },
    emojiText:{
        marginTop: 10,
        fontSize: 14,
        color: "#999999",
    },

    // 완료 버튼 수정 부탁합니다 
    submitButton:{
        marginRight: 90,
        alignSelf: 'flex-start'
        // textAlign: 'center'
    },
    reactionWrapper: {
        flexDirection: "row",
        position: "relative",
        top: 5,
    },
    reactionBtn: {
        height: 20,
        width: 20,
        marginTop: 1,
        marginRight: 6,
        // alignSelf: 'flex-end'
    },
    reactionNum: {
        position: "relative",
        top: 2,
        marginRight: 6,
    }
});