import {TouchableOpacity, View} from 'react-native';

import {
  BaseSafeView,
  BorderBox,
  BorderBoxButton,
  CommonImage,
  CommonText,
  ConfirmButton,
  Container,
  RowBox,
  ScreenWidth,
  VerticalBar,
} from '../CommonStyled.style';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {CommonHeaderBlack} from '../../component/header/CommonHeader';
import Arrow_Right from '../../assets/arrow_right.png';
import {Colors} from '../../assets/color/Colors';
import Arrow_Down from '../../assets/arrow_down.png';
import Arrow_Left from '../../assets/arrow_left.png';
import * as Progress from 'react-native-progress';

const MatchingSelectPersonnelScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const VoteCard = ({}) => {
    <BorderBox padding={12} marginT={20}>
      <CommonText>2월 17일 축동 매칭 수요조사</CommonText>
      <RowBox marginT={5} justify={'space-between'}>
        <CommonText fontSize={12} color={Colors.c_gray700}>
          34명 참여
        </CommonText>
        <CommonText fontSize={12} color={Colors.c_gray700}>
          마감일 2024.02.10 13:00
        </CommonText>
      </RowBox>
      <RowBox borderB padding={20} justify={'space-between'}>
        <CommonText>갈래요</CommonText>
        <View style={{alignItems: 'center'}}>
          <CommonText color={Colors.informative}>26명</CommonText>
          <CommonText marginT={12} fontSize={12} color={Colors.c_gray300}>
            8명
          </CommonText>
        </View>
      </RowBox>
      <RowBox alignC marginT={15} justify={'center'}>
        <CommonText>참여인원 불러오기</CommonText>
        <CommonImage source={Arrow_Down} width={24} height={24}></CommonImage>
      </RowBox>
    </BorderBox>;
  };

  const ProgressBar = ({}) => {
    return (
      <Progress.Bar
        color={Colors.blue300}
        borderRadius={10}
        progress={26 / 32}
        width={ScreenWidth - 40 - 30}
        height={24}
        style={{marginTop: 20}}>
        <RowBox
          style={{
            position: 'absolute',
            width: '100%',
            height: 24,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          alignC
          justify={'space-between'}>
          <CommonText fontSize={12} color={'#fff'}>
            갈래요
          </CommonText>
          <CommonText fontSize={12} color={'#777'}>
            26명
          </CommonText>
        </RowBox>
      </Progress.Bar>
    );
  };

  return (
    <BaseSafeView>
      <View style={{backgroundColor: '#212121'}}>
        <CommonHeaderBlack headerTitle={'인원 선택'} />
      </View>
      <Container>
        <RowBox justify="space-between">
          <RowBox alignC>
            <CommonImage source={Arrow_Left} width={24} height={24} />
            <CommonText bold>경희대 축동 (32명)</CommonText>
          </RowBox>
          <RowBox alignC>
            <CommonText fontSize={12}>전체선택</CommonText>
          </RowBox>
        </RowBox>
        <ConfirmButton
          bottom={20}
          onPress={() => navigation.navigate('MatchingWrite')}
          position={'absolute'}>
          <CommonText color={'#fff'} bold fontSize={16}>
            적용
          </CommonText>
        </ConfirmButton>
      </Container>
    </BaseSafeView>
  );
};

export default MatchingSelectPersonnelScreen;
