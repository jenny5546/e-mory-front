//남의 글 전부 다 실시간으로 보이는 곳 ///////////
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, Image, Dimensions, Alert, TouchableWithoutFeedback } from 'react-native';
// import ListView from "deprecated-react-native-listview";
import {AsyncStorage} from 'react-native';
import ChartComponent from './Chart';
import Down from './../images/DownIcon.png';
import Logo from './../images/SmallLogo.png';
import Home from './../images/HomeIcon.png';
import Chart from './../images/ChartIcon.png';
import Menu from './../images/MenuIcon.png';
import FeedFilled from './../images/FeedIconFilled.png';
import Setting from './../images/SettingIcon.png';
import ReportIcon from './../images/ReportIconBlack.png';
import HeartIcon from './../images/HeartIconBlack.png';
import HeartIconFilled from './../images/HeartIconFilled.png';
import CommentIcon from './../images/CommentIcon.png';
import BackButton from './../images/BackIcon.png';
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
import { reset } from 'expo/build/AR';

const { height, width } = Dimensions.get("window");


export default function FeedListAll({ route, navigation }) {

    // const { allFeeds } = route.params;
    const [chart, openChartModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [data, setData] =useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [firstLoaded, setFirstLoaded] = useState(false);
    const [emojiOption, setEmojiOption] = useState('All');
    const [uid, setUid] = useState('');
    const [nickname, setNickname] = useState('');
    const [loadingFinished, setLoadingFinished] = useState(false);
    // const [routeFeed, setRouteFeed] = useState(allFeeds.feedList);
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
    const _storeFeeds = async () =>{
        try {
            const value = await AsyncStorage.getItem('feedlist');
            if (value !== null) {
            setUid(value);
            }
        } catch (error) {               
          // Error retrieving data
            console.log(error)
        }
    }

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

    const parseDate=(string)=>{
        let stringArray = string.split("-"); 
        let year = stringArray[0];
        let month = stringArray[1];
        let day = stringArray[2];
        return year+'년 '+month + '월 '+ day + '일';
    }

    const _reset = () =>{
        setData([]);
        setPage(1);
        setFirstLoaded(false);
        setTotalPage(0);
    }

    const _checkLiked = (users) => {

        let exist = false;
        users.map((user) => {
            if(nickname==user) exist = true
        })
        return exist
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
    // console.log(data);

    const _loadFeed = () => {
        // console.log(emojiOption);
        setLoadingFinished(true);
        if (totalPage===0 || totalPage > page-1){
            fetch(`https://enigmatic-bastion-65203.herokuapp.com/feeds/${emojiOption}/${page}/`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }}).then((res) => {
                return res.json();
            }).then((resJSON)=> {
                const { total_pages, load_feed } = resJSON
                setTotalPage(total_pages);
                // console.log(load_feed);
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
        _storeNickname();
        _loadFeed();
    },[])
    // console.log(allFeeds);


    const _likeFeed = (id) => {

        fetch(`https://enigmatic-bastion-65203.herokuapp.com/feeds/like/${id}/${uid}/`, {
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

        }).catch((err) => {
            console.log(err);
        });
    }



    const _reportFeed = (id) => {
        
        Alert.alert(
        '신고',
        '이 게시물을 신고하시겠습니까?',
        [
            {
            text: "네",
            onPress: () => {
                fetch(`https://enigmatic-bastion-65203.herokuapp.com/feeds/report/${id}/${uid}/`, {
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }}).then((res) => {
                        return res.json()
                    }).then((resJSON) => {
                        const {already} = resJSON
                        // console.log(already)
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

    const Feed=({id, title, content, emoji, date, likes, comments, author, liked, report})=>{

        // const [likeNum, setLikeNum] = useState(likes.length);
        const [likeNum, setLikeNum] = useState(likes.length);
        const [isLiked, setIsLiked] = useState(liked);
        const [isReported, setIsReported] = useState(report);
        const [commentNum, setCommentNum] = useState(comments.length);
        let nextNum = likeNum;
        let nextBool = isLiked;

        const _commentWirte = (e) => {
            if(e){
                let prevNum = commentNum;
                setCommentNum(++prevNum);
            }
        }

        if(isReported) {
            return(
                <>
                </>
            );
        }

        return (
            <TouchableOpacity style={styles.feed} onPress={()=>{navigation.push('Comment',{feed_id: {id}, uid: {uid}, _commentWirte: _commentWirte()})}}>
                <View style={styles.feedleft}>
                    {renderEmoji(emoji)}
                    <Text style={styles.feedAuthor}>{author}</Text>
                </View>
                <View style={styles.feedright}>
                    <Text style={styles.date}>{parseDate(date)}</Text>
                    <View style={styles.content}>
                        {/* <Text style={styles.feedDate}>Feed id: {id}</Text> */}
                        
                        <Text style={styles.feedTitle}>{title}</Text>
                        <Text style={styles.feedContent}>
                        {
                            String(content).length >= 15 ?
                            String(content).substr(0,15)+'...':
                            content
                        }
                        </Text>
                    </View>
                    <View style={styles.feedicons}>
                        <TouchableOpacity onPress={()=>{
                                if(isLiked) nextNum--;
                                else nextNum++;
                                setLikeNum(nextNum);
                                nextBool = !nextBool;
                                setIsLiked(nextBool);
                                _likeFeed(id)
                            }}>
                            {isLiked &&
                                <Image style={styles.feedicon} source={HeartIconFilled} />
                            }
                            {!isLiked && 
                                <Image style={styles.feedicon} source={HeartIcon} />
                            }
                        </TouchableOpacity>
                        <Text style={styles.iconNum}>{likeNum}</Text>
                        {/* <TouchableOpacity onPress={()=>{navigation.push('Comment')}}> */}

                        <TouchableOpacity onPress={()=>{navigation.push('Comment',{feed_id: {id}, uid: {uid}, commentNum: {commentNum}})}}>
                            <Image style={styles.commenticon} source={CommentIcon} />

                        </TouchableOpacity>
                        <Text style={styles.iconNum}>{commentNum}</Text>
                        
                    </View>
                    <TouchableOpacity style={styles.reportWrap} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}} onPress={()=>{
                            // let bool = _reportFeed(id)
                            let bool = _reportFeed(id)
                            
                            // console.log(bool)
                            // setIsReported(bool);
                            }}>
                            <Image style={styles.feedicon} source={ReportIcon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity> 
        )
    }

    return (
        <TouchableWithoutFeedback onPress={()=>{setOpenFilter(false)}}>
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                    <Image style={styles.backButton} source={BackButton}/>
                </TouchableOpacity>
                <Image style={styles.logo} source={Logo}/>
                <View>
                    <TouchableOpacity onPress={()=>setOpenFilter(!openFilter)} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                        <AntDesign style={styles.belowBtn} name="down" size={20} color="grey"/>
                    </TouchableOpacity>
                </View>
            </View>
            {loadingFinished ?
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
                    style={{marginBottom: 150}}
                >
                    {/* <Text style={{fontSize: 50}}>Hoi</Text> */}
                    {data.map((item)=>(
                        <Feed
                            title={item[0].title}
                            content={item[0].content}
                            date={item[0].date}
                            emoji={item[0].emoji}
                            id = {item[0].id}
                            likes = {item[2].liked_users}
                            comments = {item[0].commented_users}
                            author = {item[1].writter}
                            liked = {_checkLiked(item[2].liked_users)}
                            report = {false}
                        />
                    ))}
                    
                </ScrollView>
                {/* <TouchableOpacity style= {{position: 'absolute'}} onPress={()=>_loadMoreFeed()}>
                    <Text>Load More</Text>
                </TouchableOpacity> */}
                
                

            </View>
            :
            <ActivityIndicator style={styles.loadingbar}/>
            }

            {openFilter &&
                    <View style={styles.filterWrapper}>
                        <TouchableOpacity onPress = {()=> {
                                setEmojiOption('All');
                                _reset();
                                _loadFeed();
                        }} style={{flex: 1}}>
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

            <View style={styles.navigationbar}>
                <TouchableOpacity  onPress={()=>{navigation.push('MainCalendar')}} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                    <Image style={styles.icon} source={Home} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.push('Chart')}} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                    <Image style={styles.icon} source={Chart} />
                </TouchableOpacity>
            
                <TouchableOpacity onPress={()=>{navigation.push('FeedListAll')}} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                    <Image style={styles.icon} source={FeedFilled} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.push('Settings')}} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                    <Image style={styles.icon} source={Setting}/>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEFAE4',
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '11%',
        // marginBottom: 5,
        // paddingTop: 10,
        backgroundColor: '#FEFAE4',
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
        top: 64,
        right: 10,
        width: 80,
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
        zIndex: 3,
    },
    option: {
        textAlign: "center",
        marginBottom: 16,
        padding: 3,
        fontSize: 15,
        fontWeight: "400",
    },
    feedWrapper: {
        height: height,
        backgroundColor: 'white',
        // height: height,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    feed: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: 15,
        paddingRight: 25,
        // marginLeft:
        height: 150,
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
        paddingTop: 20,
        paddingBottom: 15,

    },
    content: {
        // flex: 4,
        // marginLeft: 20,
        flexDirection: "column",
    },
    feedAuthor: {
        fontWeight: "300",
        alignSelf: 'center',
        fontSize: 11,
        marginTop: 10,
    },
    feedTitle: {
        fontWeight: "600",
        marginBottom: 10,
        fontSize: 16,
    },
    feedContent: {
        fontWeight: "400",
        fontSize: 14,
        width: width*0.7,
        maxHeight: 20,
    },
    feedicon:{
        height: 16,
        width: 16,
        marginTop: 11,
        marginRight: 3,
    },
    feedicons:{
        // marginLeft: 20,
        flexDirection: "row",
        // justifyContent: "space-around",
    },
    feedright: {
        marginLeft: 15,
    },
    feedleft: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black',
        width: width*0.2
    },
    date: {
        color: "#aaaaaa",
        fontSize: 14,
        // marginTop: 6,
        marginBottom: 10,
        
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
        justifyContent: "space-around",
    },
    icon: {
        height: 20,
        width: 20,
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
        // marginBottom: 20,
        paddingTop: 20,
        paddingHorizontal: width*0.1,
        borderTopColor: "#fafafa",
        borderTopWidth: 2,
        width: width,
        height: 70,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FEFAE4',
    },
    emojiIcon: {
        height: 40,
        width: 40,
        // marginRight: 15,
        alignSelf: 'center'
    },
    emojiText:{
        marginTop: 10,
        fontSize: 14,
        color: "#999999",
    },
    reportWrap:{
        alignSelf: 'flex-end',
        position: 'relative',
        top: -70,
        right: 10,
    },
    commenticon: {
        height: 15,
        width: 15,
        position: "relative",
        top: 11,
        marginRight: 6,
    },
    loadingbar:{
        position: 'absolute',
        top: height*0.36,
        alignSelf: "center"
    },
});