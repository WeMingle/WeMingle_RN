import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {CommonImage, CommonText, RowBox} from '../../screen/CommonStyled.style';
import Back_Icon from '../../assets/back_icon_white.png';
import Config_Icon from '../../assets/config.png';
import {useNavigation} from '@react-navigation/native';

interface CommonHeaderProps {
  headerTitle: string;
  rightButtonPress?: () => void;
}

export const CommonHeader = ({
  headerTitle = '',
  rightButtonPress,
}: CommonHeaderProps) => {
  const navigation = useNavigation();

  return (
    <RowBox alignC paddingB={10} justify={'space-between'}>
      <RowBox alignC>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Back_Icon}
            style={{width: 24, height: 24, marginRight: 5, right: 5}}
          />
        </TouchableOpacity>
        <CommonText bold fontSize={18}>
          {headerTitle}
        </CommonText>
      </RowBox>
      {rightButtonPress && (
        <TouchableOpacity onPress={rightButtonPress}>
          <Image
            source={Config_Icon}
            style={{width: 24, height: 24, marginRight: 5, right: 5}}
          />
        </TouchableOpacity>
      )}
    </RowBox>
  );
};

export const CommonHeaderBlack = ({headerTitle}: CommonHeaderProps) => {
  const navigation = useNavigation();

  return (
    <RowBox alignC padding={20} justify={'space-between'} bgColor={'#212121'}>
      <RowBox alignC>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Back_Icon}
            style={{width: 24, height: 24, marginRight: 5, right: 5}}
          />
        </TouchableOpacity>
        <CommonText bold fontSize={18} color={'#fff'}>
          {headerTitle}
        </CommonText>
      </RowBox>
    </RowBox>
  );
};
