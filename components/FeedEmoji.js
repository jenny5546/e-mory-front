//피드 작성 중에 이모티콘 선택하는 페이지 ////////////
import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, TextInput, Text, Button, TouchableOpacity, Image } from 'react-native';
import CloseIcon from './../images/CloseIconGray.png';
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

export default function FeedEmoji(props) {

    const [emoji, setEmoji] = useState(null);

    return (
        <View style={styles.background}>
            {/* {emoji===1 && */}
            <View style={styles.container}>
                <View style={styles.popup}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>{props.closeEmojiModal()}}>
                            <Image style={styles.closeBtn} source={CloseIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emojiWrapper}>
                        <TouchableOpacity onPress={()=> { 
                            setEmoji('Happy'); 
                            props.passEmoji('Happy');
                        }}>
                            <Image style={styles.icon} source={HappyIcon} />
                            <Text style={styles.emotion}>행복해요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            setEmoji('Filled');
                            props.passEmoji('Filled');
                        }}>
                            <Image style={styles.icon} source={FilledIcon} />
                            <Text style={styles.emotion}>뿌듯해요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            setEmoji('Peace');
                            props.passEmoji('Peace');
                        }}>
                            <Image style={styles.icon} source={PeaceIcon} />
                            <Text style={styles.emotion}>평온해요</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emojiWrapper}>
                        <TouchableOpacity onPress={()=> {
                            setEmoji('Thank');
                            props.passEmoji('Thank');
                        }}>
                            <Image style={styles.icon} source={ThankIcon} />
                            <Text style={styles.emotion}>감사해요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            setEmoji('Lovely');
                            props.passEmoji('Lovely');
                        }}>
                            <Image style={styles.icon} source={LovelyIcon} />
                            <Text style={styles.emotion}>설레요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            setEmoji('Empty');
                            props.passEmoji('Empty');
                        }}>
                            <Image style={styles.icon} source={EmptyIcon} />
                            <Text style={styles.emotion}>공허해요</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emojiWrapper}>
                        <TouchableOpacity onPress={()=> {
                            setEmoji('Sad');
                            props.passEmoji('Sad');
                        }}>
                            <Image style={styles.icon} source={SadIcon} />
                            <Text style={styles.emotion}>슬퍼요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            setEmoji('Lonely');
                            props.passEmoji('Lonely');
                        }}>
                            <Image style={styles.icon} source={LonelyIcon} />
                            <Text style={styles.emotion}>외로워요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            setEmoji('Tired');
                            props.passEmoji('Tired');
                        }}>
                            <Image style={styles.icon} source={TiredIcon} />
                            <Text style={styles.emotion}>지쳐요</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emojiWrapper}>
                        <TouchableOpacity onPress={()=> {
                            setEmoji('Depressed');
                            props.passEmoji('Depressed');
                        }}>
                            <Image style={styles.icon} source={DepressedIcon} />
                            <Text style={styles.emotion}>우울해요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            setEmoji('Worried');
                            props.passEmoji('Worried');
                        }}>
                            <Image style={styles.icon} source={WorriedIcon} />
                            <Text style={styles.emotion}>걱정돼요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            setEmoji('Angry');
                            props.passEmoji('Angry');
                        }}>
                            <Image style={styles.icon} source={AngryIcon} />
                            <Text style={styles.emotion}>화나요</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* } */}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        // top: height*-0.05,
        // height: height,
        width: width,
        height: height,
        zIndex: 3,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        // paddingHorizontal: 10,
        paddingTop: 60,
        flexDirection: 'column',
        width: width,
        paddingHorizontal: 10,
        paddingTop: 60,
        backgroundColor: "rgba(153, 153, 153, 0.5);",
        // width: width,
        // height: height,
        // backgroundColor: "rgba(153, 153, 153, 0.2)",
        // backgroundColor: "rgba(153, 153, 153, 0.5)",
    },
    popup: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        height: height*0.8,
    },
    closeBtn: {
        height: 25,
        width: 25,
        position: "relative",
    },
    icon: {
        height: 60,
        width: 60,
        marginTop: height*0.025,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    icons: {
        flex: 1,
        flexDirection: "row",
    },
    emojiWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 5,
        position: "relative",
        paddingBottom: 15,
        top: 5,
    },
    emotion: {
        textAlign: "center",
        fontSize: 14,
        color: "#999999",
        marginTop: 5,
    },
});