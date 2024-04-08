
import React, { useState, } from 'react';
import {
  BaseSafeView,
  BorderBox,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
  MatchingBorderBox,
  RowBox,
  ScrollContainer,
} from '../CommonStyled.style';
import { Colors } from '../../assets/color/Colors';
import { useNavigation } from '@react-navigation/native';
import { DropdownMenu, HistoryTab, MatchingListTab, MatchingTab } from './style/MyPageStyle.style';
import { CommonHeaderBlack } from '../../component/header/CommonHeader';
import { Checkbox } from 'react-native-paper';
import calendar from '../../assets/calendar_month.png'
import person from '../../assets/person.png'
import { FlatList, View } from 'react-native';

const MatchingListScreen = () => {
  const navigation = useNavigation();

  const SelectedStyle = { borderBottomColor: '#212121', borderBottomWidth: 2, };
  const NonSelectedStyle = { borderBottomWidth: 1, borderBottomColor: Colors.c_gray300 }
  const [selectedTab, setSelectedTab] = useState(1);



  return (
    <BaseSafeView>
      <CommonHeaderBlack headerTitle={'매칭 리스트'} />
      <RowBox alignC style={{}}>
        <MatchingListTab onPress={() => setSelectedTab(1)} style={selectedTab === 1 ? SelectedStyle : NonSelectedStyle}>
          <CommonText color={selectedTab === 1 ? '#212121' : Colors.c_gray500}>매칭</CommonText>
        </MatchingListTab>
        <MatchingListTab onPress={() => setSelectedTab(2)} style={selectedTab === 2 ? SelectedStyle : NonSelectedStyle}>
          <CommonText color={selectedTab === 2 ? '#212121' : Colors.c_gray500}>히스토리</CommonText>
        </MatchingListTab>
      </RowBox>
      <Container bgColor={Colors.c_gray50}>
        {
          selectedTab === 1 ? <MatchingTab /> : <HistoryTab></HistoryTab>
        }
      </Container>
    </BaseSafeView >
  );
};

export default MatchingListScreen;
