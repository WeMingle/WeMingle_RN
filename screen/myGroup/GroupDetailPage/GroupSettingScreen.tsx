import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  BaseSafeView,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
  RowBox,
} from '../../CommonStyled.style';
import {BackButton} from '../style/MyGroupStyle.style';
import Flag from '../../../assets/emoji_flags.png';
import Person from '../../../assets/person_01.png';
import LockWhite from '../../../assets/lock_white.png';
import LockOpen from '../../../assets/lock_open.png';
import {RadioButton} from 'react-native-paper';
import {Colors} from '../../../assets/color/Colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

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
    if (value.length <= 100) {
      onInputChange(id, value);
    }
  };
  return (
    <View>
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
            style={{alignItems: 'center'}}
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
      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
        }}>
        <CommonText
          fontSize={10}
          color={'#AFBAC8'}
          textAlignC
          paddingBottom={10}>
          {value.length}/100
        </CommonText>
      </View>
    </View>
  );
};

const GroupSettingScreen = ({route}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const item = route.params;

  const [count, setCount] = useState('0');
  const [inputs, setInputs] = useState<{id: number; text: string}[]>([
    {id: 1, text: ''},
  ]);

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
  return (
    <BaseSafeView>
      <ScrollView>
        <Container bgColor={'#212121'} padding={0}>
          <View
            style={{
              flexDirection: 'row',
              //   backgroundColor: '#212121',
              //   backgroundColor: 'yellow',
              backgroundColor: 'gray',
              padding: 20,
              justifyContent: 'space-between',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <BackButton />
              <CommonText fontSize={18} color={'#ffffff'} textAlignC>
                그룹 설정
              </CommonText>
            </View>
            <TouchableOpacity>
              <CommonText fontSize={14} color={'#ffffff'} textAlignC>
                완료
              </CommonText>
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 100}}></View>
          <View
            style={{
              width: '100%',
              height: '100%',
              paddingTop: 30,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CommonImage source={Flag} width={16} height={16} />
              <CommonText
                fontSize={10}
                color={'#96A0B5'}
                textAlignC
                paddingLeft={3}
                paddingRight={10}>
                2024.01.21
              </CommonText>
              <CommonImage source={Person} width={16} height={16} />
              <CommonText
                fontSize={10}
                color={'#96A0B5'}
                textAlignC
                paddingLeft={3}>
                54명
              </CommonText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <CommonTouchableOpacity
                style={{borderRadius: 10}}
                bgColor={'#000000'}
                width={66}
                height={66}
              />
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
              }}>
              <CommonText fontSize={14} color={'#212121'} paddingTop={10}>
                그룹명
              </CommonText>
              <View
                style={{
                  justifyContent: 'center',
                  paddingTop: 10,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#D7DCE5',
                    borderRadius: 5,
                  }}>
                  <TextInput
                    placeholder="그룹명을 작성해주세요."
                    placeholderTextColor={'#9e9e9e'}
                    style={{padding: 10}}
                  />
                </View>
              </View>
              <CommonText fontSize={14} color={'#212121'} paddingTop={20}>
                소개글
              </CommonText>
              <View
                style={{
                  justifyContent: 'center',
                  paddingTop: 10,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#D7DCE5',
                    borderRadius: 5,
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
              <CommonText fontSize={14} color={'#212121'} paddingTop={30}>
                그룹 조건
              </CommonText>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#0E6FFF',
                    paddingVertical: 15,
                    paddingHorizontal: 50,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CommonImage
                    source={LockWhite}
                    width={16}
                    height={20}
                    alignC
                  />
                  <CommonText
                    fontSize={12}
                    color={'#FFFFFF'}
                    paddingLeft={15}
                    alignC>
                    직접 승인
                  </CommonText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 50,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#D7DCE5',
                  }}>
                  <CommonImage
                    source={LockOpen}
                    width={16}
                    height={20}
                    alignC
                  />
                  <CommonText
                    fontSize={12}
                    color={'#373F57'}
                    paddingLeft={15}
                    alignC>
                    자동 승인
                  </CommonText>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 100,
                  backgroundColor: '#F4F6FA',
                  marginTop: 20,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    width: '50%',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    justifyContent: 'space-around',
                  }}>
                  <View
                    style={{
                      width: 52,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      marginRight: 20,
                    }}>
                    <CommonText
                      fontSize={12}
                      color={'#96A0B5'}
                      marginBottom={10}>
                      학교
                    </CommonText>
                    <CommonText
                      fontSize={12}
                      color={'#96A0B5'}
                      marginBottom={10}>
                      실력
                    </CommonText>
                    <CommonText fontSize={12} color={'#96A0B5'}>
                      활동지역
                    </CommonText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <CommonText
                      fontSize={12}
                      color={'#373F57'}
                      marginBottom={10}>
                      숭실대학교
                    </CommonText>
                    <CommonText
                      fontSize={12}
                      color={'#FF5D5D'}
                      marginBottom={10}>
                      Lv.1~3
                    </CommonText>
                    <CommonText fontSize={12} color={'#373F57'}>
                      서울
                    </CommonText>
                  </View>
                </View>
                <View
                  style={{
                    width: '50%',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    justifyContent: 'space-around',
                  }}>
                  <View
                    style={{
                      width: 52,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <CommonText
                      fontSize={12}
                      color={'#96A0B5'}
                      marginBottom={10}>
                      성별
                    </CommonText>
                    <CommonText
                      fontSize={12}
                      color={'#96A0B5'}
                      marginBottom={10}>
                      나이
                    </CommonText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <CommonText
                      fontSize={12}
                      color={'#FF5D5D'}
                      marginBottom={10}>
                      미입력
                    </CommonText>
                    <CommonText
                      fontSize={12}
                      color={'#373F57'}
                      marginBottom={10}>
                      비공개
                    </CommonText>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 20,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <CommonText fontSize={12} color={'#121212'} paddingRight={20}>
                    인원제한
                  </CommonText>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: '#cccccc',
                      alignItems: 'center',
                    }}
                    //   onPress={decreaseCount}
                  >
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
                      // value={count}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: '#cccccc',
                      alignItems: 'center',
                    }}
                    //   onPress={increaseCount}
                  >
                    <CommonText alignC fontSize={20} color={'#cccccc'}>
                      +
                    </CommonText>
                  </TouchableOpacity>
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
                  <CommonText fontSize={12} alignC color={'#212121'}>
                    상관없음
                  </CommonText>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <CommonText fontSize={14} alignC color={'#212121'}>
                  자유질문
                </CommonText>
                <CommonText fontSize={10} alignC color={'#0E6FFF'}>
                  최대 10개까지 설정할 수 있어요!
                </CommonText>
              </View>
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
        </Container>
      </ScrollView>
    </BaseSafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  coverImage: {
    width: '100%',
    height: 150,
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  textArea: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  groupSettings: {
    marginBottom: 16,
  },
  groupSettingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  option: {
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelSettings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GroupSettingScreen;
