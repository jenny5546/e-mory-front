import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
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

//component 이름이랑, library 이름이랑 겹쳐서 main calendar라고 이름 지어줌.
//modal 구현 애매하게 되어있음

export default function Chart({ navigation }) {

    const [chart, setChart] = useState(1);

    return (
        <View style={styles.background}>
            {chart===1 &&  
            <View style={styles.container}>
                <View style={styles.popup}>
                    <View style={styles.header}>
                        <Text style={styles.date}>2020년 4월</Text>
                        <TouchableOpacity onPress={()=>{setChart(0)}}>
                            <Image style={styles.closeBtn} source={CloseIcon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={HappyIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={FilledIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={PeaceIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={ThankIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={LovelyIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={EmptyIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={SadIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={LonelyIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={TiredIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={DepressedIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={WorriedIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={AngryIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>  
            }
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
        height: "100%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
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
        height: 17,
        width: 17,
        marginTop: 1,
    },
    input: {
        paddingTop: 20,
        fontSize: 10,
    },
});