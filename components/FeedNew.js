import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, TextInput, Text, Button, TouchableOpacity, Image } from 'react-native';
import CloseIcon from './../images/CloseIconGray.png';
import LockDisabled from './../images/LockIconGray.png';
import LockEnabled from './../images/LockIcon.png';
import FeedEmoji from './FeedEmoji';
// import { AntDesign } from '@expo/vector-icons';
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



const { height, width } = Dimensions.get("window");

export default function FeedNew(props) {

    const [emojiModal, openEmojiModal] = useState(false);
    const [emoji, setEmoji] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [privacy, setPrivate] = useState(false);

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

    return (
        <View style={styles.background}>
            {/* {feed===1 && */}
            <View style={styles.container}>
                <View style={styles.popup}>
                    <View style={styles.header}>
                        <Text style={styles.date}>{parseDate(props.pressedDate)}</Text>
                        <View style={{flexDirection: "row", marginBottom: 10}}>
                            <TouchableOpacity onPress={()=>{setPrivate(!privacy)}}>
                                {privacy ? 
                                    <Image style={styles.lockBtn} source={LockEnabled} />:
                                    <Image style={styles.lockBtn} source={LockDisabled} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{props.closeNewFeed()}}>
                                    <Image style={styles.closeBtn} source={CloseIcon} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <Button
                    // onPress={onPressLearnMore}
                    onPress={()=>{openEmojiModal(true)}}
                    title="오늘의 감정은?"
                    color="#e5e5e5"
                    backgroundColor="rgb(247, 247, 247)"
                    accessibilityLabel="Learn more about this purple button"
                    />
                    {emoji!==null &&
                        <View style={styles.emojiContainer}>{renderEmoji(emoji)}</View>
                    }
                    <TextInput
                        style={styles.titleInput}
                        placeholder="제목을 입력해주세요"
                        placeholderTextColor={"#999"}
                        returnKeyType={"done"}
                        autoCorrect={false}
                        onChangeText={text => setTitle(text)}
                    />
                    <TextInput
                        style={styles.contentInput}
                        placeholder="오늘의 감정일기 100자"
                        placeholderTextColor={"#999"}
                        returnKeyType={"done"}
                        autoCorrect={false}
                        onChangeText={text => setContent(text)}
                    />
                    {/* 완료 버튼 수정 부탁합니다  */}
                    <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={()=>{
                            props.closeNewFeed(); 
                            // + 실제 post해서 main calendar 에 넘겨줄 수 있게 해주자.
                            props.submitNewFeed(title,content,emoji,privacy);
                        }}
                    >
                        {/* <AntDesign name="checkcircleo" size={20}/> */}
                        <Text stlye={styles.emojiText}>작성 완료!</Text>
                    </TouchableOpacity>
                    {emojiModal===true &&
                        <FeedEmoji 
                            closeEmojiModal={() => openEmojiModal(false)}
                            passEmoji={(evt) => {setEmoji(evt); openEmojiModal(false)}}
                        />
                    }
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
        position: 'absolute',
        bottom: 25,
        left: width*0.43
    }
});