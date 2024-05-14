import {Dimensions, TouchableWithoutFeedback, View} from 'react-native';
import {Colors} from '../assets/color/Colors';

import Home_Icon from '../assets/home_icon.png';
import Home_Icon_On from '../assets/home_on.png';
import Matchin_Icon from '../assets/matching_icon.png';
import Matchin_Icon_On from '../assets/matching_on.png';
import Group_Icon from '../assets/group_icon.png';
import Group_Icon_On from '../assets/group_on.png';
import MyPage_Icon from '../assets/mypage_icon.png';
import MyPage_Icon_On from '../assets/mypage_on.png';

import {useDispatch, useSelector} from 'react-redux';
import {CommonImage, CommonText, RowBox} from '../screen/CommonStyled.style';
import {setCurrentTab} from '../redux/slice/TabNavigatorSlice';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {MyGroup} from '../redux/slice/MyGroupSlice';

export const BottomTabView = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const currentTab = useSelector(state => state.currentTab).currentTab;
  const dispatch = useDispatch();
  const changeTab = (name: string, nextPage: string) => {
    dispatch(setCurrentTab({currentTab: name}));
    if (!!nextPage) {
      navigation.navigate(nextPage);
    }
  };
  // const renderData = ({sliceName}:any) => {
  //   dispatch
  // }

  return (
    <RowBox
      bgColor={'#fff'}
      style={{
        borderTopWidth: 1,
        borderTopColor: Colors.c_gray300,
        bottom: 0,
        width: '100%',
        height: 65,
        alignItems: 'center',
      }}
      justify={'space-around'}>
      {TabMenus.map((v, i) => {
        return (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => {
              changeTab(v.name, v.nextPage);
            }}>
            <View style={{alignItems: 'center', flex: 1}}>
              <CommonImage
                source={currentTab === v.name ? v.onImage : v.image}
                width={24}
                height={24}
              />
              <CommonText
                fontSize={10}
                marginT={5}
                color={currentTab !== v.name && Colors.c_gray500}>
                {v.title}
              </CommonText>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </RowBox>
  );
};

const TabMenus = [
  {
    title: '홈',
    image: Home_Icon,
    onImage: Home_Icon_On,
    name: 'Home',
    nextPage: 'Home',
  },
  {
    title: '매칭',
    image: Matchin_Icon,
    onImage: Matchin_Icon_On,
    name: 'Matching',
    nextPage: 'Matching',
  },
  {
    title: '내그룹',
    image: Group_Icon,
    name: 'MyGroup',
    nextPage: 'MyGroup',
  },
  {
    title: '마이페이지',
    image: MyPage_Icon,
    onImage: MyPage_Icon_On,
    name: 'MyPage',
    nextPage: 'MyPage',
  },
];
