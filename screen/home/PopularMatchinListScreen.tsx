import {
  BaseSafeView,
  BorderBox,
  CommonImage,
  CommonText,
  Container,
  HorizontalBar,
  MatchingItem,
  RowBox,
  ScreenWidth,
  ScrollContainer,
} from '../CommonStyled.style';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import Alert_Icon from '../../assets/alert.png';
import Chat_Icon from '../../assets/chat.png';
import WeMingle from '../../assets/WeMingle.png';
import tmpImage from '../../assets/Frame.png';
import Gray_Person from '../../assets/gray_person.png';

import calendar from '../../assets/calendar_month.png';
import person from '../../assets/person.png';
import Arrow_Right from '../../assets/arrow_right.png';

import {FlatList, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../assets/color/Colors';
import {useEffect, useState} from 'react';
import {
  getPopularMatchingList,
  getRecentMatchingList,
} from '../../api/Matching';
import {CommonHeaderBlack} from '../../component/header/CommonHeader';

interface MatchingList {
  [prop: string]: any;
}

const PopularMatchinListScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [popularMatchingList, setPopularMatchingList] = useState<MatchingList>(
    {},
  );
  const [recentMatchingList, setRecentMatchingList] = useState<MatchingList>(
    {},
  );

  useEffect(() => {
    const getAsyncFunc = async () => {
      const result = await getPopularMatchingList();
      const result2 = await getRecentMatchingList();

      setPopularMatchingList(result);
      setRecentMatchingList(result2);
    };
    getAsyncFunc();
  }, []);

  return (
    <BaseSafeView>
      <FlatList
        ListHeaderComponent={
          <CommonHeaderBlack headerTitle="인기 매칭글"></CommonHeaderBlack>
        }
        data={Object.keys(popularMatchingList)}
        renderItem={({item}) => {
          return <MatchingItem item={popularMatchingList[item]}></MatchingItem>;
        }}
      />
    </BaseSafeView>
  );
};

export default PopularMatchinListScreen;
