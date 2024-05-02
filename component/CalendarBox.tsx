import {Colors} from '../assets/color/Colors';
import {
  CommonImage,
  CommonText,
  Container,
  RowBox,
} from '../screen/CommonStyled.style';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';

import Arrow_Left from '../assets/arrow_left.png';
import Arrow_Right_Calendar from '../assets/arrow_right_calendar.png';
import {useState, memo, useEffect} from 'react';

interface CalendarBoxProps {
  selectedDate?: string | string[];
  setSelectedDate: (day: string) => void;
}

interface markedDates {
  [prop: string]: any;
  string?: {
    selected?: boolean;
    selectedColor?: string;
  };
}

const CalendarBox = memo(
  ({selectedDate, setSelectedDate}: CalendarBoxProps) => {
    const [markedDates, setMarkedDates] = useState<markedDates>({});

    useEffect(() => {
      if (!Array.isArray(selectedDate)) {
        setMarkedDates(() => {
          if (selectedDate)
            return {
              [selectedDate]: {
                selected: true,
                selectedColor: Colors.blue400,
              },
            };
        });
        return;
      }

      const dates: markedDates = {};
      selectedDate.map((v: string, i) => {
        dates[v] = {
          selected: true,
          selectedColor: Colors.blue400,
        };
      });
      setMarkedDates(dates);
    }, [selectedDate]);

    return (
      <Container style={{paddingBottom: 50}}>
        <Calendar
          LocaleConfig
          theme={{
            textDayFontFamily: 'Pretendard-Medium',
            textDayHeaderFontFamily: 'Pretendard-Medium',
            todayTextColor: Colors.informative,
          }}
          disableAllTouchEventsForDisabledDays={true}
          minDate={moment().format('YYYY-MM-DD')}
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
          renderHeader={date => {
            const dateStr = date.toISOString();
            const endIndex = dateStr.indexOf('T');
            const title = moment(dateStr.slice(0, endIndex)).format(
              'YYYY. MM.',
            );
            return (
              <>
                <RowBox alignC height={30}>
                  <CommonText marginL={25} marginR={25} fontSize={16} bold>
                    {title}
                  </CommonText>
                </RowBox>
              </>
            );
          }}
          renderArrow={direction => (
            <>
              <RowBox height={30} alignC>
                {direction === 'left' ? (
                  <CommonImage source={Arrow_Left} width={7} height={14} />
                ) : (
                  <CommonImage
                    source={Arrow_Right_Calendar}
                    width={7}
                    height={14}
                  />
                )}
              </RowBox>
            </>
          )}
          markedDates={markedDates}
        />
      </Container>
    );
  },
);

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
    '12월',
  ],
  monthNamesShort: [
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
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

export default CalendarBox;
