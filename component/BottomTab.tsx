import {Dimensions, TouchableWithoutFeedback, View} from 'react-native';
import {Colors} from '../assets/color/Colors';

import Home_Icon from '../assets/home_icon.png';
import Matchin_Icon from '../assets/matching_icon.png';
import Group_Icon from '../assets/group_icon.png';
import MyPage_Icon from '../assets/mypage_icon.png';
import {useDispatch, useSelector} from 'react-redux';
import {CommonImage, CommonText, RowBox} from '../screen/CommonStyled.style';
import {setCurrentTab} from '../redux/slice/TabNavigatorSlice';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

export const BottomTabView = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const currentTab = useSelector(state => state.currentTab).currentTab;
  const dispatch = useDispatch();
  const changeTab = (name, nextPage) => {
    dispatch(setCurrentTab({currentTab: name}));
    if (!!nextPage) {
      navigation.navigate(nextPage);
    }
  };

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
              <CommonImage source={v.image} width={24} height={24} />
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
    // selectedImage: Home_Icon,
    name: 'Home',
    nextPage: '',
  },
  {
    title: '매칭',
    image: Matchin_Icon,
    name: 'Matching',
    nextPage: 'Matching',
  },
  {
    title: '내그룹',
    image: Group_Icon,
    name: 'MyGroup',
  },
  {
    title: '마이페이지',
    image: MyPage_Icon,
    name: 'MyPage',
    nextPage: 'MyPage',
  },
];
