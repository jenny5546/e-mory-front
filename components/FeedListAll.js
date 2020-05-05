//남의 글 전부 다 실시간으로 보이는 곳 ///////////
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, Image, Dimensions, Alert } from 'react-native';
// import ListView from "deprecated-react-native-listview";
import {AsyncStorage} from 'react-native';

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
import { reset } from 'expo/build/AR';

const { height, width } = Dimensions.get("window");

export default function FeedListAll({ route, navigation }) {

    // const { uid } = route.params;
    // const [filterModal, setfilterModal] = useState(0);
    const [openFilter, setOpenFilter] = useState(false);
    const [data, setData] =useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [firstLoaded, setFirstLoaded] = useState(false);
    const [emojiOption, setEmojiOption] = useState('All');

    const [uid, setUid] = useState('');
    // const [likeFeedID, setlikeFeedID] = useState(0);

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
    const parseDate=(string)=>{
        let stringArray = string.split("-"); 
        let year = stringArray[0];
        let month = stringArray[1];
        let day = stringArray[2];
        return year+'년 '+month + '월 '+ day + '일';
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

    const _reset = () =>{
        setData([]);
        setPage(1);
        setFirstLoaded(false);
        setTotalPage(0);
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
    console.log(data);

    const _loadFeed = () => {
        // console.log(emojiOption);
        if (totalPage===0 || totalPage > page-1){
            fetch(`http://127.0.0.1:8000/feeds/${emojiOption}/${page}/`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }}).then((res) => {
                return res.json();
            }).then((resJSON)=> {
                const { total_pages, load_feed } = resJSON
                setTotalPage(total_pages);
                console.log(load_feed);
                setData(data.concat(load_feed));
                setPage(page+1);
                setEmojiOption(emojiOption);
                // isLoading(false);
                

            }).catch((err) => {
            console.log(err);
            });

        }
        
    }
    // // console.log(data);

    // const _loadMoreFeed = () =>{
    //     _loadFeed();
    //     // _loadFeed()
    // }
    if (!firstLoaded) {
        setFirstLoaded(true);
        _loadFeed();
    }
    useEffect(()=>{
        _storeUid();
    },[])

    // console.log(uid);

    // useEffect(()=>{
    //    _loadFeed();
    // },[uid])
    
    // console.log('uid')
    // console.log(uid);

    const _likeFeed = (id) => {

        fetch(`http://127.0.0.1:8000/feeds/like/${id}/${uid}/`, {
            method: 'GET',
            // body: JSON.stringify(newFeed),
            headers: {
                // 'Accept': 'application/json',
                'Content-type': 'applications/json'
            }
        }).then((res) => {
            return res.text();
        }).then((resJSON) => {
            // const { title, content, emoji, date } = resJSON
            console.log('Liked Success!');
            // console.log(title);
            // console.log(content);
            // console.log(emoji);
            // console.log(date);
        }).catch((err) => {
            console.log(err);
        });
    }
    console.log(data);


    const Feed=({id, title, content, emoji, date, likes, comments})=>{
        return (
            <View style={styles.feed}>
                <View>
                    {/* <Image style={styles.emoticon} source={PeaceIcon} /> */}
                    {renderEmoji(emoji)}
                </View>
                <View>
                    <View style={styles.content}>
                        {/* <Text style={styles.feedDate}>Feed id: {id}</Text> */}
                        <Text style={styles.feedDate}>{parseDate(date)}의 기록</Text>
                        <Text style={styles.feedContent}>제목: {title}</Text>
                        <Text style={styles.feedContent}>내용: {content}</Text>
                    </View>
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={()=>{_likeFeed(id)}}>
                            <Image style={styles.icon} source={HeartIcon} />
                        </TouchableOpacity>
                        <Text style={styles.iconNum}>{likes.length}</Text>
                        {/* <TouchableOpacity onPress={()=>{navigation.push('Comment')}}> */}
                        <TouchableOpacity onPress={()=>{navigation.navigate('Comment',{feed_id: {id}, uid: {uid}})}}>
                            <Image style={styles.icon} source={CommentIcon} />
                        </TouchableOpacity>
                        <Text style={styles.iconNum}>{comments.length}</Text>
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
                    <TouchableOpacity onPress={()=>setOpenFilter(!openFilter)}>
                        <Image style={styles.backButton} source={Filter}/>
                    </TouchableOpacity>
                    {openFilter &&

                    <View style={styles.filterWrapper}>

                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('All');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>전체</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Happy');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>행복해요</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Filled');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>뿌듯해요</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Peace');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>평온해요</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Thank');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>감사해요</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Lovely');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>설레요</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Sad');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>슬퍼요</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Lonely');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>외로워요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Empty');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>공허해요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Tired');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>지쳐요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Depressed');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>우울해요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Worried');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>걱정돼요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('Angry');
                                _reset();
                                _loadFeed();
                        }}>
                            <Text style={styles.option}>화나요</Text>
                        </TouchableOpacity>
                    </View>
                    }
                </View>
            </View>
            <View style={styles.feedWrapper}>
                
                <ScrollView
                    onScroll={(e) => {
                        let paddingToBottom = 0;
                        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                        if(e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                          _loadFeed();
                        }
                    }}
                    scrollEventThrottle = {1}
                >
                    {/* <Text style={{fontSize: 50}}>Hoi</Text> */}
                    {data.map((item)=>(
                        <Feed
                            title={item.title}
                            content={item.content}
                            date={item.date}
                            emoji={item.emoji}
                            id = {item.id}
                            likes = {item.liked_users}
                            comments = {item.commented_users}
                        />

                    ))}
                    
                </ScrollView>
                {/* <TouchableOpacity style= {{position: 'absolute'}} onPress={()=>_loadMoreFeed()}>
                    <Text>Load More</Text>
                </TouchableOpacity> */}
                
                

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
        // height: height,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    feed: {
        // flexDirection: "",
        alignItems: 'center',
        paddingLeft: 25,
        height: height*0.33,
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: "#aaaaaa",
        padding: 30,
    },
    content: {
        // flex: 4,
        flexDirection: "column",
    },
    date: {
        color: "#aaaaaa",
        fontSize: 14,
        marginTop: 6,
        marginBottom: 20,
    },
    feedDate: {
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