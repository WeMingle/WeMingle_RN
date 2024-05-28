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

const SelectOptionPage = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const barWidth = Math.ceil((4 / 5) * 100);

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
            그룹 옵션을 선택해주세요
          </CommonText>
          <View
            style={{
              width: '100%',
              height: '75%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <CommonText fontSize={16} alignC color={'#1C1C1C'}>
                  인원제한
                </CommonText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <RadioButton
                  value=""
                  color={Colors.blue400}
                  status={'checked'}
                />
                <CommonText fontSize={14} alignC color={'#1C1C1C'}>
                  제한없음
                </CommonText>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                justifyContent: 'flex-start',
              }}>
              <TouchableOpacity
                style={{
                  paddingTop: 5,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                }}>
                <CommonText alignC fontSize={20} color={'#cccccc'}>
                  -
                </CommonText>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 50,
                  height: 40,
                }}>
                <TextInput
                  textAlign={'center'}
                  placeholderTextColor={'#9e9e9e'}
                />
              </View>
              <TouchableOpacity
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                }}>
                <CommonText alignC fontSize={20} color={'#cccccc'}>
                  +
                </CommonText>
              </TouchableOpacity>
            </View>
            <View style={{width: '100%', marginBottom: 10}}>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: Colors.c_gray200,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <CommonText fontSize={16} alignC color={'#1C1C1C'}>
                  나이
                </CommonText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <CommonText
                  fontSize={12}
                  alignC
                  color={'skyblue'}
                  paddingLeft={15}>
                  최대 10개 까지 설정할 수 있어요!
                </CommonText>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: 40,
                flexDirection: 'row',
                marginVertical: 10,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#cccccc',
                justifyContent: 'space-between',
                borderRadius: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '90%',
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  placeholder="자유 질문을 작성해주세요."
                  placeholderTextColor={'#9e9e9e'}
                />
              </View>
              <TouchableOpacity
                style={{
                  borderColor: '#cccccc',
                  justifyContent: 'flex-end',
                  paddingRight: 15,
                }}>
                <CommonText alignC fontSize={20} color={'#cccccc'}>
                  +
                </CommonText>
              </TouchableOpacity>
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
              }}
              onPress={() => navigation.navigate('SetGroupProfile')}>
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

export default SelectOptionPage;
