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
} from '../../CommonStyled.style';
import {Colors} from '../../../assets/color/Colors';
import Close from '../../../assets/Close.png';
import {BackButton} from '../style/MyGroupStyle.style';
import Search from '../../../assets/search.png';
import SearchLoadingScreen from './SearchLoadingScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/Reducers';
import {useAppDispatch} from '../../../redux/Store';
import {
  fetchTeamSearch,
  fetchMemberSearch,
  fetchMemberRecTeams,
} from '../../../redux/slice/MyGroup/SearchSlice';
import {SearchTabs} from '../style/SearchTabs';

interface Search {
  id: number;
  search: string;
}

const MyGroupSearchScreen = ({user}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [text, setText] = useState('');
  const [searchList, setSearchList] = useState<Search[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const dispatch = useAppDispatch();
  const {teamSearch, memberSearch, memberTeams, loading, error} = useSelector(
    (state: RootState) => state.search,
  );

  useEffect(() => {
    dispatch(fetchMemberRecTeams());
  }, [dispatch]);

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
    onRendered(text);
    setText('');
    Keyboard.dismiss();
    setIsSearched(true);
  };

  const onAllRemove = () => {
    console.log(typeof searchList);
    setSearchList([]);
  };

  const onRendered = async (query: string) => {
    dispatch(fetchMemberSearch(query));
    dispatch(fetchTeamSearch(query));
  };

  // console.log('팀 랜더링? : ', teamSearch);
  // console.log('멤버 랜더링? : ', memberSearch);
  console.log('로딩 여부? : ', loading);
  console.log('error? : ', error);

  return (
    <>
      {loading === true ? (
        <SearchLoadingScreen search={text} />
      ) : (
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
            {isSearched === false ? (
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
                        <CommonText
                          fontSize={14}
                          color={'#1C1C1C'}
                          paddingRight={10}>
                          {items.item.search}
                        </CommonText>
                        <TouchableOpacity
                          onPress={() => onRemove(items.item.id)}>
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
                    <CommonText
                      fontSize={18}
                      color={'#1C1C1C'}
                      paddingRight={10}>
                      ㅇㅇ 님을 위한 추천 그룹
                    </CommonText>
                    <TouchableOpacity>
                      <CommonText fontSize={12} color={'#96A0B5'}>
                        더보기
                      </CommonText>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={Object.values(memberTeams)}
                    horizontal
                    style={{marginVertical: 20, flexGrow: 0}}
                    renderItem={items => {
                      return (
                        <View
                          style={{
                            marginLeft:
                              items.index === 0 ||
                              items.index === items.length - 1
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
                            height={132}
                            onPress={() => {
                              navigation.navigate('GroupFeed');
                            }}></CommonTouchableOpacity>
                          <CommonText
                            fontSize={14}
                            color={'#1C1C1C'}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{marginBottom: 5, width: 132}}>
                            {items.item?.teamName}
                          </CommonText>
                          <CommonText
                            fontSize={12}
                            color={'#8491A7'}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{width: 132}}>
                            {items.item?.content}
                          </CommonText>
                        </View>
                      );
                    }}
                  />
                </View>
              </Container>
            ) : (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  paddingTop: 10,
                  backgroundColor: '#ffffff',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <SearchTabs
                  teamSearch={teamSearch}
                  memberSearch={memberSearch}
                />
              </View>
            )}
          </Container>
        </BaseSafeView>
      )}
    </>
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
