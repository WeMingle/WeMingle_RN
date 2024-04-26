import React, { useEffect, useState } from 'react';
import { View, Modal, Dimensions, TouchableOpacity } from 'react-native';
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
import { Colors } from '../../assets/color/Colors';
import { useNavigation } from '@react-navigation/native';
import { Checkbox, RadioButton } from 'react-native-paper';

import Renew_Button from '../../assets/renew_button.png'
import Arrow_Down from '../../assets/arrow_down.png';
import { BorderlessButton } from 'react-native-gesture-handler';

const FilterModal = ({
  modalVisible,
  setModalVisible,
}) => {


  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(prev => !prev);
        }}>
        <Container style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <ModalContainer modalSize={'large'}>
            <RowBox justify={'space-between'}>
              <CommonText bold fontSize={16}>
                필터
              </CommonText>
              <CommonImage source={Renew_Button} width={30} height={25} />
            </RowBox>
            <View style={{ width: '100%', height: 1, backgroundColor: Colors.c_gray300, marginTop: 20, marginBottom: 30 }} />
            <RowBox alignC>
              <Checkbox color={'#212121'} status={'checked'} />
              <CommonText fontSize={14}>
                마감 제외
              </CommonText>
            </RowBox>
            <RowBox justify={'space-between'} alignC marginT={30}>
              <CommonText bold fontSize={14}>
                구인 형태
              </CommonText>
              <RowBox>
                <BorderBoxButton bgColor={'#212121'} width={50} alignC justify={'center'}>
                  <CommonText color={'#fff'} bold fontSize={14}>
                    개인
                  </CommonText>
                </BorderBoxButton>

                <BorderBoxButton width={50} alignC justify={'center'} marginL={10}>
                  <CommonText bold fontSize={14}>
                    그룹
                  </CommonText>
                </BorderBoxButton>
              </RowBox>
            </RowBox>

            <RowBox justify={'space-between'} alignC marginT={30}>
              <CommonText bold fontSize={14}>
                운동 실력
              </CommonText>
              <RowBox>
                <BorderBoxButton bgColor={'#212121'} alignC justify={'center'}>
                  <CommonText color={'#fff'} bold fontSize={14}>
                    Lv 1-3
                  </CommonText>
                </BorderBoxButton>
                <BorderBoxButton alignC justify={'center'} marginL={10}>
                  <CommonText bold fontSize={14}>
                    Lv 4-6
                  </CommonText>
                </BorderBoxButton>
                <BorderBoxButton alignC justify={'center'} marginL={10}>
                  <CommonText bold fontSize={14}>
                    Lv 6-10
                  </CommonText>
                </BorderBoxButton>
              </RowBox>
            </RowBox>

            <RowBox justify={'space-between'} alignC marginT={30}>
              <CommonText bold fontSize={14}>
                성별
              </CommonText>
              <RowBox>
                <BorderBoxButton bgColor={'#212121'} alignC justify={'center'}>
                  <CommonText color={'#fff'} bold fontSize={14}>
                    남성
                  </CommonText>
                </BorderBoxButton>
                <BorderBoxButton alignC justify={'center'} marginL={10}>
                  <CommonText bold fontSize={14}>
                    여성
                  </CommonText>
                </BorderBoxButton>
              </RowBox>
            </RowBox>

            <RowBox justify={'space-between'} alignC marginT={30}>
              <CommonText bold fontSize={14}>
                매칭 방식
              </CommonText>
              <RowBox>
                <TouchableOpacity style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, height: 35, width: 85, backgroundColor: '#212121', alignItems: 'center', justifyContent: 'center' }}>
                  <CommonText color={'#fff'} bold fontSize={12}>
                    승인제
                  </CommonText>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderTopRightRadius: 5, borderBottomRightRadius: 5, height: 35, width: 85, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.c_gray300 }}>
                  <CommonText color={'#212121'} bold fontSize={12}>
                    자동승인(선착)
                  </CommonText>
                </TouchableOpacity>
              </RowBox>
            </RowBox>

            <RowBox justify={'space-between'} alignC marginT={30}>
              <CommonText bold fontSize={14}>
                지역
              </CommonText>
              <CommonImage source={Arrow_Down} width={24} height={24} />
            </RowBox>
            <RowBox marginTop={20}>
              <BorderBoxButton bgColor={'#212121'} alignC justify={'center'}>
                <CommonText color={'#fff'} bold fontSize={14}>
                  서울
                </CommonText>
              </BorderBoxButton>
              <BorderBoxButton bgColor={'#fff'} alignC justify={'center'} marginL={10}>
                <CommonText color={'#212121'} bold fontSize={14}>
                  경기
                </CommonText>
              </BorderBoxButton>
            </RowBox>
            <ConfirmButton
              bottom={20}
              position={'absolute'}
              onPress={() =>
                setModalVisible(false)
              } >
              <CommonText color={'#fff'} bold fontSize={16}>
                적용
              </CommonText>
            </ConfirmButton>
          </ModalContainer>
        </Container>
      </Modal >
    </>
  );
};

export default FilterModal;
