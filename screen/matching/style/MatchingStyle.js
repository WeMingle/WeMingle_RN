import { TouchableWithoutFeedback, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Colors } from '../../../assets/color/Colors';
import { BorderBox, BorderBoxButton, CommonImage, CommonText, Container, MatchingItem, RowBox } from '../../CommonStyled.style';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

import Arrow_Right from '../../../assets/arrow_right.png';
import Arrow_Left from '../../../assets/arrow_left.png';
import Arrow_Right_Calendar from '../../../assets/arrow_right_calendar.png'
import Filter_Icon from '../../../assets/filter_icon.png';
import Arrow_down from '../../../assets/arrow_down.png';


export const MathcingTabButton = styled.TouchableOpacity`
  width: 50%;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  height: 40px;
  background-color: ${props => props.selected ? ' #fff' : Colors.c_gray200};
  align-items: center;
  justify-content: center;
`

export const MatchingFloatingButton = styled.TouchableOpacity`
  width:45px;
  height: 45px;
  background-color: #212121;
  position: absolute;
<<<<<<< Updated upstream
  bottom: 100px;
=======
  bottom: 80px;
>>>>>>> Stashed changes
  right: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 45px;
`

export const MatchingTab = ({ setSelectedTab, selectedTab }) => {
  return <>
    <RowBox>
      <MathcingTabButton onPress={() => setSelectedTab('calendar')} selected={selectedTab === 'calendar' ? true : false} >
        <CommonText bold >캘린더</CommonText>
      </MathcingTabButton>
      <MathcingTabButton onPress={() => setSelectedTab('map')} selected={selectedTab === 'map' ? true : false}>
        <CommonText bold>지도</CommonText>
      </MathcingTabButton>
    </RowBox>
  </>
}

export const FilterBox = ({ setFilterModalOpen }) => {
  return <RowBox borderB height={40} bgColor={'#fff'} justify={'space-between'} padding={7} style={{ paddingLeft: 15, paddingRight: 15 }} >
    <RowBox>
      <BorderBox borderR={20} style={{ paddingLeft: 15, paddingRight: 15 }}>
        <CommonText color={Colors.c_gray700} fontSize={11}>중급자</CommonText>
      </BorderBox>
      <BorderBox borderR={20} style={{ paddingLeft: 15, paddingRight: 15 }} marginL={10}>
        <CommonText color={Colors.c_gray700} fontSize={11}>오후</CommonText>
      </BorderBox>
    </RowBox>
    <RowBox alignC>
      <CommonImage source={Arrow_Right} width={24} height={24} />
      <BorderBoxButton onPress={() => {
        setFilterModalOpen(true)
      }}
        bgColor={'#212121'} marginL={15} padding={6} borderR={10}
        style={{ alignItems: 'center', justifyContent: 'center' }} >
        <CommonImage source={Filter_Icon} width={15} height={14} />
      </BorderBoxButton>
    </RowBox>
  </RowBox>
}


export const CalendarBox = () => {

  LocaleConfig.locales['kr'] = {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월'
    ],
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월'
    ],
    monthNamesShort: ['1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: "오늘"
  };
  LocaleConfig.defaultLocale = 'kr';

  return <Container style={{ paddingBottom: 50 }}>
    <Calendar
      LocaleConfig
      theme={{
        textDayFontFamily: 'Pretendard-Medium',
        textDayHeaderFontFamily: 'Pretendard-Medium',
      }}
      renderHeader={(date) => {
        const dateStr = date.toISOString();
        const endIndex = dateStr.indexOf("T");
        const title = moment(dateStr.slice(0, endIndex)).format("YYYY. MM.");
        return <>
          <RowBox alignC height={30}>
            <CommonText marginL={25} marginR={25} fontSize={16} bold>
              {title}
            </CommonText>
          </RowBox>
        </>
      }}
      renderArrow={(direction) => <>
        <RowBox height={30} alignC>
          {direction === 'left' ?
            <CommonImage source={Arrow_Left} width={7} height={14} /> :
            <CommonImage source={Arrow_Right_Calendar} width={7} height={14} />}
        </RowBox>
      </>}
    />
  </Container>
}

export const MatchingListBox = ({ marginT }) => {
  return <View style={{ marginTop: marginT, backgroundColor: '#fff', }}>
    <RowBox justify={'space-between'} padding={20} borderB borderT>
      <CommonText fontSize={12} color={Colors.c_gray400}>
        27개의 구인글
      </CommonText>
      <RowBox alignC >
        <CommonText fontSize={12} marginR={15}>마감 임박순</CommonText>
        <CommonImage source={Arrow_down} width={10} height={20} />
      </RowBox>
    </RowBox>
    <MatchingItem />
    <MatchingItem />
    <MatchingItem borderBottomN />
  </View>
}