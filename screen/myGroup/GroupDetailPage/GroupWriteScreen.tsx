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
  Switch,
  Alert,
} from 'react-native';
import {
  BaseSafeView,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
  RowBox,
} from '../../CommonStyled.style';
import {BackBlackButton, BackButton} from '../style/MyGroupStyle.style';
import Plus from '../../../assets/plus_icon.png';
import Minus from '../../../assets/minus.png';
import PlusBlack from '../../../assets/plus_black_icon.png';
import MultiBlack from '../../../assets/multiple_black_icon.png';
import DownBlackArrow from '../../../assets/downward_black_arrow.png';
import UpBlackArrow from '../../../assets/arrow_black_up.png';
import Alarm from '../../../assets/alarm.png';
import {RadioButton} from 'react-native-paper';
import {Colors} from '../../../assets/color/Colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {Calendar} from 'react-native-calendars';

const GroupWirteScreen = () => {
  const [voteEnabled, setVoteEnabled] = useState(false);
  const [voteButton, setVoteButton] = useState(PlusBlack);
  const [writeEnabled, setWriteEnabled] = useState(false);
  const [writeButton, setWriteButton] = useState(DownBlackArrow);
  const [isEnabled, setIsElabled] = useState(false);
  const [textInputs, setTextInputs] = useState(['']);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState<{
    [key: string]: {selected: boolean; marked?: boolean};
  }>({});

  const toggleSwitch = () => setIsElabled(previousState => !previousState);

  const onPressVote = () => {
    setVoteEnabled(!voteEnabled);
    if (voteEnabled === false) {
      setVoteButton(MultiBlack);
    } else {
      setVoteButton(PlusBlack);
    }
  };

  const onPressWrite = () => {
    setWriteEnabled(!writeEnabled);
    if (writeEnabled === false) {
      setWriteButton(UpBlackArrow);
    } else {
      setWriteButton(DownBlackArrow);
    }
  };

  const addVoteItem = () => {
    if (textInputs.length < 5) {
      setTextInputs([...textInputs, '']);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleDayPress = (day: any) => {
    const selectedDate = new Date(day.dateString);
    const currentDate = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      Alert.alert('경고', '오늘 이전 날짜는 선택할 수 없습니다.');
    } else {
      setDate(day.dateString);
      setMarkedDates({[day.dateString]: {selected: true}});
    }
  };

  const handleConfirm = () => {
    // setDate(selectedDate);
    // hideDatePicker();
    if (date) {
      hideModal();
    } else {
      Alert.alert('경고', '날짜가 선택되지 않았습니다. 날짜를 선택해주세요.');
    }
  };

  return (
    <BaseSafeView width={'100%'} height={'100%'} flex={1}>
      <ScrollView>
        <Container bgColor={'#ffffff'} padding={0}>
          <View
            style={{
              paddingHorizontal: 10,
              // paddingVertical: 20,
              paddingTop: 40,
              paddingBottom: 20,
              // backgroundColor: 'orange',
              borderWidth: 1,
              borderColor: '#EAEDF4',
            }}>
            <RowBox
              alignC
              justify={'space-between'}
              // backgroundColor={'yellow'}
            >
              <View
                style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <BackBlackButton />
                <View style={{justifyContent: 'center'}}>
                  <CommonText fontSize={18} color={'#1C1C1C'}>
                    글쓰기
                  </CommonText>
                  <CommonText fontSize={10} color={'#96A0B5'}>
                    [숭실대 축구동아리]
                  </CommonText>
                </View>
              </View>
              <TouchableOpacity>
                <CommonText fontSize={14} color={'#0E6FFF'} paddingRight={10}>
                  작성완료
                </CommonText>
              </TouchableOpacity>
            </RowBox>
          </View>
          <View
            style={{
              padding: 20,
              borderWidth: 1,
              borderColor: '#EAEDF4',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <CommonTouchableOpacity
              style={{
                borderRadius: 10,
              }}
              bgColor={'#F4F6FA'}
              width={80}
              height={80}
              alignC>
              <View style={{paddingTop: '25%'}}>
                <CommonImage source={Plus} width={24} height={24} />
                <CommonText fontSize={10} color={'#96A0B5'}>
                  (0/5)
                </CommonText>
              </View>
            </CommonTouchableOpacity>
          </View>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderColor: '#EAEDF4',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <TextInput
              placeholder="제목을 입력하세요"
              placeholderTextColor={'#AFBAC8'}
              // value={value}
              // onChangeText={handleChange}
              onSubmitEditing={Keyboard.dismiss}
              style={{alignItems: 'center', fontSize: 16}}
            />
          </View>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderColor: '#EAEDF4',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              height: 200,
            }}>
            <TextInput
              placeholder="내용을 입력하세요"
              placeholderTextColor={'#AFBAC8'}
              // value={value}
              // onChangeText={handleChange}
              onSubmitEditing={Keyboard.dismiss}
              style={{fontSize: 16}}
              multiline={true}
            />
          </View>
          <View
            style={{
              padding: 20,
              borderWidth: 1,
              borderColor: '#EAEDF4',
              //   flexDirection: 'row',
              //   justifyContent: 'space-between',
              //   alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CommonText fontSize={16} color={'#111111'}>
                투표 설정하기
              </CommonText>
              <TouchableOpacity onPress={onPressVote}>
                <CommonImage source={voteButton} width={24} height={24} />
              </TouchableOpacity>
            </View>
            {voteEnabled && (
              <View
                style={{
                  width: '100%',
                  // borderTopWidth: 1,
                  // borderTopColor: '#F4F6FA',
                  marginTop: 30,
                  // backgroundColor: 'red',
                }}>
                <View
                  style={{
                    borderColor: '#D7DCE5',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  <TextInput
                    placeholder="투표 제목을 입력하세요"
                    placeholderTextColor={'#AFBAC8'}
                    // value={value}
                    // onChangeText={handleChange}
                    onSubmitEditing={Keyboard.dismiss}
                    style={{fontSize: 14}}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                      value=""
                      color={Colors.blue400}
                      status={'unchecked'}
                    />
                    <CommonText fontSize={16} color={'#212121'}>
                      텍스트
                    </CommonText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <RadioButton
                      value=""
                      color={Colors.blue400}
                      status={'unchecked'}
                    />
                    <CommonText fontSize={16} color={'#212121'}>
                      날짜
                    </CommonText>
                  </View>
                </View>
                {textInputs.map((text, index) => (
                  <View
                    style={{
                      borderColor: '#D7DCE5',
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      marginTop: textInputs.length === 1 ? 0 : 10,
                    }}
                    key={index}>
                    <TextInput
                      placeholder="투표 항목을 입력하세요"
                      placeholderTextColor={'#AFBAC8'}
                      value={text}
                      onChangeText={newText => {
                        const newTextInputs = [...textInputs];
                        newTextInputs[index] = newText;
                        setTextInputs(newTextInputs);
                      }}
                      onSubmitEditing={Keyboard.dismiss}
                      style={{fontSize: 14}}
                    />
                  </View>
                ))}
                <TouchableOpacity onPress={addVoteItem}>
                  <View
                    style={{
                      borderRadius: 10,
                      borderColor: '#D7DCE5',
                      borderWidth: 1,
                      flexDirection: 'row',
                      paddingVertical: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}>
                    <CommonImage
                      source={Plus}
                      width={24}
                      height={24}
                      marginRight={5}
                    />
                    <CommonText fontSize={16} color={'#5C667B'}>
                      항목 추가
                    </CommonText>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <RadioButton
                    value=""
                    color={Colors.blue400}
                    status={'unchecked'}
                  />
                  <CommonText fontSize={16} color={'#212121'}>
                    복수선택
                  </CommonText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <RadioButton
                    value=""
                    color={Colors.blue400}
                    status={'unchecked'}
                  />
                  <CommonText fontSize={16} color={'#212121'}>
                    익명투표
                  </CommonText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                      value=""
                      color={Colors.blue400}
                      status={'unchecked'}
                    />
                    <CommonText fontSize={16} color={'#212121'}>
                      선착순 투표받기
                    </CommonText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#D7DCE5',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      //   onPress={decreaseCount}
                    >
                      <CommonImage
                        source={Minus}
                        width={20}
                        height={20}
                        alignC
                      />
                    </TouchableOpacity>
                    <View
                      style={{
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
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      //   onPress={increaseCount}
                    >
                      <CommonImage
                        source={PlusBlack}
                        width={20}
                        height={20}
                        alignC
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CommonImage
                      source={Alarm}
                      width={24}
                      height={24}
                      marginLeft={6}
                      marginRight={6}
                    />
                    <CommonText fontSize={16} color={'#212121'}>
                      투표 마감시간
                    </CommonText>
                  </View>
                  <TouchableOpacity onPress={showModal}>
                    <CommonText fontSize={16} color={'#AFBAC8'}>
                      {date ? `${date} ${time.toLocaleTimeString()}` : '없음'}
                    </CommonText>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              padding: 20,
              borderWidth: 1,
              borderColor: '#EAEDF4',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CommonText fontSize={16} color={'#111111'}>
              공지사항으로 등록하기
            </CommonText>
            <Switch
              trackColor={{false: '#767577', true: '#0E6FFF'}}
              thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View
            style={{
              padding: 20,
              //   borderWidth: 1,
              //   borderColor: '#EAEDF4',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CommonText fontSize={16} color={'#111111'}>
              글쓰기 설정
            </CommonText>
            <TouchableOpacity onPress={onPressWrite}>
              <CommonImage source={writeButton} width={24} height={24} />
            </TouchableOpacity>
          </View>
          {writeEnabled && (
            <>
              <View
                style={{
                  padding: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <CommonText fontSize={16} color={'#111111'}>
                  댓글 허용
                </CommonText>
                <Switch
                  trackColor={{false: '#767577', true: '#0E6FFF'}}
                  thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <View
                style={{
                  padding: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <CommonText fontSize={16} color={'#111111'}>
                  좋아요 허용
                </CommonText>
                <Switch
                  trackColor={{false: '#767577', true: '#0E6FFF'}}
                  thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </>
          )}
        </Container>
      </ScrollView>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={hideModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={markedDates}
              minDate={new Date().toISOString()}
            />
            <DatePicker date={time} onDateChange={setTime} mode="time" />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <TouchableOpacity onPress={hideModal}>
                <CommonText fontSize={10.5} color={'#0E6FFF'} paddingRight={20}>
                  설정 안 함
                </CommonText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm}>
                <CommonText fontSize={10.5} color={'#0E6FFF'}>
                  확인
                </CommonText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </BaseSafeView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GroupWirteScreen;
