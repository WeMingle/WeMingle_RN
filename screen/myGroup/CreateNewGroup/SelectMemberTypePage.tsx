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

interface MinTxt {
  id: number;
  min: string;
}

interface MaxTxt {
  id: number;
  max: string;
}

const SelectMemberTypePage = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const barWidth = Math.ceil((3 / 5) * 100);

  let now = new Date();
  let year = now.getFullYear();

  const [multiSliderValue, setMultiSliderValue] = useState([0, 15]);

  let minBirthYear = year - 19;
  let maxBirthYear = year - 34;

  let minYearAbbr = minBirthYear.toString().substring(2);
  let maxYearAbbr = maxBirthYear.toString().substring(2);

  const [minYear, setMinYear] = useState(minYearAbbr);
  const [maxYear, setMaxYear] = useState(maxYearAbbr);

  let yearList = [];

  for (let i = 0; i < 15; i++) {
    yearList.push({id: i, year: minBirthYear - i});
  }

  const multiSliderValuesChange = useCallback(
    (values: any) => {
      setMultiSliderValue(values);
      let minYearNum = (minBirthYear - values[0]).toString().substring(2);
      let maxYearNum = (maxBirthYear + (15 - values[1]))
        .toString()
        .substring(2);
      setMinYear(minYearNum);
      setMaxYear(maxYearNum);
    },
    [multiSliderValue, minYear, maxYear],
  );

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
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => navigation.navigate('SelectOption')}>
              <CommonText fontSize={16} color={'#cccccc'}>
                건너뛰기
              </CommonText>
            </TouchableOpacity>
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
            어떤 멤버를 모집할까요?
          </CommonText>
          <View
            style={{
              width: '100%',
              height: '75%',
            }}>
            <CommonText fontSize={16} color={'#1C1C1C'} marginBottom={10}>
              학교
            </CommonText>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <TouchableOpacity
                style={{
                  width: 130,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CommonText alignC fontSize={14} color={'#cccccc'}>
                  같은 학교만
                </CommonText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 130,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                }}>
                <CommonText alignC fontSize={14} color={'#cccccc'}>
                  상관없음
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
                <CommonText
                  fontSize={12}
                  alignC
                  color={'skyblue'}
                  paddingLeft={15}>
                  올해 20살은 05년생이에요!
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
                  상관없음
                </CommonText>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginVertical: 10,
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="직접 입력"
                placeholderTextColor={'#9e9e9e'}
                value={minYear}
                onChangeText={setMinYear}
                textAlign="center"
                textAlignVertical="center"
                style={{
                  width: 120,
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 5,
                  fontSize: 14,
                }}
              />
              <CommonText
                fontSize={20}
                alignC
                color={'#9e9e9e'}
                paddingHorizontal={20}>
                ~
              </CommonText>
              <TextInput
                placeholder="직접 입력"
                placeholderTextColor={'#9e9e9e'}
                value={maxYear}
                onChangeText={setMaxYear}
                textAlign="center"
                textAlignVertical="center"
                style={{
                  width: 120,
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 5,
                  fontSize: 14,
                }}
              />
              <CommonText
                fontSize={16}
                alignC
                color={'#9e9e9e'}
                paddingHorizontal={10}>
                년생
              </CommonText>
            </View>
            <View
              style={{
                width: '100%',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <MultiSlider
                  min={0}
                  max={15}
                  markerStyle={{width: 30, height: 30, borderRadius: 50}}
                  pressedMarkerStyle={{width: 30, height: 30, borderRadius: 50}}
                  values={[multiSliderValue[0], multiSliderValue[1]]}
                  onValuesChange={multiSliderValuesChange}
                  step={1}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  ...Platform.select({
                    android: {
                      width: '100%',
                      paddingHorizontal: 20,
                    },
                  }),
                }}>
                <CommonText
                  fontSize={14}
                  alignC
                  color={'#9e9e9e'}
                  paddingLeft={20}>
                  {minYear}
                </CommonText>
                <CommonText
                  fontSize={14}
                  alignC
                  color={'#9e9e9e'}
                  paddingRight={20}>
                  {maxYear}
                </CommonText>
              </View>
            </View>
            <View style={{width: '100%', marginVertical: 10}}>
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
                  성별
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
                  상관없음
                </CommonText>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 40,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CommonText alignC fontSize={14} color={'#cccccc'}>
                  남성
                </CommonText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 40,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                }}>
                <CommonText alignC fontSize={14} color={'#cccccc'}>
                  여성
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
              onPress={() => navigation.navigate('SelectOption')}>
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

export default SelectMemberTypePage;
