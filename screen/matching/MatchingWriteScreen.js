import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { BaseSafeView, BottomTabView, CommonImage, CommonText, RowBox, ScrollContainer } from '../CommonStyled.style';
import { CalendarBox, FilterBox, MatchingFloatingButton, MatchingListBox, MatchingTab, } from './style/MatchingStyle';

import MatchingSortOptionModal from '../../component/modal/MatchingSortOptionModal';

import Write_Icon from '../../assets/write.png'
import Arrow_down from '../../assets/arrow_down.png';
import FilterModal from '../../component/modal/FilterModal';
import Alert_Icon from '../../assets/alert.png'
import Chat_Icon from '../../assets/chat.png'
import { Colors } from '../../assets/color/Colors';
import { useNavigation } from '@react-navigation/native';
import { CommonHeaderBlack } from '../../component/header/CommonHeader';

const MatchingWriteScreen = () => {
  const navigation = useNavigation();

  return <BaseSafeView>
    <ScrollContainer padding={0} bgColor={Colors.c_gray50}>
      <View style={{ backgroundColor: '#212121' }}>
        <CommonHeaderBlack headerTitle={'매칭글 작성'} />
      </View>
      <RowBox borderB height={55} bgColor={'#fff'} alignC padding={7} style={{ paddingLeft: 20 }} >
        <CommonText bold fontSize={16}>⏰ 일정을 선택해주세요!</CommonText>
      </RowBox>
      <CalendarBox />
    </ScrollContainer>
    <MatchingFloatingButton onPress={() => {
      navigation.navigate('MatchingWrite')
    }}>
      <CommonImage source={Write_Icon} width={20} height={20} />
    </MatchingFloatingButton>
    <BottomTabView />
  </BaseSafeView>
}

export default MatchingWriteScreen