import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
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

const MyGroupSearchScreen = () => {
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
            <TextInput
              placeholder="검색어를 입력하세요."
              placeholderTextColor={'#9e9e9e'}
              style={{
                height: 48,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                backgroundColor: '#303030',
                width: '90%',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                fontSize: 14,
                alignItems: 'center',
                color: '#ffffff',
              }}
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
            }}>
            <CommonText fontSize={18} color={'#1C1C1C'}>
              최근 검색어
            </CommonText>
            <TouchableOpacity>
              <CommonText fontSize={12} color={'#96A0B5'}>
                전체 지우기
              </CommonText>
            </TouchableOpacity>
          </View>
          <FlatList
            data={[{search: '농구'}, {search: '스노우보드'}]}
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
                  <TouchableOpacity>
                    <CommonImage source={Close} width={10} height={10} />
                  </TouchableOpacity>
                </View>
              );
            }}
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

export default MyGroupSearchScreen;
