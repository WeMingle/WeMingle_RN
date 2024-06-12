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
import {BackButton} from '../style/MyGroupStyle.style';
import {useSelector} from 'react-redux';
import {
  checkNicknameAvailability,
  fetchTeamRequestPageData,
} from '../../../redux/slice/MyGroup/GroupApplySlice';
import {RootState} from '../../../redux/Reducers';
import {useAppDispatch} from '../../../redux/Store';

interface QDataItem {
  teamQuestionKey: string;
  teamQuestionValue: string;
}

const JoinGroupScreen = ({route}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const item = route.params;
  console.log('넘겨지는 아이템 (그룹 가입하기)? : ', item);

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
    dispatch(fetchTeamRequestPageData(Number(item.teamPk)));
    // dispatch(joinTeamRequest());
  }, [dispatch]);

  console.log('requestPageData : ', requestPageData);

  const nickNameCheck = useCallback(() => {
    dispatch(
      checkNicknameAvailability({
        teamId: Number(item.teamPk),
        nickname: nickName,
      }),
    );
  }, [item, nickName]);

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

  console.log('자유질문 : ', teamQuestionLists);

  const handlePromiseTextChange = (id: string, text: string) => {
    if (text.length <= 100) {
      setInputValues(prevState => ({
        ...prevState,
        [id]: text,
      }));
    }
  };

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
              <RowBox alignC justify={'space-start'}>
                <BackButton />
                <View>
                  <CommonText fontSize={18} color={'#1C1C1C'}>
                    그룹 가입하기
                  </CommonText>
                  <CommonText fontSize={10} color={'#96A0B5'}>
                    [{item.nickname}]
                  </CommonText>
                </View>
              </RowBox>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 20,
              }}>
              <CommonTouchableOpacity
                style={{borderRadius: 10}}
                bgColor={'#000000'}
                width={66}
                height={66}
              />
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
                  {item.matchingCnt}번
                </CommonText>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'flex-start',
                paddingHorizontal: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-start',
                  marginBottom: 20,
                }}>
                <CommonText
                  fontSize={14}
                  color={'#212121'}
                  textAlignC
                  paddingBottom={10}>
                  닉네임
                </CommonText>
                <View
                  style={{
                    width: '100%',
                    height: 40,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#D7DCE5',
                    backgroundColor: '#ffffff',
                  }}>
                  <TextInput
                    placeholder="닉네임을 입력하세요"
                    placeholderTextColor={'#96A0B5'}
                    style={{
                      flex: 1,
                      fontSize: 12,
                      color: '#96A0B5',
                      textAlignVertical: 'center',
                      paddingHorizontal: 15,
                    }}
                    value={nickName}
                    onChangeText={setNickName}
                    onSubmitEditing={nickNameCheck}
                    returnKeyType="done"
                  />
                </View>
                {nicknameAvailable === true ? (
                  <CommonText
                    fontSize={10}
                    color={'#276EF2'}
                    textAlignC
                    paddingTop={5}>
                    사용 가능한 닉네임입니다.
                  </CommonText>
                ) : (
                  <></>
                )}
              </View>
              <CommonText
                fontSize={14}
                color={'#212121'}
                textAlignC
                paddingBottom={10}>
                내 정보
              </CommonText>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#E7F1FF',
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <CommonText fontSize={10} color={'#5C667B'}>
                  아직 마이페이지를 완성하지 않았어요!{'\n'}원활한 이용을 위해
                  마이페이지를 완성해주세요!
                </CommonText>
                <TouchableOpacity
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#0E6FFF',
                  }}
                  onPress={() => navigation.navigate('MyPage')}>
                  <CommonText fontSize={10} color={'#0E6FFF'}>
                    마이페이지로 이동
                  </CommonText>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 100,
                  backgroundColor: '#F4F6FA',
                  marginTop: 5,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    width: 52,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <CommonText fontSize={12} color={'#96A0B5'} marginBottom={10}>
                    학교
                  </CommonText>
                  <CommonText fontSize={12} color={'#96A0B5'} marginBottom={10}>
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
                  <CommonText fontSize={12} color={'#373F57'} marginBottom={10}>
                    숭실대학교
                  </CommonText>
                  <CommonText fontSize={12} color={'#FF5D5D'} marginBottom={10}>
                    미입력
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
                  <CommonText fontSize={12} color={'#96A0B5'} marginBottom={10}>
                    성별
                  </CommonText>
                  <CommonText fontSize={12} color={'#96A0B5'} marginBottom={10}>
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
                  <CommonText fontSize={12} color={'#FF5D5D'} marginBottom={10}>
                    미입력
                  </CommonText>
                  <CommonText fontSize={12} color={'#373F57'} marginBottom={10}>
                    비공개
                  </CommonText>
                  <CommonText fontSize={12} color={'#373F57'}>
                    1회
                  </CommonText>
                </View>
              </View>
              <CommonText
                fontSize={14}
                color={'#212121'}
                textAlignC
                paddingBottom={10}>
                자유질문
              </CommonText>
              {teamQuestionLists.map(item => (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-start',
                  }}
                  key={item.teamQuestionKey}>
                  <CommonText
                    fontSize={14}
                    color={'#212121'}
                    textAlignC
                    paddingBottom={5}>
                    {item.teamQuestionKey}. {item.teamQuestionValue}
                  </CommonText>
                  <View
                    style={{
                      width: '100%',
                      height: 40,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#D7DCE5',
                      backgroundColor: '#ffffff',
                    }}>
                    <TextInput
                      placeholder="답변을 입력해주세요."
                      placeholderTextColor={'#96A0B5'}
                      style={{
                        flex: 1,
                        fontSize: 12,
                        color: '#96A0B5',
                        textAlignVertical: 'center',
                        paddingHorizontal: 15,
                        paddingBottom: 10,
                      }}
                      value={inputValues[item.teamQuestionKey]}
                      onChangeText={text =>
                        handlePromiseTextChange(item.teamQuestionKey, text)
                      }
                    />
                  </View>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'flex-end',
                    }}>
                    <CommonText
                      fontSize={10}
                      color={'#AFBAC8'}
                      textAlignC
                      paddingBottom={10}>
                      {inputValues[item.teamQuestionKey]?.length || 0}/100
                    </CommonText>
                  </View>
                </View>
              ))}
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: '#212121',
                  padding: 15,
                  borderRadius: 15,
                  marginBottom: 20,
                }}>
                <CommonText
                  fontSize={16}
                  color={'#FFFFFF'}
                  textAlignC
                  textAlignVertical={'center'}>
                  그룹원 신청하기
                </CommonText>
              </TouchableOpacity>
            </View>
          </Container>
        ))}
      </ScrollView>
    </BaseSafeView>
  );
};

export default JoinGroupScreen;
