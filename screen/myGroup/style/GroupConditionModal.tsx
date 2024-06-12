import React, {useEffect, useState} from 'react';
import {BackHandler, Modal, Text, TouchableOpacity, View} from 'react-native';
import {CommonImage, CommonText} from '../../CommonStyled.style';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import DownArrow from '../../../assets/downward_arrow.png';

export const NotCreateMyPageModal = ({visible}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [showModal, setShowModal] = useState(visible);
  const [accordionCollapsed, setAccordionCollapsed] = useState(true);
  const onPressModal = () => {
    setShowModal(false);
    navigation.navigate('MyPage');
  };
  const toggleAccordion = () => {
    setAccordionCollapsed(!accordionCollapsed);
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={showModal}
      onRequestClose={() => setShowModal(false)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            width: 300,
            paddingTop: 30,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <CommonText fontSize={14} color={'#1C1C1C'} textAlignC>
            해당 그룹의 권한이 없습니다.
          </CommonText>
          <CommonText
            fontSize={10}
            color={'#FF5D5D'}
            textAlignC
            paddingVertical={5}>
            그룹 가입을 위해 마이페이지를 완성해주세요.
          </CommonText>
          <TouchableOpacity onPress={toggleAccordion}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 15,
                alignItems: 'center',
              }}>
              <CommonText fontSize={12} color={'#6B768B'} textAlignC>
                그룹 조건
              </CommonText>
              <CommonImage
                source={DownArrow}
                width={9}
                height={5}
                textAlignC
                marginLeft={5}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={accordionCollapsed}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 15,
              }}>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 50,
                  backgroundColor: '#D7DCE5',
                }}>
                <CommonText fontSize={12} color={'#8491A7'} textAlignC>
                  같은 학교만
                </CommonText>
              </View>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 50,
                  backgroundColor: '#D7DCE5',
                  marginLeft: 8,
                }}>
                <CommonText fontSize={12} color={'#8491A7'} textAlignC>
                  04-02년생
                </CommonText>
              </View>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 50,
                  backgroundColor: '#D7DCE5',
                  marginLeft: 8,
                }}>
                <CommonText fontSize={12} color={'#8491A7'} textAlignC>
                  여성만
                </CommonText>
              </View>
            </View>
          </Collapsible>
          <TouchableOpacity
            style={{
              width: 300,
              backgroundColor: '#121212',
              paddingVertical: 15,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            onPress={() => onPressModal()}>
            <CommonText fontSize={14} color={'#FFFFFF'} textAlignC>
              마이페이지로 이동
            </CommonText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const RestrictPeopleModal = ({visible}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [showModal, setShowModal] = useState(visible);
  const onPressModal = () => {
    setShowModal(false);
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return true;
    }
    return false;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressModal);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressModal);
    };
  }, [onPressModal]);
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={showModal}
      onRequestClose={() => setShowModal(false)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            width: 300,
            paddingTop: 30,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <CommonText fontSize={14} color={'#1C1C1C'} textAlignC>
            더 이상의 인원을{'\n'}받지 않는 그룹입니다
          </CommonText>
          <TouchableOpacity
            style={{
              width: 300,
              backgroundColor: '#121212',
              paddingVertical: 15,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              marginTop: 30,
            }}
            onPress={() => onPressModal()}>
            <CommonText fontSize={14} color={'#FFFFFF'} textAlignC>
              돌아가기
            </CommonText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const NoPermissionModal = ({visible, teamPk}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [showModal, setShowModal] = useState(visible);
  const [accordionCollapsed, setAccordionCollapsed] = useState(true);
  const onPressModal = () => {
    setShowModal(false);
    navigation.navigate('JoinGroup', {teamPk: teamPk});
  };
  const toggleAccordion = () => {
    setAccordionCollapsed(!accordionCollapsed);
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={showModal}
      onRequestClose={() => setShowModal(false)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            width: 300,
            paddingTop: 30,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <CommonText fontSize={14} color={'#1C1C1C'} textAlignC>
            해당 그룹의 권한이 없습니다.
          </CommonText>
          <TouchableOpacity onPress={toggleAccordion}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 15,
                alignItems: 'center',
              }}>
              <CommonText fontSize={12} color={'#6B768B'} textAlignC>
                그룹 조건
              </CommonText>
              <CommonImage
                source={DownArrow}
                width={9}
                height={5}
                textAlignC
                marginLeft={5}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={accordionCollapsed}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 15,
              }}>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 50,
                  backgroundColor: '#ffffff',
                  borderWidth: 1,
                  borderColor: '#eeeeee',
                }}>
                <CommonText fontSize={12} color={'#0E6FFF'} textAlignC>
                  같은 학교만
                </CommonText>
              </View>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 50,
                  backgroundColor: '#ffffff',
                  borderWidth: 1,
                  borderColor: '#eeeeee',
                  marginLeft: 8,
                }}>
                <CommonText fontSize={12} color={'#0E6FFF'} textAlignC>
                  04-02년생
                </CommonText>
              </View>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 50,
                  backgroundColor: '#ffffff',
                  borderWidth: 1,
                  borderColor: '#eeeeee',
                  marginLeft: 8,
                }}>
                <CommonText fontSize={12} color={'#0E6FFF'} textAlignC>
                  여성만
                </CommonText>
              </View>
            </View>
          </Collapsible>
          <TouchableOpacity
            style={{
              width: 300,
              backgroundColor: '#0E6FFF',
              paddingVertical: 15,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            onPress={() => onPressModal()}>
            <CommonText fontSize={14} color={'#FFFFFF'} textAlignC>
              가입하기
            </CommonText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
