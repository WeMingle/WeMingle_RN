import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AccountButton,
  BaseSafeView,
  BorderBox,
  BorderBoxButton,
  CenterBox,
  CheckBox,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
  ProfileBox,
  RowBox,
  boxWidth,
} from '../CommonStyled.style';
import {Colors} from '../../assets/color/Colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Alert_Icon from '../../assets/alert.png';
import Chat_Icon from '../../assets/chat.png';
import {
  ConfigFrmae,
  MatchingTab,
  MyButtonFrame,
} from './style/MyPageStyle.style';
import Arrow_Right_White from '../../assets/arrow_right_white.png';
import Arrow_Right from '../../assets/arrow_right.png';
import AccountHeader from '../../component/header/AccountHeader';
import {CommonHeader} from '../../component/header/CommonHeader';
import Back_Icon from '../../assets/back_icon_white.png';
import Arrow_Down from '../../assets/arrow_down.png';
import CheckBoxON from '../../assets/checkbox_on.png';
import CheckBoxOff from '../../assets/checkbox_off.png';
import {MatchingListBox} from '../matching/style/MatchingStyle';

const ScrapListScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [selectedTab, setSelectedTab] = useState('matching');

  const Tab = ({title = '', isSelected = true}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          setSelectedTab(title === '매칭글' ? 'matching' : 'group')
        }
        style={{
          borderBottomWidth: isSelected ? 2 : 1,
          borderBottomColor: isSelected ? '#212121' : Colors.c_gray300,
          height: 40,
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CommonText bold color={!isSelected && Colors.c_gray500}>
          {title}
        </CommonText>
      </TouchableOpacity>
    );
  };

  return (
    <BaseSafeView>
      <View style={{backgroundColor: '#212121'}}>
        <RowBox alignC padding={20}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={Back_Icon}
              style={{width: 24, height: 24, marginRight: 5, right: 5}}
            />
          </TouchableOpacity>
          <CommonText fontSize={18} color={'#fff'}>
            스크랩
          </CommonText>
        </RowBox>
      </View>
      <RowBox>
        <Tab title="매칭글" isSelected={selectedTab === 'matching'} />
        <Tab title="그룹글" isSelected={selectedTab === 'group'} />
      </RowBox>
      <RowBox
        borderB
        height={40}
        bgColor={'#fff'}
        justify={'space-between'}
        padding={7}
        alignC
        style={{paddingLeft: 15, paddingRight: 15}}>
        <BorderBoxButton
          alignC
          row
          borderR={20}
          style={{paddingLeft: 15, paddingRight: 7}}>
          <CommonText color={Colors.c_gray700} fontSize={11}>
            중급자
          </CommonText>
          <CommonImage source={Arrow_Down} width={16} height={16} />
        </BorderBoxButton>
        <TouchableOpacity>
          <RowBox>
            <CommonText marginR={10}>마감된 매칭 제외</CommonText>
            <CheckBox />
          </RowBox>
        </TouchableOpacity>
      </RowBox>
      <MatchingListBox />
    </BaseSafeView>
  );
};

export default ScrapListScreen;
