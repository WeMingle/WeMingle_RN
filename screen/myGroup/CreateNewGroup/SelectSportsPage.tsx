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
import {BackButton} from '../style/MyGroupStyle.style';
import {Colors} from '../../../assets/color/Colors';
import styled from 'styled-components/native';

const SelectSportsPage = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const barWidth = Math.ceil((1 / 5) * 100);
  return (
    <BaseSafeView>
      <Container bgColor={'#ffffff'} padding={0}>
        <View
          style={{paddingHorizontal: 10, paddingTop: 40, paddingBottom: 20}}>
          <RowBox alignC justify={'flex-start'}>
            <BackButton />
            <CommonText fontSize={18} color={'#1C1C1C'}>
              새 그룹
            </CommonText>
          </RowBox>
        </View>
        <View
          style={{
            width: '100%',
            height: 5,
            borderWidth: 1,
            borderColor: '#DCDCDC',
            marginBottom: 5,
          }}>
          <ProgressBar width={barWidth} />
        </View>
        <Container
          bgColor={'#ffffff'}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <CommonText fontSize={18} color={'#1C1C1C'} marginBottom={30}>
            어떤 스포츠 그룹인가요?
          </CommonText>
          <View
            style={{
              // backgroundColor: 'yellow',
              width: '100%',
              height: '75%',
            }}>
            <FlatList
              data={[
                {image: 'none', name: '러닝'},
                {image: 'none', name: '축구'},
                {image: 'none', name: '농구'},
                {image: 'none', name: '스쿼시'},
                {image: 'none', name: '볼링'},
                {image: 'none', name: '테니스'},
                {image: 'none', name: '클라이밍'},
                {image: 'none', name: '자전거'},
                {image: 'none', name: '보드'},
                {image: 'none', name: '배드민턴'},
                {image: 'none', name: '야구'},
                {image: 'none', name: '기타'},
              ]}
              numColumns={3}
              scrollEnabled={false}
              renderItem={items => {
                return (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <CommonTouchableOpacity
                      style={[
                        {
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        },
                      ]}
                      bgColor={'#000'}
                      width={80}
                      height={80}>
                      <CommonText
                        fontSize={10}
                        color={'#ffffff'}
                        paddingBottom={5}>
                        {items.item?.name}
                      </CommonText>
                    </CommonTouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: '18%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#000000',
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate('SelectApproval')}>
              <CommonText fontSize={16} color={'#ffffff'}>
                다음
              </CommonText>
            </TouchableOpacity>
          </View>
        </Container>
      </Container>
    </BaseSafeView>
  );
};

const ProgressBar = styled.View`
  ${(props: {width: number}) =>
    props.width === 0 ? 'width: 0%' : props.width && `width: ${props.width}%`};
  height: 5px;
  background-color: #5c667b;
`;

export default SelectSportsPage;
