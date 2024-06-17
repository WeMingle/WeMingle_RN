import React, {useCallback, useEffect, useState} from 'react';
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  RowBox,
} from '../../CommonStyled.style';
import {
  fetchTeamInfo,
  fetchTeamPosts,
} from '../../../redux/slice/MyGroup/GroupDetailSlice';
import {Colors} from '../../../assets/color/Colors';
import {useAppDispatch} from '../../../redux/Store';
import {RootState} from '../../../redux/Reducers';
import Full from '../../../assets/full.png';
import FullActive from '../../../assets/full_active.png';
import Title from '../../../assets/title.png';
import TitleActive from '../../../assets/title_active.png';
import More_Vert from '../../../assets/more_vert.png';
import {useSelector} from 'react-redux';
import {
  ChattingIcon,
  ClickBookmark,
  ClickFavorite,
  VoteComponent,
} from './MyGroupStyle.style';
import RectangleBlue from '../../../assets/RectangleBlue.png';

const Tab = createMaterialTopTabNavigator();

export const FeedScreen = ({teamPk}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  // const item = route.params;
  // console.log('아이템? : ', item);
  const dispatch = useAppDispatch();
  const {teamPosts, loading, error} = useSelector(
    (state: RootState) => state.groupDetail,
  );

  const [isNotice, setIsNotice] = useState(false);
  const [radioStatus, setRadioStatus] = useState<
    'unchecked' | 'checked' | undefined
  >('unchecked');
  const [writingType, setWritingType] = useState(false);
  const [fullStatus, setFullStatus] = useState(FullActive);
  const [titleStatus, setTitleStatus] = useState(Title);

  const RadioCheck = () => {
    setIsNotice(!isNotice);
    if (radioStatus === 'unchecked') {
      setRadioStatus('checked');
    } else {
      setRadioStatus('unchecked');
    }
  };

  const SelectFull = () => {
    setWritingType(false);
    setFullStatus(FullActive);
    setTitleStatus(Title);
  };

  const SelectTitle = () => {
    setWritingType(true);
    setFullStatus(Full);
    setTitleStatus(TitleActive);
  };

  const teamPostParams = {
    // teamId: item.teamPk,
    teamId: teamPk,
    isNotice: isNotice,
    nextIdx: 1,
  };

  useEffect(() => {
    dispatch(fetchTeamPosts(teamPostParams));
  }, [dispatch]);

  // console.log('팀 포스트 : ', teamPosts);
  console.log('팀 포스트 : ', teamPosts?.teamPostsInfo);
  console.log('로딩 : ', loading);
  console.log('에러 : ', error);

  let teamPostsInfoAllList = [];
  const teamPostsInfoKeys: any[] = teamPosts?.teamPostsInfo
    ? Object.keys(teamPosts?.teamPostsInfo)
    : [];
  const teamPostsInfoLists: any[] = teamPosts?.teamPostsInfo
    ? Object.values(teamPosts?.teamPostsInfo)
    : [];

  if (teamPostsInfoKeys.length !== 0) {
    for (let i = 0; i < teamPostsInfoKeys.length; i++) {
      teamPostsInfoAllList.push({
        postPk: teamPostsInfoKeys[i],
        title: teamPostsInfoLists[i].title,
        content: teamPostsInfoLists[i].content,
        nickname: teamPostsInfoLists[i].nickname,
        createdTime: teamPostsInfoLists[i].createdTime,
        teamPostImgUrls: teamPostsInfoLists[i].teamPostImgUrls,
        postType: teamPostsInfoLists[i].postType,
        likeCnt: teamPostsInfoLists[i].likeCnt,
        replyCnt: teamPostsInfoLists[i].replyCnt,
        voteInfo: teamPostsInfoLists[i].voteInfo,
        imgUrl: teamPostsInfoLists[i].imgUrl,
        isBookmarked: teamPostsInfoLists[i].isBookmarked,
        isWriter: teamPostsInfoLists[i].isWriter,
        isLiked: teamPostsInfoLists[i].isLiked,
      });
    }
  }

  const mockTeamPostObject = {
    '13': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:32:09.024797',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 13,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: false,
    },
    '12': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:32:08.587419',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 12,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: true,
    },
    '11': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:32:08.155579',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 11,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: false,
    },
    '10': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:32:07.716638',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 10,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: false,
    },
    '9': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:32:07.247218',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 9,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: true,
    },
    '8': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:32:06.792948',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 8,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: true,
    },
    '7': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:31:50.016546',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 7,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: false,
    },
    '6': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:31:49.353043',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 6,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: false,
    },
    '5': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:31:48.876763',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 5,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: false,
    },
    '4': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:31:48.364229',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 4,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: false,
    },
    '3': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:31:47.916024',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 3,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: false,
    },
    '2': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:31:47.313265',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 2,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: false,
    },
    '1': {
      title: '글 제목입니다',
      content: '글 내용입니다',
      nickname: 'nickname0',
      createdTime: '2024-06-05T15:31:46.716753',
      teamPostImgUrls: [],
      postType: 'GENERAL',
      likeCnt: 0,
      replyCnt: 0,
      voteInfo: {
        votePk: 1,
        voteOptionInfos: [
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
        ],
      },
      imgUrl:
        'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/f2c9cb8e-6a88-40c7-be6c-ebcb3b02caa5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240605T064001Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240605%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=933185dae05f879e5ce9e78609116959f092f71a8307d953b5055f7987b2b1cc',
      isBookmarked: false,
      isWriter: true,
      isLiked: false,
    },
  };

  let mockDataAllList = [];

  const mockTeamPostLists = Object.values(mockTeamPostObject);
  const mockTeamPostKeys = Object.keys(mockTeamPostObject);
  for (let i = 0; i < mockTeamPostKeys.length; i++) {
    mockDataAllList.push({
      postPk: mockTeamPostKeys[i],
      title: mockTeamPostLists[i].title,
      content: mockTeamPostLists[i].content,
      nickname: mockTeamPostLists[i].nickname,
      createdTime: mockTeamPostLists[i].createdTime,
      teamPostImgUrls: mockTeamPostLists[i].teamPostImgUrls,
      postType: mockTeamPostLists[i].postType,
      likeCnt: mockTeamPostLists[i].likeCnt,
      replyCnt: mockTeamPostLists[i].replyCnt,
      voteInfo: mockTeamPostLists[i].voteInfo,
      imgUrl: mockTeamPostLists[i].imgUrl,
      isBookmarked: mockTeamPostLists[i].isBookmarked,
      isWriter: mockTeamPostLists[i].isWriter,
      isLiked: mockTeamPostLists[i].isLiked,
    });
  }

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: '#ffffff',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RadioButton
            value=""
            color={Colors.blue400}
            status={radioStatus}
            onPress={RadioCheck}
          />
          <CommonText
            fontSize={14}
            color={'#96A0B5'}
            marginLeft={10}
            textAlignC
            alignC>
            공지 모아보기
          </CommonText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={SelectFull}>
            <CommonImage
              source={fullStatus}
              width={24}
              height={24}
              marginRight={10}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={SelectTitle}>
            <CommonImage source={titleStatus} width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 3,
          backgroundColor: Colors.c_gray200,
        }}
      />
      {writingType === false ? (
        <>
          {mockDataAllList.length === 0 ? (
            <></>
          ) : (
            <>
              {mockDataAllList.map(item => (
                <View style={{width: '100%'}} key={item.postPk}>
                  <View style={{padding: 20}}>
                    <RowBox alignC justify={'space-between'}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('FeedDetail')}>
                        <CommonText fontSize={18}>{item?.title}</CommonText>
                      </TouchableOpacity>
                      <CommonImage source={More_Vert} width={24} height={24} />
                    </RowBox>
                    <RowBox alignC justify={'space-start'} marginT={10}>
                      <CommonTouchableOpacity
                        style={[
                          {
                            borderRadius: 50,
                            alignItems: 'center',
                          },
                        ]}
                        bgColor={'#AFBAC8'}
                        width={12}
                        height={12}></CommonTouchableOpacity>
                      <CommonText
                        fontSize={10}
                        color={'#AFBAC8'}
                        paddingLeft={5}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item?.nickname}
                      </CommonText>
                      <CommonText
                        fontSize={10}
                        color={'#AFBAC8'}
                        paddingLeft={25}>
                        {item?.createdTime}
                      </CommonText>
                    </RowBox>
                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#F4F6FA',
                        marginTop: 10,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => navigation.navigate('FeedDetail')}>
                      <CommonText
                        fontSize={14}
                        color={'#292E41'}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        paddingTop={10}>
                        {item?.content}
                      </CommonText>
                      <VoteComponent
                        vote_title={'투표 타이틀'}
                        voting_member={'0'}
                        closing_date={'2024-04-04'}
                        voteOptionInfos={item?.voteInfo.voteOptionInfos}
                      />
                    </TouchableOpacity>
                    <View>
                      <View style={{width: '100%', marginTop: 10}}>
                        <RowBox justify={'space-start'}>
                          <ClickFavorite
                            favorite_click={item?.isLiked}
                            favorite_num={item?.likeCnt}
                            width={24}
                            height={24}
                          />
                          <ChattingIcon
                            chatting_num={item?.replyCnt}
                            width={24}
                            height={24}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <ClickBookmark
                              bookmark={item?.isBookmarked}
                              width={24}
                              height={24}
                            />
                          </View>
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
              ))}
            </>
          )}
        </>
      ) : (
        <>
          {mockDataAllList.length === 0 ? (
            <></>
          ) : (
            <>
              {mockDataAllList.map(item => (
                <View
                  style={{
                    width: '100%',
                    padding: 20,
                    borderBottomWidth: 1,
                    borderColor: '#eeeeee',
                  }}
                  key={item.postPk}>
                  <RowBox alignC justify={'space-start'} marginT={10}>
                    <CommonTouchableOpacity
                      style={[
                        {
                          borderRadius: 50,
                          alignItems: 'center',
                        },
                      ]}
                      bgColor={'#AFBAC8'}
                      width={12}
                      height={12}></CommonTouchableOpacity>
                    <CommonText
                      fontSize={10}
                      color={'#AFBAC8'}
                      paddingLeft={5}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item?.nickname}
                    </CommonText>
                    <CommonText
                      fontSize={10}
                      color={'#AFBAC8'}
                      paddingLeft={25}>
                      {item?.createdTime}
                    </CommonText>
                  </RowBox>
                  <RowBox alignC justify={'space-between'} marginT={10}>
                    <CommonText fontSize={18}>{item?.title}</CommonText>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <ClickBookmark
                        bookmark={item?.isBookmarked}
                        width={24}
                        height={24}
                      />
                    </View>
                  </RowBox>
                  <RowBox alignC justify={'space-start'} marginT={10}>
                    <ClickFavorite
                      favorite_click={item?.isLiked}
                      favorite_num={item?.likeCnt}
                      width={24}
                      height={24}
                    />
                    <ChattingIcon
                      chatting_num={item?.replyCnt}
                      width={24}
                      height={24}
                    />
                  </RowBox>
                </View>
              ))}
            </>
          )}
        </>
      )}
    </View>
  );
};

