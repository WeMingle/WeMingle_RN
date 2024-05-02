
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { CommonText, RowBox } from '../../screen/CommonStyled.style';
import Back_Icon from '../../assets/back_icon_white.png';
import Config_Icon from '../../assets/config.png'
import { useNavigation } from '@react-navigation/native';

export const CommonHeader = ({ headerTitle, rightButtonPress = () => { } }) => {
  const navigation = useNavigation();

  return (
    <RowBox alignC paddingB={10} justify={'space-between'}>
      <RowBox alignC>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Back_Icon}
            style={{ width: 24, height: 24, marginRight: 5, right: 5 }}
          />
        </TouchableOpacity>
        <CommonText bold fontSize={18}>{headerTitle}</CommonText>
      </RowBox>
      <TouchableOpacity onPress={rightButtonPress}>
        <Image
          source={Config_Icon}
          style={{ width: 24, height: 24, marginRight: 5, right: 5 }}
        />
      </TouchableOpacity>
    </RowBox>
  );
};

export const CommonHeaderBlack = ({ headerTitle }) => {
  const navigation = useNavigation();

  return (
    <RowBox alignC padding={20} justify={'space-between'} bgColor={'#212121'}>
      <RowBox alignC>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Back_Icon}
            style={{ width: 24, height: 24, marginRight: 5, right: 5 }}
          />
        </TouchableOpacity>
        <CommonText bold fontSize={18} color={'#fff'}>{headerTitle}</CommonText>
      </RowBox>
    </RowBox>
  );
}

export const DefaultHeader = ({ headerTitle }) => {
  return <>
    <RowBox alignC justify={'space-between'} padding={20}>
      <CommonText fontSize={18} color={'#fff'}>{headerTitle}</CommonText>
      <RowBox>
        <CommonImage source={Alert_Icon} width={24} height={24} />
        <CommonImage source={Chat_Icon} width={24} height={24} style={{ marginLeft: 12 }} />
      </RowBox>
    </RowBox>
  </>
}