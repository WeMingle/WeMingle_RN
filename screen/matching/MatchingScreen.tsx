import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

import {
  BaseSafeView,
  CommonImage,
  CommonText,
  MatchingItem,
  RowBox,
  ScreenHeight,
  ScreenWidth,
} from '../CommonStyled.style';
import {
  FilterBox,
  MatchingFloatingButton,
  MatchingListBox,
  MatchingTab,
  MatchingTabSticky,
} from './style/MatchingStyle';

import MatchingSortOptionModal from '../../component/modal/MatchingSortOptionModal';

import Write_Icon from '../../assets/write.png';
import Arrow_down from '../../assets/arrow_down.png';
import FilterModal from '../../component/modal/FilterModal';
import Alert_Icon from '../../assets/alert.png';
import Chat_Icon from '../../assets/chat.png';
import Add_Box from '../../assets/add_box.png';

import {Colors} from '../../assets/color/Colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import moment from 'moment';
import {getMatchingList} from '../../redux/slice/MatchingSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Reducers';
import CalendarBox from '../../component/CalendarBox';
import {useAppDispatch} from '../../redux/Store';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {SearchButton} from '../myGroup/style/MyGroupStyle.style';
import {getMapBounds} from '../../component/Common';

interface MatchingList {
  [prop: string]: any;
}

const MatchingScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();

  const matchingList: MatchingList = useSelector(
    (state: RootState) => state.matching,
  ).matchingList;
  const matchingCount = useSelector(
    (state: RootState) => state.matching,
  ).matchingCount;

  // useState
  const [selectedTab, setSelectedTab] = useState('calendar');
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [sortOptionOpen, setSortOptionOpen] = useState(false);

  const [sortOption, setSortOption] = useState('NEW'); //NEW, DEADLINE
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format('YYYY-MM-DD'),
  );

  const [bounds, setBounds] = useState('');

  const [filterValues, setFilterValues] = useState({
    ability: null, // 운동 실력
    gender: null, // 성별
    areaList: null, // 지역
    excludeExpired: true, // 마감 제외
    recruitmentType: 'APPROVAL_BASED', // 구인 형태
    recruiterType: 'INDIVIDUAL', //INDIVIDUAL, TEAM,
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

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['37%', '37%', '83%'], []);

  const [isSticky, setIsSticky] = useState(false);

  const handleSheetChange = useCallback((index: any) => {
    // console.log(index);
    if (index === 1) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }
  }, []);

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

      {!isSticky ? (
        <View style={{backgroundColor: '#212121'}}>
          <RowBox alignC justify={'space-between'} padding={20} height={65}>
            <CommonText fontSize={18} color={'#fff'}>
              매칭
            </CommonText>
            <RowBox>
              <SearchButton
                width={24}
                height={24}
                nextPage={'MatchingSearch'}
              />

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
      ) : (
        <MatchingTabSticky
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
      )}

      <FilterBox
        setFilterModalOpen={(value: boolean) => setFilterModalOpen(value)}
      />

      {selectedTab === 'calendar' ? (
        <>
          <CalendarBox
            isSticky={isSticky}
            selectedDate={selectedDate}
            setSelectedDate={value => setSelectedDate(value)}
          />

          <BottomSheet
            onChange={handleSheetChange}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={1}
            handleComponent={null}>
            <BottomSheetFlatList
              ListHeaderComponent={
                <>
                  <View
                    style={{
                      height: 10,
                      backgroundColor: Colors.c_gray50,
                      width: '100%',
                    }}
                  />
                  <RowBox
                    justify={'space-between'}
                    padding={20}
                    borderB
                    height={60}>
                    <CommonText fontSize={12} color={Colors.c_gray400}>
                      27개의 구인글
                    </CommonText>
                    <RowBox alignC>
                      <TouchableOpacity onPress={() => setSortOptionOpen(true)}>
                        <CommonText fontSize={12} marginR={15}>
                          {sortOption === 'NEW' ? '최신순' : '마감임박순'}
                        </CommonText>
                      </TouchableOpacity>
                      <CommonImage source={Arrow_down} width={10} height={20} />
                    </RowBox>
                  </RowBox>
                </>
              }
              showsVerticalScrollIndicator={false}
              data={Object.keys(matchingList)}
              renderItem={({item}: any) => {
                return <MatchingItem item={matchingList[item]} />;
              }}
            />
          </BottomSheet>
        </>
      ) : (
        <>
          <NaverMapView
            center={{
              latitude: 37.50497126,
              longitude: 127.04905021,
            }}
            onCameraChange={e => {
              const result = getMapBounds(
                {latitude: e.latitude, longitude: e.longitude},
                e.zoom,
                ScreenWidth,
                ScreenHeight - 65 - 40 - 65 - 40 - 60 - 55,
              );
              const bounds = `topLat=${result[0].lat}&bottomLat=${result[1].lat}&rightLon=${result[0].lng}&leftLon=${result[1].lng}`;
              setBounds(bounds);
            }}
            showsMyLocationButton={true}
            style={{
              width: '100%',
              height: ScreenHeight - 65 - 40 - 65 - 40 - 60 - 55,
              marginBottom: -10,
            }}>
            {/* Not Working in iOS Old Architecture Yet */}
          </NaverMapView>
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
            matchingCount={matchingCount}
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
