import React, {useState, useEffect} from 'react';
import {View, ScrollView, Modal, TouchableOpacity} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  BaseSafeView,
  CommonImage,
  CommonTouchableOpacity,
  CommonText,
  Container,
  RowBox,
} from '../../CommonStyled.style';
import {BackButton} from '../style/MyGroupStyle.style';
import {Colors} from '../../../assets/color/Colors';
import Flag from '../../../assets/emoji_flags.png';
import Person from '../../../assets/person_01.png';
import RectangleBlue from '../../../assets/RectangleBlue.png';
import RectangleWhite from '../../../assets/RectangleWhite.png';
import ExpandBlue from '../../../assets/expand_more.png';
import Settings from '../../../assets/settings.png';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/Reducers';
import {useAppDispatch} from '../../../redux/Store';
import {
  fetchTeamInfo,
  fetchTeamCondition,
  fetchTeamPosts,
  fetchTeamSearchPosts,
  likeTeamPost,
} from '../../../redux/slice/MyGroup/GroupDetailSlice';
import {FeedTabs} from '../style/FeedTabs';
import DownArrow from '../../../assets/downward_arrow.png';
import {
  NoPermissionModal,
  NotCreateMyPageModal,
  RestrictPeopleModal,
} from '../style/GroupConditionModal';

const FeedPageScreen = ({route}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const item = route.params;
  console.log('넘겨지는 아이템? : ', item);

  const dispatch = useAppDispatch();
  const {teamInfo, teamCondition, loading, error} = useSelector(
    (state: RootState) => state.groupDetail,
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTeamInfo(Number(item.teamPk)));
    dispatch(fetchTeamCondition(Number(item.teamPk)));
    // if (teamCondition && !teamCondition?.beforeWriteInfo) {
    //   setShowModal(true);
    // }
    // if (mockConditionData1 && !mockConditionData1.beforeWriteInfo) {
    //   setShowModal(true);
    // }
    // if (mockConditionData2 && mockConditionData2.isExceedCapacity) {
    //   setShowModal(true);
    // }
    if (mockConditionData3 && !mockConditionData3.isTeamMember) {
      setShowModal(true);
    }
  }, [dispatch, teamCondition]);

  const onPressModal = () => {
    setShowModal(false);
    navigation.navigate('MyPage');
  };

  console.log('팀 정보 : ', teamInfo);
  console.log('팀 컨디션? : ', teamCondition);
  console.log('로딩 : ', loading);
  console.log('에러 : ', error);

  //사용자 마이페이지 완성 전
  const mockConditionData1 = {
    beforeWriteInfo: false,
    univCondResult: true,
    genderCondResult: {
      gender: 'MALE',
      satisfiedGenderCond: false,
    },
    birthYearCondResult: {
      startAge: 2000,
      endAge: 2010,
      satisfiedBirthYearCond: false,
    },
    isTeamMember: true,
    isTeamRequest: false,
    isExceedCapacity: true,
  };

  //인원 제한을 달성한 그룹
  const mockConditionData2 = {
    beforeWriteInfo: true,
    univCondResult: null,
    genderCondResult: null,
    birthYearCondResult: null,
    isTeamMember: true,
    isTeamRequest: true,
    isExceedCapacity: true,
  };

  //그룹 조건에 모두 해당하지만, 그룹의 멤버로 속해있지 않을 때
  const mockConditionData3 = {
    beforeWriteInfo: true,
    univCondResult: null,
    genderCondResult: null,
    birthYearCondResult: null,
    isTeamMember: false,
    isTeamRequest: false,
    isExceedCapacity: true,
  };

  //같은 대학만 조건 활성화, 같은 성별만 조건 활성화, 나이 조건 활성화
  const mockConditionData4 = {
    beforeWriteInfo: false,
    univCondResult: true,
    genderCondResult: {
      gender: 'MALE', //그룹의 조건인 성별
      satisfiedGenderCond: true,
    },
    birthYearCondResult: {
      startAge: 2000, //그룹의 나이 조건 start
      endAge: 2010, //그룹의 나이 조건 end
      satisfiedBirthYearCond: true,
    },
    isTeamMember: true,
    isTeamRequest: false,
    isExceedCapacity: true,
  };

  return (
    <BaseSafeView>
      <ScrollView>
        <Container bgColor={'#212121'} padding={0}>
          <View style={{paddingHorizontal: 20, paddingVertical: 70}}>
            <RowBox alignC justify={'space-start'}>
              <BackButton />
            </RowBox>
          </View>
          <View
            style={{
              width: '100%',
              height: '100%',
              paddingTop: 30,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 30,
                justifyContent: 'space-between',
              }}>
              <CommonTouchableOpacity
                style={{borderRadius: 10}}
                bgColor={'#000000'}
                width={88}
                height={88}
              />
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  alignItems: 'flex-start',
                  marginLeft: 15,
                  height: 88,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <CommonImage source={Flag} width={10} height={10} />
                  <CommonText
                    fontSize={10}
                    color={'#96A0B5'}
                    textAlignC
                    paddingLeft={3}
                    paddingRight={15}>
                    {teamInfo?.createDate}
                  </CommonText>
                  <CommonImage source={Person} width={10} height={10} />
                  <CommonText
                    fontSize={10}
                    color={'#96A0B5'}
                    textAlignC
                    paddingLeft={3}>
                    {teamInfo?.teamMemberCnt}명
                  </CommonText>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      flex: 1,
                    }}>
                    <CommonImage source={Settings} width={24} height={24} />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <CommonText fontSize={18} color={'#1C1C1C'} textAlignC>
                    {teamInfo?.teamName}
                  </CommonText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#E7F1FF',
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      flexDirection: 'row',
                      borderRadius: 20,
                    }}>
                    <CommonImage
                      source={RectangleBlue}
                      width={8}
                      height={8}
                      marginRight={1}
                    />
                    <CommonImage
                      source={RectangleBlue}
                      width={8}
                      height={8}
                      marginRight={1}
                    />
                    <CommonImage
                      source={RectangleBlue}
                      width={8}
                      height={8}
                      marginRight={1}
                    />
                    <CommonImage
                      source={RectangleBlue}
                      width={8}
                      height={8}
                      marginRight={1}
                    />
                    <CommonImage source={RectangleWhite} width={8} height={8} />
                  </View>
                  <CommonText
                    fontSize={12}
                    color={'#0E6FFF'}
                    textAlignC
                    paddingLeft={5}
                    paddingRight={5}>
                    매칭일지 3개
                  </CommonText>
                  <CommonImage source={ExpandBlue} width={4.5} height={8} />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 30,
                marginTop: 20,
              }}>
              <CommonText
                fontSize={12}
                color={'#6B768B'}
                numberOfLines={2}
                ellipsizeMode="tail">
                {teamInfo?.content}
              </CommonText>
            </View>
            <FeedTabs teamPk={item.teamPk} />
          </View>
        </Container>
      </ScrollView>
      {/* {showModal && <NotCreateMyPageModal visible={showModal} />} */}
      {/* {showModal && <RestrictPeopleModal visible={showModal} />} */}
      {/* {showModal && (
        <NoPermissionModal visible={showModal} teamPk={item.teamPk} />
      )} */}
    </BaseSafeView>
  );
};

export default FeedPageScreen;
