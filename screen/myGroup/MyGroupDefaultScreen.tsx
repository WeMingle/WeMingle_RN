import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {
  BaseSafeView,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
  RowBox,
} from '../CommonStyled.style';
import {useNavigation} from '@react-navigation/native';
import Search from '../../assets/search.png';
import Add_Box from '../../assets/add_box.png';
import Arrow_Right from '../../assets/arrow_right.png';
import {SearchButton} from './style/MyGroupStyle.style';

const MyGroupDefaultScreen = ({navigation: {navigate}, route}: any) => {
  return (
    <BaseSafeView>
      <FlatList
        ListHeaderComponent={
          <View>
            <Container bgColor={'#212121'} padding={0}>
              <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
                <RowBox alignC justify={'space-between'}>
                  <CommonText fontSize={18} color={'#fff'}>
                    {route.params.pageName.length === 7
                      ? '그룹 둘러보기'
                      : '내그룹'}
                  </CommonText>
                  <RowBox>
                    <SearchButton width={24} height={24} />
                    <CommonImage
                      source={Add_Box}
                      width={24}
                      height={24}
                      style={{marginLeft: 12}}
                    />
                  </RowBox>
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
                <RowBox justify={'space-between'} marginTop={40}>
                  <CommonText fontSize={16}>
                    ㅇㅇㅇ님의 학교에 속한 그룹이에요!
                  </CommonText>
                  <CommonImage source={Arrow_Right} width={24} height={24} />
                </RowBox>

                <FlatList
                  data={[
                    {image: 'none', name: '숭실대 축구 동아리'},
                    {image: 'none', name: '숭실대 축구 동아리'},
                    {image: 'none', name: '숭실대 축구 동아리'},
                    {image: 'none', name: '숭실대 축구 동아리'},
                    {image: 'none', name: '숭실대 축구 동아리'},
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
                          height={96}></CommonTouchableOpacity>
                        <CommonText
                          textAlignC
                          fontSize={10}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          color={'#212121'}
                          style={{marginBottom: 5, width: 96}}>
                          {items.item?.name}
                        </CommonText>
                      </View>
                    );
                  }}
                />

                <RowBox justify={'space-between'} marginTop={20}>
                  <CommonText fontSize={16} color={'#000000'}>
                    위밍글이 추천하는 그룹
                  </CommonText>
                </RowBox>
              </Container>
            </Container>
          </View>
        }
        data={[
          {image: 'none', name: '숭실대 축구 동아리'},
          {image: 'none', name: '숭실대 축구 동아리'},
          {image: 'none', name: '숭실대 축구 동아리'},
          {image: 'none', name: '숭실대 축구 동아리'},
          {image: 'none', name: '숭실대 축구 동아리'},
          {image: 'none', name: '숭실대 축구 동아리'},
          {image: 'none', name: '숭실대 축구 동아리'},
          {image: 'none', name: '숭실대 축구 동아리'},
          {image: 'none', name: '숭실대 축구 동아리'},
          {image: 'none', name: '숭실대 축구 동아리'},
          {image: 'none', name: '숭실대 축구 동아리'},
          {image: 'none', name: '숭실대 축구 동아리'},
        ]}
        style={{
          flexGrow: 0,
          width: '100%',
          height: '100%',
        }}
        numColumns={2}
        renderItem={items => {
          return (
            <View style={{flex: 1, alignItems: 'center'}}>
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
                    height={152}></CommonTouchableOpacity>
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
                    style={{marginBottom: 5, textAlign: 'left', width: 152}}>
                    {items.item?.name}
                  </CommonText>
                </View>
              </View>
            </View>
          );
        }}
      />
    </BaseSafeView>
  );
};

export default MyGroupDefaultScreen;
