import React, {useState} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {
  AccountButton,
  BaseSafeView,
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

const OnboardingScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [selectItems, setSelectItems] = useState<string[] | null>([]);

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
            {name: '러닝', img: ''},
            {name: '축구', img: ''},
            {name: '농구', img: ''},
            {name: '스쿼시', img: ''},
            {name: '볼링', img: ''},
            {name: '테니스', img: ''},
            {name: '클라이밍', img: ''},
            {name: '자전거', img: ''},
            {name: '보드', img: ''},
            {name: '배드민턴', img: ''},
            {name: '야구', img: ''},
            {name: '기타', img: ''},
          ]}
          numColumns={3}
          style={{marginTop: 20}}
          renderItem={(items: {item: sportsList; index: any}) => {
            return (
              <CommonTouchableOpacity
                onPress={() => {
                  const selectedItem = selectItems?.indexOf(items.index);
                  if (selectedItem && selectedItem >= 0) {
                    setSelectItems((prev: any) => {
                      prev.splice(selectedItem, 1);
                      return [...prev];
                    });
                  } else {
                    setSelectItems((prev: any) => {
                      return [...prev, items.index];
                    });
                  }
                }}
                style={[
                  {
                    borderRadius: 10,
                    marginBottom: 10,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    borderWidth: 3,
                    borderColor:
                      selectItems && selectItems?.indexOf(items.index) >= 0
                        ? Colors.blue400
                        : '#fff',
                  },
                ]}
                bgColor={'#000'}
                width={boxWidth}
                height={boxWidth}>
                <CommonText
                  fontSize={12}
                  color={'#fff'}
                  style={{marginBottom: 5}}>
                  {items.item?.name}
                </CommonText>
              </CommonTouchableOpacity>
            );
          }}
        />

        <AccountButton
          onPress={() => navigation.navigate('CertificationSchool')}
          style={{bottom: 20, position: 'absolute', alignSelf: 'center'}}
          bgColor={selectItems && selectItems.length > 0 ? '#000' : '#D7DCE5'}
          marginT={20}>
          <CommonText color={'#fff'}>선택완료</CommonText>
        </AccountButton>
      </Container>
    </BaseSafeView>
  );
};

export default OnboardingScreen;
