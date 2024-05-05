import React, {useState, useEffect, useCallback} from 'react';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {CommonImage} from '../../CommonStyled.style';
import {TouchableOpacity} from 'react-native';
import Bookmark from '../../../assets/bookmark.png';
import Bookmark_Active from '../../../assets/bookmark_active.png';
import Search from '../../../assets/search.png';

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
