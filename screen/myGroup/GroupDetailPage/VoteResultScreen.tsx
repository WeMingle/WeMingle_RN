import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  BaseSafeView,
  CommonImage,
  CommonTouchableOpacity,
  CommonText,
  Container,
  RowBox,
} from '../../CommonStyled.style';
import {BackBlackButton} from '../style/MyGroupStyle.style';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/Reducers';
import {useAppDispatch} from '../../../redux/Store';
import ArrowBlackUp from '../../../assets/arrow_black_up.png';
import ArrowBlackDown from '../../../assets/downward_black_arrow.png';

const VoteResultScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();
  const [participateImg, setParticipateImg] = useState(ArrowBlackDown);
  const [isParticipate, setIsParticipate] = useState(false);
  const [absenceImg, setAbsenceImg] = useState(ArrowBlackDown);
  const [isAbsence, setIsAbsence] = useState(false);

  const onPressParticipate = () => {
    setIsParticipate(!isParticipate);
    if (isParticipate === false) {
      setParticipateImg(ArrowBlackUp);
    } else {
      setParticipateImg(ArrowBlackDown);
    }
  };

  const onPressAbsence = () => {
    setIsAbsence(!isAbsence);
    if (isAbsence === false) {
      setAbsenceImg(ArrowBlackUp);
    } else {
      setAbsenceImg(ArrowBlackDown);
    }
  };

  return (
    <BaseSafeView>
      <ScrollView>
        <Container bgColor={'#ffffff'} padding={0}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderBottomWidth: 1,
              borderColor: '#EAEDF4',
            }}>
            <RowBox alignC justify={'space-between'}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <BackBlackButton />
                <CommonText fontSize={18} color={'#1C1C1C'}>
                  투표 제목
                </CommonText>
              </View>
              <CommonText fontSize={12} color={'#0E6FFF'}>
                D-4
              </CommonText>
            </RowBox>
          </View>
          <TouchableOpacity onPress={onPressParticipate}>
            <View
              style={{
                width: '100%',
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                //   backgroundColor: 'orange',
              }}>
              <CommonText fontSize={16} color={'#212121'}>
                참여 : 6명
              </CommonText>
              <CommonImage source={participateImg} width={24} height={24} />
            </View>
          </TouchableOpacity>
          {isParticipate && (
            <>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
            </>
          )}
          <TouchableOpacity onPress={onPressAbsence}>
            <View
              style={{
                width: '100%',
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                //   backgroundColor: 'yellow',
              }}>
              <CommonText fontSize={16} color={'#212121'}>
                불참 : 6명
              </CommonText>
              <CommonImage source={absenceImg} width={24} height={24} />
            </View>
          </TouchableOpacity>
          {isAbsence && (
            <>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#F8FAFC',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#EAEDF4',
                }}>
                <CommonTouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      alignItems: 'center',
                    },
                  ]}
                  bgColor={'#D7DCE5'}
                  width={40}
                  height={40}></CommonTouchableOpacity>
                <CommonText fontSize={14} color={'#000000'} paddingLeft={20}>
                  그룹원
                </CommonText>
              </View>
            </>
          )}
        </Container>
      </ScrollView>
    </BaseSafeView>
  );
};

export default VoteResultScreen;
