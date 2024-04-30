import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { BaseSafeView, CommonImage, CommonText, RowBox, ScrollContainer } from '../CommonStyled.style';
import { CalendarBox, FilterBox, MatchingFloatingButton, MatchingListBox, MatchingTab, } from './style/MatchingStyle';

import MatchingSortOptionModal from '../../component/modal/MatchingSortOptionModal';

import Write_Icon from '../../assets/write.png'
import Arrow_down from '../../assets/arrow_down.png';
import FilterModal from '../../component/modal/FilterModal';
import Alert_Icon from '../../assets/alert.png'
import Chat_Icon from '../../assets/chat.png'
import { Colors } from '../../assets/color/Colors';
import { useNavigation } from '@react-navigation/native';

import moment from 'moment';
import { getMatchingList } from '../../redux/slice/MatchingSlice';
import { useDispatch, useSelector } from 'react-redux';

const MatchingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const matchingList = useSelector(state => state.matching)

  // useState
  const [selectedTab, setSelectedTab] = useState('calendar');
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortOptionOpen, setSortOptionOpen] = useState(false);

  const [sortOption, setSortOption] = useState('NEW') //NEW, DEADLINE
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))

  // const [recruitmentType, setRecuruitmentType] = useState('APPROVAL_BASED') //FIRST_SERVED_BASED, APPROVAL_BASED
  // const [ability, setAbility] = useState(null); //LOW, MEDIUM, HIGH
  // const [gender, setGender] = useState(null); //  (MALE, FEMALE)
  // const [areaList, setAreaList] = useState(null);
  // const [excludeExpired, setExcludeExpired] = useState(null); //true,false
  // const [sportsType, setSportsType] = useState(null); // RUNNING, SOCCER, BASKETBALL, BASEBALL, TENNIS, BOWLING, SQUASH, CLIMBING, CYCLING, BADMINTON, SKATEBOARDING, OTHER

  const [filterValues, setFilterValues] = useState({
    ability: null, // 운동 실력
    gender: null, // 성별
    areaList: null, // 지역
    excludeExpired: true, // 마감 제외
    recruitmentType: 'APPROVAL_BASED', // 구인 형태
    recruiterType: 'INDIVIDUAL' //INDIVIDUAL, TEAM
  })

  // const [isModify, setIsModify] = useState('')

  useEffect(() => {
    return
    dispatch(getMatchingList({
      sortOption: sortOption, dateFilter: selectedDate, sportsType: 'OTHER', filterValues: filterValues
    }))
  }, [sortOption, selectedDate, filterValues])

  return <BaseSafeView>
    <FilterModal
      modalVisible={filterModalOpen}
      setModalVisible={setFilterModalOpen}
      filterValues={filterValues}
      setFilterValues={setFilterValues}
    />
    <MatchingSortOptionModal
      modalVisible={sortOptionOpen}
      setModalVisible={setSortOptionOpen}
      setSortOption={setSortOption}
    />

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
        <CalendarBox selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <MatchingListBox marginT={10} modalVisible={sortOptionOpen} sortOption={sortOption} setModalVisible={() => setSortOptionOpen(true)} />
      </> : <>
        <TouchableWithoutFeedback >
          <RowBox alingC padding={20} bgColor={'#fff'}>
            <CommonText fontSize={16} bold>전체</CommonText>
            <CommonImage source={Arrow_down} width={24} height={20} />
          </RowBox>
        </TouchableWithoutFeedback>
        <MatchingListBox sortOption={sortOption} setModalVisible={() => setSortOptionOpen(true)} />
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