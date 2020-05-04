import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import CloseIcon from './../images/CloseIconGray.png';
import { Calendar, LocaleConfig } from 'react-native-calendars';
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
import styled from 'styled-components/native';

const { height, width } = Dimensions.get("window");


//component 이름이랑, library 이름이랑 겹쳐서 main calendar라고 이름 지어줌.
//modal 구현 애매하게 되어있음

export default function Chart(props) {

    LocaleConfig.locales['kr'] = {
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
        dayNamesShort: ['일','월','화','수','목','금','토'],
        today: '오늘'
    };
    LocaleConfig.defaultLocale = 'kr';

    //현재 달을 갖고오기
    const _getCurrMonth = () =>{

        var result = '';
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        String(month).length ===1 ? 
            result = String(year)+'-0'+String(month) :  result = String(year)+'-'+String(month);
        return result;
    }

    const [month, setMonth] = useState(_getCurrMonth());
    const [countHappy, setCountHappy] = useState(0);
    const [countFilled, setCountFilled] = useState(0);
    const [countPeace, setCountPeace] = useState(0);
    const [countThank, setCountThank] = useState(0);
    const [countLovely, setCountLovely] = useState(0);
    const [countEmpty, setCountEmpty] = useState(0);
    const [countSad, setCountSad] = useState(0);
    const [countLonely, setCountLonely] = useState(0);
    const [countTired, setCountTired] = useState(0);
    const [countDepressed, setCountDepressed] = useState(0);
    const [countWorried, setCountWorried] = useState(0);
    const [countAngry, setCountAngry] = useState(0);

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

    const countEmojis = (currMonthArray, emoji) =>{
        const count = currMonthArray.filter(feed => feed.emoji === emoji).length;
        return count;
    }

    const ChartBar = styled.View`
        borderBottomWidth: 5px;
        height: ${height * 0.05}px;
        marginLeft: 20px;
        marginRight: 10px;
        width: ${props =>props.count*width*0.03}px;
        borderBottomColor: ${props => emojiColor(props.emoji)}
    `;


    // 달이 바뀔 때마다, 새로운 데이터를 로딩해 온다. 
    useEffect(() => {
        var currMonthFeeds = props.allFeeds.filter(feed => {
            return String(feed.date).substr(0,7) === month;
        });
        // console.log(currMonthFeeds);
        setCountHappy(countEmojis(currMonthFeeds,'Happy'));
        setCountFilled(countEmojis(currMonthFeeds,'Filled'));
        setCountPeace(countEmojis(currMonthFeeds,'Peace'));
        setCountThank(countEmojis(currMonthFeeds,'Thank'));
        setCountLovely(countEmojis(currMonthFeeds,'Lovely'));
        setCountEmpty(countEmojis(currMonthFeeds,'Empty'));
        setCountSad(countEmojis(currMonthFeeds,'Sad'));
        setCountLonely(countEmojis(currMonthFeeds,'Lonely'));
        setCountTired(countEmojis(currMonthFeeds,'Tired'));
        setCountDepressed(countEmojis(currMonthFeeds,'Depressed'));
        setCountWorried(countEmojis(currMonthFeeds,'Worried'));
        setCountAngry(countEmojis(currMonthFeeds,'Angry'));

    },[month]);

    

    // console.log(countHappy);

    return (
        <View style={styles.background}>
            {/* {chart===1 &&   */}
            <View style={styles.container}>
                <View style={styles.popup}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=> {props.closeChart()} }>
                            <Image style={styles.closeBtn} source={CloseIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.monthPicker}>
                            <Calendar
                                dayComponent={() => {
                                    return (<></>)
                                }}
                                hideDayNames={true}
                                style={styles.calendarStyle} 
                                onMonthChange={(month) => setMonth(month.dateString.substr(0,7))} 
                            />
                        </View>
                        <View style={styles.monthStatistics}>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={HappyIcon} />
                                <ChartBar count={countHappy} emoji='Happy'></ChartBar>
                                <Text style={{marginTop: 20}}>{countHappy}</Text>
                            </View>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={FilledIcon} />
                                <ChartBar count={countFilled} emoji='Filled'></ChartBar>
                                <Text style={{marginTop: 20}}>{countFilled}</Text>
                            </View>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={PeaceIcon} />
                                <ChartBar count={countPeace} emoji='Peace'></ChartBar>
                                <Text style={{marginTop: 20}}>{countPeace}</Text>
                            </View>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={ThankIcon} />
                                <ChartBar count={countThank} emoji='Thank'></ChartBar>
                                <Text style={{marginTop: 20}}>{countThank}</Text>
                            </View>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={LovelyIcon} />
                                <ChartBar count={countLovely} emoji='Lovely'></ChartBar>
                                <Text style={{marginTop: 20}}>{countLovely}</Text>
                            </View>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={EmptyIcon} />
                                <ChartBar count={countEmpty} emoji='Empty'></ChartBar>
                                <Text style={{marginTop: 20}}>{countEmpty}</Text>
                            </View>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={SadIcon} />
                                <ChartBar count={countSad} emoji='Sad'></ChartBar>
                                <Text style={{marginTop: 20}}>{countSad}</Text>
                            </View>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={LonelyIcon} />
                                <ChartBar count={countLonely} emoji='Lonely'></ChartBar>
                                <Text style={{marginTop: 20}}>{countLonely}</Text>
                            </View>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={TiredIcon} />
                                <ChartBar count={countTired} emoji='Tired'></ChartBar>
                                <Text style={{marginTop: 20}}>{countTired}</Text>
                            </View>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={DepressedIcon} />
                                <ChartBar count={countDepressed} emoji='Depressed'></ChartBar>
                                <Text style={{marginTop: 20}}>{countDepressed}</Text>
                            </View>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={WorriedIcon} />
                                <ChartBar count={countWorried} emoji='Worried'></ChartBar>
                                <Text style={{marginTop: 20}}>{countWorried}</Text>
                            </View>
                            <View style={styles.emojiRow}>
                                <Image style={styles.icon} source={AngryIcon} />
                                <ChartBar count={countAngry} emoji='Angry'></ChartBar>
                                <Text style={{marginTop: 20}}>{countAngry}</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
            </View>  
            {/* } */}
        </View>
    );
}


/* Calendar Style Overriding: 크기, 테두리, 등등 */
const styles = StyleSheet.create({
    background: {
        position: "absolute",
        zIndex: 2,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        width: width,
        paddingHorizontal: 10,
        paddingTop: 60,
        backgroundColor: "rgba(153, 153, 153, 0.5);",
    },
    popup: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: height,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    date: {
        color: "#999999",
        fontSize: 15,
    },
    icon: {
        height: 35,
        width: 35,
        marginTop: 11,
    },
    closeBtn: {
        height: 22,
        width: 22,
        marginTop: 1,
    },
    input: {
        paddingTop: 20,
        fontSize: 10,
    },
    calendarStyle :{
        height: 0.07* height
    },
    emojiRow:{
        flexDirection: 'row'
    },
    // chartBar : {
    //     borderBottomColor: 'black',
    //     borderBottomWidth: 1,
    //     width: width*0.5,
    // }
});

