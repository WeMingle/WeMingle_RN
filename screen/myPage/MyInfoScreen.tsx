import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, View} from 'react-native';
import {
  AccountButton,
  BaseSafeView,
  BorderBoxButton,
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
import {useAppDispatch} from '../../redux/Store';
import {getMemberInfo, getMyInfo} from '../../api/MyPage';

interface TextFieldProps {
  leftText: string;
  centerText?: string | number;
  rightText?: string;
}

interface MyInfoProps {
  nickname: string;
  majorActivityArea: string;
  numberOfMatches: number;
  gender: string;
  abilityList: string[];
  oneLineIntroduction: string;
  profilePicId: string;
  birthYear: number;
  abilityPublic: boolean;
  majorActivityAreaPublic: boolean;
  birthYearPublic: boolean;
}

interface MemberInfoProps {
  memberId: string;
  univEmail: string;
}
const MyInfoScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();

  const [configVisible, setConfigVisible] = useState(false);
  const [myInfo, setMyInfo] = useState<MyInfoProps>();
  const [memberInfo, setMemberInfo] = useState<MemberInfoProps>();

  useEffect(() => {
    const asyncFunction = async () => {
      const result = await getMyInfo();
      setMyInfo(result);
    };
    asyncFunction();
  }, []);

  useEffect(() => {
    const asyncFunction = async () => {
      const result = await getMemberInfo();
      setMemberInfo(result);
    };
    asyncFunction();
  });

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
              {myInfo?.nickname}
            </CommonText>
            <CommonText marginT={7} fontSize={14} color={Colors.c_gray400}>
              {myInfo?.oneLineIntroduction}
            </CommonText>
          </View>
        </RowBox>

        <TextField leftText={'실력'} centerText={'Lv.1-3'}></TextField>
        <TextField
          leftText={'활동지역'}
          centerText={myInfo?.majorActivityArea}></TextField>
        <TextField
          leftText={'매칭 경험'}
          centerText={`${myInfo?.numberOfMatches}회`}></TextField>
        <TextField
          leftText={'성별'}
          centerText={myInfo?.gender === 'MALE' ? '남' : '여'}></TextField>
        <TextField leftText={'나이'} centerText={myInfo?.birthYear}></TextField>

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
        <TextField
          leftText={'아이디'}
          centerText={
            memberInfo?.memberId.slice(0, 2) + '********'
          }></TextField>
        <RowBox marginT={30} alignC>
          <CommonText
            style={{width: '20%'}}
            fontSize={12}
            color={Colors.c_gray400}>
            학교 인증
          </CommonText>
          <BorderBoxButton
            onPress={() => {}}
            row
            borderR={5}
            style={{width: '80%', justifyContent: 'space-between'}}>
            <CommonText color={Colors.informative}>
              학교 인증이 필요한 계정입니다.
            </CommonText>
            <CommonImage source={Arrow_Right} width={24} height={24} />
          </BorderBoxButton>
        </RowBox>

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
