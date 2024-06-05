import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, View} from 'react-native';
import {
  AccountButton,
  BaseSafeView,
  CenterBox,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
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
import {MyButtonFrame} from './style/MyPageStyle.style';
import Arrow_Right_White from '../../assets/arrow_right_white.png';
import Arrow_Right from '../../assets/arrow_right.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  getMatchingSummary,
  getMyGroupList,
  getMyInfo,
  getProfileImageLink,
} from '../../api/MyPage';

const testData = [
  {image: 'none', name: '숭실대 축구 동아리'},
  {image: 'none', name: '숭실대 축구 동아리'},
  {image: 'none', name: '숭실대 축구 동아리'},
  {image: 'none', name: '숭실대 축구 동아리'},
  {image: 'none', name: '숭실대 축구 동아리'},
  {image: 'none', name: '숭실대 축구 동아리'},
  {image: 'none', name: '숭실대 축구 동아리'},
  {image: 'none', name: '숭실대 축구 동아리'},
];

interface GroupList {
  teamName: string;
  teamImgUrl: string;
}

interface MyInfoProps {
  nickname: string;
  majorActivityArea: string;
  numberOfMatches: number;
  gender: string;
  abilityList: string[];
  oneLineIntroduction: string;
  profilePicId: string;
  birthYear: number;
  abilityPublic: boolean;
  majorActivityAreaPublic: boolean;
  birthYearPublic: boolean;
}

const MyPageScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [selectItems, setSelectItems] = useState([]);
  const [groupList, setGroupList] = useState<GroupList[]>();
  const [myInfo, setMyInfo] = useState<MyInfoProps>();
  const [summary, setSummary] = useState();
  useEffect(() => {
    const _getFunction = async () => {
      const result = await getMyGroupList();

      if (result) setGroupList(Object.values(result));
    };
    _getFunction();
  }, []);

  useEffect(() => {
    const _getFunction = async () => {
      const result = await getMyInfo();
      setMyInfo(result);
    };

    _getFunction();
  }, []);

  useEffect(() => {
    const _getFunction = async () => {
      const result = await getMatchingSummary();
      setSummary(result);
    };

    _getFunction();
  }, []);

  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    const _getFunction = async () => {
      const result = await getProfileImageLink(myInfo?.profilePicId);
      setProfileImage(result);
    };
    _getFunction();
  }, []);

  // console.log('myInfo', myInfo);
  const MyInfoButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyInfo');
        }}>
        <MyButtonFrame>
          <RowBox alignC>
            {profileImage ? (
              <CommonImage
                source={{uri: profileImage}}
                width={60}
                height={60}
                style={{
                  borderRadius: 60,
                  marginRight: 15,
                }}
              />
            ) : (
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderColor: '#fff',
                  borderWidth: 2,
                  borderRadius: 60,
                  marginRight: 15,
                }}></View>
            )}
            <View>
              <CommonText color={'#fff'} fontSize={14}>
                {myInfo?.nickname}
                <CommonText fontSize={12} color={Colors.c_gray400}>
                  신고 내역 0건
                </CommonText>
              </CommonText>
              <CommonText color={Colors.c_gray400} fontSize={14} marginT={7}>
                {myInfo?.oneLineIntroduction}
              </CommonText>
            </View>
          </RowBox>
          <CommonImage
            source={Arrow_Right_White}
            width={24}
            height={24}></CommonImage>
        </MyButtonFrame>
      </TouchableOpacity>
    );
  };
  interface MatchinbTabProps {
    match: number;
    text: string;
  }
  const MatchingList = () => {
    const MatchinbTab = ({match, text}: MatchinbTabProps) => {
      return (
        <CenterBox>
          <CommonText fontSize={14} color={'#fff'}>
            {match}
          </CommonText>
          <CommonText fontSize={12} color={Colors.c_gray400}>
            {text}
          </CommonText>
        </CenterBox>
      );
    };
    const VerticalBar = () => {
      return (
        <View
          style={{
            width: 1,
            height: 19,
            backgroundColor: Colors.c_gray400,
            top: 10,
          }}
        />
      );
    };
    return (
      <>
        <RowBox alignC justify={'space-between'} marginT={20}>
          <MatchinbTab match={5} text={'매칭 완료'} />
          <VerticalBar />
          <MatchinbTab match={1} text={'매칭 예정'} />
          <VerticalBar />
          <MatchinbTab match={2} text={'보낸 신청'} />
          <VerticalBar />
          <MatchinbTab match={7} text={'받은 신청'} />
          <TouchableOpacity onPress={() => navigation.navigate('MatchingList')}>
            <CenterBox
              justify={'center'}
              style={{
                backgroundColor: Colors.blue400,
                width: 101,
                height: 36,
                borderRadius: 20,
              }}>
              <CommonText fontSize={14} color={'#fff'}>
                매칭 리스트
              </CommonText>
            </CenterBox>
          </TouchableOpacity>
        </RowBox>
      </>
    );
  };

  return (
    <BaseSafeView>
      <Container bgColor={'#212121'} padding={0}>
        <View style={{padding: 20}}>
          <RowBox alignC justify={'space-between'} paddingT={15} paddingB={15}>
            <CommonText fontSize={18} color={'#fff'}>
              마이
            </CommonText>
            <RowBox>
              <CommonImage source={Alert_Icon} width={24} height={24} />
              <CommonImage
                source={Chat_Icon}
                width={24}
                height={24}
                style={{marginLeft: 12}}
              />
            </RowBox>
          </RowBox>
          <MyInfoButton />
          <MatchingList />
        </View>
        <Container
          bgColor={'#fff'}
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyGroup2');
            }}>
            <RowBox justify={'space-between'}>
              <CommonText fontSize={14}>내 그룹</CommonText>
              <CommonImage source={Arrow_Right} width={24} height={24} />
            </RowBox>
          </TouchableOpacity>

          <FlatList
            data={groupList}
            horizontal
            style={{marginVertical: 20, flexGrow: 0}}
            renderItem={items => {
              return (
                <View
                  style={{
                    marginLeft:
                      items.index === 0 || items.index === testData.length - 1
                        ? 0
                        : 10,
                  }}>
                  <CommonTouchableOpacity
                    style={[
                      {
                        borderRadius: 10,
                        marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      },
                    ]}
                    bgColor={'#000'}
                    width={80}
                    height={80}></CommonTouchableOpacity>
                  <CommonText
                    textAlignC
                    fontSize={10}
                    color={'#212121'}
                    style={{marginBottom: 5}}>
                    {items.item?.teamName}
                  </CommonText>
                </View>
              );
            }}
          />
          <View>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: Colors.c_gray200,
              }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('ScrapList')}>
              <CommonText fontSize={14} marginT={20}>
                스크랩
              </CommonText>
            </TouchableOpacity>
            <CommonText fontSize={14} marginT={20}>
              작성한 매칭 일지
            </CommonText>
            <TouchableOpacity onPress={() => navigation.navigate('AllPost')}>
              <CommonText fontSize={14} marginT={20}>
                모든 작성 글
              </CommonText>
            </TouchableOpacity>

            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: Colors.c_gray200,
                marginTop: 20,
              }}
            />
            <CommonText fontSize={14} marginT={20}>
              서비스 이용약관
            </CommonText>
            <CommonText fontSize={14} marginT={20}>
              개인정보 처리방침
            </CommonText>
          </View>
        </Container>
      </Container>
    </BaseSafeView>
  );
};

export default MyPageScreen;
