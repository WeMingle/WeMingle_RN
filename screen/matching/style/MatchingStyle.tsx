import {TouchableOpacity, View} from 'react-native';
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
import {Dispatch, SetStateAction} from 'react';

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
      <RowBox>
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
interface FilterBoxProps {
  setFilterModalOpen: (bool: boolean) => void;
}
export const FilterBox = ({setFilterModalOpen}: FilterBoxProps) => {
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
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <CommonImage source={Filter_Icon} width={15} height={14} />
        </BorderBoxButton>
      </RowBox>
    </RowBox>
  );
};

interface MatchingListBoxProps {
  marginT?: number;
  setModalVisible?: (value: boolean) => void;
  sortOption?: string;
}

export const MatchingListBox = ({
  marginT,
  setModalVisible,
  sortOption,
}: MatchingListBoxProps) => {
  return (
    <View style={{marginTop: marginT, backgroundColor: '#fff'}}>
      {sortOption && (
        <RowBox justify={'space-between'} padding={20} borderB borderT>
          <CommonText fontSize={12} color={Colors.c_gray400}>
            27개의 구인글
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
      )}
      <MatchingItem />
      <MatchingItem />
      <MatchingItem borderBottomN />
    </View>
  );
};
