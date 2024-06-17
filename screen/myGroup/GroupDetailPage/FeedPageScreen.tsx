import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
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
import MoreVert from '../../../assets/more_vert.png';
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
import {
  ChattingScreen,
  FeedScreen,
  // FeedTabs,
  // MemberScreen,
} from '../style/FeedTabs';
import {
  NoPermissionModal,
  NotCreateMyPageModal,
  RestrictPeopleModal,
  ProfileModal,
} from '../style/GroupConditionModal';
import {Checkbox} from 'react-native-paper';
import {FloatingAction} from 'react-native-floating-action';
import JamWrite from '../../../assets/jam_write.png';
import Notification from '../../../assets/notification_important.png';
import ArrowBlackButton from '../../../assets/arrow_right_black.png';

const FeedPageScreen = ({route}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const item = route.params;
  console.log('넘겨지는 아이템? : ', item);

  const dispatch = useAppDispatch();
  const {teamInfo, teamCondition, loading, error} = useSelector(
    (state: RootState) => state.groupDetail,
  );
  const [showModal, setShowModal] = useState(false);
  const [clickedTab, setClickedTab] = useState('그룹 피드');

  //그룹원 우측 모달 (시작)
  const [selected, setSelected] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({x: 0, y: 0});

  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
    setSelected(null);
  };
  //그룹원 우측 모달 (끝)

  const onPressTab = (tabName: string) => {
    setClickedTab(tabName);
  };

  useEffect(() => {
    dispatch(fetchTeamInfo(Number(item.teamPk)));
    dispatch(fetchTeamCondition(Number(item.teamPk)));
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

  //그룹원 스크린
  const MemberScreen = ({teamPk}: any) => {
    const memberData = {
      1: {
        imgUrl:
          'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/46faa1ec-1448-4625-ae67-15e9d98b8f40?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240614T170031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240614%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=4cf88aaa4fc2dbe918e1b9516960245efe83945033ae3e605f441dc760d6b6c8',
        nickname: 'nickname0',
        teamRole: 'PARTICIPANT',
        isMe: true,
      },
      2: {
        imgUrl:
          'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/46faa1ec-1448-4625-ae67-15e9d98b8f40?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240614T170031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240614%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=4cf88aaa4fc2dbe918e1b9516960245efe83945033ae3e605f441dc760d6b6c8',
        nickname: 'nickname0',
        teamRole: 'LEADER',
        isMe: false,
      },
      3: {
        imgUrl:
          'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/46faa1ec-1448-4625-ae67-15e9d98b8f40?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240614T170031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240614%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=4cf88aaa4fc2dbe918e1b9516960245efe83945033ae3e605f441dc760d6b6c8',
        nickname: 'nickname0',
        teamRole: 'PARTICIPANT',
        isMe: false,
      },
      4: {
        imgUrl:
          'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/46faa1ec-1448-4625-ae67-15e9d98b8f40?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240614T170031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240614%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=4cf88aaa4fc2dbe918e1b9516960245efe83945033ae3e605f441dc760d6b6c8',
        nickname: 'nickname0',
        teamRole: 'PARTICIPANT',
        isMe: false,
      },
    };

    const memberValues = Object.values(memberData);
    const memberKeys = Object.keys(memberData);

    let memberList: any[] = [];

    for (let i = 0; i < memberValues.length; i++) {
      memberList.push({
        memberPk: memberKeys[i],
        imgUrl: memberValues[i].imgUrl,
        nickname: memberValues[i].nickname,
        teamRole: memberValues[i].teamRole,
        isMe: memberValues[i].isMe,
      });
    }

    const openModal = (x: number, y: number, item: any) => {
      setSelected(item.memberPk);
      setModalPosition({x, y});
      setIsVisible(true);
    };

    return (
      <View
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          height: '100%',
        }}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: 'pink',
              width: '100%',
              padding: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <CommonText fontSize={14} color={'#212121'}>
                그룹원 신청
              </CommonText>
              <CommonText fontSize={12} color={'#6B768B'}>
                아직 새로운 신청이 없습니다.
              </CommonText>
            </View>
            <CommonImage
              source={ArrowBlackButton}
              width={24}
              height={24}
              alignC
            />
          </View>
        </TouchableOpacity>
        {memberList.map(item => (
          <View
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: '#EAEDF4',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // backgroundColor: 'yellow',
            }}
            key={item.memberPk}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 15,
              }}>
              {!item.isMe && (
                <View style={{marginRight: 10}}>
                  <Checkbox status="unchecked" />
                </View>
              )}
              <CommonTouchableOpacity
                style={[
                  {
                    borderRadius: 10,
                    alignItems: 'center',
                  },
                ]}
                bgColor={'#D7DCE5'}
                width={40}
                height={40}
                onPress={() =>
                  setProfileModalVisible(true)
                }></CommonTouchableOpacity>
              {item.isMe && (
                <View
                  style={{
                    backgroundColor: '#8491A7',
                    paddingVertical: 4,
                    paddingHorizontal: 5,
                    borderRadius: 50,
                    marginLeft: 10,
                  }}>
                  <CommonText fontSize={9} color={'#ffffff'} textAlignC>
                    나
                  </CommonText>
                </View>
              )}
              <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
                <CommonText
                  fontSize={14}
                  color={'#000000'}
                  textAlignC
                  paddingLeft={10}
                  paddingRight={5}>
                  {item.nickname}
                </CommonText>
              </TouchableOpacity>
              {item.teamRole === 'LEADER' && (
                <CommonImage
                  source={RectangleBlue}
                  width={10}
                  height={10.5}
                  zIndex={0}
                />
              )}
            </View>
            {item.isMe === true && (
              <TouchableOpacity
                onPress={event => {
                  const {pageX, pageY} = event.nativeEvent;
                  openModal(pageX, pageY, item);
                }}
                style={{zIndex: 0}}>
                <CommonImage
                  source={MoreVert}
                  width={24}
                  height={24}
                  zIndex={0}
                  marginRight={10}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    );
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CommonImage source={Flag} width={10} height={10} />
                  <CommonText
                    fontSize={10}
                    color={'#96A0B5'}
                    textAlignC
                    paddingLeft={5}
                    paddingRight={15}>
                    {teamInfo?.createDate}
                  </CommonText>
                  <CommonImage source={Person} width={16} height={16} />
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
                    <TouchableOpacity
                      onPress={() => navigation.navigate('GroupSetting')}>
                      <CommonImage source={Settings} width={22} height={24} />
                    </TouchableOpacity>
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
            {/* <FeedTabs teamPk={item.teamPk} /> */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                // backgroundColor: 'yellow',
                marginTop: 20,
                borderBottomWidth: 2,
                borderBottomColor: '#EAEDF4',
              }}>
              <View
                style={[
                  styles.tabStyle,
                  clickedTab === '그룹 피드' && {
                    borderBottomWidth: 2,
                    borderBottomColor: '#0E6FFF',
                  },
                ]}>
                <TouchableOpacity onPress={() => onPressTab('그룹 피드')}>
                  <CommonText
                    fontSize={14}
                    color={clickedTab === '그룹 피드' ? '#1C1C1C' : '#BDBDBD'}>
                    그룹 피드
                  </CommonText>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.tabStyle,
                  clickedTab === '채팅' && {
                    borderBottomWidth: 2,
                    borderBottomColor: '#0E6FFF',
                  },
                ]}>
                <TouchableOpacity onPress={() => onPressTab('채팅')}>
                  <CommonText
                    fontSize={14}
                    color={clickedTab === '채팅' ? '#1C1C1C' : '#BDBDBD'}>
                    채팅
                  </CommonText>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.tabStyle,
                  clickedTab === '그룹원' && {
                    borderBottomWidth: 2,
                    borderBottomColor: '#0E6FFF',
                  },
                ]}>
                <TouchableOpacity onPress={() => onPressTab('그룹원')}>
                  <CommonText
                    fontSize={14}
                    color={clickedTab === '그룹원' ? '#1C1C1C' : '#BDBDBD'}>
                    그룹원
                  </CommonText>
                </TouchableOpacity>
              </View>
            </View>
            {clickedTab === '그룹 피드' && <FeedScreen teamPk={item.teamPk} />}
            {clickedTab === '채팅' && <ChattingScreen teamPk={item.teamPk} />}
            {clickedTab === '그룹원' && <MemberScreen teamPk={item.teamPk} />}
          </View>
        </Container>
      </ScrollView>
      {/* {showModal && <NotCreateMyPageModal visible={showModal} />} */}
      {/* {showModal && <RestrictPeopleModal visible={showModal} />} */}
      {/* {showModal && (
        <NoPermissionModal visible={showModal} teamPk={item.teamPk} />
      )} */}
      {/* 그룹원 -> 본인 프로필 모달 */}
      <Modal
        transparent={true}
        visible={isVisible}
        onRequestClose={closeModal}
        animationType="fade">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay}>
            <View
              style={[
                styles.modal,
                {top: modalPosition.y, left: modalPosition.x - 120},
              ]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ModifyProfile')}>
                <CommonText fontSize={14} color={'#212121'} numberOfLines={1}>
                  프로필 수정
                </CommonText>
              </TouchableOpacity>
              <TouchableOpacity>
                <CommonText fontSize={14} color={'#FF5D5D'} numberOfLines={1}>
                  그룹 탈퇴하기
                </CommonText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* 프로필 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => {
          setProfileModalVisible(false);
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setProfileModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <View
              style={{
                backgroundColor: '#ffffff',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                width: '100%',
                height: '60%',
                position: 'absolute',
                bottom: 0,
                // borderWidth: 1,
                padding: 20,
              }}>
              <View
                style={{
                  alignItems: 'flex-end',
                  // backgroundColor: 'red'
                }}>
                <CommonImage source={Notification} width={24} height={24} />
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 10,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={80}
                  height={80}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingTop={10}>
                  축구왕슛돌이
                </CommonText>
                <View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderRadius: 15,
                    backgroundColor: '#E7F1FF',
                    marginTop: 10,
                    flexDirection: 'row',
                  }}>
                  <CommonText
                    fontSize={12}
                    color={'#6EA9FF'}
                    textAlignC
                    paddingRight={5}>
                    매칭경험
                  </CommonText>
                  <CommonText fontSize={12} color={'#0E6FFF'} textAlignC>
                    23번
                  </CommonText>
                </View>
                <View
                  style={{
                    width: '90%',
                    height: 100,
                    backgroundColor: '#F4F6FA',
                    marginHorizontal: 20,
                    marginTop: 20,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View
                    style={{
                      width: 52,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <CommonText
                      fontSize={12}
                      color={'#96A0B5'}
                      marginBottom={10}>
                      학교
                    </CommonText>
                    <CommonText
                      fontSize={12}
                      color={'#96A0B5'}
                      marginBottom={10}>
                      실력
                    </CommonText>
                    <CommonText fontSize={12} color={'#96A0B5'}>
                      활동지역
                    </CommonText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <CommonText
                      fontSize={12}
                      color={'#373F57'}
                      marginBottom={10}>
                      숭실대학교
                    </CommonText>
                    <CommonText
                      fontSize={12}
                      color={'#373F57'}
                      marginBottom={10}>
                      Lv.1~3
                    </CommonText>
                    <CommonText fontSize={12} color={'#373F57'}>
                      서울
                    </CommonText>
                  </View>
                  <View
                    style={{
                      width: 52,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <CommonText
                      fontSize={12}
                      color={'#96A0B5'}
                      marginBottom={10}>
                      성별
                    </CommonText>
                    <CommonText
                      fontSize={12}
                      color={'#96A0B5'}
                      marginBottom={10}>
                      나이
                    </CommonText>
                    <CommonText fontSize={12} color={'#96A0B5'}>
                      신고내역
                    </CommonText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <CommonText
                      fontSize={12}
                      color={'#373F57'}
                      marginBottom={10}>
                      비공개
                    </CommonText>
                    <CommonText
                      fontSize={12}
                      color={'#373F57'}
                      marginBottom={10}>
                      비공개
                    </CommonText>
                    <CommonText fontSize={12} color={'#373F57'}>
                      없음
                    </CommonText>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    backgroundColor: '#212121',
                    padding: 15,
                    borderRadius: 15,
                    marginTop: 20,
                  }}>
                  <CommonText
                    fontSize={16}
                    color={'#FFFFFF'}
                    textAlignC
                    textAlignVertical={'center'}>
                    1:1 채팅하기
                  </CommonText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* 플로팅(그룹장에게만 보임) */}
      <FloatingAction
        showBackground={false}
        floatingIcon={<CommonImage source={JamWrite} width={20} height={20} />}
        onPressMain={() => {
          navigation.navigate('GroupWrite');
        }}
      />
    </BaseSafeView>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    position: 'absolute',
    width: 120,
    height: 80,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    justifyContent: 'space-between',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 색상 설정
  },
});

export default FeedPageScreen;
