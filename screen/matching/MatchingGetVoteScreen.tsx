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
import * as Progress from 'react-native-progress';

const MatchingGetVoteScreen = () => {
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MatchingSelectPersonnel');
          }}>
          <RowBox alignC justify={'space-between'}>
            <View>
              <CommonText bold>경희대 축동</CommonText>
              <CommonText color={Colors.c_gray400} fontSize={12}>
                그룹인원 직접 선택
              </CommonText>
            </View>
            <CommonImage source={Arrow_Right} width={24} height={24} />
          </RowBox>
        </TouchableOpacity>

        <VerticalBar marginB={25} />

        <CommonText bold>[경희대 축동] 진행된 투표 🔖</CommonText>
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
          {/* <RowBox borderB padding={20} justify={'space-between'}>
            <CommonText>갈래요</CommonText>
            <View style={{alignItems: 'center'}}>
              <CommonText color={Colors.informative}>26명</CommonText>
              <CommonText marginT={12} fontSize={12} color={Colors.c_gray300}>
                8명
              </CommonText>
            </View>
          </RowBox> */}
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
          <Progress.Bar
            color={Colors.blue300}
            borderRadius={10}
            progress={8 / 32}
            width={ScreenWidth - 40 - 30}
            height={24}
            style={{marginTop: 8}}>
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
                불참이예요
              </CommonText>
              <CommonText fontSize={12} color={'#CACACA'}>
                8명
              </CommonText>
            </RowBox>
          </Progress.Bar>

          {/* <BorderBox height={24} style={{flex: 1}}></BorderBox> */}
          <RowBox alignC marginT={15} justify={'center'}>
            <CommonText>참여인원 불러오기</CommonText>
            <CommonImage
              source={Arrow_Down}
              width={24}
              height={24}></CommonImage>
          </RowBox>
          <RowBox marginT={15}>
            <BorderBoxButton style={{flex: 1}} height={30}>
              <CommonText>불참이예요</CommonText>
            </BorderBoxButton>
            <BorderBoxButton style={{flex: 1}} marginL={15}>
              <CommonText>갈래요</CommonText>
            </BorderBoxButton>
          </RowBox>
        </BorderBox>
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

export default MatchingGetVoteScreen;
