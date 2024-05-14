import React, {useEffect, useState} from 'react';
import {View, Modal, Dimensions} from 'react-native';
import {
  CommonText,
  CommonTouchableOpacity,
  Container,
  ModalContainer,
  RowBox,
  VerticalBar,
} from '../../screen/CommonStyled.style';
import {Colors} from '../../assets/color/Colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Checkbox, RadioButton} from 'react-native-paper';

interface AccountBottomSlideModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  setPostData: any;
  handleSignUp: () => void;
}

const AccountBottomSlideModal = ({
  modalVisible,
  setModalVisible,
  setPostData,
  handleSignUp,
}: AccountBottomSlideModalProps) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setPostData((prev: any) => {
      return {
        ...prev,
        signupPlatform: 'NONE',
        phoneType: 'AOS',
        firebaseToken: 'test',
        allowNotification: true,
      };
    });
  }, []);

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
          <ModalContainer>
            <CommonText textAlignC>서비스 이용 약관 동의</CommonText>
            <RowBox alignC marginT={28}>
              <RadioButton value="" color={Colors.blue400} status={'checked'} />
              <CommonText>전체 동의 하기</CommonText>
            </RowBox>
            <VerticalBar marginT={12} />
            <RowBox alignC marginT={20} justify={'space-between'}>
              <RowBox alignC>
                <Checkbox color={Colors.blue400} status={'checked'} />
                <CommonText fontSize={14}>
                  [필수] 위밍글 서비스 이용약관 동의
                </CommonText>
              </RowBox>
              <CommonText underline color={Colors.c_gray400} fontSize={14}>
                보기
              </CommonText>
            </RowBox>

            <RowBox alignC marginT={10} justify={'space-between'}>
              <RowBox alignC>
                <Checkbox
                  color={Colors.blue400}
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <CommonText fontSize={14}>
                  [필수] 개인정보 수집 및 이용 동의
                </CommonText>
              </RowBox>
              <CommonText underline color={Colors.c_gray400} fontSize={14}>
                보기
              </CommonText>
            </RowBox>

            <RowBox alignC marginT={10} justify={'space-between'}>
              <RowBox alignC>
                <Checkbox color={Colors.blue400} status={'checked'} />
                <CommonText fontSize={14}>
                  [선택] 위치 기반 서비스 약관동의
                </CommonText>
              </RowBox>
              <CommonText underline color={Colors.c_gray400} fontSize={14}>
                보기
              </CommonText>
            </RowBox>

            <RowBox alignC marginT={10} justify={'space-between'}>
              <RowBox alignC>
                <Checkbox color={Colors.blue400} status={'checked'} />
                <CommonText fontSize={14}>
                  [선택] 마케팅 정보 수신동의
                </CommonText>
              </RowBox>
              <CommonText underline color={Colors.c_gray400} fontSize={14}>
                보기
              </CommonText>
            </RowBox>
            <CommonTouchableOpacity
              onPress={async () => {
                await handleSignUp();
                setModalVisible(false);
                navigation.navigate('SignUpComplete');
              }}
              justifyC
              alignC
              style={{position: 'absolute', bottom: 0}}
              bgColor={'#000'}
              width={Dimensions.get('screen').width}
              height={48}>
              <CommonText color={'#fff'}>다음단계</CommonText>
            </CommonTouchableOpacity>
          </ModalContainer>
        </Container>
      </Modal>
    </>
  );
};

export default AccountBottomSlideModal;
