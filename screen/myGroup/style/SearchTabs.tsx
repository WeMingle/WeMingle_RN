import React from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';
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

export const SearchTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <SearchTabBar {...props} />}>
      <Tab.Screen name="그룹" component={GroupScreen} />
      <Tab.Screen name="프로필" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const GroupScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <FlatList
      data={[
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
        {
          image: 'none',
          name: '숭실대 축구 동아리',
          content: '숭실대 축구 동아리입니다.',
        },
      ]}
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
                    navigation.navigate('GroupPage');
                  }}></CommonTouchableOpacity>
                <CommonText
                  textAlignC
                  fontSize={14}
                  color={'#1C1C1C'}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{marginBottom: 5, textAlign: 'left', width: 152}}>
                  {items.item?.name}
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
    />
  );
};

const ProfileScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <FlatList
      data={[
        {
          image: 'none',
          nickname: '축구왕슛돌이',
        },
        {
          image: 'none',
          nickname: '축구왕슛돌이',
        },
        {
          image: 'none',
          nickname: '축구왕슛돌이',
        },
        {
          image: 'none',
          nickname: '축구왕슛돌이',
        },
        {
          image: 'none',
          nickname: '축구왕슛돌이',
        },
        {
          image: 'none',
          nickname: '축구왕슛돌이',
        },
        {
          image: 'none',
          nickname: '축구왕슛돌이',
        },
        {
          image: 'none',
          nickname: '축구왕슛돌이',
        },
        {
          image: 'none',
          nickname: '축구왕슛돌이',
        },
        {
          image: 'none',
          nickname: '축구왕슛돌이',
        },
      ]}
      style={{
        flexGrow: 0,
        width: '100%',
        marginBottom: 110,
        backgroundColor: '#ffffff',
      }}
      renderItem={items => {
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
                  onPress={() => navigation.navigate('SearchProfile')}>
                  <CommonText
                    fontSize={14}
                    color={'#000000'}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{marginLeft: 10}}>
                    {items.item?.nickname}
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
                <TouchableOpacity>
                  <CommonImage source={MoreVert} width={3} height={14} />
                </TouchableOpacity>
              </View>
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
      }}
    />
  );
};
