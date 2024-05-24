import {Animated, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {Colors} from '../../../assets/color/Colors';
import {
  BorderBox,
  BorderBoxButton,
  CommonImage,
  CommonText,
  MatchingItem,
  RowBox,
} from '../../CommonStyled.style';

import Arrow_Right from '../../../assets/arrow_right.png';
import Filter_Icon from '../../../assets/filter_icon.png';
import Arrow_down from '../../../assets/arrow_down.png';
import calendar from '../../../assets/calendar_month.png';
import person from '../../../assets/person.png';

import {Dispatch, SetStateAction, useRef} from 'react';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {FlatList} from 'react-native-gesture-handler';

export const MathcingTabButton = styled.TouchableOpacity`
  width: 50%;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  height: 40px;
  background-color: ${(props: {selected: boolean}) =>
    props.selected ? ' #fff' : Colors.c_gray200};
  align-items: center;
  justify-content: center;
`;

export const MathcingTabButtonSticky = styled.TouchableOpacity`
  width: 50%;
  height: 40px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border-bottom-width: ${(props: {selected: boolean}) =>
    props.selected ? '2px' : '0px'};
  border-bottom-color: #212121;
`;

export const MatchingFloatingButton = styled.TouchableOpacity`
  width: 45px;
  height: 45px;
  background-color: #212121;
  position: absolute;
  bottom: 80px;
  right: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 45px;
`;

interface MatchingTabProps {
  setSelectedTab: Dispatch<SetStateAction<string>>;
  selectedTab: string;
}
export const MatchingTab = ({
  setSelectedTab,
  selectedTab,
}: MatchingTabProps) => {
  return (
    <>
      <RowBox height={40}>
        <MathcingTabButton
          onPress={() => setSelectedTab('calendar')}
          selected={selectedTab === 'calendar' ? true : false}>
          <CommonText bold>캘린더</CommonText>
        </MathcingTabButton>
        <MathcingTabButton
          onPress={() => setSelectedTab('map')}
          selected={selectedTab === 'map' ? true : false}>
          <CommonText bold>지도</CommonText>
        </MathcingTabButton>
      </RowBox>
    </>
  );
};

export const MatchingTabSticky = ({
  setSelectedTab,
  selectedTab,
}: MatchingTabProps) => {
  return (
    <>
      <RowBox height={40}>
        <MathcingTabButtonSticky
          onPress={() => setSelectedTab('calendar')}
          selected={selectedTab === 'calendar' ? true : false}>
          <CommonText bold>캘린더</CommonText>
        </MathcingTabButtonSticky>
        <MathcingTabButtonSticky
          onPress={() => setSelectedTab('map')}
          selected={selectedTab === 'map' ? true : false}>
          <CommonText bold>지도</CommonText>
        </MathcingTabButtonSticky>
      </RowBox>
    </>
  );
};

interface FilterBoxProps {
  setFilterModalOpen: (bool: boolean) => void;
}
export const FilterBox = ({setFilterModalOpen}: FilterBoxProps) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <RowBox
      borderB
      height={40}
      bgColor={'#fff'}
      justify={'space-between'}
      padding={7}
      style={{paddingLeft: 15, paddingRight: 15}}>
      <RowBox>
        <BorderBox borderR={20} style={{paddingLeft: 15, paddingRight: 15}}>
          <CommonText color={Colors.c_gray700} fontSize={11}>
            중급자
          </CommonText>
        </BorderBox>
        <BorderBox
          borderR={20}
          style={{paddingLeft: 15, paddingRight: 15}}
          marginL={10}>
          <CommonText color={Colors.c_gray700} fontSize={11}>
            오후
          </CommonText>
        </BorderBox>
      </RowBox>
      <RowBox alignC>
        <CommonImage source={Arrow_Right} width={24} height={24} />
        <BorderBoxButton
          onPress={() => {
            setFilterModalOpen(true);
          }}
          bgColor={'#212121'}
          marginL={15}
          padding={6}
          borderR={10}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
            height: 30,
            padding: 0,
          }}>
          <CommonImage source={Filter_Icon} width={12} height={12} />
        </BorderBoxButton>
      </RowBox>
    </RowBox>
  );
};

interface MatchingListBoxProps {
  marginT?: number;
  setModalVisible?: (value: boolean) => void;
  sortOption?: string;
  matchingList?: any;
  matchingCount?: number;
  hideHeader?: boolean;
}

