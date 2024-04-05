import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { CommonText, RowBox } from '../../screen/CommonStyled.style';
import Back_Icon from '../../assets/Back_Icon.png';
import { useNavigation } from '@react-navigation/native';

const AccountHeader = ({ headerTitle }) => {
  const navigation = useNavigation();

  return (
    <RowBox alignC paddingB={10}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={Back_Icon}
          style={{ width: 24, height: 24, marginRight: 5, right: 5 }}
        />
      </TouchableOpacity>
      <CommonText fontSize={18}>{headerTitle}</CommonText>
    </RowBox>
  );
};

export default AccountHeader;
