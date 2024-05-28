import React, {useState, useEffect, useCallback} from 'react';
import {View, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {
  BaseSafeView,
  CommonImage,
  CommonText,
  Container,
  RowBox,
} from '../../CommonStyled.style';
import {BackButton} from '../style/MyGroupStyle.style';
import Search from '../../../assets/search.png';

const SearchLoadingScreen = ({search}: any) => {
  return (
    <BaseSafeView>
      <Container bgColor={'#212121'} padding={0}>
        <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
          <RowBox alignC justify={'space-around'}>
            <BackButton />
            <View style={styles.block}>
              <TextInput
                placeholder="검색어를 입력하세요."
                placeholderTextColor={'#9e9e9e'}
                style={styles.input}
              />
              <View style={styles.buttonStyle}>
                <CommonImage source={Search} width={24} height={24} />
              </View>
            </View>
          </RowBox>
        </View>
        <Container
          bgColor={'#fff'}
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 15,
            }}>
            <ActivityIndicator
              size="small"
              style={{marginRight: 10}}
              color="#0E6FFF"
            />
            <CommonText fontSize={16} color={'#8491A7'}>
              "{search}" 검색중
            </CommonText>
          </View>
        </Container>
      </Container>
    </BaseSafeView>
  );
};

const styles = StyleSheet.create({
  block: {
    height: 48,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: '#303030',
    width: '90%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

export default SearchLoadingScreen;