export const MatchingListBox = ({
  marginT,
  setModalVisible = () => {},
  sortOption,
  matchingList,
  matchingCount = 0,
  hideHeader,
}: MatchingListBoxProps) => {
  return (
    <>
      {matchingList && (
        <FlatList
          ListHeaderComponent={
            !hideHeader ? (
              <RowBox
                justify={'space-between'}
                padding={20}
                borderB
                borderT
                height={60}>
                <CommonText fontSize={12} color={Colors.c_gray400}>
                  {matchingCount}개의 구인글
                </CommonText>
                <RowBox alignC>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <CommonText fontSize={12} marginR={15}>
                      {sortOption === 'NEW' ? '최신순' : '마감임박순'}
                    </CommonText>
                  </TouchableOpacity>
                  <CommonImage source={Arrow_down} width={10} height={20} />
                </RowBox>
              </RowBox>
            ) : null
          }
          showsVerticalScrollIndicator={false}
          data={Object.keys(matchingList)}
          renderItem={({item, index}: any) => {
            return <MatchingItem item={matchingList[item]} />;
          }}
        />
      )}
    </>
  );
};

export const MatchingListBoxWidthBottomSheet = ({
  marginT,
  setModalVisible = () => {},
  sortOption,
  matchingList,
  matchingCount = 0,
}: MatchingListBoxProps) => {
  return (
    <>
      {matchingList && (
        <FlatList
          ListHeaderComponent={
            <RowBox
              justify={'space-between'}
              padding={20}
              borderB
              borderT
              height={60}>
              <CommonText fontSize={12} color={Colors.c_gray400}>
                {matchingCount}개의 구인글
              </CommonText>
              <RowBox alignC>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <CommonText fontSize={12} marginR={15}>
                    {sortOption === 'NEW' ? '최신순' : '마감임박순'}
                  </CommonText>
                </TouchableOpacity>
                <CommonImage source={Arrow_down} width={10} height={20} />
              </RowBox>
            </RowBox>
          }
          showsVerticalScrollIndicator={false}
          data={Object.keys(matchingList)}
          renderItem={({item, index}: any) => {
            return <MatchingItem item={matchingList[item]} />;
          }}
        />
      )}
    </>
  );
};

interface PopularMatchingBoxProps {
  image: string;
  nickname: string;
  location: string;
  ability: string;
  matchingCnt: number;
  matchingDate: string;
  recruiterType: string;
  areas: string;
}

export const PopularMatchingBox = (props: {item: PopularMatchingBoxProps}) => {
  const item = props.item;
  return (
    <>
      <BorderBox marginR={10} padding={20}>
        <RowBox>
          <BorderBox borderColor={Colors.informative} borderR={20} alignC row>
            <CommonImage source={calendar} width={11} height={11} />
            <CommonText color={Colors.informative} marginL={5} fontSize={11}>
              {`${item.matchingDate[0].slice(
                5,
                7,
              )}월 ${item.matchingDate[0].slice(8, 10)}일`}
            </CommonText>
          </BorderBox>
          <BorderBox
            borderColor={'#fff'}
            marginL={5}
            borderR={20}
            alignC
            row
            bgColor={Colors.c_gray200}
            style={{
              paddingRight: 7,
            }}>
            <CommonImage source={person} width={11} height={11} />
            <CommonText color={Colors.informative} marginL={5} fontSize={11}>
              {item.recruiterType === 'INDIVIDUAL' ? '개인' : '그룹'}
            </CommonText>
          </BorderBox>
        </RowBox>
        <RowBox marginT={10}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 15,
              backgroundColor: '#212121',
              marginRight: 10,
            }}
          />
          <View
            style={{
              justifyContent: 'space-around',
            }}>
            <CommonText>{item.nickname}</CommonText>
            <CommonText color={Colors.c_gray400} fontSize={12}>
              매칭 경험 {item.matchingCnt}번
            </CommonText>
          </View>
        </RowBox>
        <RowBox marginT={15}>
          <CommonText color={Colors.c_gray500} marginR={8}>
            지역
          </CommonText>
          <CommonText>{item?.areas[0]}</CommonText>
        </RowBox>
        <RowBox marginT={8}>
          <CommonText color={Colors.c_gray500} marginR={8}>
            실력
          </CommonText>
          <CommonText fontSize={10}>
            Lv.{' '}
            {item.ability === 'LOW'
              ? '1-3'
              : item.ability === 'MEDIUM'
              ? '4-6'
              : '7-9'}
          </CommonText>
        </RowBox>
      </BorderBox>
    </>
  );
};
