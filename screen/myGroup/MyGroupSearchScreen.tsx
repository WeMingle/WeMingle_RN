import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  BaseSafeView,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
  RowBox,
} from '../CommonStyled.style';
import {Colors} from '../../assets/color/Colors';
import Back_White from '../../assets/back_icon_white.png';
import Close from '../../assets/Close.png';
import {SearchLoading} from './style/MyGroupStyle.style';
import Search from '../../assets/search.png';

interface Search {
  id: number;
  search: string;
}

const MyGroupSearchScreen = ({user}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [text, setText] = useState('');

  // const [searchList, setSearchList] = useState([
  //   {id: 1, search: '농구'},
  //   {id: 2, search: '스노우보드'},
  // ]);

  const [searchList, setSearchList] = useState<Search[]>([
    {id: 1, search: '농구'},
    {id: 2, search: '스노우보드'},
  ]);

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

  const onBackPress = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return true;
    }
    return false;
  };

  const onAllRemove = () => {
    console.log(typeof searchList);
    // setSearchList(
    //   Object.keys(searchList).forEach(key => delete searchList[key]),
    // );
    // const allRemoveSearch:searchList
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }),
    [onBackPress];

  return (
    <BaseSafeView>
      <Container bgColor={'#212121'} padding={0}>
        <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
          <RowBox alignC justify={'space-around'}>
            <TouchableOpacity onPress={onBackPress}>
              <CommonImage
                source={Back_White}
                width={48}
                height={24}
                marginRight={20}
              />
            </TouchableOpacity>
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
                ㅇㅇ 님을 위한 추천 그룹
              </CommonText>
              <TouchableOpacity>
                <CommonText fontSize={12} color={'#96A0B5'}>
                  더보기
                </CommonText>
              </TouchableOpacity>
            </View>
            <FlatList
              data={[
                {
                  image: 'none',
                  title: '축구동아리',
                  content: `숭실대 축구동아리입니다${'\n'}2324 신입생 모집중`,
                },
                {
                  image: 'none',
                  title: '축구동아리',
                  content: `숭실대 축구동아리입니다${'\n'}2324 신입생 모집중`,
                },
                {
                  image: 'none',
                  title: '축구동아리',
                  content: `숭실대 축구동아리입니다${'\n'}2324 신입생 모집중`,
                },
                {
                  image: 'none',
                  title: '축구동아리',
                  content: `숭실대 축구동아리입니다${'\n'}2324 신입생 모집중`,
                },
              ]}
              horizontal
              style={{marginVertical: 20, flexGrow: 0}}
              renderItem={items => {
                return (
                  <View
                    style={{
                      marginLeft:
                        items.index === 0 || items.index === items.length - 1
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
                      width={132}
                      height={132}></CommonTouchableOpacity>
                    <CommonText
                      fontSize={14}
                      color={'#1C1C1C'}
                      style={{marginBottom: 5}}>
                      {items.item?.title}
                    </CommonText>
                    <CommonText fontSize={12} color={'#8491A7'}>
                      {items.item?.content}
                    </CommonText>
                  </View>
                );
              }}
            />
          </View>
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

export default MyGroupSearchScreen;
