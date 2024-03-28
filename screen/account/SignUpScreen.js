import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, StatusBar, Modal, Dimensions, TextInput } from 'react-native';
import { AccountButton, BaseSafeView, CenterBox, CommonInput, commonInput, CommonInputView, CommonText, CommonTouchableOpacity, Container, FlexAutoView, ModalContainer, RowBox, StartButton } from '../CommonStyled.style';
import Back_Icon from '../../assets/Back_Icon.png';
import Apple_Icon from '../../assets/apple.png';
import Google_Icon from '../../assets/google.png';
import Kakao_Icon from '../../assets/kakaotalk.png';
import Naver_Icon from '../../assets/naver.png';
import { Colors } from '../../assets/color/Colors';
import { useNavigation } from '@react-navigation/native';
import AccountBottomSlideModal from '../../component/modal/AccountBottomSlideModal';
import AccountHeader from '../../component/header/AccountHeader';

import { useDispatch } from 'react-redux';
import { SignUpEmail } from '../../redux/slice/TokenSlice';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const [postData, setPostData] = useState({ memberId: 'test', password: '', signupPlatform: 'NONE', phoneType: 'AOS', firebaseToken: 'test', allowNotification: false });
  const [regCheck, setRegCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const handleSignUp = async () => {
    dispatch(SignUpEmail(postData))
  };

  return (
    <BaseSafeView>
      <AccountBottomSlideModal modalVisible={modalVisible} setModalVisible={setModalVisible} postData={postData} setPostData={setPostData} handleSignUp={handleSignUp} />
      <Container>
        <AccountHeader headerTitle={'회원 가입'} />

        <RowBox>
          <View style={{ height: 4, width: '50%', backgroundColor: '#0E6FFF', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}></View>
          <View style={{ height: 4, width: '50%', backgroundColor: '#D4E5FF', borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></View>
        </RowBox>
        <CommonText marginT={15} fontSize={12}>
          아이디와 비밀번호 설정만으로
        </CommonText>
        <CommonText fontSize={12}>간단하게 위밍글에 가입할 수 있습니다.</CommonText>

        <CommonText marginT={28} fontSize={14}>
          아이디
        </CommonText>
        <CommonInputView>
          <TextInput
            style={{ width: '70%', color: '#212121', }}
            value={postData.memberId}
            onChangeText={(v) =>
              setPostData((prev) => {
                return { ...prev, memberId: v };
              })
            }
          />
          <TouchableOpacity>
            <CommonText color={Colors.blue400} fontSize={14}>
              중복 확인
            </CommonText>
          </TouchableOpacity>
        </CommonInputView>


        <CommonText marginT={4} fontSize={12} color={Colors.blue400}>
          사용 가능한 아이디입니다.
        </CommonText>

        <CommonText marginT={28} fontSize={14}>
          비밀번호
        </CommonText>
        <CommonInput
          secureTextEntry
          value={postData.password}
          maxLength={20}
          onChangeText={(v) => {
            setPostData((prev) => {
              return { ...prev, password: v };
            })
            var passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
            if (passwordRegex.test(v)) {
              if (!regCheck) {
                setRegCheck(true);
              }
            } else {
              if (regCheck) {
                setRegCheck(false);
              }
            }
          }
          }
        />
        <CommonText marginT={4} fontSize={12} color={regCheck ? Colors.informative : Colors.danger}>
          {regCheck ? '사용 가능한 비밀번호입니다' : '비밀번호는 8-20자 이내로 영문, 숫자를 혼용하여 입력해 주세요.'}
        </CommonText>

        <CommonText marginT={28} fontSize={14} color={'#96A0B5'}>
          비밀번호 확인
        </CommonText>
        <CommonInput bgColor={regCheck ? '#fff' : Colors.c_gray200} editable={regCheck} secureTextEntry onChangeText={(v) => {
          if (v === postData.password) {
            setPasswordCheck(true)
          } else {
            setPasswordCheck(false)
          }
        }} />

        <AccountButton onPress={() => setModalVisible(true)} bgColor={passwordCheck ? '#212121 ' : Colors.c_gray300} marginT={20}>
          <CommonText color={'#fff'}>회원 가입</CommonText>
        </AccountButton>

        <RowBox alignC marginT={46}>
          <FlexAutoView style={{ height: 2, backgroundColor: Colors.c_gray300 }}></FlexAutoView>
          <CommonText fontSize={12} style={{ paddingHorizontal: 20 }}>
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
          <CommonText fontSize={12} style={{ paddingHorizontal: 20 }}>
            아이디 찾기 | 비밀번호 찾기
          </CommonText>
        </CenterBox>
      </Container>
    </BaseSafeView>
  );
};

export default SignUpScreen;
