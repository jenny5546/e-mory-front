import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import BackButton from './../images/BackIcon.png';
import Alarm from './../images/AlarmIcon.png';
import Logo from './../images/SmallLogo.png';
import Home from './../images/HomeIconFilled.png';
import Chart from './../images/ChartIcon.png';
import Menu from './../images/MenuIcon.png';
import FeedIcon from './../images/FeedIcon.png';
import Setting from './../images/SettingIcon.png';
import ChartComponent from './Chart';
import FeedNew from './FeedNew';
import FeedDetail from './FeedDetail';
const { height, width } = Dimensions.get("window");
import {AsyncStorage} from 'react-native';

// Emoji Icons 
// import HappyIcon from './../images/HappyIcon.png';
// import FilledIcon from './../images/FilledIcon.png';
// import PeaceIcon from './../images/PeaceIcon.png';
// import ThankIcon from './../images/ThankIcon.png';
// import LovelyIcon from './../images/LovelyIcon.png';
// import SadIcon from './../images/SadIcon.png';
// import LonelyIcon from './../images/LonelyIcon.png';
// import EmptyIcon from './../images/EmptyIcon.png';
// import TiredIcon from './../images/TiredIcon.png';
// import DepressedIcon from './../images/DepressedIcon.png';
// import WorriedIcon from './../images/WorriedIcon.png';
// import AngryIcon from './../images/AngryIcon.png';


LocaleConfig.locales['kr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'kr';

class Feed {
  constructor(emoji, title, content, date, privacy) {
    this.emoji = emoji;
    this.title = title;
    this.content = content;
    this.date = date;
    // this.author = author;
    this.privacy = privacy;

    // ** 댓글, 좋아요 갖고오기도 추가하자. 나중에 **
  }
}
//component 이름이랑, library 이름이랑 겹쳐서 main calendar라고 이름 지어줌.
export default function MainCalendar({ navigation }) {

  const [chart, openChartModal] = useState(false);
  const [newFeedModal, openNewFeedModal] = useState(false);
  const [feedDetailModal, openFeedDetailModal] = useState(false);
  const [pressedDate, setPressedDate]= useState(null);
  const [uid, setUid] = useState('');
  const [loaded, setLoaded] = useState(false);

  // feeds는 back에서 GET한 것들로, setFeedList
  const [feedList, setFeedList] = useState([]);
  // const [date, setDate] = useState([]);
  

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


  // feedList에 있는 feed들을 실제 calendar에 표시하는 부분 
  const emojiColor= (emoji) =>{
    switch(emoji){
      case 'Happy':
        return '#F7E98A';
      case 'Filled':
        return '#E7B88C';
      case 'Peace':
        return '#F3C94F';
      case 'Thank':
        return '#8DCA9A';
      case 'Lovely':
        return '#E9B1BF';
      case 'Empty':
        return '#C4C4C5';
      case 'Sad':
        return '#BBEBDE';
      case 'Lonely':
        return '#93BFE5';
      case 'Tired':
        return '#6B93C8';
      case 'Depressed':
        return '#9177C0';
      case 'Worried':
        return '#9E9BE5';
      case 'Angry':
        return '#D05C58';
      default:
        return '#FFFFFF';
    }
  }

  // calendar에 mark하기 위해서 일기 쓴 날짜를 object: customStyle로 만드는 method
  const markedFeeds = () =>{
    var result = {};
    for (var i=0; i<feedList.length; i++){
      // result[feedList[i].date]=feedList[i].emoji;
      result[feedList[i].date]= {
        marked: true, 
        customStyles: {
          container: {
            backgroundColor: emojiColor(feedList[i].emoji),
            height: 32
          },
        }
      };
    }
    
    return result;
  }

  // 일기를 썼는지 안 썼는지 track하기 위한 함수 
  const trackDates = () =>{
    var result = [];
    for (var i=0; i<feedList.length; i++){
      result.push(feedList[i].date)
    }
    return result;
  }

  // console.log(feedList);
  const findFeed = (pickedDate) =>{
    const feed = feedList.find(obj => obj.date == pickedDate);
    // console.log(feed)
    return feed;
    
  }

  setTimeout(() => {setLoaded(true)}, 1000)

  useEffect(() => {
    // console.log(feedList);
    _storeUid();
    if (uid){
      fetch(`http://127.0.0.1:8000/feeds/${uid}/`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}).then((res) => {
            return res.text();
        }).then(feed_list=> {
          feed_list= JSON.parse(feed_list);
          // ** 댓글, 좋아요 갖고오기도 추가하자. 나중에 **
          setFeedList(
            feed_list.map((feed) => 
              new Feed(feed.fields.emoji, feed.fields.title, feed.fields.content, feed.fields.date, feed.fields.privacy)),
          )

        }).catch((err) => {
          console.log(err);
        });
    }  
  },[loaded]);

  
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Text>{list}</Text> */}
          <Image style={styles.backButton} source={Menu}/>
          <Image style={styles.logo} source={Logo}/>
          <TouchableOpacity onPress={()=>{navigation.push('MyActivity')}}>
            <Image style={styles.backButton} source={Alarm}/>
          </TouchableOpacity>
        </View>
        {chart &&
          <ChartComponent 
            closeChart={() => openChartModal(false)}
            allFeeds = {feedList}
          />
        }
        {newFeedModal &&
          <FeedNew 
            closeNewFeed={() => openNewFeedModal(false)} 
            pressedDate={pressedDate}
            submitNewFeed={async (title,content,emoji,privacy)=> {

              const newFeed= new Feed(emoji, title, content, pressedDate, privacy);
              // console.log(newFeed);
              
              /* 이 부분에 Post를 넣읍시다*/
              fetch(`http://127.0.0.1:8000/feeds/${uid}/`, {
                method: 'POST',
                body: JSON.stringify(newFeed),
                headers: {
                    // 'Accept': 'application/json',
                    'Content-type': 'applications/json'
                }
              }).then((res) => {
                    return res.json();
              }).then((resJSON) => {
                  // const { title, content, emoji, date } = resJSON
                  console.log('Post Success');
                  // console.log(title);
                  // console.log(content);
                  // console.log(emoji);
                  // console.log(date);
              }).catch((err) => {
                  console.log(err);
              });

              setFeedList([
                ...feedList,
                newFeed,
              ]);

            }}
          />
        }
        {feedDetailModal &&
          <FeedDetail 
            closeFeedDetail={() => openFeedDetailModal(false)} 
            pressedDate={pressedDate}
            matchingFeed = {findFeed(pressedDate)}
            uid = {uid}
            loadAgain = {()=> setLoaded(false)}
          />
        }
        {loaded ? 
        <Calendar
            theme={calendarTheme}
            style={styles.calendarStyle}
            onDayPress={(day)=>{
              (trackDates()).includes(day.dateString)? openFeedDetailModal(true):openNewFeedModal(true);
              setPressedDate(day.dateString);
            }}
            // markedDates = {logFeeds()}
            monthFormat={'M월'}
            markingType = {'custom'}
            markedDates={
              markedFeeds()
            }
            // Override day Component + Styling
            // dayComponent={({date, state, marking, onPress}) => {
            //   if (marking.selected) {
            //        return(
            //        <TouchableOpacity>
                //       <Text 
                //         style={{
                //           width: 32, 
                //           height: height*0.09, 
                //           alignItems: 'center', 
                //           textAlign: 'center',
                //           fontSize: 13,
                //           color: state === 'disabled' ? 'gray' : 'blue'
                //         }}>
                //         {date.day}
                //       </Text>
                //       <Text>Hi</Text>
                //     </TouchableOpacity>
            //        )
            //     
            //   }
            //   return (
            //     <TouchableOpacity style={styles.dayContainer} onPress={()=>{ onPress(date); openNewFeedModal(true); setPressedDate(date.dateString);}} >
            //       <Text 
            //         style={{
            //           width: 32, 
            //           height: height*0.09, 
            //           alignItems: 'center', 
            //           textAlign: 'center',
            //           fontSize: 13,
            //           color: state === 'disabled' ? 'gray' : 'black'
            //         }}>
            //         {date.day}
            //       </Text>
                
            //     </TouchableOpacity>
            //   );
            // }}
        />
        : <ActivityIndicator style={styles.loadingbar}/>}
        <View style={styles.navigationbar}>
          <TouchableOpacity>
            <Image style={styles.icon} source={Home} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{openChartModal(true)}}>
            <Image style={styles.icon} source={Chart} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.push('FeedListAll')}}>
            <Image style={styles.icon} source={FeedIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.push('Settings')}}>
            <Image style={styles.icon} source={Setting} />
          </TouchableOpacity>
        </View>
      </View>
  );
}

