import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  BaseSafeView,
  BorderBox,
  CenterBox,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
  MatchingItem,
  RowBox,
} from '../CommonStyled.style';
import {Colors} from '../../assets/color/Colors';
import Close from '../../assets/Close.png';
import {
  SearchLoading,
  BackButton,
  ClickBookmark,
} from '../myGroup/style/MyGroupStyle.style';
import Search from '../../assets/search.png';

import Profile_Icon from '../../assets/Profile_Square.png';
import Camera from '../../assets/Camera.png';
import {PopularMatchingBox} from './style/MatchingStyle';
import {
  getPopularMatchingList,
  getRecentMatchingList,
} from '../../api/Matching';
interface Search {
  id: number;
  search: string;
}

interface MatchingList {
  [prop: string]: any;
}

const MatchingSearchScreen = ({user}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [text, setText] = useState('');
  //searchList 안에 있는 Object 없애도 됨. (예시로 몇개 넣어둔거임.)
  const [searchList, setSearchList] = useState<Search[]>([
    {
      id: 1,
      search: '축구',
    },
    {
      id: 2,
      search: '농구',
    },
    {
      id: 3,
      search: '배구',
    },
  ]);

  const [popularMatchingList, setPopularMatchingList] = useState<MatchingList>(
    {},
  );
  const [recentMatchingList, setRecentMatchingList] = useState<MatchingList>(
    {},
  );

  console.log(popularMatchingList);

  useEffect(() => {
    const getAsyncFunc = async () => {
      const result = await getPopularMatchingList();
      const result2 = await getRecentMatchingList();

      setPopularMatchingList(result);
      setRecentMatchingList(result2);
    };
    getAsyncFunc();
  }, []);

  const onInsert = (txt: string) => {
    //새로 등록할 항목의 id를 구함.
    //등록된 항목 중에서 가장 큰 id를 구하고, 그 값에 1을 더함.
    //만약 리스트가 비었다면 1을 id로 사용.

    const nextId =
      searchList.length > 0
        ? Math.max(...searchList.map(searchList => searchList.id)) + 1
        : 1;

    const search = {
      id: nextId,
      search: txt,
    };
    setSearchList(searchList.concat(search));
  };

  const onRemove = (id: any) => {
    const nextSearchs = searchList.filter(search => search.id !== id);
    setSearchList(nextSearchs);
  };

  const onPress = () => {
    onInsert(text);
    setText('');
    Keyboard.dismiss();
  };

  const onAllRemove = () => {
    setSearchList([]);
  };

  return (
    <BaseSafeView>
      <Container bgColor={'#212121'} padding={0}>
        <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
          <RowBox alignC justify={'space-around'}>
            <BackButton />
            <View style={styles.block}>
              <TextInput
                placeholder="검색어를 입력하세요."
                placeholderTextColor={'#9e9e9e'}
                style={styles.input}
                value={text}
                onChangeText={setText}
                onSubmitEditing={onPress}
              />
              <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonStyle}>
                  <CommonImage source={Search} width={24} height={24} />
                </View>
              </TouchableOpacity>
            </View>
          </RowBox>
        </View>
        <Container
          bgColor={'#fff'}
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
            }}>
            <CommonText fontSize={18} color={'#1C1C1C'}>
              최근 검색어
            </CommonText>
            <TouchableOpacity onPress={onAllRemove}>
              <CommonText fontSize={12} color={'#96A0B5'}>
                전체 지우기
              </CommonText>
            </TouchableOpacity>
          </View>
          <FlatList
            data={searchList}
            style={{flexGrow: 0}}
            renderItem={items => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: 10,
                  }}>
                  <CommonText fontSize={14} color={'#1C1C1C'} paddingRight={10}>
                    {items.item.search}
                  </CommonText>
                  <TouchableOpacity onPress={() => onRemove(items.item.id)}>
                    <CommonImage source={Close} width={10} height={10} />
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={items => items.id.toString()}
          />
          <View style={{width: '100%', paddingVertical: 20}}>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: Colors.c_gray200,
              }}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CommonText fontSize={18} color={'#1C1C1C'} paddingRight={10}>
                인기 매칭글
              </CommonText>
              <TouchableOpacity>
                <CommonText fontSize={12} color={'#96A0B5'}>
                  더보기
                </CommonText>
              </TouchableOpacity>
            </View>
            <FlatList
              data={Object.keys(popularMatchingList)}
              horizontal
              style={{marginVertical: 20, flexGrow: 0}}
              renderItem={({item, index}) => {
                return <PopularMatchingBox item={popularMatchingList[item]} />;
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 40,
            }}>
            <CommonText fontSize={18} color={'#1C1C1C'} paddingRight={10}>
              최근 매칭글
            </CommonText>
            <TouchableOpacity>
              <CommonText fontSize={12} color={'#96A0B5'}>
                더보기
              </CommonText>
            </TouchableOpacity>
          </View>
          <FlatList
            data={Object.keys(recentMatchingList)}
            style={{marginTop: 20}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <MatchingItem
                  item={{
                    writer: recentMatchingList[item].nickname,
                    contents: recentMatchingList[item].content,
                    areaList: recentMatchingList[item].areas,
                    ...recentMatchingList[item],
                  }}
                  paddingN
                />
              );
            }}
          />
        </Container>
      </Container>
    </BaseSafeView>
  );
};

const styles = StyleSheet.create({
  block: {
    height: 48,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: '#303030',
    width: '90%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

export default MatchingSearchScreen;
