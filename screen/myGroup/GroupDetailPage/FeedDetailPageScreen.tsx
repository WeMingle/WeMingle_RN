import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
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
import {
  BackBlackButton,
  ChattingIcon,
  ClickBookmark,
  ClickFavorite,
  SearchBlackButton,
  VoteComponent,
  VoteDetailComponent,
} from '../style/MyGroupStyle.style';
import {useSelector} from 'react-redux';
import {
  checkNicknameAvailability,
  fetchTeamRequestPageData,
} from '../../../redux/slice/MyGroup/GroupApplySlice';
import {RootState} from '../../../redux/Reducers';
import {useAppDispatch} from '../../../redux/Store';
import {SearchButton} from '../style/MyGroupStyle.style';
import MoreVertBlack from '../../../assets/more_vert_black.png';
import NotificationImportant from '../../../assets/notification_important.png';
import MoreVert from '../../../assets/more_vert.png';

interface QDataItem {
  teamQuestionKey: string;
  teamQuestionValue: string;
}

const FeedDetailPageScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  //   const item = route.params;
  //   console.log('넘겨지는 아이템 (그룹 가입하기)? : ', item);

  const dispatch = useAppDispatch();
  const {
    requestPageData,
    nicknameAvailable,
    profileUploadUrl,
    joinRequestStatus,
    status,
    error,
  } = useSelector((state: RootState) => state.groupApply);

  const [nickName, setNickName] = useState('');
  //여기서 부터 다시시작
  const [qData, setQData] = useState<QDataItem[]>([]);
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});

  useEffect(() => {
    dispatch(fetchTeamRequestPageData(Number(1)));
    // dispatch(joinTeamRequest());
  }, [dispatch]);

  console.log('requestPageData : ', requestPageData);

  const nickNameCheck = useCallback(() => {
    dispatch(
      checkNicknameAvailability({
        teamId: 1,
        nickname: nickName,
      }),
    );
  }, [nickName]);

  console.log('닉네임 사용가능? : ', nicknameAvailable);

  const mockPageData = {
    imgUrl:
      'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/member/8217bbe1-1d86-4f65-a612-f83e1db53ed5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240505T145125Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240505%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=2f1fecc1e08c08e4bc245d4ebadfb8e2b799eb276c59bcc1c6aeec806fcc4ae5',
    matchingCnt: 0,
    nickname: 'nickname0',
    univName: '가천대학교',
    gender: 'MALE',
    ability: null, //null -> 미입력
    majorArea: '강원', //null -> 미입력
    age: '0', //null -> 미입력
    reportCnt: 0,
    teamQuestionnaires: {
      '1': '123',
      '2': '234',
      '3': '4234',
      '4': '234234234',
    },
  };

  const mockDataList = [mockPageData];
  const teamQuestionKeys = Object.keys(mockPageData.teamQuestionnaires);
  const teamQuestionValues = Object.values(mockPageData.teamQuestionnaires);
  let teamQuestionLists = [];
  for (let i = 0; i < teamQuestionKeys.length; i++) {
    teamQuestionLists.push({
      teamQuestionKey: teamQuestionKeys[i],
      teamQuestionValue: teamQuestionValues[i],
    });
  }

  const handlePromiseTextChange = (id: string, text: string) => {
    if (text.length <= 100) {
      setInputValues(prevState => ({
        ...prevState,
        [id]: text,
      }));
    }
  };

  const sampleVoteData = [
    {
      optionName: '찬성',
      resultCnt: 0,
    },
    {
      optionName: '반대',
      resultCnt: 0,
    },
    {
      optionName: '애매',
      resultCnt: 0,
    },
    {
      optionName: '상관없음',
      resultCnt: 0,
    },
  ];

  return (
    <BaseSafeView>
      <ScrollView>
        {mockDataList.map(item => (
          <Container bgColor={'#ffffff'} padding={0} key={item.nickname}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderColor: '#EAEDF4',
              }}>
              <RowBox alignC justify={'space-between'}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <BackBlackButton />
                  <CommonText fontSize={18} color={'#1C1C1C'}>
                    숭실대 축구동아리
                  </CommonText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <SearchBlackButton width={24} height={24} />
                  <CommonImage
                    source={MoreVertBlack}
                    width={3}
                    height={24}
                    marginLeft={24}
                  />
                </View>
              </RowBox>
            </View>
            <View style={{width: '100%'}}>
              {/* <View style={{width: '100%'}} key={item.postPk}> */}
              <View style={{padding: 20}}>
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('FeedDetail')}> */}
                <RowBox alignC justify={'space-between'}>
                  {/* <CommonText fontSize={18}>{item?.title}</CommonText> */}
                  <CommonText fontSize={18}>
                    2월 17일 축동 매칭 수요조사
                  </CommonText>
                  {/* <CommonImage
                      source={More_Vert}
                      width={3}
                      height={14.54}
                      marginHorizontal={10}
                    /> */}
                </RowBox>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <RowBox alignC justify={'space-start'} marginT={10}>
                    <CommonTouchableOpacity
                      style={[
                        {
                          borderRadius: 50,
                          alignItems: 'center',
                        },
                      ]}
                      bgColor={'#AFBAC8'}
                      width={20}
                      height={20}></CommonTouchableOpacity>
                    <CommonText
                      fontSize={14}
                      color={'#AFBAC8'}
                      paddingLeft={5}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      그룹장
                    </CommonText>
                    {/* <CommonText
                      fontSize={10}
                      color={'#AFBAC8'}
                      paddingLeft={5}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item?.nickname}
                    </CommonText> */}
                    <CommonText
                      fontSize={14}
                      color={'#AFBAC8'}
                      paddingLeft={10}>
                      • 56분전
                    </CommonText>
                    {/* <CommonText
                      fontSize={10}
                      color={'#AFBAC8'}
                      paddingLeft={25}>
                      {item?.createdTime}
                    </CommonText> */}
                  </RowBox>
                  <ClickBookmark bookmark={false} width={24} height={24} />
                </View>
                <CommonText
                  fontSize={16}
                  color={'#292E41'}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  paddingTop={30}
                  paddingBottom={10}>
                  매칭을 희망하는 분은 투표 진행해주세요.
                </CommonText>
                {/* <CommonText
                    fontSize={14}
                    color={'#292E41'}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    paddingTop={10}>
                    {item?.content}
                  </CommonText> */}
                {/* <VoteComponent
                  vote_title={'투표 타이틀'}
                  voting_member={'0'}
                  closing_date={'2024-04-04'}
                  voteOptionInfos={sampleVoteData}
                /> */}
                <VoteDetailComponent
                  vote_title={'투표 타이틀'}
                  voting_member={'0'}
                  closing_date={'2024-04-04'}
                  voteOptionInfos={sampleVoteData}
                  backgroundColor={'#0E6FFF'}
                />
                {/* <VoteComponent
                    vote_title={'투표 타이틀'}
                    voting_member={'0'}
                    closing_date={'2024-04-04'}
                    voteOptionInfos={item?.voteInfo.voteOptionInfos}
                  /> */}
                {/* </TouchableOpacity> */}
                <View>
                  <View style={{width: '100%', marginTop: 10}}>
                    <RowBox justify={'space-start'}>
                      <ClickFavorite
                        favorite_click={true}
                        favorite_num={1}
                        width={24}
                        height={24}
                      />
                      <ChattingIcon chatting_num={3} width={24} height={24} />
                    </RowBox>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#D7DCE5',
                }}
              />
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#EAEDF4',
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <CommonTouchableOpacity
                    style={[
                      {
                        borderRadius: 5,
                        alignItems: 'center',
                      },
                    ]}
                    bgColor={'#D7DCE5'}
                    width={20}
                    height={20}></CommonTouchableOpacity>
                  <CommonText
                    fontSize={14}
                    color={'#212121'}
                    paddingLeft={10}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    그룹원
                  </CommonText>
                </View>
                <CommonImage
                  source={NotificationImportant}
                  width={18.5}
                  height={20}
                />
              </View>
              <CommonText
                fontSize={14}
                color={'#8491A7'}
                paddingTop={10}
                numberOfLines={1}
                ellipsizeMode="tail">
                신고된 댓글입니다
              </CommonText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <CommonText
                  fontSize={10}
                  color={'#AFBAC8'}
                  paddingTop={10}
                  numberOfLines={1}>
                  2024.02.14
                </CommonText>
                <TouchableOpacity>
                  <CommonText
                    fontSize={10}
                    color={'#AFBAC8'}
                    paddingTop={10}
                    paddingLeft={10}
                    numberOfLines={1}>
                    답글 쓰기
                  </CommonText>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#EAEDF4',
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <CommonTouchableOpacity
                    style={[
                      {
                        borderRadius: 5,
                        alignItems: 'center',
                      },
                    ]}
                    bgColor={'#D7DCE5'}
                    width={20}
                    height={20}></CommonTouchableOpacity>
                  <CommonText
                    fontSize={14}
                    color={'#212121'}
                    paddingLeft={10}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    그룹원
                  </CommonText>
                </View>
                {/* <CommonImage source={MoreVert} width={2.5} height={12.1} /> */}
              </View>
              <CommonText
                fontSize={14}
                color={'#8491A7'}
                paddingTop={10}
                numberOfLines={1}
                ellipsizeMode="tail">
                삭제된 댓글입니다
              </CommonText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <CommonText
                  fontSize={10}
                  color={'#AFBAC8'}
                  paddingTop={10}
                  numberOfLines={1}>
                  2024.02.14
                </CommonText>
                <TouchableOpacity>
                  <CommonText
                    fontSize={10}
                    color={'#AFBAC8'}
                    paddingTop={10}
                    paddingLeft={10}
                    numberOfLines={1}>
                    답글 쓰기
                  </CommonText>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#EAEDF4',
                paddingVertical: 20,
                paddingRight: 20,
                paddingLeft: 70,
                // marginLeft: 50,
                backgroundColor: '#F8FAFC',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <CommonTouchableOpacity
                    style={[
                      {
                        borderRadius: 5,
                        alignItems: 'center',
                      },
                    ]}
                    bgColor={'#D7DCE5'}
                    width={20}
                    height={20}></CommonTouchableOpacity>
                  <CommonText
                    fontSize={14}
                    color={'#212121'}
                    paddingLeft={10}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    대댓글
                  </CommonText>
                </View>
                <CommonImage source={MoreVert} width={20} height={20} />
              </View>
              <CommonText
                fontSize={14}
                color={'#8491A7'}
                paddingTop={10}
                numberOfLines={1}
                ellipsizeMode="tail">
                대댓글입니다
              </CommonText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <CommonText
                  fontSize={10}
                  color={'#AFBAC8'}
                  paddingTop={10}
                  numberOfLines={1}>
                  2024.02.14
                </CommonText>
              </View>
            </View>
          </Container>
        ))}
      </ScrollView>
    </BaseSafeView>
  );
};

export default FeedDetailPageScreen;
