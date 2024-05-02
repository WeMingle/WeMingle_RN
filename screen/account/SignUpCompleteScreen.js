import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
// import * as S from './style/SignUpComplteSceen.style.js'
import Back_Icon from '../../assets/Back_Icon.png';
import {useNavigation} from '@react-navigation/native';
import Profile_Icon from '../../assets/basic_profile.png';
import Profile_Icon2 from '../../assets/profile.png';
import {Colors} from '../../assets/color/Colors';
import AccountHeader from '../../component/header/AccountHeader';
import {
  AccountButton,
  BaseSafeView,
  CommonInputBox,
  CommonText,
  CommonTouchableOpacity,
  Container,
  RowBox,
} from '../CommonStyled.style';
import {AddProfile, checkNickName, getPresignedUrl} from '../../api/Account';
import {useDispatch, useSelector} from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';
import {getImageLibraryPermission} from '../../component/Common';

const SignUpCompleteScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();

  const [nickName, setNickName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [uploadLink, setUploadLink] = useState('');
  const [selectImage, setSelectImage] = useState(null);

  const onEndEditing = async () => {
    const result = await checkNickName(nickName);
    if (result) setIsChecked(true);
  };

  const getUploadLink = async () => {
    const result = await getPresignedUrl();
    if (result) setUploadLink(result);

    openImagePicker();
  };

  const openImagePicker = async () => {
    await getImageLibraryPermission();
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
    }).then(image => {
      console.log(image);
      setSelectImage(image);
    });
  };

  return (
    <BaseSafeView>
      <Container>
        <AccountHeader headerTitle={'회원 가입'} />
        <RowBox marginT={10}>
          <View
            style={{
              height: 4,
              width: '100%',
              backgroundColor: '#0E6FFF',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}></View>
        </RowBox>
        <CommonText marginT={15} fontSize={12}>
          회원가입을 위한 마지막 단계입니다.
        </CommonText>
        <CommonText fontSize={12}>프로필을 설정해주세요</CommonText>
        <CommonTouchableOpacity
          onPress={() => {
            getUploadLink();
          }}
          width={79}
          height={79}
          bgColor={Colors.c_gray200}
          style={{borderRadius: 80, alignSelf: 'center', marginTop: 38}}>
          <Image
            source={selectImage ? {uri: selectImage.path} : Profile_Icon}
            style={{width: '100%', height: '100%', borderRadius: 80}}
          />
          <Image
            resizeMode='cover'
            source={Profile_Icon2}
            style={{position: 'absolute', width: 80, height: 80, bottom: 0}}
          />
          <CommonText
            style={{position: 'absolute', bottom: 6, alignSelf: 'center'}}
            color={'#fff'}
            fontSize={10}>
            변경
          </CommonText>
        </CommonTouchableOpacity>

        <CommonText marginT={28} fontSize={14}>
          닉네임
        </CommonText>
        <CommonInputBox
          value={nickName}
          onChangeText={v => {
            setIsChecked(false);
            setNickName(v);
          }}
          onEndEditing={async () => onEndEditing()}
        />
        {isChecked ? (
          <CommonText marginT={4} fontSize={12} color={'#276EF2'}>
            사용 가능한 닉네임입니다.
          </CommonText>
        ) : (
          <CommonText marginT={4} fontSize={12} color={Colors.danger}>
            사용 불가능한 닉네임입니다
          </CommonText>
        )}

        <AccountButton
          style={{bottom: 20, position: 'absolute', alignSelf: 'center'}}
          onPress={async () => {
            const result = await AddProfile({
              nickName: nickName,
              url: uploadLink,
              image: selectImage.path,
            });
            if (result) navigation.navigate('SignIn');
            else return;
          }}
          bgColor={!isChecked ? '#D7DCE5' : '#000'}
          marginT={20}>
          <CommonText color={!isChecked ? '#fff' : '#fff'}>
            회원 가입
          </CommonText>
        </AccountButton>
      </Container>
    </BaseSafeView>
  );
};

export default SignUpCompleteScreen;
