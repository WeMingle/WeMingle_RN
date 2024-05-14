import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  StyleSheet,
  Keyboard,
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
} from '../CommonStyled.style';
import {BackButton} from './style/MyGroupStyle.style';
import {Colors} from '../../assets/color/Colors';
import Flag from '../../assets/emoji_flags.png';
import Person from '../../assets/person_01.png';
import RectangleBlue from '../../assets/RectangleBlue.png';
import RectangleWhite from '../../assets/RectangleWhite.png';
import ExpandBlue from '../../assets/expand_more.png';
import Settings from '../../assets/settings.png';
import AnnounceFirst from '../../assets/announce01.png';
import AnnounceSecond from '../../assets/announce02.png';
import More_Vert from '../../assets/more_vert.png';
import {RadioButton} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {
  ClickBookmark,
  ClickFavorite,
  ChattingIcon,
  VoteComponent,
} from './style/MyGroupStyle.style';

const GroupPageScreen = ({route}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <BaseSafeView>
      <FlatList
        ListHeaderComponent={
          <Container bgColor={'#212121'} padding={0}>
            <View style={{paddingHorizontal: 20, paddingVertical: 70}}>
              <RowBox alignC justify={'space-start'}>
                <BackButton />
              </RowBox>
            </View>
            <View
              style={{
                width: '100%',
                height: '100%',
                paddingTop: 30,
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 30,
                  justifyContent: 'space-between',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 10,
                    },
                  ]}
                  bgColor={'#000000'}
                  width={88}
                  height={88}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'flex-start',
                    marginLeft: 15,
                    height: 88,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <CommonImage source={Flag} width={10} height={10} />
                    <CommonText
                      fontSize={10}
                      color={'#96A0B5'}
                      textAlignC
                      paddingLeft={3}
                      paddingRight={15}>
                      2024.01.21
                    </CommonText>
                    <CommonImage source={Person} width={10} height={10} />
                    <CommonText
                      fontSize={10}
                      color={'#96A0B5'}
                      textAlignC
                      paddingLeft={3}>
                      54명
                    </CommonText>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        flex: 1,
                      }}>
                      <CommonImage source={Settings} width={24} height={24} />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <CommonText fontSize={18} color={'#1C1C1C'} textAlignC>
                      숭실대 축구동아리
                    </CommonText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#E7F1FF',
                        paddingVertical: 5,
                        paddingHorizontal: 5,
                        flexDirection: 'row',
                        borderRadius: 20,
                      }}>
                      <CommonImage
                        source={RectangleBlue}
                        width={8}
                        height={8}
                        marginRight={1}
                      />
                      <CommonImage
                        source={RectangleBlue}
                        width={8}
                        height={8}
                        marginRight={1}
                      />
                      <CommonImage
                        source={RectangleBlue}
                        width={8}
                        height={8}
                        marginRight={1}
                      />
                      <CommonImage
                        source={RectangleBlue}
                        width={8}
                        height={8}
                        marginRight={1}
                      />
                      <CommonImage
                        source={RectangleWhite}
                        width={8}
                        height={8}
                      />
                    </View>
                    <CommonText
                      fontSize={12}
                      color={'#0E6FFF'}
                      textAlignC
                      paddingLeft={5}
                      paddingRight={5}>
                      매칭일지 3개
                    </CommonText>
                    <CommonImage source={ExpandBlue} width={4.5} height={8} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 30,
                  marginTop: 20,
                }}>
                <CommonText
                  fontSize={12}
                  color={'#6B768B'}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  숭실대 충구동아리입니다 2324 신입생 모집중.숭실대
                  충구동아리입니다 2324 신입생 모집중.숭실대 충구동아리입니다
                  2324 신입생 모집중.숭실대 충구동아리입니다 2324 신입생
                  모집중.숭실대 충구동아리입니다 2324 신입생 모집중.
                </CommonText>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={{
                    flexGrow: 1,
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('GroupPage');
                  }}>
                  <CommonText
                    fontSize={14}
                    color={'#1C1C1C'}
                    textAlignC
                    paddingVertical={10}>
                    그룹 피드
                  </CommonText>
                  <View
                    style={{
                      width: '100%',
                      height: 2,
                      backgroundColor: '#0E6FFF',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexGrow: 1,
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('GroupChatting');
                  }}>
                  <CommonText
                    fontSize={14}
                    color={'#1C1C1C'}
                    textAlignC
                    paddingVertical={10}>
                    채팅
                  </CommonText>
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: Colors.c_gray200,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexGrow: 1,
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('GroupMember');
                  }}>
                  <CommonText
                    fontSize={14}
                    color={'#1C1C1C'}
                    textAlignC
                    paddingVertical={10}>
                    그룹원
                  </CommonText>
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: Colors.c_gray200,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton
                    value=""
                    color={Colors.blue400}
                    status={'checked'}
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
                  <CommonImage
                    source={AnnounceFirst}
                    width={18}
                    height={18}
                    marginRight={10}
                  />
                  <CommonImage source={AnnounceSecond} width={18} height={18} />
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 3,
                  backgroundColor: Colors.c_gray200,
                }}
              />
            </View>
          </Container>
        }
        data={[
          {
            group: {
              title: '2월 17일 축동 매칭 수요조사',
              author: '그룹장',
              time: '56분전',
              content: `매칭을 희망하는 분은 투표 진행해주세요${'\n'}2월 10일 1시에 마감합니다`,
              vote_title: '투표 제목',
              voting_member: 34,
              closing_date: '2024.02.10 13:00',
              participate_title: '참여',
              participate_member: 22,
              absence_title: '불참',
              absence_member: 12,
              favorite_click: true,
              favorite_count: 999,
              chatting_count: 999,
              bookmark: true,
            },
            chatting: {},
            member: {},
          },
          {
            group: {
              title: '연합 대회 일정 나왔습니다',
              author: '그룹장',
              time: '56분전',
              content: `1월 4일 경기대${'\n'}1월 9일 건국대${'\n'}1월 21일 경희대`,
              vote_title: null,
              voting_member: null,
              closing_date: null,
              participate_title: null,
              participate_member: null,
              absence_title: null,
              absence_member: null,
              favorite_click: false,
              favorite_count: 10,
              chatting_count: 1,
              bookmark: false,
            },
            chatting: {},
            member: {},
          },
          {
            group: {
              title: '2월 17일 축동 매칭 수요조사',
              author: '그룹장',
              time: '56분전',
              content: `매칭을 희망하는 분은 투표 진행해주세요${'\n'}2월 10일 1시에 마감합니다`,
              vote_title: '투표 제목',
              voting_member: 50,
              closing_date: '2024.02.10 13:00',
              participate_title: '희망함',
              participate_member: 20,
              absence_title: '희망하지 않음',
              absence_member: 30,
              favorite_click: true,
              favorite_count: 20,
              chatting_count: 50,
              bookmark: false,
            },
            chatting: {},
            member: {},
          },
          {
            group: {
              title: '2월 17일 축동 매칭 수요조사',
              author: '그룹장',
              time: '56분전',
              content: `공동구매를 희망하는 분은 투표 진행해주세요${'\n'}2월 10일 1시에 마감합니다`,
              vote_title: '투표 제목',
              voting_member: 80,
              closing_date: '2024.02.10 13:00',
              participate_title: '공동구매 원함',
              participate_member: 33,
              absence_title: '공동구매 원하지 않음',
              absence_member: 47,
              favorite_click: false,
              favorite_count: 1000,
              chatting_count: 700,
              bookmark: true,
            },
            chatting: {},
            member: {},
          },
        ]}
        renderItem={items => {
          return (
            <View style={{width: '100%'}}>
              <View style={{padding: 20}}>
                <RowBox alignC justify={'space-between'}>
                  <CommonText fontSize={18}>
                    {items.item?.group?.title}
                  </CommonText>
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
                    {items.item?.group?.author}
                  </CommonText>
                  <CommonText fontSize={10} color={'#AFBAC8'} paddingLeft={25}>
                    {items.item?.group?.time}
                  </CommonText>
                </RowBox>
                <View>
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: '#F4F6FA',
                      marginTop: 10,
                    }}
                  />
                  <CommonText
                    fontSize={14}
                    color={'#292E41'}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    paddingTop={10}>
                    {items.item?.group?.content}
                  </CommonText>
                  <VoteComponent
                    vote_title={items.item?.group?.vote_title}
                    voting_member={items.item?.group?.voting_member}
                    closing_date={items.item?.group?.closing_date}
                    participate_title={items.item?.group?.participate_title}
                    participate_member={items.item?.group?.participate_member}
                    absence_title={items.item?.group?.absence_title}
                    absence_member={items.item?.group?.absence_member}
                  />
                  <View style={{width: '100%', marginTop: 10}}>
                    <RowBox justify={'space-start'}>
                      <ClickFavorite
                        favorite_click={items.item?.group?.favorite_click}
                        favorite_num={items.item?.group?.favorite_count}
                        width={19.5}
                        height={16}
                      />
                      <ChattingIcon
                        chatting_num={items.item?.group?.chatting_count}
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
                          bookmark={items.item?.group?.bookmark}
                          width={19.5}
                          height={16}
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
          );
        }}
      />
    </BaseSafeView>
  );
};

const styles = StyleSheet.create({});

export default GroupPageScreen;
