import React, {useState, useEffect, useCallback, ReactNode} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
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
import {BackBlackButton, BackButton} from '../style/MyGroupStyle.style';
import {Colors} from '../../../assets/color/Colors';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface InputQuestionProps {
  id: number;
  value: string;
  onInputChange: (id: number, text: string) => void;
  onAddInput: () => void;
}

const InputComponent: React.FC<InputQuestionProps> = ({
  id,
  value,
  onInputChange,
  onAddInput,
}) => {
  const handleChange = (value: string) => {
    onInputChange(id, value);
  };
  return (
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
        backgroundColor: '#ffffff',
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
          value={value}
          onChangeText={handleChange}
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
      <TouchableOpacity
        style={{
          borderColor: '#cccccc',
          justifyContent: 'flex-end',
          paddingRight: 15,
        }}
        onPress={onAddInput}>
        <CommonText alignC fontSize={20} color={'#cccccc'}>
          +
        </CommonText>
      </TouchableOpacity>
    </View>
  );
};

const SelectOptionPage = ({route}: any) => {
  const insets = useSafeAreaInsets();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const item = route.params;

  const barWidth = Math.ceil((4 / 5) * 100);

  const [count, setCount] = useState('0');
  const [inputs, setInputs] = useState<{id: number; text: string}[]>([
    {id: 1, text: ''},
  ]);

  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  const increaseCount = () => {
    let increCount = Number(count) + 1;
    setCount(increCount.toString());
  };

  const decreaseCount = () => {
    let decreCount = Number(count) - 1;
    if (decreCount < 0) {
      Alert.alert('경고', '0보다 작은 수는 입력할 수 없습니다.');
      setCount('0');
    } else {
      setCount(decreCount.toString());
    }
  };

  const addInput = () => {
    setInputs(prevInputs => [
      ...prevInputs,
      {id: prevInputs.length + 1, text: ''},
    ]);
    console.log('인풋 값 잘 들어와짐? : ', inputs);
  };

  const handleInputChange = (id: number, text: string) => {
    setInputs(prevInputs =>
      prevInputs.map(input => (input.id === id ? {...input, text} : input)),
    );
  };

  let members = Number(count);
  let freeQuestionList = [];
  for (let i = 0; i < inputs.length; i++) {
    freeQuestionList.push(inputs[i].text);
  }

  return (
    <BaseSafeView width={'100%'} height={'100%'} flex={1}>
      <Container bgColor={'#ffffff'} padding={0}>
        <View
          style={{paddingHorizontal: 10, paddingTop: 40, paddingBottom: 20}}>
          <RowBox alignC justify={'space-between'}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <BackBlackButton />
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
            backgroundColor: '#D4E5FF',
          }}>
          <ProgressBar width={barWidth} />
        </View>
        <KeyboardAwareScrollView
          style={{
            height: '100%',
          }}>
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
                  }}
                  onPress={decreaseCount}>
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
                    value={count}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#cccccc',
                  }}
                  onPress={increaseCount}>
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
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <CommonText fontSize={16} alignC color={'#1C1C1C'}>
                    자유질문
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
                  height: '60%',
                }}>
                {inputs.map(input => (
                  <InputComponent
                    key={input.id}
                    id={input.id}
                    value={input.text}
                    onInputChange={handleInputChange}
                    onAddInput={addInput}
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
              {!keyboardStatus && (
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
                    navigation.navigate('SetGroupProfile', {
                      sportsType: item.sportsType,
                      recruitmentType: item.recruitmentType,
                      onlySameUniv: item.onlySameUniv,
                      ageIsIrrelevant: item.ageIsIrrelevant,
                      startAge: item.startAge,
                      endAge: item.endAge,
                      genderIsIrrelevant: item.genderIsIrrelevant,
                      gender: item.gender,
                      personnelLimitIrrelevant: true,
                      personnelLimit: members,
                      freeQuestionList: freeQuestionList,
                    });
                  }}>
                  <CommonText fontSize={16} color={'#ffffff'}>
                    다음
                  </CommonText>
                </TouchableOpacity>
              )}
            </View>
          </Container>
        </KeyboardAwareScrollView>
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

export default SelectOptionPage;
