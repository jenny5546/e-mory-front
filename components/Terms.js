// 회원가입 정보 기입 form hi
import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, TextInput, Alert, Image, Button, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import BackButton from './../images/BackIcon.png';

const { height, width } = Dimensions.get("window");

export default function Terms({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>            
                    <Image style={styles.backButton} source={BackButton}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.introduction}>
            이모리에 오신것을 환영합니다. 회원님은 이모리가 제공하는 모든 서비스에 가입, 혹은 이용함으로써 이 이용약관에 따를것에 동의합니다. 서비스는 이모리 (이하 ‘회사’라 한다)가 소유하고 통제합니다. 이 이용약관은 회원님의 법적 권리와 의무에 영향을 미칩니다. 동의하지 않으실 경우 서비스에 엑세스하거나 서비스를 이용할 수 없습니다.
            </Text>
            <ScrollView keyboardShouldPersistTaps='handled' style={{width: width*0.9, borderWidth: 1, borderColor: "#cccccc", marginBottom: 50, borderRadius: 5,}}>
            <Text style={styles.terms}>
            제 1조 (약관의 효력과 변경)
① 회사는 약관의 규제에 관한 법률, 위치정보의 보호 및 이용 등에 관한 법률, 개인정보 보호법, 전자상거래 등에서의 소비자보호에 관한 법률, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관계법령에 위배되지 않는 범위 내에서 이 약관을 개정할 수 있습니다.
② 회사는 약관을 개정할 경우 그 개정 이유 및 적용 일자를 명시하여 현행 약관과 함께 적용일자 10일전부터 적용일 전일까지 제1항의 방법으로 공지합니다. 다만, 회원의 권리 또는 의무에 관한 중요한 규정의 변경은 최소한 30일전에 공지하고 개정약관을 회원이 등록한 메일로 발송하여 통지합니다.
③ 회사가 제3항에 따라 개정약관을 공지 또는 통지하면서 회원에게 약관 변경 적용일까지 거부의사를 표시하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 공지 또는 통지하였음에도 불구하고 회원이 명시적으로 거부의사를 표시하지 아니하는 경우 회원이 개정약관에 동의한 것으로 봅니다.
제 2조 (약관 외 준칙)
① 이 약관에 명시되지 않은 사항에 대해서는 관계법령, 회사가 정한 서비스의 개별이용약관, 위치기반 서비스 이용약관, 세부이용지침 등의 규정에 따릅니다.
제 3조 (회원가입의 성립)
① 회원가입은 회원이 이메일인증을 통한 회원가입 혹은 카카오톡이나 네이버 계정을 통해 회원가입을 하였을 경우 성립합니다.
② 회원가입이 성립하면 회원은 회사 서비스의 이용약관과 개인정보처리방침에 동의한것으로 봅니다.
제 4조 (회원가입에 대한 승낙 및 제한)
① 본인 명의의 이메일 혹은 카카오톡, 네이버 계정을 통해 가입할 경우 서비스 이용이 가능합니다.
② 다만 아래의 경우 회원가입이 제한될 수 있습니다.
- 타인의 명의나 도용한 정보를 이용한 계정을 생성한 경우
- 회사의 이용약관 위배, 위법한 활동으로 계정이 제제를 당하였던 경우
- 기타 관련법령에 위배되거나 서비스 운영 지침에 위배되는 경우
제 5조 (서비스 이용 허가 및 제한)
① 이모리는 익명을 이용하여 사용자간의 아날로그적 상호작용을 목적으로 하는 서비스입니다. 따라서 다음의 사항에 해당하는 활동들은 제제할 수 있습니다.
- 음란물 및 불건전한 게시물, 댓글 작성
- 회원들의 소통을 저해하는 불법광고 등의 작성
- 타인을 근거없이 비방하는 게시물, 댓글 작성
- 사회의 안녕질서 또는 미풍약속을 저해하거나 저해할 목적으로 게시물, 댓글 작성
- 기타 회사가 정한 이용요건에 충족되지 않았을 경우
제 6조 (회원정보의 수정)
① 회원은 서비스를 이용하면서 신청양식에 기재한 회원정보가 변경되었을 경우 지체 없이 회원정보를 수정하여야 합니다. 회원정보를 수정하지 않음으로 인하여 발생하는 모든 책임은 회원에게 있습니다.
제 7조 (서비스의 이용시간)
① 회사는 회원의 이용신청을 승낙한 때부터 서비스를 개시합니다. 
② 회사의 업무상 또는 기술상의 장애로 인하여 서비스를 개시하지 못하는 경우에는 서비스에 공지하거나 회원에게 이를 통지합니다.
③ 서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 다만, 시스템 점검, 증설과 교체 및 고장 등의 이유로 회사가 정한 기간에는 서비스가 일시 중지될 수 있습니다. 이러한 경우 회사는 사전 또는 사후에 이를 공지합니다.
④ 회사는 서비스내의 개별 서비스에 대한 별도의 약관을 둘 수 있으며, 개별 서비스에서 별도로 적용되는 약관에 대한 동의는 회원이 개별 서비스를 최초로 이용할 경우 별도의 동의절차를 거치게 됩니다.
제 8조 (서비스의 변경 및 중단)
① 회사는 서비스(개별서비스 포함)를 변경하여야 하는 상당한 이유가 있는 경우 변경될 서비스의 내용을 회원에게 이메일로 공지하고 변경할 수 있습니다.
- 서비스용 설비의 확장, 보수 등 공사로 인한 부득이한 경우
- 회사가 통제하기 곤란한 사정으로 불가피하게 서비스 제한 또는 중단이 필요한 경우
- 회원이 회사의 영업활동을 방해하는 경우
- 정전, 제반 설비의 장애 또는 서비스 이용량의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우
- 새로운 서비스로의 교체, 개별 서비스를 회사가 운영하는 다른 사이트로 이전하는 등 회사의 서비스 운영정책상 서비스의 제한 또는 중단이 필요하다고 판단하는 경우
- 기타 천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우
제 9조 (정보 제공 및 광고 게재)
①회사는 서비스를 운영함에 있어 각종 정보를 서비스 화면에 게재하거나 메일로 회원에게 제공할 수 있습니다.
②회사는 서비스의 운영과 관련하여 광고 등을 서비스 화면에 게재하거나, 메일을 통하여 발송할 수 있습니다. 
③회원이 서비스상에 게재되어 있는 광고를 이용하거나 서비스를 통한 광고주의 판촉활동에 참여하는 등의 방법으로 교신 또는 거래를 하는 것은 전적으로 회원과 광고주간의 문제입니다. 만약, 회원과 광고주간에 문제가 발생할 경우 회원과 광고주가 직접 해결하여야 하며, 이와 관련하여 회사는 고의 또는 과실이 없는 이상 어떠한 책임도 지지 않습니다.
제 10조 (회원의 게시물에 대한 책임)
이모리는 오늘의 감정을 기록하는 감정 다이어리입니다. 또한 개인의 선택에 따라 그 날의 감정일기를 피드에 공유하는 게시물적 성격도 가지고 있습니다. 따라서 게시물이라 함은 개인의 선택에 따라 공개한 감정일기를 칭합니다. 
① 회사는 회원이 서비스에 게시하거나 전달하는 게시물이 다음 각호에 해당된다고 판단되는 경우 사전 통지 없이 해당 게시물에 대한 임시조치, 삭제 또는 게시 거부 등 필요한 조치를 할 수 있습니다. 다만, 회사가 모든 게시물을 검토할 의무를 가지는 것은 아닙니다. 시용자가 불건전하거나 불법적인 내용에 대해 고객센터를 통해 신고할 경우에 검토합니다.
- 회사, 다른 회원 또는 제3자를 비방하거나 명예를 손상시키는 내용인 경우 
- 공공질서 및 공서양속에 위반되는 내용인 경우
- 게시물의 내용이 범죄적 행위에 결부된다고 판단되는 경우
- 회사의 저작권, 제3자의 저작권 등 기타 타인의 권리를 침해하는 내용인 경우
- 법령을 위반하거나 타인의 권리를 침해하는 방식으로 정치적, 종교적 분쟁을 야기하는 내용인 경우
- 불필요하거나 승인되지 않은 광고, 판촉물을 게재하는 경우
- 타인의 개인정보를 도용하여 작성한 내용이거나, 타인이 입력한 정보를 무단으로 위변조한 내용인 경우
- 동일한 내용을 중복하여 다수 게시하는 등 게시의 목적에 어긋나는 경우
- 정보통신망 이용촉진 및 정보보호 등에 관한 법률 또는 청소년 보호법에 따라 청소년유해매체물로 지정예고되거나 지정된 경우 및 이에 준하는 게시물이라고 판단되는 경우
- 기타 관계법령 및 회사의 개별 서비스별 세부이용지침 등에 위반된다고 판단되는 내용인 경우
② 회사는 개별 서비스별로 게시물과 관련된 세부이용지침을 별도로 정하여 시행할 수 있으며, 회원은 그 지침에 따라 게시물(회원간 전달 포함)을 게재하여야 합니다.
제 11조 (게시물의 저작권)
① 회원이 서비스에 공개 게시한 게시물이나 댓글은 저작권법에 의해 보호를 받습니다. 회사가 작성한 저작물에 대한 저작권은 회사에 귀속합니다.
② 회원은 자신의 공개 게시물 등을 회사가 국내ㆍ외에서 다음 각호의 목적으로 사용하는 것을 허락합니다.
- 서비스(제3자가 운영하는 사이트 또는 미디어의 일정 영역 내에 입점하여 서비스가 제공되는 경우를 포함합니다)내에서 게시물 등의 복제, 전송, 전시 및 우수 게시물 등을 서비스 화면에 노출하기 위하여 게시물 등의 크기를 변환하거나 단순화하는 등의 방식으로 수정하는 것
- 회사가 운영하는 다른 사이트 또는 다른 회사가 운영하는 사이트에서 게시물 등을 복제, 전송 또는 전시하는 것. 다만, 회원이 이에 동의하지 아니한 경우에는 그러하지 않습니다.

제 12조 (회사의 의무)
① 회사는 안정적인 서비스의 제공을 위하여, 설비에 장애가 발생하거나 손상된 때에는 부득이한 사유가 없는 한 지체없이 이를 수리 또는 복구합니다.
② 회사는 회원의 회원정보 보호하기 위하여 보안시스템을 구축ㆍ운영하며, "개인정보처리방침"을 공지하고 준수합니다. 또한, 회사는 "개인정보처리방침" 따라 회원정보를 취급함에 있어 안정성 확보에 필요한 기술적ㆍ관리적 대책을 수립ㆍ운영합니다.
③ 회사는 서비스와 관련한 회원의 불만사항이 접수되는 경우 이를 신속히 처리하여야 하며, 신속한 처리가 곤란한 경우 그 사유와 처리 일정을 서비스 화면에 게재하거나 메일 등을 통하여 회원에게 통지합니다.
제 13조 (회원의 의무)
① 회원은 관계법령, 약관, 서비스 이용안내 및 서비스상에 공지한 주의사항, 회사가 서비스 이용과 관련하여 회원에게 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 아니 됩니다.
② 회원은 회사의 명시적 동의가 없는 한 회원의 서비스 이용권한을 타인에게 양도, 증여 또는 이용하게 하거나 이를 담보로 제공할 수 없습니다.
③ 회원은 서비스 이용시 다음 각 호의 행위를 하여서는 안됩니다.
- 서비스 이용신청 또는 변경 시 허위사실을 기재하거나, 다른 사람의 개인정보를 이용하는 행위
- 서비스 이용 중 습득한 게시물 등 또는 정보를 상업적 목적으로 이용하거나 출판, 방송 등을 통하여 제3자에 노출시키는 행위. 다만, 공익 목적을 위하여 필요한 경우에는 사전에 회사의 동의를 얻어야 합니다.
- 서비스를 이용하여 상품 또는 용역을 판매하는 영업활동 등의 상행위(해킹, 광고를 통한 수익, 음란사이트를 통한 상업행위, 상용소프트웨어 불법배포 등 포함). 다만, 회사가 공식적으로 상행위를 인정한 경우에는 그러하지 않습니다.
- 회사의 서비스 운영을 저해하거나 다른 회원의 서비스 이용을 방해하는 행위 및 회사의 운영진, 직원 또는 관계자를 사칭하는 행위
④ 회원은 ID 및 비밀번호를 철저히 관리하여야 하며, 관리소홀, 부정사용 등에 의하여 발생하는 모든 결과에 대한 책임은 회원 본인이 부담하며, 회사는 이와 관련한 고의 또는 과실이 없는 이상 이에 대한 어떠한 책임도 부담하지 않습니다.
⑤ 회원은 본인의 ID 및 비밀번호를 제3자에게 이용하게 하여서는 아니되며, 회원 본인의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지하는 경우에는 즉시 비밀번호를 변경하여야 하며, 해당 사실을 회사에 통지하고 회사가 안내하는 바에 따라야 합니다.
제 14조 (회원에 대한 통지)
① 회사는 회원의 서비스 이용에 필요한 권리 및 의무 등에 관한 사항을 회사가 발급한 또는 회원이 지정한 메일로 통지할 수 있습니다.
② 회사는 불특정 다수 회원에 대한 통지의 경우 서비스 내에 게시함으로써 개별 통지에 갈음할 수 있습니다.
제 15조 (계약해지 및 이용제한 )
① 회원은 서비스 이용계약을 해지하고자 하는 경우에는 회사의 이메일 info.e.mory1@gmail.com 으로 해지신청을 하여야 합니다.
② 회사는 회원이 이 약관 및 개별 서비스 이용약관을 위반한 경우 경고, 일시적 이용정지, 영구적 이용정지 등의 단계로 서비스 이용을 제한하거나 이용계약을 해지할 수 있습니다.
제 16조 (손해배상)
① 회사는 서비스로 인하여 회원에게 손해가 발생한 경우 그러한 손해가 회사의 고의 또는 과실에 의해 발생한 경우에 한하여 책임을 부담하며, 그 책임의 범위는 통상손해에 한합니다. 다만, 회사가 사전에 시스템 점검, 증설 등의 사유로 인하여 서비스 일시 중지를 공지한 경우에는 그러하지 않습니다.

② 회원이 서비스를 이용하는 과정에서 행한 불법행위 또는 이 약관의 규정을 위반함으로 인하여 회사에 손해가 발생하거나 제3자로부터 회사가 손해배상 청구 또는 각종 이의제기를 받는 경우, 당해 회원은 자신의 책임과 비용으로 회사를 면책시켜야 하며, 회사가 면책되지 못한 경우 당해 회원은 그로 인하여 회사에 발생하는 모든 손해를 배상하여야 합니다.
제 17조 (면책사항)
①회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면책됩니다.
②회사는 회원의 귀책사유로 인한 서비스의 이용장애에 대하여 책임을 지지 않습니다.
③회사는 고의 또는 과실이 없는 한 회원이 회사에서 제공하는 서비스로부터 기대되는 이익을 얻지 못하였거나 서비스에 게시된 게시물 등에 대한 취사선택 또는 이용으로 발생하는 손해 등에 대해서는 책임을 지지 않습니다. 또한, 회사는 회원이 사이트에 게재한 게시물 등의 정확성 등 내용에 대하여는 책임을 지지 않습니다.
④회사는 회원 상호간 또는 회원과 제3자 상호간에 서비스를 매개로 발생한 분쟁에 대해서는 개입할 의무가 없으며, 회사의 고의 또는 과실이 없는 한 이로 인한 손해를 배상할 책임도 없습니다.
제 18조 (재판권 및 준거법)
①회원은 게시물 등과 관련된 저작권 침해, 명예훼손 또는 개인정보 및 서비스 이용과 관련된 사항에 관한 문제제기 또는 문제해결은 회사가 운영하는 고객관리센터를 통하여 처리할 수 있습니다.
②회사와 회원 간에 서비스 이용과 관련하여 발생한 분쟁에 대한 소송이 제기되는 경우 회원의 주소지를 관할하는 법원, 회원의 주소지를 알 수 없는 경우에는 거소지에 따라 관할 법원을 정하고, 주소지나 거소지를 알 수 없는 경우에는 대한민국의 민사소송법에 따른 법원을 관할법원으로 하여 해결합니다.

본 약관은 2020년 6월 1일부터 시행하며 변경될 수 있습니다.


</Text>
            </ScrollView>
        </View>
    );
}
const inputStyle = StyleSheet.create({
    inputContainer:{
        padding: 10,
        borderColor: "#bbb",
        borderWidth: 1,
        fontSize: 14,
        borderRadius: 3,
        marginBottom: 10,
        marginTop: 10,
        height: 40,
    }
})

