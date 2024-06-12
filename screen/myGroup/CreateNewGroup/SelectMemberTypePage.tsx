import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ListRenderItem,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import {
  BaseSafeView,
  CommonText,
  Container,
  RowBox,
} from '../../CommonStyled.style';
import {BackButton} from '../style/MyGroupStyle.style';
import {Colors} from '../../../assets/color/Colors';
import styled from 'styled-components/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface UnivItem {
  id: number;
  title: string;
  bool: boolean;
}

const univData: UnivItem[] = [
  {
    id: 0,
    title: '같은 학교만',
    bool: true,
  },
  {
    id: 1,
    title: '상관없음',
    bool: false,
  },
];

interface GenderItem {
  id: number;
  title: string;
  gen: string;
}

const genderData: GenderItem[] = [
  {
    id: 0,
    title: '남성',
    gen: 'MALE',
  },
  {
    id: 1,
    title: '여성',
    gen: 'FEMALE',
  },
];

const SelectMemberTypePage = ({route}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const item = route.params;

  const [selectedUnivType, setSelectedUnivType] = useState<boolean | null>(
    null,
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const univOnPress = (item: UnivItem) => {
    setSelectedUnivType(item.bool);
  };

  const genderOnPress = (item: GenderItem) => {
    setSelectedGender(item.gen);
  };

  const UnivRenderItem: ListRenderItem<UnivItem> = ({item}) => {
    const isSelected = item.bool === selectedUnivType;
    return (
      <TouchableOpacity
        style={[
          styles.button,
          isSelected ? styles.selectedButton : styles.button,
          {marginLeft: item.id > 0 ? 10 : 0},
        ]}
        onPress={() => univOnPress(item)}>
        <CommonText
          alignC
          fontSize={14}
          color={[isSelected ? '#0E6FFF' : '#CCCCCC']}>
          {item.title}
        </CommonText>
      </TouchableOpacity>
    );
  };

  const GenderRenderItem: ListRenderItem<GenderItem> = ({item}) => {
    const isSelected = item.gen === selectedGender;
    return (
      <TouchableOpacity
        style={[
          styles.genButton,
          isSelected ? styles.selectedGenButton : styles.genButton,
          {marginLeft: item.id > 0 ? 10 : 0},
        ]}
        onPress={() => genderOnPress(item)}>
        <CommonText
          alignC
          fontSize={14}
          color={[isSelected ? '#0E6FFF' : '#cccccc']}>
          {item.title}
        </CommonText>
      </TouchableOpacity>
    );
  };

  const barWidth = Math.ceil((3 / 5) * 100);

  let now = new Date();
  let year = now.getFullYear();

  let minBirthYear = year - 19;
  let minYearAbbr = minBirthYear.toString().substring(2);

  let yearLength = minBirthYear - 1990;

  const [multiSliderValue, setMultiSliderValue] = useState([0, yearLength]);

  const [minYear, setMinYear] = useState(minYearAbbr);
  const [maxYear, setMaxYear] = useState('90');

  let yearList = [];

  for (let i = 0; i < yearLength; i++) {
    yearList.push({id: i, year: minBirthYear - i});
  }

  const multiSliderValuesChange = useCallback(
    (values: any) => {
      setMultiSliderValue(values);
      let minYearNum = (minBirthYear - values[0]).toString().substring(2);
      let maxYearNum = (1990 + (yearLength - values[1]))
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
              onPress={() => {
                navigation.navigate('SelectOption', {
                  sportsType: item.sportsType,
                  recruitmentType: item.recruitmentType,
                  onlySameUniv: null,
                  ageIsIrrelevant: null,
                  startAge: null,
                  endAge: null,
                  genderIsIrrelevant: null,
                  gender: null,
                });
              }}>
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
            backgroundColor: '#D4E5FF',
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
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
              }}>
              {univData.map(items => (
                <UnivRenderItem
                  key={items.id}
                  item={items}
                  index={0}
                  separators={{
                    highlight: function (): void {
                      throw new Error('Function not implemented.');
                    },
                    unhighlight: function (): void {
                      throw new Error('Function not implemented.');
                    },
                    updateProps: function (
                      select: 'leading' | 'trailing',
                      newProps: any,
                    ): void {
                      throw new Error('Function not implemented.');
                    },
                  }}
                />
              ))}
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
                  status={'unchecked'}
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
                  max={yearLength}
                  markerStyle={{width: 30, height: 30, borderRadius: 50}}
                  pressedMarkerStyle={{width: 30, height: 30, borderRadius: 50}}
                  values={[multiSliderValue[0], multiSliderValue[1]]}
                  onValuesChange={multiSliderValuesChange}
                  step={1}
                  // isMarkersSeparated={true}
                  // customMarker={(e) =>}
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
                  {minYearAbbr}
                </CommonText>
                <CommonText
                  fontSize={14}
                  alignC
                  color={'#9e9e9e'}
                  paddingRight={20}>
                  90
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
                  status={'unchecked'}
                />
                <CommonText fontSize={14} alignC color={'#1C1C1C'}>
                  상관없음
                </CommonText>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              {genderData.map(items => (
                <GenderRenderItem
                  key={items.id}
                  item={items}
                  index={0}
                  separators={{
                    highlight: function (): void {
                      throw new Error('Function not implemented.');
                    },
                    unhighlight: function (): void {
                      throw new Error('Function not implemented.');
                    },
                    updateProps: function (
                      select: 'leading' | 'trailing',
                      newProps: any,
                    ): void {
                      throw new Error('Function not implemented.');
                    },
                  }}
                />
              ))}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: '18%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingBottom: 10,
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
              onPress={() => {
                navigation.navigate('SelectOption', {
                  sportsType: item.sportsType,
                  recruitmentType: item.recruitmentType,
                  onlySameUniv: selectedUnivType,
                  ageIsIrrelevant: true,
                  startAge: Number(minYear),
                  endAge: Number(maxYear),
                  genderIsIrrelevant: true,
                  gender: selectedGender,
                });
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
  background-color: #0e6fff;
`;

const styles = StyleSheet.create({
  button: {
    width: 130,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    width: 130,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0E6FFF',
    borderWidth: 3,
  },
  genButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGenButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 3,
    borderColor: '#0E6FFF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectMemberTypePage;
