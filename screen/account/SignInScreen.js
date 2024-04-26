import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { AccountButton, BaseSafeView, CenterBox, CommonInputBox, CommonText, Container, FlexAutoView, RowBox } from '../CommonStyled.style';
import Apple_Icon from '../../assets/apple.png';
import Google_Icon from '../../assets/google.png';
import Kakao_Icon from '../../assets/kakaotalk.png';
import Naver_Icon from '../../assets/naver.png';
import { Colors } from '../../assets/color/Colors';
import { useNavigation } from '@react-navigation/native';
import AccountHeader from '../../component/header/AccountHeader';
import { signInEmail } from '../../redux/slice/TokenSlice';
import { useDispatch } from 'react-redux';
import { handleSnsLogin } from '../../component/Common';

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({ memberId: 'wemingle@gmail.com', password: 'password123!', signupPlatform: 'NONE' })

  const handleSignIn = async () => {
    return navigation.navigate('Onboarding')

    const result = await dispatch(signInEmail(postData));

    if (result?.meta?.requestStatus === 'fulfilled') {
      navigation.navigate('Onboarding')
    } else {
      return;
    }

  }

  const handleSignUpWithSNS = async (signupPlatform) => {
    handleSnsLogin(signupPlatform, (result) => {
      setPostData(prev => {
        return { signupPlatform: signupPlatform, memberId: result.email, password: result.email }
      })
      return handleSignIn();
    })
  }


  return (
    <BaseSafeView>
      <Container>
        <AccountHeader headerTitle={'로그인'} />
        <CommonText marginT={28} fontSize={14}>
          아이디
        </CommonText>
        <CommonInputBox value={postData.memberId}
          onChangeText={v =>
            setPostData(prev => {
              return { ...prev, memberId: v };
            })
          }
        />

        <CommonText marginT={28} fontSize={14}>
          비밀번호
        </CommonText>
        <CommonInputBox
          secureTextEntry
          value={postData.password}
          onChangeText={v => {
            setPostData(prev => {
              return { ...prev, password: v };
            });
          }}
        />

        <RowBox alignC marginT={46}>
          <FlexAutoView style={{ height: 2, backgroundColor: Colors.c_gray300 }}></FlexAutoView>
          <CommonText color={Colors.c_gray500} fontSize={12} style={{ paddingHorizontal: 20 }}>
            또는 다른 서비스 계정으로 가입
          </CommonText>
          <FlexAutoView style={{ height: 2, backgroundColor: Colors.c_gray300 }}></FlexAutoView>
        </RowBox>

        <CenterBox>
          <RowBox justify={'space-around'} alignC marginT={20} width={'75%'}>
            <TouchableOpacity onPress={() => handleSignUpWithSNS('KAKAO')}>
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

        <AccountButton onPress={() => handleSignIn()} style={{ bottom: 20, position: 'absolute', alignSelf: 'center' }} bgColor={postData.memberId && postData.password ? '#212121' : '#D7DCE5'} marginT={20} disabled={postData.memberId && postData.password ? false : true}>
          <CommonText color={'#fff'}>로그인</CommonText>
        </AccountButton>
      </Container>
    </BaseSafeView>
  );
};

export default SignInScreen;
