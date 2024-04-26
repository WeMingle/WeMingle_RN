import React from 'react';
import { View } from 'react-native';

import { BaseSafeView, CommonText, ConfirmButton, Container, RowBox } from '../CommonStyled.style';
import { CalendarBox, } from './style/MatchingStyle';


import { useNavigation } from '@react-navigation/native';
import { CommonHeaderBlack } from '../../component/header/CommonHeader';

const MatchingDateSelectScreen = () => {
  const navigation = useNavigation();

  return <BaseSafeView>
    <Container
      padding={0}
    >
      <View style={{ backgroundColor: '#212121' }}>
        <CommonHeaderBlack headerTitle={'매칭글 작성'} />
      </View>
      <RowBox borderB height={55} bgColor={'#fff'} alignC padding={7} style={{ paddingLeft: 20 }} >
        <CommonText bold fontSize={16}>⏰ 일정을 선택해주세요!</CommonText>
      </RowBox>
      <CalendarBox />
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
}

export default MatchingDateSelectScreen