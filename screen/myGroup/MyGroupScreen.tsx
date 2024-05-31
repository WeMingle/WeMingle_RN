import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';
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
import More_Vert from '../../assets/more_vert.png';
import Add_Box from '../../assets/add_box.png';
import {
  ClickBookmark,
  SearchButton,
  ClickFavorite,
  ChattingIcon,
} from './style/MyGroupStyle.style';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Reducers';
import {useAppDispatch} from '../../redux/Store';
import {fetchUnivCertifyGroup} from '../../redux/slice/MyGroup/CheckUnivCertifyGroupSlice';
import MyGroupDefaultScreen from './MyGroupDefaultScreen';

const MyGroupScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();
  const {loading, error, responseData} = useSelector(
    (state: RootState) => state.checkUnivCertifyGroup,
  );

  useEffect(() => {
    dispatch(fetchUnivCertifyGroup());
  }, [dispatch]);

  return (
    <>
      {responseData?.existMyTeam === false ? (
        <MyGroupDefaultScreen pageName={'내그룹'} />
      ) : (
        <BaseSafeView>
          <FlatList
            ListHeaderComponent={
              <View>
                <Container bgColor={'#212121'} padding={0}>
                  <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
                    <RowBox alignC justify={'space-between'}>
                      <CommonText fontSize={18} color={'#fff'}>
                        내그룹
                      </CommonText>
                      <RowBox>
                        <SearchButton width={24} height={24} />
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('SelectSports');
                          }}>
                          <CommonImage
                            source={Add_Box}
                            width={24}
                            height={24}
                            style={{marginLeft: 12}}
                          />
                        </TouchableOpacity>
                      </RowBox>
                    </RowBox>
                    <RowBox>
                      <FlatList
                        data={[
                          {image: 'none', name: '숭실대 축구 동아리'},
                          {image: 'none', name: '숭실대 축구 동아리'},
                          {image: 'none', name: '숭실대 축구 동아리'},
                        ]}
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
                                width={96}
                                height={96}
                                onPress={() =>
                                  navigation.navigate('GroupFeed')
                                }></CommonTouchableOpacity>
                              <CommonText
                                textAlignC
                                fontSize={10}
                                color={'#fff'}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{marginBottom: 5, width: 96}}>
                                {items.item?.name}
                              </CommonText>
                            </View>
                          );
                        }}
                        ListFooterComponent={
                          <View
                            style={{
                              marginLeft: 10,
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
                              bgColor={'#d2d2d2'}
                              width={96}
                              height={96}
                              onPress={() => {
                                navigation.navigate('MyGroupDefault', {
                                  pageName: '그룹 둘러보기',
                                });
                              }}></CommonTouchableOpacity>
                          </View>
                        }
                      />
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
                    <RowBox>
                      <CommonText fontSize={14}>새글피드</CommonText>
                    </RowBox>
                  </Container>
                </Container>
              </View>
            }
            data={[
              {
                group: '숭실대 축구동아리',
                title: '보호대 공구 진행합니다',
                author: '그룹장',
                time: '56분전',
                content: `필수 준비물인 보호대 공구합니다.${'\n'}공구 희망하시는 분은 댓글로 이름/번호/입금여부 기입해주세요`,
                image: [],
                favorite: 30,
                chat: 80,
                bookmark: true,
                favorite_click: true,
              },
              {
                group: '숭실대 축구동아리',
                title: '보호대 공구 진행합니다',
                author: '그룹장',
                time: '56분전',
                content: `필수 준비물인 보호대 공구합니다.${'\n'}공구 희망하시는 분은 댓글로 이름/번호/입금여부 기입해주세요`,
                image: [],
                favorite: 500,
                chat: 1000,
                bookmark: false,
                favorite_click: false,
              },
              {
                group: '숭실대 축구동아리',
                title: '보호대 공구 진행합니다',
                author: '그룹장',
                time: '56분전',
                content: `필수 준비물인 보호대 공구합니다.${'\n'}공구 희망하시는 분은 댓글로 이름/번호/입금여부 기입해주세요`,
                image: [],
                favorite: 1500,
                chat: 2000,
                bookmark: false,
                favorite_click: true,
              },
              {
                group: '숭실대 축구동아리',
                title: '보호대 공구 진행합니다',
                author: '그룹장',
                time: '56분전',
                content: `필수 준비물인 보호대 공구합니다.${'\n'}공구 희망하시는 분은 댓글로 이름/번호/입금여부 기입해주세요`,
                image: [],
                favorite: 20,
                chat: 90,
                bookmark: true,
                favorite_click: true,
              },
              {
                group: '숭실대 축구동아리',
                title: '보호대 공구 진행합니다',
                author: '그룹장',
                time: '56분전',
                content: `필수 준비물인 보호대 공구합니다.${'\n'}공구 희망하시는 분은 댓글로 이름/번호/입금여부 기입해주세요`,
                image: [],
                favorite: 100,
                chat: 150,
                bookmark: true,
                favorite_click: false,
              },
            ]}
            style={{
              flexGrow: 0,
              width: '100%',
              height: '100%',
            }}
            renderItem={items => {
              return (
                <View style={{width: '100%'}}>
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: Colors.c_gray200,
                    }}
                  />
                  <View style={{padding: 20}}>
                    <TouchableOpacity>
                      <CommonText fontSize={12} color={'#0E6FFF'}>
                        {items.item?.group}
                      </CommonText>
                    </TouchableOpacity>
                    <RowBox alignC justify={'space-between'} marginT={10}>
                      <CommonText fontSize={18}>{items.item?.title}</CommonText>
                      <CommonImage
                        source={More_Vert}
                        width={3}
                        height={14.54}
                        marginHorizontal={10}
                      />
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
                        {items.item?.author}
                      </CommonText>
                      <CommonText
                        fontSize={10}
                        color={'#AFBAC8'}
                        paddingLeft={25}>
                        {items.item?.time}
                      </CommonText>
                    </RowBox>
                    <View>
                      <View
                        style={{
                          width: '100%',
                          height: 1,
                          backgroundColor: Colors.c_gray200,
                          marginTop: 10,
                          marginBottom: 10,
                        }}
                      />
                      <CommonText
                        fontSize={14}
                        color={'#292E41'}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {items.item?.content}
                      </CommonText>
                      <FlatList
                        data={[{image: 'none'}, {image: 'none'}]}
                        horizontal
                        style={{
                          marginVertical: 20,
                          flexGrow: 0,
                        }}
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
                                    marginBottom: 5,
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                  },
                                ]}
                                bgColor={'#F3F3F3'}
                                width={80}
                                height={80}></CommonTouchableOpacity>
                            </View>
                          );
                        }}
                      />
                      <RowBox justify={'space-start'}>
                        <ClickFavorite
                          favorite_click={items.item?.favorite_click}
                          favorite_num={items.item?.favorite}
                          width={19.5}
                          height={16}
                        />
                        <ChattingIcon
                          chatting_num={items.item?.chat}
                          width={19.5}
                          height={16}
                        />
                        <View
                          style={{
                            width: 26,
                            height: 24,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <ClickBookmark
                            bookmark={items.item.bookmark}
                            width={19.5}
                            height={16}
                          />
                        </View>
                      </RowBox>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </BaseSafeView>
      )}
    </>
  );
};

export default MyGroupScreen;
