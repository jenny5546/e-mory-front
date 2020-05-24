import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, TextInput, Text, Button, TouchableOpacity, Image, Alert, ScrollView, Keyboard } from 'react-native';
import CloseIcon from './../images/CloseIconGray.png';
import LockDisabled from './../images/UnlockIcon.png';
import LockEnabled from './../images/LockIcon.png';
import FeedEmoji from './FeedEmoji';
import { AntDesign } from '@expo/vector-icons';
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
import QuestionCircle from './../images/QuestionCircle.png';


const { height, width } = Dimensions.get("window");

export default function FeedNew(props) {

    const [emojiModal, openEmojiModal] = useState(false);
    const [emoji, setEmoji] = useState(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [privacy, setPrivate] = useState(true);

    let str = ""
    const pholder = () => {

        for(let i=0; i<width/14-4; i++) {
            str += " "
        }
        str += "오늘의 감정일기 500자 이내"
    }
    pholder()

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

    const _setPrivate = e => {
        if(privacy == true) {
            Alert.alert(
                '알림',
                '일기를 공개하시겠습니까?',
                [
                    {
                    text: "네",
                    onPress: () => {
                        setPrivate(!privacy)
                        Alert.alert(
                            '일기가 공개되었습니다 :)'
                        )
                    },
                    style: "cancel"
                    },
                    { text: "아니요",
                    }
                ],
                { cancelable: false }
            )
        } else {
            Alert.alert(
                '알림',
                '일기를 비공개하시겠습니까?',
                [
                    {
                    text: "네",
                    onPress: () => {
                        setPrivate(!privacy)
                        Alert.alert(
                            '일기가 비공개되었습니다 :)'
                        )
                    },
                    style: "cancel"
                    },
                    { text: "아니요",
                    }
                ],
                { cancelable: false }
            )
        }
    }

    const _stopWrite = e => {
        Alert.alert(
            '알림',
            '일기 작성을 중단하시겠습니까?',
            [
                {
                text: "네",
                onPress: () => {
                    props.closeNewFeed()
                },
                style: "cancel"
                },
                { text: "아니요",
                }
            ],
            { cancelable: false }
        )
    }
    
    const _openEmojiModal = e => {
        Keyboard.dismiss()
        openEmojiModal(true)
    }

    return (
        <View style={styles.background}>
            {/* {feed===1 && */}
            <View 
                style={emojiModal ? styles.containerwithmodal : styles.container}
            >
                <View style={styles.popup}>
                    <ScrollView keyboardShouldPersistTaps='handled'>
                    <View style={styles.header}>
                        {/* <Text style={styles.date}>{parseDate(props.pressedDate)}</Text> */}
                        <TouchableOpacity onPress={() => {_setPrivate()}} style={{position: "relative", top: 20, left: 20,}}>
                            {privacy ? 
                                <Image style={styles.lockBtn} source={LockEnabled} />:
                                <Image style={styles.unlockBtn} source={LockDisabled} />
                            }
                        </TouchableOpacity>
                        <View style={{flexDirection: "row", marginBottom: 10, position: "relative", top: 20, right: 20 }}>
                            <TouchableOpacity 
                                style={styles.submitButton}
                                onPress={()=>{
                                    // props.closeNewFeed(); 
                                    props.submitNewFeed(title,content,emoji,privacy);
                                }}
                                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            >
                                <AntDesign style={styles.SubmitBtn} name="checkcircleo" size={23.5} color="#828282"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{_stopWrite()}} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                                    <Image style={styles.closeBtn} source={CloseIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>{ _openEmojiModal() }} style={{position: "relative", top: 20,}}>
                        <Text style={styles.emotionChoice}>오늘의 감정은?</Text>
                        {emoji == null &&
                        <Image style={styles.circle} source={QuestionCircle} />
                        }
                        {emoji!==null &&
                        <View style={styles.emojiContainer}>{renderEmoji(emoji)}</View>
                        }
                    </TouchableOpacity>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="제목 작성하기"
                        placeholderTextColor={"#999"}
                        // placeholderStyle={{fontSize: 20,}}
                        returnKeyType={"done"}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={text => setTitle(text)}
                        multiline={true}
                        maxLength={20}
                    />
                    <TextInput
                        style={styles.contentInput}
                        placeholder={str}
                        placeholderTextColor={"#999"}
                        returnKeyType={"done"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={text => setContent(text)}
                        multiline={true}
                        maxLength={500}
                    />
                    {emojiModal===true &&
                        <FeedEmoji 
                            closeEmojiModal={() => openEmojiModal(false)}
                            passEmoji={(evt) => {setEmoji(evt); openEmojiModal(false)}}
                        />
                    }
                </ScrollView>
                </View>
            </View>
            {/* } */}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        height: height,
        zIndex: 2,
        backgroundColor: "rgba(153, 153, 153, 0.4)",
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        width: width,
        // paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    containerwithmodal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        width: width,
        height: height,
        backgroundColor: "#cccccc",
    },
    popup: {
        backgroundColor: "#fff",
        // padding: 20,
        height: "92%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    date: {
        color: "#999999",
        fontSize: 15,
    },
    titleInput: {
        paddingTop: 20,
        fontSize: 16,
        fontWeight: "600",
        marginTop: 20,
        width: width,
        textAlign: "center",
        position: "relative",
        top: 10,
        left: 0,
        // flexWrap: "wrap",
    },
    contentInput: {
        padding: 20,
        fontSize: 14,
        marginTop: 20,
        width: width*1.02,
        // textAlign: "center",
        // position: "relative",
        // left: -30,
        // flexWrap: "wrap",
    },
    closeBtn: {
        height: 25,
        width: 25,
        marginTop: 0.5,
        marginLeft: 5,
    },
    lockBtn: {
        height: 25,
        width: 25,
        marginTop: 1,
        marginRight: 10,
        position: "relative",
        left: 8,
        bottom: 1,
        opacity: 0.5
    },
    unlockBtn: {
        height: 40,
        width: 30,
        marginTop: 1,
        marginRight: 10,
        position: "relative",
        left: 1,
        top: -7,
        bottom: 1,
        opacity: 0.5
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
    SubmitBtn:{
        position: "relative",
        top: 1.5,
        right: 5,
    },
    circle: {
        width: 200,
        height: 110,
        alignSelf: "center",
        position: "relative",
        // top: 15,
    },
    emotionChoice: {
        textAlign: "center",
        fontSize: 17,
        color: "#5c5c5c",
    },
});