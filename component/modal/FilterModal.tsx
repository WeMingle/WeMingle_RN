import React, {useEffect, useState} from 'react';
import {View, Modal, Dimensions, TouchableOpacity} from 'react-native';
import {
  BorderBoxButton,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  ConfirmButton,
  Container,
  ModalContainer,
  RowBox,
  StartButton,
} from '../../screen/CommonStyled.style';
import {Colors} from '../../assets/color/Colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Checkbox, RadioButton} from 'react-native-paper';

import Renew_Button from '../../assets/renew_button.png';
import Arrow_Down from '../../assets/arrow_down.png';
import {BorderlessButton} from 'react-native-gesture-handler';

interface FilterModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  filterValues: any;
  setFilterValues: (value: filterValue) => void;
}

interface ButtonProps {
  text: string;
  marginL?: number;
  isSelected: boolean;
  onPress?: () => void;
  isLeft?: boolean;
}

interface filterValue {
  ability: any; // 운동 실력
  gender: any; // 성별
  areaList: any; // 지역
  excludeExpired: any; // 마감 제외
  recruitmentType: any; // 구인 형태
  recruiterType: any; //INDIVIDUAL, TEAM
  [prop: string]: any;
}

const FilterModal = ({
  modalVisible,
  setModalVisible,
  filterValues,
  setFilterValues,
}: FilterModalProps) => {
  const [tempFilterValues, setTempFilterValues] = useState<filterValue>({
    ability: '',
    gender: '',
    areaList: [],
    excludeExpired: '',
    recruitmentType: '',
    recruiterType: '',
  });

  useEffect(() => {
    if (!modalVisible) return;
    setTempFilterValues({
      ability: filterValues.ability, // 운동 실력
      gender: filterValues.gender, // 성별
      areaList: filterValues.areaList, // 지역
      excludeExpired: filterValues.excludeExpired, // 마감 제외
      recruitmentType: filterValues.recruitmentType, // 구인 형태
      recruiterType: filterValues.recruiterType, //INDIVIDUAL, TEAM
    });
  }, [modalVisible]);

  const BorderButton = ({text, marginL, isSelected, onPress}: ButtonProps) => {
    return (
      <BorderBoxButton
        onPress={onPress}
        bgColor={isSelected ? '#212121' : '#fff'}
        alignC
        justify={'center'}
        marginL={marginL}>
        <CommonText color={!isSelected ? '#212121' : '#fff'} bold fontSize={14}>
          {text}
        </CommonText>
      </BorderBoxButton>
    );
  };

  const BoxButton = ({text, isSelected, onPress, isLeft}: ButtonProps) => {
    const leftStyle = {borderTopLeftRadius: 5, borderBottomLeftRadius: 5};
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          isLeft
            ? leftStyle
            : {borderTopRightRadius: 5, borderBottomRightRadius: 5},
          {
            height: 35,
            width: 85,
            backgroundColor: isSelected ? '#212121' : '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },
          !isSelected && {borderWidth: 1, borderColor: Colors.c_gray300},
        ]}>
        <CommonText color={isSelected ? '#fff' : '#212121'} bold fontSize={12}>
          {text}
        </CommonText>
      </TouchableOpacity>
    );
  };

  const _onPress = (key: string, value: string) => {
    if (tempFilterValues[key] === value) {
      setTempFilterValues(prev => {
        return {...prev, [key]: null};
      });
      return;
    }
    setTempFilterValues(prev => {
      return {...prev, [key]: value};
    });
  };

  const _onPressLocation = (value: string) => {
    let newValue = tempFilterValues.areaList
      ? tempFilterValues.areaList?.split(',')
      : [];
    const findIndex = newValue?.indexOf(value);
    if (findIndex >= 0) {
      newValue.splice(findIndex, 1);
      newValue = newValue.join(',');
      setTempFilterValues(prev => {
        return {...prev, areaList: newValue};
      });
    } else {
      newValue.push(value);
      newValue = newValue.join(',');
      setTempFilterValues(prev => {
        return {...prev, areaList: newValue};
      });
    }
  };

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <Container style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <ModalContainer modalSize={'large'}>
            <RowBox justify={'space-between'}>
              <CommonText bold fontSize={16}>
                필터
              </CommonText>
              <CommonImage source={Renew_Button} width={30} height={25} />
            </RowBox>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: Colors.c_gray300,
                marginTop: 20,
                marginBottom: 30,
              }}
            />
            <RowBox alignC>
              <Checkbox
                color={'#212121'}
                status={
                  tempFilterValues?.excludeExpired ? 'checked' : 'unchecked'
                }
                onPress={() =>
                  setTempFilterValues((prev: filterValue) => {
                    const temp =
                      prev.excludeExpired === 'checked'
                        ? 'checked'
                        : 'unchecked';
                    return {...prev, excludeExpired: temp};
                  })
                }
              />
              <CommonText fontSize={14}>마감 제외</CommonText>
            </RowBox>
            <RowBox justify={'space-between'} alignC marginT={30}>
              <CommonText bold fontSize={14}>
                구인 형태
              </CommonText>
              <RowBox>
                <BorderButton
                  text={'개인'}
                  isSelected={tempFilterValues.recruiterType === 'INDIVIDUAL'}
                  onPress={() => _onPress('recruiterType', 'INDIVIDUAL')}
                />
                <BorderButton
                  text={'그룹'}
                  isSelected={tempFilterValues.recruiterType === 'TEAM'}
                  onPress={() => _onPress('recruiterType', 'TEAM')}
                  marginL={10}
                />
              </RowBox>
            </RowBox>

            <RowBox justify={'space-between'} alignC marginT={30}>
              <CommonText bold fontSize={14}>
                운동 실력
              </CommonText>
              <RowBox>
                <BorderButton
                  text={'Lv 1-3'}
                  isSelected={tempFilterValues.ability === 'LOW'}
                  onPress={() => _onPress('ability', 'LOW')}
                />
                <BorderButton
                  text={'Lv 4-6'}
                  isSelected={tempFilterValues.ability === 'MEDIUM'}
                  marginL={10}
                  onPress={() => _onPress('ability', 'MEDIUM')}
                />
                <BorderButton
                  text={'Lv 6-10'}
                  isSelected={tempFilterValues.ability === 'HIGH'}
                  marginL={10}
                  onPress={() => _onPress('ability', 'HIGH')}
                />
              </RowBox>
            </RowBox>

            <RowBox justify={'space-between'} alignC marginT={30}>
              <CommonText bold fontSize={14}>
                성별
              </CommonText>
              <RowBox>
                <BorderButton
                  text={'남성'}
                  isSelected={tempFilterValues.gender === 'MALE'}
                  onPress={() => _onPress('gender', 'MALE')}
                />
                <BorderButton
                  text={'여성'}
                  isSelected={tempFilterValues.gender === 'FEMALE'}
                  marginL={10}
                  onPress={() => _onPress('gender', 'FEMALE')}
                />
              </RowBox>
            </RowBox>

            <RowBox justify={'space-between'} alignC marginT={30}>
              <CommonText bold fontSize={14}>
                매칭 방식
              </CommonText>
              <RowBox>
                <BoxButton
                  text={'승인제'}
                  isSelected={
                    tempFilterValues.recruitmentType === 'APPROVAL_BASED'
                  }
                  onPress={() => _onPress('recruitmentType', 'APPROVAL_BASED')}
                  isLeft={true}
                />
                <BoxButton
                  text={'자동승인(선착)'}
                  isSelected={
                    tempFilterValues.recruitmentType === 'FIRST_SERVED_BASED'
                  }
                  onPress={() =>
                    _onPress('recruitmentType', 'FIRST_SERVED_BASED')
                  }
                />
              </RowBox>
            </RowBox>

            <RowBox justify={'space-between'} alignC marginT={30}>
              <CommonText bold fontSize={14}>
                지역
              </CommonText>
              <CommonImage source={Arrow_Down} width={24} height={24} />
            </RowBox>
            <RowBox marginTop={20}>
              <BorderButton
                text={'서울'}
                onPress={() => _onPressLocation('서울')}
                isSelected={tempFilterValues.areaList?.indexOf('서울') >= 0}
              />

              <BorderButton
                text={'경기'}
                onPress={() => _onPressLocation('경기')}
                isSelected={tempFilterValues.areaList?.indexOf('경기') >= 0}
                marginL={10}
              />
            </RowBox>
            <ConfirmButton
              bottom={20}
              position={'absolute'}
              onPress={() => {
                setFilterValues({
                  ability: tempFilterValues.ability, // 운동 실력
                  gender: tempFilterValues.gender, // 성별
                  areaList: tempFilterValues.areaList, // 지역
                  excludeExpired: tempFilterValues.excludeExpired, // 마감 제외
                  recruitmentType: tempFilterValues.recruitmentType, // 구인 형태
                  recruiterType: tempFilterValues.recruiterType, //INDIVIDUAL, TEAM
                });
                setModalVisible(false);
              }}>
              <CommonText color={'#fff'} bold fontSize={16}>
                적용
              </CommonText>
            </ConfirmButton>
          </ModalContainer>
        </Container>
      </Modal>
    </>
  );
};

export default FilterModal;
