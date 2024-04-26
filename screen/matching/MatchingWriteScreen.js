import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { BaseSafeView, BorderBoxButton, CommonImage, CommonInputBox, CommonText, ConfirmButton, RowBox, ScrollContainer } from '../CommonStyled.style';


import Calendar_Icon from '../../assets/uil_calender.png'
import Arrow_down from '../../assets/arrow_right.png';
import { Colors } from '../../assets/color/Colors';
import { useNavigation } from '@react-navigation/native';
import { CommonHeaderBlack } from '../../component/header/CommonHeader';

const MatchingWriteScreen = () => {
  const navigation = useNavigation();

  const MatchingColumn = ({ title, rightComponent, marginT }) => {
    return <RowBox alignC padding={20} marginT={marginT} justify={'space-between'} bgColor={'#fff'} height={60}>
      <CommonText bold>{title}</CommonText>
      {rightComponent && rightComponent()}
    </RowBox>
  }

  return <BaseSafeView>
    <ScrollContainer
      padding={0}
      bgColor={Colors.c_gray50}
    >
      <View style={{ backgroundColor: '#212121' }}>
        <CommonHeaderBlack headerTitle={'매칭글 작성'} />
      </View>
      <MatchingColumn
        title={'일정'}
        rightComponent={() => {
          return <RowBox alignC>
            <CommonImage source={Calendar_Icon} width={18} height={18} />
            <CommonText marginL={8} bold color={'#777777'} fontSize={12}>2024. 02. 19</CommonText>
          </RowBox>
        }} />

      <MatchingColumn
        marginT={10}
        title={'지역'}
        rightComponent={() => {
          return <CommonImage source={Arrow_down} width={24} height={24} />
        }} />

      <MatchingColumn
        marginT={10}
        title={'내 실력'}
        rightComponent={() => {
          return <RowBox>
            <BorderBoxButton height={28} borderColor={Colors.informative} alignC justify={'center'}>
              <CommonText color={Colors.informative} bold fontSize={12}>
                Lv 1-3
              </CommonText>
            </BorderBoxButton>
            <BorderBoxButton alignC justify={'center'} marginL={10}>
              <CommonText bold color={Colors.c_gray300} fontSize={12}>
                Lv 4-6
              </CommonText>
            </BorderBoxButton>
            <BorderBoxButton alignC justify={'center'} marginL={10}>
              <CommonText bold color={Colors.c_gray300} fontSize={12}>
                Lv 6-10
              </CommonText>
            </BorderBoxButton>
          </RowBox>
        }} />

      <MatchingColumn
        title={'내 성별'}
        rightComponent={() => {
          return <RowBox>
            <BorderBoxButton height={28} borderColor={Colors.informative} alignC justify={'center'}>
              <CommonText color={Colors.informative} bold fontSize={12}>
                남성
              </CommonText>
            </BorderBoxButton>
            <BorderBoxButton alignC justify={'center'} marginL={10}>
              <CommonText bold color={Colors.c_gray300} fontSize={12}>
                여성
              </CommonText>
            </BorderBoxButton>
          </RowBox>
        }} />

      <MatchingColumn
        title={'내 인원'}
        rightComponent={() => {
          return <RowBox>
            <TouchableOpacity style={{ borderTopWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: Colors.c_gray300, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, height: 35, width: 35, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
              <CommonText color={'#212121'} bold fontSize={12}>
                -
              </CommonText>
            </TouchableOpacity>
            <View style={{ height: 35, width: 35, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.c_gray300 }}>
              <CommonText color={'#212121'} bold fontSize={12}>
                1
              </CommonText>
            </View>
            <TouchableOpacity style={{ borderTopRightRadius: 5, borderBottomRightRadius: 5, height: 35, width: 35, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: Colors.c_gray300 }}>
              <CommonText color={'#212121'} bold fontSize={12}>
                +
              </CommonText>
            </TouchableOpacity>
          </RowBox>
        }} />

      <MatchingColumn
        marginT={10}
        title={'매칭 상대'}
        rightComponent={() => {
          return <RowBox>
            <BorderBoxButton height={28} borderColor={Colors.informative} alignC justify={'center'}>
              <CommonText color={Colors.informative} bold fontSize={12}>
                개인
              </CommonText>
            </BorderBoxButton>
            <BorderBoxButton alignC justify={'center'} marginL={10}>
              <CommonText bold color={Colors.c_gray300} fontSize={12}>
                그룹
              </CommonText>
            </BorderBoxButton>
          </RowBox>
        }} />

      <MatchingColumn
        title={'매칭 마감일'}
      />
      <MatchingColumn
        title={'매칭 방식'}
        rightComponent={() => {
          return <RowBox>
            <TouchableOpacity style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, height: 35, width: 85, backgroundColor: Colors.informative, alignItems: 'center', justifyContent: 'center' }}>
              <CommonText color={'#fff'} bold fontSize={12}>
                승인제
              </CommonText>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderTopRightRadius: 5, borderBottomRightRadius: 5, height: 35, width: 85, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.c_gray300 }}>
              <CommonText color={'#6B768B'} bold fontSize={12}>
                자동승인(선착)
              </CommonText>
            </TouchableOpacity>
          </RowBox>
        }}
      />
      <MatchingColumn
        title={'매칭 소개'}
        marginT={10}
      />
      <RowBox style={{ paddingLeft: 20, paddingRight: 20 }} bgColor={'#fff'}>
        <CommonInputBox height={150} />
      </RowBox>
      <ConfirmButton
        marginT={20}
        marginB={20}
        onPress={() => navigation.navigate('MatchingWrite')}
      >
        <CommonText color={'#fff'} bold fontSize={16}>
          작성 완료하기
        </CommonText>
      </ConfirmButton>
    </ScrollContainer>

  </BaseSafeView>
}

export default MatchingWriteScreen