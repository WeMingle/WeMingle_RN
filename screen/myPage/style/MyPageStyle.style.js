import styled from 'styled-components/native';
import {
  BorderBox, CommonText, RowBox, ScreenWidth, ShadowBox, ShadowContainer, CommonImage,
  CommonTouchableOpacity,
  MatchingBorderBox,
} from '../../CommonStyled.style';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { Image, FlatList, View } from 'react-native';
import Arrow_down from '../../../assets/arrow_down.png';
import { Colors } from '../../../assets/color/Colors';
import { Checkbox } from 'react-native-paper';
import calendar from '../../../assets/calendar_month.png'
import person from '../../../assets/person.png'

export const MyButtonFrame = styled(RowBox)`
  align-items:center;
  justify-content: space-between;
  width: 100%;
  height: 102px;
  padding: 15px;
  border-radius: 20px;
  background-color: rgba(255,255,255,0.15);
  margin-top: 15px;
`

export const ConfigFrameContainer = styled.View`
  position: absolute;
  right: 20;
  top: 50;
`

export const MatchingListTab = styled(TouchableNativeFeedback)`
  width: ${ScreenWidth / 2}px;
  height: 48px;
  align-items: center;
  justify-content: center;
`

export const DropdownMenu = ({ menuTitle, marginL }) => {
  return <BorderBox row alignC borderR={20} marginL={marginL} style={{ paddingLeft: 15 }}>
    <CommonText>{menuTitle}</CommonText>
    <Image source={Arrow_down} style={{ width: 24, height: 24 }} />
  </BorderBox>
}

export const HistoryTab = () => {
  return <>
    <FlatList
      nestedScrollEnabled={true}
      data={[1, 2, 3]}
      ListHeaderComponent={() => {
        return <RowBox justify={'space-between'}>
          <RowBox>
            <DropdownMenu menuTitle={'받은신청'} />
            <DropdownMenu menuTitle={'개인'} marginL={10} />
          </RowBox>
          <RowBox alignC>
            <CommonText>완료된 매칭 제외 </CommonText>
            <Checkbox status='checked' />
          </RowBox>
        </RowBox>
      }}
      renderItem={({ item, index }) => {
        return <MatchingBorderBox>
          <CommonText fontSize={10} color={Colors.informative}>
            대기중
          </CommonText>
          <CommonText bold marginT={4}>
            [경희대 축동]이 매칭을 신청했습니다.
          </CommonText>
          <CommonText marginT={3} fontSize={12} color={Colors.c_gray500}>[3월 24일 신입생들과 경기 매칭하실 학교 구합니다.]</CommonText>
          <CommonText marginT={7} fontSize={12} color={Colors.c_gray500}>2024.02.24</CommonText>
        </MatchingBorderBox>
      }}
    />
  </>
}

export const MatchingTab = ({ matchingStatus }) => {
  return <>
    <FlatList
      nestedScrollEnabled={true}
      data={[1, 2, 3]}
      ListHeaderComponent={() => {
        return <RowBox justify={'space-between'}>
          <DropdownMenu menuTitle={'개인'} />
          <RowBox alignC>
            <CommonText>완료된 매칭 제외 </CommonText>
            <Checkbox status='checked' />
          </RowBox>
        </RowBox>
      }}
      renderItem={({ item, index }) => {
        return <MatchingBorderBox>
          <RowBox>
            <BorderBox borderColor={Colors.informative} borderR={20} alignC row padding={7}>
              <CommonImage source={calendar} width={11} height={11} />
              <CommonText color={Colors.informative} marginL={5} fontSize={11}>3월 24일</CommonText>
            </BorderBox>
            <BorderBox borderColor={'#fff'} marginL={5} borderR={20} alignC row padding={7} bgColor={Colors.c_gray200}>
              <CommonImage source={person} width={11} height={11} />
              <CommonText color={Colors.informative} marginL={5} fontSize={11}>3월 24일</CommonText>
            </BorderBox>
          </RowBox>
          <RowBox alignC style={{ paddingTop: 15 }}>
            <CommonTouchableOpacity
              style={[
                {
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                },
              ]}
              bgColor={'#000'}
              width={80}
              height={80}>

            </CommonTouchableOpacity>
            <View style={{ justifyContent: 'space-between', marginLeft: 15, height: 80 }}>
              <CommonText>위밍글러12 <CommonText color={Colors.c_gray400} fontSize={12}>매칭 경험 5번</CommonText></CommonText>
              <CommonText fontSize={10}>3월 24일 가볍게 경기 매칭 하실 용병 구합니다.</CommonText>
              <RowBox marginT={5}>
                <CommonText color={Colors.c_gray500} fontSize={10}>지역</CommonText><CommonText fontSize={10} marginL={15}>서울 전체<CommonText fontSize={10} color={Colors.c_gray400}>(협의가능)</CommonText></CommonText>
                <CommonText color={Colors.c_gray500} fontSize={10} marginR={15} marginL={25}>실력</CommonText><CommonText fontSize={10} >Lv. 1-3</CommonText>
              </RowBox>
            </View>
          </RowBox>
          <RowBox marginT={20}  >
            <BorderBox borderColor={Colors.informative} padding={10} style={{ flex: 0.2 }} alignC>
              <CommonText color={Colors.informative}>D-2</CommonText>
            </BorderBox>
            <BorderBox borderColor={item === 2 ? Colors.c_gray500 : '#fff'} marginL={10} bgColor={item === 1 ? Colors.c_gray300 : item === 2 ? '#fff' : '#212121'} padding={10} style={{ flex: 0.8 }} alignC>
              <CommonText color={item === 2 ? Colors.c_gray500 : '#fff'}>취소할 수 있는 기간이 아닙니다.</CommonText>
            </BorderBox>
          </RowBox>
        </MatchingBorderBox>
      }}
    />
  </>
}

export const ConfigFrmae = ({ onPressFirst = () => { }, onPressSecond = () => { }, onPressThird = () => { } }) => {
  return <>
    <ConfigFrameContainer>
      <ShadowBox width={146} height={146}>
        <ShadowContainer width={145} height={145} >
          <TouchableOpacity onPress={onPressFirst}>
            <CommonText fontSize={14}>
              내정보 수정
            </CommonText>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressSecond}>
            <CommonText fontSize={14}>
              비밀번호 및 보안
            </CommonText>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressThird}>
            <CommonText fontSize={14}>
              로그아웃
            </CommonText>
          </TouchableOpacity>
        </ShadowContainer>
      </ShadowBox>
    </ConfigFrameContainer>
  </>
}