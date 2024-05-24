import React, {useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {
  AccountButton,
  BaseSafeView,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
  boxWidth,
} from '../CommonStyled.style';
import {Colors} from '../../assets/color/Colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {PreventAny} from '@reduxjs/toolkit/dist/entities/models';

import Onboarding_1 from '../../assets/onboarding_running.png';
import Onboarding_2 from '../../assets/onboarding_soccer.png';
import Onboarding_3 from '../../assets/onboarding_basketball.png';
import Onboarding_4 from '../../assets/onboarding_squash.png';
import Onboarding_5 from '../../assets/onboarding_bowling.png';
import Onboarding_6 from '../../assets/onboarding_tennis.png';
import Onboarding_7 from '../../assets/onboarding_climbing.png';
import Onboarding_8 from '../../assets/onboarding_cycle.png';
import Onboarding_9 from '../../assets/onboarding_board.png';
import Onboarding_10 from '../../assets/Onboarding_badminton.png';
import Onboarding_11 from '../../assets/onboarding_baseball.png';
import {transparent} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {addOnboard} from '../../api/Account';

const OnboardingScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [selectItems, setSelectItems] = useState<number | null>();

  interface sportsList {
    name: string;
    img: string;
  }
  return (
    <BaseSafeView>
      <Container>
        <CommonText fontSize={18} marginT={18} color={Colors.blue400}>
          ***님 환영합니다!
        </CommonText>

        <CommonText fontSize={14} marginT={20}>
          관심있는 스포츠를 골라주세요 (1개 이상) {'\n'}해당 스포츠와 관련된
          컨텐츠를 추천해드릴게요
        </CommonText>

        <CommonText fontSize={12} marginT={8} color={'#969696'}>
          홈화면{'>'}좌측 상단 버튼을 통해 관심 스포츠를 수정/설정할 수 있습니다
        </CommonText>

        <FlatList
          data={[
            {name: '러닝', img: Onboarding_1},
            {name: '축구', img: Onboarding_2},
            {name: '농구', img: Onboarding_3},
            {name: '스쿼시', img: Onboarding_4},
            {name: '볼링', img: Onboarding_5},
            {name: '테니스', img: Onboarding_6},
            {name: '클라이밍', img: Onboarding_7},
            {name: '자전거', img: Onboarding_8},
            {name: '보드', img: Onboarding_9},
            {name: '배드민턴', img: Onboarding_10},
            {name: '야구', img: Onboarding_11},
            {name: '기타', img: ''},
          ]}
          numColumns={3}
          style={{marginTop: 20}}
          renderItem={(items: {item: sportsList; index: any}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectItems(items?.index);
                }}
                style={[
                  {
                    backgroundColor: '#212121',
                    borderRadius: 10,
                    marginBottom: 10,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <CommonImage
                  source={items?.item.img}
                  resizeMode="contain"
                  style={{
                    width: boxWidth,
                    height: boxWidth,
                    borderRadius: 10,
                    borderWidth:
                      selectItems && selectItems === items.index ? 3 : 0,
                    borderColor:
                      selectItems === items?.index ? Colors.blue400 : '#fff',
                    opacity:
                      selectItems === items.index || !selectItems ? 1 : 0.2,
                  }}
                />
                <CommonText
                  fontSize={12}
                  color={'#fff'}
                  style={{position: 'absolute', bottom: 5}}>
                  {items.item?.name}
                </CommonText>
              </TouchableOpacity>
            );
          }}
        />

        <AccountButton
          onPress={() => {
            if (selectItems) addOnboard(sportslist[selectItems]);
            navigation.navigate('CertificationSchool');
          }}
          style={{bottom: 20, position: 'absolute', alignSelf: 'center'}}
          bgColor={selectItems && selectItems >= 0 ? '#000' : '#D7DCE5'}
          marginT={20}>
          <CommonText color={'#fff'}>선택완료</CommonText>
        </AccountButton>
      </Container>
    </BaseSafeView>
  );
};

const sportslist = [
  'RUNNING',
  'SOCCER',
  'BASKETBALL',
  'BASEBALL',
  'TENNIS',
  'BOWLING',
  'SQUASH',
  'CLIMBING',
  'CYCLING',
  'BADMINTON',
  'SKATEBOARDING',
  'OTHER',
];

export default OnboardingScreen;
