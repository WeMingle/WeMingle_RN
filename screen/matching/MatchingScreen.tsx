import React, {useEffect, useRef, useState} from 'react';
import {Animated, TouchableWithoutFeedback, View} from 'react-native';
import {
  type MapType,
  type NaverMapViewRef,
  type Camera,
  NaverMapView,
  type ClusterMarkerProp,
  NaverMapArrowheadPathOverlay,
  NaverMapPathOverlay,
  NaverMapGroundOverlay,
  type Region,
} from '@mj-studio/react-native-naver-map';

import {
  BaseSafeView,
  CommonImage,
  CommonText,
  RowBox,
  ScreenHeight,
  ScrollContainer,
} from '../CommonStyled.style';
import {
  FilterBox,
  MatchingFloatingButton,
  MatchingListBox,
  MatchingTab,
} from './style/MatchingStyle';

import MatchingSortOptionModal from '../../component/modal/MatchingSortOptionModal';

import Write_Icon from '../../assets/write.png';
import Arrow_down from '../../assets/arrow_down.png';
import FilterModal from '../../component/modal/FilterModal';
import Alert_Icon from '../../assets/alert.png';
import Chat_Icon from '../../assets/chat.png';
import {Colors} from '../../assets/color/Colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import moment from 'moment';
import {getMatchingList} from '../../redux/slice/MatchingSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/Reducers';
import CalendarBox from '../../component/CalendarBox';
import {useAppDispatch} from '../../redux/Store';

const MatchingScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();

  const matchingList = useSelector(
    (state: RootState) => state.matching,
  ).matchingList;

  // useState
  const [selectedTab, setSelectedTab] = useState('calendar');
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [sortOptionOpen, setSortOptionOpen] = useState(false);

  const [sortOption, setSortOption] = useState('NEW'); //NEW, DEADLINE
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format('YYYY-MM-DD'),
  );

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
    recruiterType: 'INDIVIDUAL', //INDIVIDUAL, TEAM
  });

  // const [isModify, setIsModify] = useState('')
  useEffect(() => {
    dispatch(
      getMatchingList({
        sortOption: sortOption,
        dateFilter: selectedDate,
        sportsType: 'OTHER',
        filterValues: filterValues,
        recruitmentType: 'APPROVAL_BASED',
      }),
    );
  }, [sortOption, selectedDate, filterValues]);

  return (
    <BaseSafeView bgColor={Colors.c_gray50}>
      <FilterModal
        modalVisible={filterModalOpen}
        setModalVisible={setFilterModalOpen}
        filterValues={filterValues}
        setFilterValues={value => setFilterValues(value)}
      />
      <MatchingSortOptionModal
        modalVisible={sortOptionOpen}
        setModalVisible={setSortOptionOpen}
        setSortOption={setSortOption}
      />

      <View style={{backgroundColor: '#212121'}}>
        <RowBox alignC justify={'space-between'} padding={20} height={65}>
          <CommonText fontSize={18} color={'#fff'}>
            매칭
          </CommonText>
          <RowBox>
            <CommonImage source={Alert_Icon} width={24} height={24} />
            <CommonImage
              source={Chat_Icon}
              width={24}
              height={24}
              style={{marginLeft: 12}}
            />
          </RowBox>
        </RowBox>
        <MatchingTab
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
      </View>
      <FilterBox
        setFilterModalOpen={(value: boolean) => setFilterModalOpen(value)}
      />

      {selectedTab === 'calendar' ? (
        <>
          <CalendarBox
            selectedDate={selectedDate}
            setSelectedDate={value => setSelectedDate(value)}
          />
          <MatchingListBox
            marginT={10}
            sortOption={sortOption}
            setModalVisible={() => setSortOptionOpen(true)}
            matchingList={matchingList}
          />
        </>
      ) : (
        <>
          <NaverMapView
            style={{
              width: '100%',
              height: ScreenHeight - 65 - 40 - 65 - 40 - 60 - 55,
              marginBottom: -10,
            }}
          />
          <TouchableWithoutFeedback
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              bottom: 5,
            }}>
            <RowBox
              alingC
              padding={20}
              bgColor={'#fff'}
              height={60}
              style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <CommonText fontSize={16} bold>
                전체
              </CommonText>
              <CommonImage source={Arrow_down} width={24} height={20} />
            </RowBox>
          </TouchableWithoutFeedback>
          <MatchingListBox
            sortOption={sortOption}
            setModalVisible={() => setSortOptionOpen(true)}
          />
        </>
      )}
      <MatchingFloatingButton
        onPress={() => {
          navigation.navigate('MatchingDateSelect');
        }}>
        <CommonImage source={Write_Icon} width={20} height={20} />
      </MatchingFloatingButton>
    </BaseSafeView>
  );
};

export default MatchingScreen;
