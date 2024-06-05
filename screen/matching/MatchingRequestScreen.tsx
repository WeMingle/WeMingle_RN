import {TouchableOpacity, View} from 'react-native';

import {
  BaseSafeView,
  BorderBox,
  BorderBoxButton,
  CommonImage,
  CommonInputBox,
  CommonInputView,
  CommonText,
  ConfirmButton,
  Container,
  RowBox,
  ScreenWidth,
  ScrollContainer,
  VerticalBar,
} from '../CommonStyled.style';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  CommonHeader,
  CommonHeaderBlack,
} from '../../component/header/CommonHeader';
import Arrow_Right from '../../assets/arrow_right.png';
import Arrow_Right2 from '../../assets/right_arrow.png';

import {Colors} from '../../assets/color/Colors';
import Arrow_Down from '../../assets/arrow_down.png';
import * as Progress from 'react-native-progress';
import Group_User_Icon from '../../assets/group_user.png';
import Schedule_Icon from '../../assets/schedule_icon.png';
import Radio_On from '../../assets/radio_on.png';
import {MatchingCounter} from './style/MatchingStyle';
import Intersect from '../../assets/Intersect.png';

const MatchingRequestScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const TextField = ({leftText = '', rightText = '', marginT = 30}) => {
    return (
      <RowBox marginT={marginT} alignC justify={'space-between'}>
        <CommonText
          style={{width: '20%'}}
          fontSize={12}
          color={Colors.c_gray500}>
          {leftText}
        </CommonText>

        <CommonText fontSize={12}>{rightText}</CommonText>
      </RowBox>
    );
  };
  return (
    <BaseSafeView>
      <ScrollContainer padding={0}>
        <View style={{padding: 20}}>
          <CommonHeader headerTitle="매칭" rightButtonPress={() => {}} />
        </View>
        <VerticalBar />
        <RowBox padding={20}>
          <CommonText>❗️매칭 정보를 한 번 더 확인해 주세요❗️</CommonText>
        </RowBox>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            backgroundColor: Colors.c_gray50,
          }}>
          <BorderBox>
            <RowBox
              justify={'space-around'}
              alignC
              style={{
                paddingTop: 20,
                paddingBottom: 20,
              }}>
              <View style={{alignItems: 'center', width: '40%'}}>
                <CommonText color={Colors.c_gray300} bold fontSize={12}>
                  매칭 상대
                </CommonText>
                <CommonImage
                  source={Group_User_Icon}
                  width={30}
                  height={24}
                  marginT={20}
                  marginB={20}
                />
                <CommonText>개인 / 그룹</CommonText>
              </View>
              <View
                style={{
                  width: 1,
                  height: 50,
                  backgroundColor: Colors.c_gray500,
                }}></View>
              <View style={{alignItems: 'center', width: '40%'}}>
                <CommonText color={Colors.c_gray300} bold fontSize={12}>
                  일정
                </CommonText>
                <CommonImage
                  source={Schedule_Icon}
                  width={30}
                  height={23}
                  marginT={20}
                  marginB={20}
                />
                <CommonText>2024.03.14 (목)</CommonText>
              </View>
            </RowBox>
          </BorderBox>
          <BorderBox marginT={10}>
            <RowBox padding={10} alignC justify={'space-between'}>
              <CommonText color={Colors.c_gray500} fontSize={12}>
                매칭 지역
              </CommonText>
              <CommonText fontSize={12}>
                서울 전체
                <CommonText color={Colors.c_gray500} fontSize={12}>
                  (협의 가능)
                </CommonText>
              </CommonText>
            </RowBox>
          </BorderBox>

          <BorderBox
            marginT={8}
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <CommonText>위밍글러12님의 정보 ✅</CommonText>
            <TextField leftText="실력" rightText="Lv. 1-3" />
            <TextField leftText="인원" rightText="1명" marginT={10} />
            <TextField leftText="성별" rightText="여성" marginT={10} />

            <VerticalBar width={ScreenWidth - 40} />
            <TextField
              leftText="매칭 마감일"
              rightText="2024. 04. 30"
              marginT={10}
            />
            <TextField
              leftText="매칭 방식"
              rightText="직접 승인"
              marginT={10}
            />
          </BorderBox>
        </View>

        <View style={{backgroundColor: Colors.c_gray50}}>
          <RowBox justify={'flex-end'} padding={20} alignC bgColor={'#fff'}>
            <CommonImage source={Radio_On} width={16} height={16} />
            <CommonText marginL={10}>확인했습니다.</CommonText>
          </RowBox>
          <RowBox
            bgColor={'#fff'}
            alignC
            padding={20}
            justify={'space-between'}
            marginT={6}>
            <CommonText>내 인원</CommonText>
            <RowBox>
              <BorderBoxButton
                onPress={() => {
                  navigation.navigate('MatchingGetVote');
                }}
                row
                marginR={10}>
                <CommonImage source={Arrow_Right2} width={9} height={7} />
                <CommonImage source={Intersect} width={14} height={12} />
              </BorderBoxButton>
              <MatchingCounter />
            </RowBox>
          </RowBox>
          <View style={{marginTop: 5, padding: 20, backgroundColor: '#fff'}}>
            <CommonText>메세지 전달</CommonText>
            <CommonInputBox
              placeholder={'전달할 메세지를 입력해주세요.'}
              height={120}></CommonInputBox>
          </View>
        </View>
        <RowBox>
          <ConfirmButton marginB={20}>
            <CommonText fontSize={16} bold color={'#fff'}>
              신청 보내기
            </CommonText>
          </ConfirmButton>
        </RowBox>
      </ScrollContainer>
    </BaseSafeView>
  );
};

export default MatchingRequestScreen;
