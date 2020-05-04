//남의 글 전부 다 실시간으로 보이는 곳 ///////////
import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, Button, View, StatusBar, ScrollView, Image, Dimensions, Alert, FlatList } from 'react-native';

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

export default function FeedListAll({ navigation }) {

    const [filterModal, setfilterModal] = useState(0);
    const [data, setData] =useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    // const [dataNum, seDataNum]= useState(3);
    let i = 0;

    const onModal = e => {
        i++;
        setfilterModal(i);
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

    const _loadFeed = () => {
        if (totalPage !== page){
            fetch(`http://127.0.0.1:8000/feeds/all/${page}/`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}).then((res) => {
            return res.json();
        }).then((resJSON)=> {
            const { total_pages, load_feed } = resJSON
            setTotalPage(total_pages);
            console.log(total_pages);

            setData(data.concat(JSON.parse(load_feed)));
            setPage(page+1);

        }).catch((err) => {
          console.log(err);
        });

        }
        
    }

    const _loadMoreFeed = () =>{

        _loadFeed();
        // _loadFeed()
    }


    const Feed=({title, content, emoji, date})=>{
        return (
            <View style={styles.feed}>
                <View>
                    {/* <Image style={styles.emoticon} source={PeaceIcon} /> */}
                    {renderEmoji(emoji)}
                </View>
                <View>
                    <View style={styles.content}>
                        <Text style={styles.feedWritter}>{date}</Text>
                        <Text style={styles.feedContent}>{title}</Text>
                        <Text style={styles.feedContent}>{content}</Text>
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
                    {filterModal%2 === 1 &&
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
                
                {/* <View style={styles.feed}>
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
                </View> */}
                
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <Feed
                        title={item.fields.title}
                        content={item.fields.content}
                        date={item.fields.date}
                        emoji={item.fields.emoji}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    onEndReached={_loadMoreFeed()}
                    onEndReachedThreshold={0.5}
                /> 
                
                

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
        height: height*0.33,
        width: width,
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
    emojiIcon: {
        height: 60,
        width: 60,
    },
    emojiText:{
        marginTop: 10,
        fontSize: 14,
        color: "#999999",
    },
});