export const ChattingScreen = ({teamPk}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
      }}>
      <CommonText fontSize={14} color={'#212121'}>
        채팅
      </CommonText>
    </View>
  );
};

// export const MemberScreen = ({teamPk}: any) => {
//   const memberData = {
//     1: {
//       imgUrl:
//         'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/46faa1ec-1448-4625-ae67-15e9d98b8f40?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240614T170031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240614%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=4cf88aaa4fc2dbe918e1b9516960245efe83945033ae3e605f441dc760d6b6c8',
//       nickname: 'nickname0',
//       teamRole: 'PARTICIPANT',
//       isMe: true,
//     },
//     2: {
//       imgUrl:
//         'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/46faa1ec-1448-4625-ae67-15e9d98b8f40?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240614T170031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240614%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=4cf88aaa4fc2dbe918e1b9516960245efe83945033ae3e605f441dc760d6b6c8',
//       nickname: 'nickname0',
//       teamRole: 'LEADER',
//       isMe: false,
//     },
//     3: {
//       imgUrl:
//         'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/46faa1ec-1448-4625-ae67-15e9d98b8f40?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240614T170031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240614%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=4cf88aaa4fc2dbe918e1b9516960245efe83945033ae3e605f441dc760d6b6c8',
//       nickname: 'nickname0',
//       teamRole: 'PARTICIPANT',
//       isMe: false,
//     },
//     4: {
//       imgUrl:
//         'https://wemingle.s3.ap-northeast-2.amazonaws.com/profile/group/46faa1ec-1448-4625-ae67-15e9d98b8f40?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240614T170031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAZ6CFTXRND5KOF3YT%2F20240614%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=4cf88aaa4fc2dbe918e1b9516960245efe83945033ae3e605f441dc760d6b6c8',
//       nickname: 'nickname0',
//       teamRole: 'PARTICIPANT',
//       isMe: false,
//     },
//   };

