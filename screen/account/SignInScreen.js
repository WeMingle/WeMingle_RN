import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, StatusBar, Modal, Dimensions } from 'react-native';
import { AccountButton, BaseSafeView, CenterBox, CommonInput, commonInput, CommonText, CommonTouchableOpacity, Container, FlexAutoView, ModalContainer, RowBox, StartButton } from '../CommonStyled.style';
import Back_Icon from '../../assets/Back_Icon.png';
import Apple_Icon from '../../assets/apple.png';
import Google_Icon from '../../assets/google.png';
import Kakao_Icon from '../../assets/kakaotalk.png';
import Naver_Icon from '../../assets/naver.png';
import { Colors } from '../../assets/color/Colors';
import { useNavigation } from '@react-navigation/native';
import { Checkbox, RadioButton } from 'react-native-paper';
import AccountBottomSlideModal from '../../component/modal/AccountBottomSlideModal';
import AccountHeader from '../../component/header/AccountHeader';

const SignInScreen = () => {
  const navigation = useNavigation();

  return (
    <BaseSafeView>
      <Container>
        <AccountHeader headerTitle={'로그인'} />
        <CommonText marginT={28} fontSize={14}>
          아이디
        </CommonText>
        <CommonInput />

        <CommonText marginT={28} fontSize={14}>
          비밀번호
        </CommonText>
        <CommonInput />

        <RowBox alignC marginT={46}>
          <FlexAutoView style={{ height: 2, backgroundColor: Colors.c_gray300 }}></FlexAutoView>
          <CommonText color={Colors.c_gray500} fontSize={12} style={{ paddingHorizontal: 20 }}>
            또는 다른 서비스 계정으로 가입
          </CommonText>
          <FlexAutoView style={{ height: 2, backgroundColor: Colors.c_gray300 }}></FlexAutoView>
        </RowBox>

        <CenterBox>
          <RowBox justify={'space-around'} alignC marginT={20} width={'75%'}>
            <TouchableOpacity>
              <Image source={Kakao_Icon} style={{ width: 44, height: 44 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Naver_Icon} style={{ width: 44, height: 44 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Google_Icon} style={{ width: 44, height: 44 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Apple_Icon} style={{ width: 44, height: 44 }} />
            </TouchableOpacity>
          </RowBox>
        </CenterBox>

        <CenterBox alignC marginT={28}>
          <CommonText color={Colors.c_gray500} fontSize={12} style={{ paddingHorizontal: 20 }}>
            아이디 찾기 | 비밀번호 찾기
          </CommonText>
        </CenterBox>

        <AccountButton onPress={() => navigation.navigate('Onboarding')} style={{ bottom: 20, position: 'absolute', alignSelf: 'center' }} bgColor={'#D7DCE5'} marginT={20}>
          <CommonText color={'#fff'}>로그인</CommonText>
        </AccountButton>
      </Container>
    </BaseSafeView>
  );
};

export default SignInScreen;
