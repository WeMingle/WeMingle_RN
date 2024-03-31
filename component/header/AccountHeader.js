import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {CenterBox, CommonText, RowBox} from '../../screen/CommonStyled.style';
import Back_Icon from '../../assets/Back_Icon.png';
import {useNavigation} from '@react-navigation/native';
import {CommonTouchableOpacity} from '../../screen/CommonStyled.style';

const AccountHeader = ({headerTitle}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <RowBox alignC paddingB={10}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={Back_Icon}
          style={{width: 30, height: 30, marginRight: 5, right: 5}}
        />
      </TouchableOpacity>
      <CommonText fontSize={18}>{headerTitle}</CommonText>
    </RowBox>
  );
};

export default AccountHeader;
