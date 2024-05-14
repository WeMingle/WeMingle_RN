import React, {useState, useEffect, useCallback} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import styled from 'styled-components/native';
import {CommonText, CommonImage, boxWidth} from '../../CommonStyled.style';
import Bookmark from '../../../assets/bookmark.png';
import Bookmark_Active from '../../../assets/bookmark_active.png';
import Favorite from '../../../assets/favorite.png';
import Favorite_Active from '../../../assets/favorite_active.png';
import Search from '../../../assets/search.png';
import Back_White from '../../../assets/back_icon_white.png';
import SMS from '../../../assets/sms.png';

export const BookmarkImage = ({bookmark, width, height}: any) => {
  const [bookmarkSource, setBookmarkSource] = useState(Bookmark);

  useEffect(() => {
    if (bookmark === true) {
      setBookmarkSource(Bookmark_Active);
    } else {
      setBookmarkSource(Bookmark);
    }
  }, [bookmark, bookmarkSource]);

  return <CommonImage source={bookmarkSource} width={width} height={height} />;
};

export const ClickBookmark = ({bookmark, width, height}: any) => {
  const [isClicked, setIsClicked] = useState<boolean | null>(bookmark);

  const changeBookmark = useCallback(() => {
    setIsClicked(!isClicked);
  }, [isClicked]);

  return (
    <TouchableOpacity onPress={changeBookmark}>
      <BookmarkImage bookmark={isClicked} width={width} height={height} />
    </TouchableOpacity>
  );
};

export const FavoriteImage = ({favorite_click, width, height}: any) => {
  const [favoriteSource, setFavoriteSource] = useState(Favorite);

  useEffect(() => {
    if (favorite_click === true) {
      setFavoriteSource(Favorite_Active);
    } else {
      setFavoriteSource(Favorite);
    }
  }, [favorite_click, favoriteSource]);

  return <CommonImage source={favoriteSource} width={width} height={height} />;
};

export const SetFavNum = ({favNum}: any) => {
  const [favorNum, setFavorNum] = useState('');

  useEffect(() => {
    if (favNum >= 999) {
      setFavorNum('999+');
    } else {
      setFavorNum(favNum);
    }
  }, [favNum, favorNum]);

  return (
    <CommonText fontSize={10} alignItems="center" paddingLeft={3}>
      {favorNum}
    </CommonText>
  );
};

export const ClickFavorite = ({
  favorite_click,
  favorite_num,
  width,
  height,
}: any) => {
  const [isClicked, setIsClicked] = useState<boolean | null>(favorite_click);
  const [changeFavNum, setChagneFavNum] = useState(favorite_num);

  const changeFavorite = useCallback(() => {
    setIsClicked(!isClicked);

    if (favorite_click) {
      if (isClicked) {
        setChagneFavNum(favorite_num - 1);
      } else {
        setChagneFavNum(favorite_num);
      }
    } else {
      if (isClicked) {
        setChagneFavNum(favorite_num);
      } else {
        setChagneFavNum(favorite_num + 1);
      }
    }
  }, [isClicked, changeFavNum, favorite_click, favorite_num]);

  return (
    <View
      style={{
        width: 59,
        height: 24,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={changeFavorite}>
        <FavoriteImage
          favorite_click={isClicked}
          width={width}
          height={height}
        />
      </TouchableOpacity>
      <SetFavNum favNum={changeFavNum} />
    </View>
  );
};

export const ChattingIcon = ({chatting_num, width, height}: any) => {
  const [chatNum, setChatNum] = useState('');

  useEffect(() => {
    if (chatting_num >= 999) {
      setChatNum('999+');
    } else {
      setChatNum(chatting_num);
    }
  }, [chatNum]);

  return (
    <View
      style={{
        width: 59,
        height: 24,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <CommonImage source={SMS} width={width} height={height} />
      <CommonText fontSize={10} alignItems="center" paddingLeft={3}>
        {chatNum}
      </CommonText>
    </View>
  );
};

export const VoteComponent = ({
  vote_title,
  voting_member,
  closing_date,
  participate_title,
  participate_member,
  absence_title,
  absence_member,
}: any) => {
  let participateVotePercent = 0;
  let absenceVotePercent = 0;

  if (participate_member > 0) {
    participateVotePercent = Math.ceil(
      (participate_member / voting_member) * 100,
    );
  }

  if (absence_member > 0) {
    absenceVotePercent = Math.ceil((absence_member / voting_member) * 100);
  }

  return (
    <>
      {vote_title === null ? (
        <></>
      ) : (
        <View
          style={{
            width: '100%',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#DCDCDC',
            padding: 10,
            marginTop: 10,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <CommonText
              fontSize={12}
              color={'#5C667B'}
              numberOfLines={1}
              ellipsizeMode="tail"
              paddingRight={5}
              textAlignC>
              {vote_title}
            </CommonText>
            <View
              style={{
                width: 1,
                height: '100%',
                backgroundColor: '#DCDCDC',
                marginRight: 5,
              }}
            />
            <CommonText
              fontSize={10}
              color={'#CACACA'}
              numberOfLines={1}
              ellipsizeMode="tail"
              textAlignC>
              {voting_member}명 참여 중
            </CommonText>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 5,
            }}>
            <CommonText
              fontSize={10}
              color={'#0E6FFF'}
              paddingRight={5}
              textAlignC>
              마감일
            </CommonText>
            <CommonText fontSize={10} color={'#0E6FFF'} textAlignC>
              {closing_date}
            </CommonText>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
              marginTop: 10,
            }}>
            <CommonText
              fontSize={10}
              color={'#292E41'}
              paddingBottom={5}
              textAlignC>
              {participate_title}
            </CommonText>
            <View
              style={{
                width: '100%',
                height: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#DCDCDC',
                marginBottom: 5,
              }}>
              <VoteGraph width={participateVotePercent} />
            </View>
            <CommonText
              fontSize={10}
              color={'#292E41'}
              paddingBottom={5}
              textAlignC>
              {absence_title}
            </CommonText>
            <View
              style={{
                width: '100%',
                height: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#DCDCDC',
                marginBottom: 5,
              }}>
              <VoteGraph width={absenceVotePercent} />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const VoteGraph = styled.View`
  ${(props: {width: number}) =>
    props.width === 0 ? 'width: 0%' : props.width && `width: ${props.width}%`};
  height: 5px;
  border-radius: 10px;
  background-color: #5c667b;
`;

export const SearchButton = ({width, height}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('MyGroupSearch');
      }}>
      <CommonImage source={Search} width={width} height={height} />
    </TouchableOpacity>
  );
};

export const SearchLoading = ({search}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
      }}>
      <ActivityIndicator
        size="small"
        style={{marginRight: 10}}
        color="#0E6FFF"
      />
      <CommonText fontSize={16} color={'#8491A7'}>
        "{search}" 검색중
      </CommonText>
    </View>
  );
};

export const BackButton = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const onBackPress = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [onBackPress]);

  return (
    <TouchableOpacity onPress={onBackPress}>
      <CommonImage
        source={Back_White}
        width={48}
        height={24}
        marginRight={20}
      />
    </TouchableOpacity>
  );
};