const checkButton = StyleSheet.create({
    checkBtn:{
        justifyContent: "center",
        marginTop: 10,
        padding: 5,
        backgroundColor: "rgba(146, 136, 136, 0.8);",
        height: 40,
        borderRadius: 3,
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    introduction: {
        width: width*0.9,
        fontSize: 14,
        fontWeight: "500",
        marginVertical: 20,
    },
    terms: {
        width: width*0.9,
        // height: height* 0.6,
        fontSize: 13,
        padding: 5,
    },
    header: {
        // flexDirection: "row",
        // justifyContent: "flex-start",
        // marginTop: 30,
        // marginBottom: 20,
        // paddingHorizontal: width*0.04,
        // paddingBottom: 10,
        // borderBottomColor: "#fafafa",
        // borderBottomWidth: 2,
        // width: width,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '10%',
        // marginBottom: 5,
        // paddingTop: 10,
        // backgroundColor: '#FEFAE4',
        paddingHorizontal: width*0.04,
        paddingBottom: 10,
        borderBottomColor: "#fafafa",
        borderBottomWidth: 2,
        width: width,
    },
    backButton: {
        height: 20,
        width: 20,
        alignItems: "flex-start",
    },
    input:{
        ...inputStyle.inputContainer,
        width: width*0.9,
    },
    idContainer:{
        flexDirection: 'row',
    },
    emailInput: {
        ...inputStyle.inputContainer,
        width: width*0.70,
    },
    nicknameInput:{
        ...inputStyle.inputContainer,
        width: width*0.72,
    },
    emailCheckBtn: {
        ...checkButton.checkBtn,
        marginLeft: width*0.02,
    },
    nicknameCheckBtn: {
        ...checkButton.checkBtn,
        marginLeft: width*0.02,
    },
    checkText: {
        color: "#fff",
    },
    belowBtn:{
        marginTop: 30,
        alignSelf: "center",
        height: 25,
        width: 25,
    },
    buttonContainer: {
        marginTop: 30,
    },
    dateTimePicker: {
        position: "absolute",
        bottom: 0,
    },
    dateInput: {
        padding: 10,
        borderColor: "#bbb",
        borderWidth: 1,
        fontSize: 14,
        borderRadius: 3,
        marginBottom: 10,
        marginTop: 10,
        height: 40,
        backgroundColor: "#fff",
    },
    dateInit:{
        color: "#c4c4c6",
    },
    dateAfter: {
        color: "#000",
    },
    description: {
        fontSize: 9,
        marginLeft: 5,
        position: "relative",
        top: 2,
    },
    term:{
        fontSize: 10,
        textAlign: "center",
        color: "#5a5a5a",
        position: "relative",
        top: 30,
    }
});
