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

export default function FeedEmoji() {

    const [emoji, setEmoji] = useState(1);

    return (
        <View style={styles.background}>
            {emoji===1 &&
            <View style={styles.container}>
                <View style={styles.popup}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>{setEmoji(0)}}>
                            <Image style={styles.closeBtn} source={CloseIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emojiWrapper}>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={HappyIcon} />
                            <Text style={styles.emotion}>행복해요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={FilledIcon} />
                            <Text style={styles.emotion}>뿌듯해요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={PeaceIcon} />
                            <Text style={styles.emotion}>평온해요</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emojiWrapper}>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={ThankIcon} />
                            <Text style={styles.emotion}>감사해요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={LovelyIcon} />
                            <Text style={styles.emotion}>설레요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={EmptyIcon} />
                            <Text style={styles.emotion}>공허해요</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emojiWrapper}>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={SadIcon} />
                            <Text style={styles.emotion}>슬퍼요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={LonelyIcon} />
                            <Text style={styles.emotion}>외로워요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={TiredIcon} />
                            <Text style={styles.emotion}>지쳐요</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emojiWrapper}>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={DepressedIcon} />
                            <Text style={styles.emotion}>우울해요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={WorriedIcon} />
                            <Text style={styles.emotion}>걱정돼요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={AngryIcon} />
                            <Text style={styles.emotion}>화나요</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        top: height * -0.1,
        height: height,
        width: width*0.95,
        zIndex: 3,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        // paddingHorizontal: 10,
        paddingTop: 60,
    },
    popup: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        height: height,
    },
    closeBtn: {
        height: 20,
        width: 20,
    },
    icon: {
        height: 60,
        width: 60,
        marginTop: 30,
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
        marginBottom: 10,
    },
    emotion: {
        textAlign: "center",
        fontSize: 14,
        color: "#999999",
        marginTop: 5,
    },
});