import React, { useState } from 'react';
import { Dimensions, FlatList, Image } from 'react-native';
import { AccountButton, BaseSafeView, CommonText, CommonTouchableOpacity, Container } from '../CommonStyled.style';
import { Colors } from '../../assets/color/Colors';
import { useNavigation } from '@react-navigation/native';

import Arrow_Right from '../../assets/arrow_right.png';

const CertificationSchoolScreen = () => {
  const navigation = useNavigation();

  return (
    <BaseSafeView>
      <Container>
        <CommonTouchableOpacity marginT={20} width={Dimensions.get('screen').width - 40} height={60} style={{ borderWidth: 1, borderColor: Colors.c_gray300, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
          <CommonText fontSize={14}>학교 인증을 완료해주세요.</CommonText>
          <Image source={Arrow_Right} style={{ width: 8, height: 15 }} />
        </CommonTouchableOpacity>

        <AccountButton onPress={() => navigation.navigate('Onboarding')} style={{ bottom: 20, position: 'absolute', alignSelf: 'center' }} bgColor={'#D7DCE5'} marginT={20}>
          <CommonText color={'#fff'}>선택완료</CommonText>
        </AccountButton>
      </Container>
    </BaseSafeView>
  );
};

export default CertificationSchoolScreen;
