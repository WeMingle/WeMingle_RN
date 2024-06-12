import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  ListRenderItem,
  Modal,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
} from '../../CommonStyled.style';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchTabBar from './SearchTabBar';
import MoreVert from '../../../assets/more_vert.png';
import {Colors} from '../../../assets/color/Colors';

const Tab = createMaterialTopTabNavigator();

export const SearchTabs = ({teamSearch, memberSearch}: any) => {
  useEffect(() => {
    teamSearch;
    memberSearch;
  }, [teamSearch, memberSearch]);

  return (
    <Tab.Navigator tabBar={props => <SearchTabBar {...props} />}>
      <Tab.Screen
        name="그룹"
        component={GroupScreen}
        initialParams={{data: teamSearch}}
      />
      <Tab.Screen
        name="프로필"
        component={ProfileScreen}
        initialParams={{data: memberSearch}}
      />
    </Tab.Navigator>
  );
};

const GroupScreen = ({route}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {data} = route.params;

  useEffect(() => {
    data;
  }, [data]);

  let teamSearchData: any[] = [];

  const teamSearchList: any[] = Object.values(data);
  const teamSearchKeys: any[] = Object.keys(data);

  for (let i = 0; i < teamSearchList.length; i++) {
    teamSearchData.push({
      teamPk: teamSearchKeys[i],
      teamName: teamSearchList[i].teamName,
      content: teamSearchList[i].content,
      teamImgUrl: teamSearchList[i].teamImgUrl,
      recruitmentType: teamSearchList[i].recruitmentType,
    });
  }
  return (
    <FlatList
      data={teamSearchData}
      style={{
        flexGrow: 0,
        width: '100%',
        marginBottom: 110,
        backgroundColor: '#ffffff',
      }}
      numColumns={2}
      renderItem={items => {
        return (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#ffffff',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  marginHorizontal: 10,
                  marginBottom:
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
                  width={152}
                  height={152}
                  onPress={() => {
                    navigation.navigate('GroupFeed', {
                      teamPk: items.item?.teamPk,
                    });
                  }}></CommonTouchableOpacity>
                <CommonText
                  textAlignC
                  fontSize={14}
                  color={'#1C1C1C'}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{marginBottom: 5, textAlign: 'left', width: 152}}>
                  {items.item?.teamName}
                </CommonText>
                <CommonText
                  textAlignC
                  fontSize={12}
                  color={'#666666'}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{textAlign: 'left', width: 152}}>
                  {items.item?.content}
                </CommonText>
              </View>
            </View>
          </View>
        );
      }}
      keyExtractor={item => item.teamPk}
    />
  );
};

const ProfileScreen = ({route}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {data} = route.params;
  const [selected, setSelected] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    data;
  }, [data]);

  let memberSearchData: any[] = [];

  const memberSearchList: any[] = Object.values(data);
  const memberSearchKeys: any[] = Object.keys(data);

  for (let i = 0; i < memberSearchList.length; i++) {
    memberSearchData.push({
      memberPk: memberSearchKeys[i],
      isMe: memberSearchList[i].isMe,
      nickname: memberSearchList[i].nickname,
      profileImg: memberSearchList[i].profileImg,
    });
  }

  type Item = {
    memberPk: string;
    isMe: boolean;
    nickname: string;
    profileImg: string;
  };

  const onPress = (item: any) => {
    if (selected === item.memberPk) {
      setSelected(null);
    } else {
      setSelected(item.memberPk);
    }
  };

  const renderItem: ListRenderItem<Item> = ({item}) => {
    const isSelected = item.memberPk === selected;
    return (
      <View>
        <View
          style={{
            width: '90%',
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              zIndex: 0,
            }}>
            <CommonTouchableOpacity
              style={[
                {
                  borderRadius: 50,
                },
              ]}
              bgColor={'#000'}
              width={40}
              height={40}
              onPress={() =>
                navigation.navigate('SearchProfile')
              }></CommonTouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SearchProfile', {
                  memberPk: item?.memberPk,
                })
              }>
              <CommonText
                fontSize={14}
                color={'#000000'}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{marginLeft: 10}}>
                {item?.nickname}
              </CommonText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginRight: 10,
            }}>
            <TouchableOpacity onPress={() => onPress(item)} style={{zIndex: 0}}>
              <CommonImage source={MoreVert} width={3} height={14} zIndex={0} />
            </TouchableOpacity>
          </View>
          {isSelected ? (
            <View
              style={{
                backgroundColor: '#ffffff',
                width: 120,
                height: 80,
                zIndex: 999,
                position: 'absolute',
                right: 13,
                top: 32,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#cccccc',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity>
                <CommonText fontSize={14} color={'#212121'} numberOfLines={1}>
                  채팅하기
                </CommonText>
              </TouchableOpacity>
              <TouchableOpacity>
                <CommonText fontSize={14} color={'#FF5D5D'} numberOfLines={1}>
                  신고하기
                </CommonText>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>
        <View
          style={{
            width: '90%',
            height: 1,
            backgroundColor: Colors.c_gray200,
            marginHorizontal: 20,
          }}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={memberSearchData}
      style={{
        flexGrow: 0,
        width: '100%',
        marginBottom: 110,
        backgroundColor: '#ffffff',
        zIndex: 1,
      }}
      renderItem={renderItem}
      keyExtractor={item => item.memberPk}
    />
  );
};
