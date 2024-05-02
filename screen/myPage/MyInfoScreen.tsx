import React, {useState} from 'react';
import {Dimensions, FlatList, Image, View} from 'react-native';
import {
  AccountButton,
  BaseSafeView,
  CenterBox,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
  ProfileBox,
  RowBox,
  boxWidth,
} from '../CommonStyled.style';
import {Colors} from '../../assets/color/Colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Alert_Icon from '../../assets/alert.png';
import Chat_Icon from '../../assets/chat.png';
import {ConfigFrmae, MyButtonFrame} from './style/MyPageStyle.style';
import Arrow_Right_White from '../../assets/arrow_right_white.png';
import Arrow_Right from '../../assets/arrow_right.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AccountHeader from '../../component/header/AccountHeader';
import {CommonHeader} from '../../component/header/CommonHeader';

interface TextFieldProps {
  leftText: string;
  centerText: string;
  rightText?: string;
}
const MyInfoScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const TextField = ({
    leftText,
    centerText,
    rightText = '',
  }: TextFieldProps) => {
    return (
      <RowBox marginT={30} alignC>
        <CommonText
          style={{width: '20%'}}
          fontSize={12}
          color={Colors.c_gray400}>
          {leftText}
        </CommonText>
        <CommonText style={{width: '65%'}} fontSize={14}>
          {centerText}
        </CommonText>
        <CommonText fontSize={14}>{rightText}</CommonText>
      </RowBox>
    );
  };

  const [configVisible, setConfigVisible] = useState(false);

  return (
    <BaseSafeView>
      <Container>
        <CommonHeader
          headerTitle={'내 정보'}
          rightButtonPress={() => setConfigVisible(prev => !prev)}
        />
        {configVisible && (
          <ConfigFrmae onPressFirst={() => navigation.navigate('MyProfile')} />
        )}
        <RowBox marginT={20} alignC>
          <ProfileBox />
          <View style={{marginLeft: 15}}>
            <CommonText bold fontSize={16} textAlign={'left'}>
              닉네임
            </CommonText>
            <CommonText marginT={7} fontSize={14} color={Colors.c_gray400}>
              한줄 소개글
            </CommonText>
          </View>
        </RowBox>

        <TextField leftText={'실력'} centerText={'Lv.1-3'}></TextField>
        <TextField
          leftText={'활동지역'}
          centerText={'서울시 강남구'}></TextField>
        <TextField leftText={'매칭 경험'} centerText={'5번'}></TextField>
        <TextField leftText={'성별'} centerText={'남'}></TextField>
        <TextField leftText={'나이'} centerText={'03년생'}></TextField>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: Colors.c_gray200,
            marginTop: 20,
          }}
        />
        <CommonText bold marginT={30}>
          회원 정보
        </CommonText>
        <TextField leftText={'아이디'} centerText={'ex********'}></TextField>
        <TextField
          leftText={'학교인증'}
          centerText={'wemingle@google.com'}></TextField>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: Colors.c_gray200,
            marginTop: 20,
          }}
        />
        <CommonText bold marginT={30}>
          접수된 신고내역
        </CommonText>
        <CommonText color={Colors.c_gray400} bold marginT={30}>
          신고내역이 없습니다.
        </CommonText>
      </Container>
    </BaseSafeView>
  );
};

export default MyInfoScreen;
