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
  Platform,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
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
import AddBox from '../../../assets/add_box.png';
import styled from 'styled-components/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const SetGroupProfilePage = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const barWidth = Math.ceil((5 / 5) * 100);

  return (
    <BaseSafeView>
      <Container bgColor={'#ffffff'} padding={0}>
        <View
          style={{paddingHorizontal: 10, paddingTop: 40, paddingBottom: 20}}>
          <RowBox alignC justify={'space-between'}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <BackButton />
              <CommonText fontSize={18} color={'#1C1C1C'}>
                새 그룹
              </CommonText>
            </View>
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
            그룹 프로필을 설정해주세요
          </CommonText>
          <View
            style={{
              width: '100%',
              height: '75%',
              //   backgroundColor: 'red',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
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
                height={80}></CommonTouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
              }}>
              <CommonText fontSize={15} color={'#1C1C1C'} paddingTop={20}>
                그룹명
              </CommonText>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                  marginVertical: 10,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 5,
                  paddingHorizontal: 5,
                }}>
                <TextInput
                  placeholder="그룹명을 작성해주세요."
                  placeholderTextColor={'#9e9e9e'}
                  style={{padding: 10}}
                />
              </View>
              <CommonText fontSize={15} color={'#1C1C1C'} paddingTop={20}>
                그룹 소개글
              </CommonText>
              <View
                style={{
                  width: '100%',
                  height: 120,
                  marginVertical: 10,
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 5,
                  paddingHorizontal: 5,
                }}>
                <TextInput
                  placeholder="그룹 소개글을 작성해주세요."
                  textAlignVertical="top"
                  placeholderTextColor={'#9e9e9e'}
                  style={{padding: 10, height: 100}}
                  multiline={true}
                  numberOfLines={5}
                />
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <CommonText
                    fontSize={10}
                    color={'#cccccc'}
                    paddingBottom={5}
                    paddingRight={10}>
                    1/100
                  </CommonText>
                </View>
              </View>
            </View>
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
              }}>
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

export default SetGroupProfilePage;