/* Calendar Theme Overriding: 색, 폰트, 글자 크기 */
const calendarTheme = {
  // calendarBackground: 'rgba(196, 196, 196, 0.5)',
  // selectedDayBackgroundColor: '#00adf5',
  // selectedDayTextColor: '#ffffff',
  // todayTextColor: '#00adf5',
  // dayTextColor: '#2d4150', //
  // textDisabledColor: '#d9e1e8', //#d9e1e8
  dotColor: 'pink',
  // selectedDotColor: '#ffff',
  arrowColor: 'grey',
  disabledArrowColor: '#d9e1e8',
  monthTextColor: '#626262',
  indicatorColor: 'grey',
  textSectionTitleColor: '#afafaf',
  // textDayFontFamily: 'monospace',
  // textMonthFontFamily: 'monospace',
  // textDayHeaderFontFamily: 'monospace',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
  'stylesheet.day.single': {
    base: {
      width: 32,
      height: height*0.09,
      alignItems: 'center'
    },
  }
}

/* Calendar Style Overriding: 크기, 테두리, 등등 */
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex: 1,
        width: width,
        height: height,
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'space-between',
    },
    calendarStyle: {
      // height: height*0.55,
      width: width,
      justifyContent: "center",
      // position: "relative",
      // top: height*-0.2,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
      // marginBottom: 5,
      paddingHorizontal: width*0.04,
      paddingBottom: 10,
      borderBottomColor: "#fafafa",
      borderBottomWidth: 2,
      width: width,
    },
    navigationbar: {
      flexDirection: "row",
      justifyContent: "space-between",
      // marginTop: 10,
      marginBottom: 20,
      position: 'absolute',
      bottom: 0,
      paddingTop: 20,
      paddingHorizontal: width*0.04,
      borderTopColor: "#fafafa",
      borderTopWidth: 2,
      width: width,
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
    icons: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    icon: {
      height: 20,
      width: 20,
    },
    dayContainer: {
      flexDirection: 'column'
    },
    emojiIcon: {
      width: 20,
      height: 20,
      position:'absolute',
      bottom:10,
      left: 10,
    },
    loadingbar:{
      position: 'absolute',
      top: height*0.5,
      left: width*0.5
    }

});
