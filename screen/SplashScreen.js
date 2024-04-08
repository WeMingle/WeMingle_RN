import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { BaseSafeView, CenterBox, CommonText, Container, RowBox, StartButton } from './CommonStyled.style';

import Logo from '../assets/Logo.png';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <BaseSafeView bgColor="#000">
      <Container justify={'space-around'}>
        <CenterBox ma>
          <CommonText color={'#fff'}>대학생끼리 스포츠를 즐기고 싶을 때</CommonText>
          <Image source={Logo} style={{ width: 150, height: 150, marginTop: 15 }} />
        </CenterBox>

        <CenterBox>
          <StartButton onPress={() => navigation.navigate('SignUp')} bgColor={'#0A53BE'}>
            <CommonText color={'#fff'}>위밍글 시작하기</CommonText>
          </StartButton>
          <RowBox marginT={15} justify={'center'}>
            <CommonText color={'#fff'} fontSize={14}>
              이미 위밍글 회원이라면?{' '}
            </CommonText>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <CommonText color={'#fff'} fontSize={14} underline>
                로그인
              </CommonText>
            </TouchableOpacity>
          </RowBox>
        </CenterBox>
      </Container>
    </BaseSafeView>
  );
};

export default SplashScreen;