//   const memberValues = Object.values(memberData);
//   const memberKeys = Object.keys(memberData);

//   let memberList: any[] = [];

//   for (let i = 0; i < memberValues.length; i++) {
//     memberList.push({
//       memberPk: memberKeys[i],
//       imgUrl: memberValues[i].imgUrl,
//       nickname: memberValues[i].nickname,
//       teamRole: memberValues[i].teamRole,
//       isMe: memberValues[i].isMe,
//     });
//   }

//   const [selected, setSelected] = useState<number | null>(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [modalPosition, setModalPosition] = useState({x: 0, y: 0});

//   const openModal = (x: number, y: number, item: any) => {
//     setSelected(item.memberPk);
//     setModalPosition({x, y});
//     setIsVisible(true);
//   };

//   const closeModal = () => {
//     setIsVisible(false);
//     setSelected(null);
//   };

//   return (
//     <View
//       style={{
//         backgroundColor: '#ffffff',
//         width: '100%',
//         height: '100%',
//       }}>
//       {memberList.map(item => (
//         <View
//           style={{
//             width: '100%',
//             borderBottomWidth: 1,
//             borderBottomColor: '#EAEDF4',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}
//           key={item.memberPk}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'flex-start',
//               alignItems: 'center',
//               padding: 15,
//             }}>
//             <CommonTouchableOpacity
//               style={[
//                 {
//                   borderRadius: 10,
//                   alignItems: 'center',
//                 },
//               ]}
//               bgColor={'#D7DCE5'}
//               width={40}
//               height={40}></CommonTouchableOpacity>
//             {item.isMe && (
//               <View
//                 style={{
//                   backgroundColor: '#8491A7',
//                   paddingVertical: 4,
//                   paddingHorizontal: 5,
//                   borderRadius: 50,
//                   marginLeft: 10,
//                 }}>
//                 <CommonText fontSize={9} color={'#ffffff'} textAlignC>
//                   나
//                 </CommonText>
//               </View>
//             )}
//             <CommonText
//               fontSize={14}
//               color={'#000000'}
//               textAlignC
//               paddingLeft={10}
//               paddingRight={5}>
//               {item.nickname}
//             </CommonText>
//             {item.teamRole === 'LEADER' && (
//               <CommonImage
//                 source={RectangleBlue}
//                 width={10}
//                 height={10.5}
//                 zIndex={0}
//               />
//             )}
//           </View>
//           <TouchableOpacity
//             onPress={event => {
//               const {pageX, pageY} = event.nativeEvent;
//               openModal(pageX, pageY, item);
//             }}
//             style={{zIndex: 0}}>
//             <CommonImage
//               source={More_Vert}
//               width={24}
//               height={14}
//               zIndex={0}
//               marginRight={10}
//             />
//           </TouchableOpacity>
//         </View>
//       ))}
//     </View>
//   );
// };

// export const FeedTabs = ({teamPk}: any) => {
//   // const navigation: NavigationProp<ParamListBase> = useNavigation();
//   useEffect(() => {
//     teamPk;
//   }, [teamPk]);
//   // navigation.

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         lazy: true,
//       }}>
//       <Tab.Screen
//         name="그룹 피드"
//         component={FeedScreen}
//         initialParams={{teamPk: teamPk}}
//       />
//       <Tab.Screen
//         name="채팅"
//         component={ChattingScreen}
//         initialParams={{teamPk: teamPk}}
//       />
//       <Tab.Screen
//         name="그룹원"
//         component={MemberScreen}
//         initialParams={{teamPk: teamPk}}
//       />
//     </Tab.Navigator>
//   );
// };
