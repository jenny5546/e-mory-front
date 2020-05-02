//남의 글 전부 다 실시간으로 보이는 곳 ///////////
import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, Button, View, StatusBar, Image, Dimensions, Alert } from 'react-native';

import Filter from './../images/FilterIcon.png';
import Logo from './../images/SmallLogo.png';
import Home from './../images/HomeIcon.png';
import Chart from './../images/ChartIcon.png';
import Menu from './../images/MenuIcon.png';
import Feed from './../images/FeedIconFilled.png';
import Setting from './../images/SettingIcon.png';
import ReportIcon from './../images/ReportIconBlack.png';
import HeartIcon from './../images/HeartIconBlack.png';
import CommentIcon from './../images/CommentIcon.png';
import PeaceIcon from './../images/PeaceIcon.png';
import EmptyIcon from './../images/EmptyIcon.png';
const { height, width } = Dimensions.get("window");

export default function FeedListAll({ navigation }) {

    const [filter, setFilter] = useState(0);
    let i = 0;

    const onModal = e => {
        i++;
        setFilter(i);
    }

    const onReport = () => {
        Alert.alert(
        '신고',
        '이 게시물을 신고하시겠습니까?',
        [
            {
            text: "네",
            onPress: () => console.log("Ok pressed"),
            style: "cancel"
            },
            { text: "아니요", onPress: () => console.log("No Pressed") }
        ],
        { cancelable: false }
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.backButton} source={Menu}/>
                <Image style={styles.logo} source={Logo}/>
                <View>
                    <TouchableOpacity onPress={onModal}>
                        <Image style={styles.backButton} source={Filter}/>
                    </TouchableOpacity>
                    {filter%2 === 1 &&
                    <View style={styles.filterWrapper}>
                        <Text style={styles.option}>전체</Text>
                        <TouchableOpacity onPress={navigation.push('FeedListSpecific')}>
                            <Text style={styles.option}>행복해요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.option}>뿌듯해요</Text>
                        </TouchableOpacity>
                        <Text style={styles.option}>평온해요</Text>
                        <Text style={styles.option}>감사해요</Text>
                        <Text style={styles.option}>설레요</Text>
                        <Text style={styles.option}>슬퍼요</Text>
                        <Text style={styles.option}>외로워요</Text>
                        <Text style={styles.option}>공허해요</Text>
                        <Text style={styles.option}>지쳐요</Text>
                        <Text style={styles.option}>우울해요</Text>
                        <Text style={styles.option}>걱정돼요</Text>
                        <Text style={styles.option}>화나요</Text>
                    </View>
                    }
                </View>
            </View>
            <View style={styles.feedWrapper}>
                <View style={styles.feed}>
                    <View>
                        <Image style={styles.emoticon} source={PeaceIcon} />
                    </View>
                    <View>
                        <View style={styles.content}>
                            <Text style={styles.feedWritter}>snowman39</Text>
                            <Text style={styles.feedContent}>돈을 벌기는 참 힘들다.</Text>
                        </View>
                        <View style={styles.icons}>
                            <Image style={styles.icon} source={HeartIcon} />
                            <Text style={styles.iconNum}>11</Text>
                            <TouchableOpacity onPress={()=>{navigation.push('Comment')}}>
                                <Image style={styles.icon} source={CommentIcon} />
                            </TouchableOpacity>
                            <Text style={styles.iconNum}>5</Text>
                            <TouchableOpacity onPress={onReport}>
                                <Image style={styles.icon} source={ReportIcon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.date}>6시간</Text>
                    </View>
                </View>
                <View style={styles.feed}>
                    <View>
                        <Image style={styles.emoticon} source={EmptyIcon} />
                    </View>
                    <View>
                        <View style={styles.content}>
                            <Text style={styles.feedWritter}>jenny_doobap</Text>
                            <Text style={styles.feedContent}>배가 참 고프다.</Text>
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
            <View style={styles.navigationbar}>
                <TouchableOpacity  onPress={()=>{navigation.push('MainCalendar')}}>
                    <Image style={styles.icon} source={Home} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={Chart} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={Feed} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={Setting}  onPress={()=>{navigation.push('Settings')}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: width*0.04,
        paddingBottom: 10,
        borderBottomColor: "#fafafa",
        borderBottomWidth: 2,
        width: width,
    },
    backButton: {
        height: 20,
        width: 20,
    },
    filterWrapper: {
        position:"absolute",
        top: 25,
        left: -40,
        width: 60,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    option: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 13,
        fontWeight: "400",
    },
    feedWrapper: {
        height: height - 180,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    feed: {
        flexDirection: "row",
        paddingLeft: 25,
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
        marginBottom: 20,
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
    },
    navigationbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 20,
        paddingTop: 10,
        paddingHorizontal: width*0.04,
        borderTopColor: "#fafafa",
        borderTopWidth: 2,
        width: width,
    },
});