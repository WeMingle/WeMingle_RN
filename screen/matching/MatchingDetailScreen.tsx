import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {
  BaseSafeView,
  BorderBox,
  BorderBoxButton,
  CommonImage,
  CommonText,
  ConfirmButton,
  Container,
  RowBox,
  ScreenWidth,
  ScrollContainer,
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
import NaverMapView from 'react-native-nmap';
import {ClickBookmark} from '../myGroup/style/MyGroupStyle.style';
import {CustomModal} from '../../component/modal/CommonModal';

const MatchingDetailScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const TextField = ({leftText = '', rightText = '', marginT = 30}) => {
    return (
      <RowBox marginT={marginT} alignC justify={'space-between'}>
        <CommonText
          style={{width: '20%'}}
          fontSize={12}
          color={Colors.c_gray500}>
          {leftText}
        </CommonText>

        <CommonText fontSize={12}>{rightText}</CommonText>
      </RowBox>
    );
  };

  const ProfileModal = () => {
    return (
      <>
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
            <BorderBox bgColor={Colors.blue100} alignC>
              <CommonText fontSize={12} color={Colors.blue300}>
                매칭경험{' '}
                <CommonText fontSize={12} color={Colors.blue400}>
                  N번
                </CommonText>
              </CommonText>
            </BorderBox>
          </View>
        </RowBox>
        <BorderBox marginT={11} bgColor={Colors.c_gray50}>
          <CommonText style={{padding: 8}}>
            숭실대 축구동아리입니다 2324 신입생 모집중.숭실대 축구동아리입니다
            2324 신입생 모집중 숭실대 축구동아리입니다 2324 신입생 모집중.숭실대
            축구동아리입니다 2324 신입생 모집중
          </CommonText>
        </BorderBox>
        <ConfirmButton style={{left: 0}} marginT={15}>
          <CommonText color={'#fff'}>매칭 신청하기</CommonText>
        </ConfirmButton>
      </>
    );
  };

  const [showProfileModal, setProfileModal] = useState(false);
  const [getGroupModal, setGetGroupModal] = useState(false);

  const _setSelectedGroup = () => {
    setGetGroupModal(false);
    setTimeout(() => {
      navigation.navigate('MatchingRequest');
    }, 100);
  };

  return (
    <BaseSafeView>
      <CustomModal
        modalVisible={showProfileModal}
        setModalVisible={setProfileModal}>
        <ProfileModal />
      </CustomModal>
      <WritableMatchingGroupModal
        modalVisible={getGroupModal}
        setModalVisible={setGetGroupModal}
        selectedGroup={_setSelectedGroup}
      />
      <ScrollContainer padding={0}>
        <View style={{padding: 20}}>
          <CommonHeader
            headerTitle="매칭"
            rightButtonIcon={More_Icon}
            rightButtonPress={() => {}}
          />
          <VerticalBar />
          <RowBox marginT={15}>
            <BorderBoxButton
              onPress={() => setProfileModal(true)}
              width={80}
              height={80}></BorderBoxButton>

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
              style={{
                paddingTop: 20,
                paddingBottom: 20,
              }}>
              <View style={{alignItems: 'center', width: '40%'}}>
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
              <View style={{alignItems: 'center', width: '40%'}}>
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

          <BorderBox
            marginT={8}
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              overflow: 'hidden',
              paddingRight: 0,
            }}>
            <RowBox alignC justify={'space-between'} padding={10}>
              <CommonText fontSize={12} color={Colors.c_gray500}>
                매칭 지역
              </CommonText>
              <CommonText fontSize={12}>
                서울 전체
                <CommonText fontSize={12} color={Colors.c_gray500}>
                  (협의가능)
                </CommonText>
              </CommonText>
            </RowBox>
            <NaverMapView
              zoomControl={false}
              style={{
                width: '100%',
                height: 120,
              }}
            />
          </BorderBox>

          <BorderBox
            marginT={8}
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <CommonText>위밍글러12님의 정보 ✅</CommonText>
            <TextField leftText="실력" rightText="Lv. 1-3" />
            <TextField leftText="인원" rightText="1명" marginT={10} />
            <TextField leftText="성별" rightText="여성" marginT={10} />

            <VerticalBar width={ScreenWidth - 40} />
            <TextField
              leftText="매칭 마감일"
              rightText="2024. 04. 30"
              marginT={10}
            />
            <TextField
              leftText="매칭 방식"
              rightText="직접 승인"
              marginT={10}
            />
          </BorderBox>
        </Container>
        <View style={{padding: 20, paddingBottom: 40}}>
          <CommonText>
            ⚽️ 드리는 말씀 ⚽️ {'\n'}3월 24일 신입생들과 경기 매칭하실 학교
            구합니다! 진지한 경기보단 신입생들이 흥미를 느낄 수 있는 재밌는
            경기를 하고 싶습니다 지역은 협의 가능합니다 채팅주세요~
          </CommonText>
        </View>
      </ScrollContainer>
      <RowBox padding={20} height={80} borderT alignC justify={'space-around'}>
        <View style={{alignItems: 'center'}}>
          <ClickBookmark bookmark={false} width={37} height={37} />
          <CommonText fontSize={10} color={Colors.c_gray500}>
            스크랩
          </CommonText>
        </View>
        <ConfirmButton
          style={{width: '75%', left: 0}}
          onPress={() => {
            setGetGroupModal(true);
          }}>
          <CommonText color={'#fff'}>매칭 신청하기</CommonText>
        </ConfirmButton>
      </RowBox>
    </BaseSafeView>
  );
};

export default MatchingDetailScreen;
