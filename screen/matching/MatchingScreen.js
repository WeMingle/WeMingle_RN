import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

<<<<<<< Updated upstream
import { BaseSafeView, BottomTabView, CommonImage, CommonText, RowBox, ScrollContainer } from '../CommonStyled.style';
=======
import { BaseSafeView, CommonImage, CommonText, RowBox, ScrollContainer } from '../CommonStyled.style';
>>>>>>> Stashed changes
import { CalendarBox, FilterBox, MatchingFloatingButton, MatchingListBox, MatchingTab, } from './style/MatchingStyle';

import MatchingSortOptionModal from '../../component/modal/MatchingSortOptionModal';

import Write_Icon from '../../assets/write.png'
import Arrow_down from '../../assets/arrow_down.png';
import FilterModal from '../../component/modal/FilterModal';
import Alert_Icon from '../../assets/alert.png'
import Chat_Icon from '../../assets/chat.png'
import { Colors } from '../../assets/color/Colors';
import { useNavigation } from '@react-navigation/native';
import { BottomTabView } from '../../component/BottomTab';

const MatchingScreen = () => {
  const navigation = useNavigation();

  // useState
  const [selectedTab, setSelectedTab] = useState('calendar');
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortOptionOpen, setSortOptionOpen] = useState(false);

  return <BaseSafeView>
    <FilterModal
      modalVisible={filterModalOpen}
      setModalVisible={setFilterModalOpen}
    />
    <MatchingSortOptionModal
      modalVisible={sortOptionOpen}
      setModalVisible={setSortOptionOpen} />

    <ScrollContainer padding={0} bgColor={Colors.c_gray50}>
      <View style={{ backgroundColor: '#212121' }}>
        <RowBox alignC justify={'space-between'} padding={20}>
          <CommonText fontSize={18} color={'#fff'}>매칭</CommonText>
          <RowBox>
            <CommonImage source={Alert_Icon} width={24} height={24} />
            <CommonImage source={Chat_Icon} width={24} height={24} style={{ marginLeft: 12 }} />
          </RowBox>
        </RowBox>
        <MatchingTab setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      </View>
      <FilterBox filterModalOpen={filterModalOpen} setFilterModalOpen={setFilterModalOpen} />

      {selectedTab === 'calendar' ? <>
        <CalendarBox />
        <MatchingListBox marginT={10} />
      </> : <>
        <TouchableWithoutFeedback onPress={() => setSortOptionOpen(true)}>
          <RowBox alingC padding={20} bgColor={'#fff'}>
            <CommonText fontSize={16} bold>전체</CommonText>
            <CommonImage source={Arrow_down} width={24} height={20} />
          </RowBox>
        </TouchableWithoutFeedback>
        <MatchingListBox />
      </>
      }

    </ScrollContainer>
    <MatchingFloatingButton onPress={() => {
      navigation.navigate('MatchingDateSelect')
    }}>
      <CommonImage source={Write_Icon} width={20} height={20} />
    </MatchingFloatingButton>
  </BaseSafeView>
}

export default MatchingScreen