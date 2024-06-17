import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  ListRenderItem,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
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
import {overlay} from 'react-native-paper';

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
  const [isVisible, setIsVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({x: 0, y: 0});
  const flatListRef = useRef<FlatList>(null);

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

  const openModal = (x: number, y: number, item: any) => {
    setSelected(item.memberPk);
    setModalPosition({x, y});
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setSelected(null);
  };

  const renderItem: ListRenderItem<Item> = ({item}) => {
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
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: Colors.c_gray200,
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
            <TouchableOpacity
              onPress={event => {
                const {pageX, pageY} = event.nativeEvent;
                openModal(pageX, pageY, item);
              }}
              style={{zIndex: 0}}>
              <CommonImage source={MoreVert} width={3} height={14} zIndex={0} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={memberSearchData}
        style={{
          flexGrow: 0,
          width: '100%',
          marginBottom: 110,
          backgroundColor: '#ffffff',
        }}
        renderItem={renderItem}
        keyExtractor={item => item.memberPk}
      />
      <Modal
        transparent={true}
        visible={isVisible}
        onRequestClose={closeModal}
        animationType="fade">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay}>
            <View
              style={[
                styles.modal,
                {top: modalPosition.y, left: modalPosition.x - 120},
              ]}>
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
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    position: 'absolute',
    width: 120,
    height: 80,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    justifyContent: 'space-between',
    elevation: 5,
  },
});
