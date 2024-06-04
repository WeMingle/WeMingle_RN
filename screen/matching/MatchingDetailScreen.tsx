import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {
  BaseSafeView,
  BorderBox,
  CommonImage,
  CommonText,
  ConfirmButton,
  Container,
  RowBox,
  VerticalBar,
} from '../CommonStyled.style';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  CommonHeader,
  CommonHeaderBlack,
} from '../../component/header/CommonHeader';
import CalendarBox from '../../component/CalendarBox';
import {getMatchingWritableGroup} from '../../api/Matching';
import WritableMatchingGroupModal from '../../component/modal/WritableMatchingGroupModal';

import More_Icon from '../../assets/more_botton.png';
import Gray_Person from '../../assets/gray_person.png';
import Clean_User_Icon from '../../assets/clean_user.png';
import Report_User_Icon from '../../assets/report_user.png';
import Group_User_Icon from '../../assets/group_user.png';
import Chat_Icon from '../../assets/blue_chat.png';
import Schedule_Icon from '../../assets/schedule_icon.png';

import {Colors} from '../../assets/color/Colors';

const MatchingDetailScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <BaseSafeView>
      <View style={{padding: 20}}>
        <CommonHeader
          headerTitle="매칭"
          rightButtonIcon={More_Icon}
          rightButtonPress={() => {}}
        />
        <VerticalBar />
        <RowBox marginT={15}>
          <BorderBox width={80} height={80}></BorderBox>

          <View style={{marginLeft: 10, justifyContent: 'space-around'}}>
            <RowBox alignC>
              <CommonImage source={Gray_Person} width={18} height={18} />
              <CommonText fontSize={12} color={Colors.c_gray500}>
                개인
              </CommonText>
            </RowBox>
            <RowBox alignC>
              <CommonText bold>위밍글러12</CommonText>
              <CommonText fontSize={10} color={Colors.c_gray500} marginL={5}>
                매칭경험 3번
              </CommonText>
            </RowBox>
            <RowBox alignC>
              <CommonImage source={Clean_User_Icon} width={24} height={24} />
              <CommonText color={Colors.c_gray700} marginL={5}>
                신고 이력이 없는 이용자예요!
              </CommonText>

              {/* <CommonImage source={Report_User_Icon} width={24} height={24} />
              <CommonText>신고 이력이 없는 2건</CommonText> */}
            </RowBox>
          </View>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,

              backgroundColor: 'transparent',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
              alignSelf: 'center',
              marginLeft: 35,
            }}>
            <View
              style={{
                width: 50,
                height: 50,

                backgroundColor: '#fff',
                borderRadius: 25,
                overflow: 'hidden',

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CommonImage source={Chat_Icon} width={28} height={28} />
            </View>
          </TouchableOpacity>
        </RowBox>
      </View>
      <Container bgColor={Colors.c_gray100}>
        <BorderBox>
          <RowBox
            justify={'space-around'}
            alignC
            style={{paddingTop: 20, paddingBottom: 20}}>
            <View style={{alignItems: 'center'}}>
              <CommonText color={Colors.c_gray300} bold fontSize={12}>
                매칭 상대
              </CommonText>
              <CommonImage
                source={Group_User_Icon}
                width={30}
                height={24}
                marginT={20}
                marginB={20}
              />
              <CommonText>개인 / 그룹</CommonText>
            </View>
            <View
              style={{
                width: 1,
                height: 50,
                backgroundColor: Colors.c_gray500,
              }}></View>
            <View style={{alignItems: 'center'}}>
              <CommonText color={Colors.c_gray300} bold fontSize={12}>
                일정
              </CommonText>
              <CommonImage
                source={Schedule_Icon}
                width={30}
                height={23}
                marginT={20}
                marginB={20}
              />
              <CommonText>2024.03.14 (목)</CommonText>
            </View>
          </RowBox>
        </BorderBox>
      </Container>
    </BaseSafeView>
  );
};

export default MatchingDetailScreen;
