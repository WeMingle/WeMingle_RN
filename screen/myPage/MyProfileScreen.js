import React, { useState } from 'react';
import { Dimensions, Image, TouchableWithoutFeedback, Switch, TouchableOpacity, ScrollView, FlatList, View } from 'react-native';
import {
  BaseSafeView,
  CenterBox,
  CommonInputView,
  CommonText,
  CommontInput,
  Container,
  RowBox,
  StartButton,
} from '../CommonStyled.style';
import { Colors } from '../../assets/color/Colors';
import { useNavigation } from '@react-navigation/native';
import { ConfigFrmae } from './style/MyPageStyle.style';
import { CommonHeader } from '../../component/header/CommonHeader';
import Profile_Icon from '../../assets/Profile_Square.png';
import Camera from '../../assets/Camera.png'
import { RadioButton } from 'react-native-paper';
import Arrow_Up from '../../assets/arrow_up.png';
import Arrow_down from '../../assets/arrow_down.png';

const MyProfileScreen = () => {
  const navigation = useNavigation();
  const [configVisible, setConfigVisible] = useState(false);

  const [levelSwitch, setLevelSwitdh] = useState(false);
  const [locationSwitch, setLocationSwitdh] = useState(false);
  const [ageSwitch, setAgeSwitdh] = useState(false);


  return (
    <BaseSafeView>
      <ScrollView nestedScrollEnabled={true}>
        <Container>
          <CommonHeader headerTitle={'내 정보'} rightButtonPress={() => setConfigVisible(prev => !prev)} />
          {configVisible &&
            <ConfigFrmae />
          }
          <TouchableWithoutFeedback>
            <CenterBox>
              <Image source={Profile_Icon} style={{ width: 65, height: 65 }} />
              <CenterBox
                justify={'center'}
                width={20}
                height={20}
                style={{ position: 'absolute', left: Dimensions.get('screen').width / 2 - 5, bottom: -5, borderRadius: 10, backgroundColor: '#fff', borderWidth: 0.3 }}>
                <Image source={Camera} style={{ width: 12, height: 12, }} />
              </CenterBox>
            </CenterBox>
          </TouchableWithoutFeedback>

          <CommonText color={Colors.c_gray400} fontSize={12} marginT={34}>
            닉네임
          </CommonText>
          <CommontInput style={{ borderBottomWidth: 1, borderBottomColor: Colors.c_gray300, padding: 0 }} marginT={10} />

          <CommonText color={Colors.c_gray400} fontSize={12} marginT={40}>
            한줄 소개
          </CommonText>
          <CommonInputView marginT={14} height={68}>
            <CommontInput style={{ width: '100%', alignSelf: "flex-start", }} multiline />
          </CommonInputView>

          <RowBox marginT={40} justify={'space-between'}>
            <CommonText color={Colors.c_gray400} fontSize={12} >
              실력
            </CommonText>
            <RowBox alignC>
              <CommonText color={Colors.c_gray400} fontSize={10} marginR={5} >
                공개 여부
              </CommonText>
              <Switch value={levelSwitch} thumbColor={'#fff'} trackColor={{ false: Colors.c_gray400, true: Colors.informative }} onValueChange={() => setLevelSwitdh(prev => !prev)} />
            </RowBox>
          </RowBox>

          <RowBox marginT={10}>
            <StartButton width={64} height={25} style={{ borderWidth: 1, borderColor: Colors.c_gray300 }}>
              <CommonText fontSize={12}>Lv 1-3</CommonText>
            </StartButton>
            <StartButton width={64} height={25} style={{ borderWidth: 1, borderColor: Colors.c_gray300, marginHorizontal: 10 }}>
              <CommonText fontSize={12}>Lv 4-6</CommonText>
            </StartButton>
            <StartButton width={64} height={25} style={{ borderWidth: 1, borderColor: Colors.c_gray300 }}>
              <CommonText fontSize={12}>Lv 6-10</CommonText>
            </StartButton>
          </RowBox>

          <RowBox alignC justify={'space-between'} marginT={34}>
            <CommonText color={Colors.c_gray400} fontSize={12} >
              활동 지역
            </CommonText>
            <RowBox alignC>
              <CommonText color={Colors.c_gray400} fontSize={10} marginR={5}>
                공개 여부
              </CommonText>
              <Switch value={levelSwitch} thumbColor={'#fff'} trackColor={{ false: Colors.c_gray400, true: Colors.informative }} onValueChange={() => setLevelSwitdh(prev => !prev)} />
            </RowBox>
          </RowBox>
          <CommontInput style={{ borderBottomWidth: 1, borderBottomColor: Colors.c_gray300, padding: 0 }} />

          <CommonText color={Colors.c_gray400} fontSize={12} marginT={34}>
            성별
          </CommonText>
          <RowBox>
            <RowBox alignC marginT={28}>
              <RadioButton color={Colors.blue400} status={'checked'} />
              <CommonText fontSize={14} marginR={10}>남성</CommonText>
            </RowBox>
            <RowBox alignC marginT={28}>
              <RadioButton color={Colors.blue400} status={'unchecked'} />
              <CommonText fontSize={14}>여성</CommonText>
            </RowBox>
          </RowBox>

          <RowBox alignC justify={'space-between'} marginT={34}>
            <CommonText color={Colors.c_gray400} fontSize={12} >
              활동 지역
            </CommonText>
            <RowBox alignC>
              <CommonText color={Colors.c_gray400} fontSize={10} marginR={5}>
                공개 여부
              </CommonText>
              <Switch value={levelSwitch} thumbColor={'#fff'} trackColor={{ false: Colors.c_gray400, true: Colors.informative }} onValueChange={() => setLevelSwitdh(prev => !prev)} />
            </RowBox>
          </RowBox>
          <TouchableOpacity>
            <CommontInput style={{ borderBottomWidth: 1, borderBottomColor: Colors.c_gray300, padding: 0 }} editable={false} value={'2003'} />
            <Image source={Arrow_down} style={{ width: 24, height: 24, position: 'absolute', right: 10, top: 5 }} />
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 20, paddingTop: 5, paddingBottom: 20, marginTop: 5, width: '100%', height: 220, borderRadius: 15, borderWidth: 1, borderColor: Colors.c_gray300, }}>
            <FlatList
              nestedScrollEnabled={true}
              data={[2005, 2005, 2005, 2005, 2005, 2005, 2005, 2005, 2005, 2005, 2005, 2005, 2005, 2005, 2005, 2005, 2005, 2005,]}
              renderItem={(item) => {
                return <>
                  <CommonText marginT={15}>2005</CommonText>
                </>
              }}
            />
          </View>
        </Container>
      </ScrollView>
    </BaseSafeView>
  );
};

export default MyProfileScreen;
