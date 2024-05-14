import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  BaseSafeView,
  Container,
  RowBox,
} from '../CommonStyled.style';
import {BackButton} from './style/MyGroupStyle.style';
import Search from '../../assets/search.png';
import Notification from '../../assets/notification_important.png';

const SearchProfileScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [text, setText] = useState('');

  const onPress = () => {
    setText('');
    Keyboard.dismiss();
  };
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
                value={text}
                onChangeText={setText}
                onSubmitEditing={onPress}
              />
              <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonStyle}>
                  <CommonImage source={Search} width={24} height={24} />
                </View>
              </TouchableOpacity>
            </View>
          </RowBox>
        </View>
        <View
          style={{
            width: '100%',
            height: '100%',
            paddingTop: 50,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: 30,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <CommonTouchableOpacity
                style={[
                  {
                    borderRadius: 10,
                    marginBottom: 10,
                  },
                ]}
                bgColor={'#000000'}
                width={80}
                height={80}></CommonTouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <CommonImage source={Notification} width={24} height={24} />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}></View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <CommonText
              fontSize={14}
              color={'#000000'}
              numberOfLines={1}
              ellipsizeMode="tail">
              축구왕 슛돌이
            </CommonText>
            <View
              style={{
                backgroundColor: '#E7F1FF',
                paddingVertical: 5,
                paddingHorizontal: 15,
                flexDirection: 'row',
                marginTop: 10,
                borderRadius: 20,
              }}>
              <CommonText fontSize={12} color={'#6EA9FF'} paddingRight={5}>
                매칭경험
              </CommonText>
              <CommonText fontSize={12} color={'#0E6FFF'}>
                23번
              </CommonText>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              height: 100,
              backgroundColor: '#F4F6FA',
              marginHorizontal: 20,
              marginTop: 10,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: 52,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <CommonText fontSize={12} color={'#96A0B5'} marginBottom={10}>
                학교
              </CommonText>
              <CommonText fontSize={12} color={'#96A0B5'} marginBottom={10}>
                실력
              </CommonText>
              <CommonText fontSize={12} color={'#96A0B5'}>
                활동지역
              </CommonText>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <CommonText fontSize={12} color={'#373F57'} marginBottom={10}>
                숭실대학교
              </CommonText>
              <CommonText fontSize={12} color={'#373F57'} marginBottom={10}>
                Lv.1~3
              </CommonText>
              <CommonText fontSize={12} color={'#373F57'}>
                서울
              </CommonText>
            </View>
            <View
              style={{
                width: 52,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <CommonText fontSize={12} color={'#96A0B5'} marginBottom={10}>
                성별
              </CommonText>
              <CommonText fontSize={12} color={'#96A0B5'} marginBottom={10}>
                나이
              </CommonText>
              <CommonText fontSize={12} color={'#96A0B5'}>
                신고내역
              </CommonText>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <CommonText fontSize={12} color={'#373F57'} marginBottom={10}>
                비공개
              </CommonText>
              <CommonText fontSize={12} color={'#373F57'} marginBottom={10}>
                비공개
              </CommonText>
              <CommonText fontSize={12} color={'#373F57'}>
                없음
              </CommonText>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              height: '30%',
              marginHorizontal: 20,
              marginBottom: 10,
              justifyContent: 'flex-end',
            }}>
            <CommonTouchableOpacity
              style={[
                {
                  borderRadius: 20,
                  marginBottom: 10,
                },
              ]}
              bgColor={'#212121'}
              width={'100%'}
              height={48}
              alignC
              justifyC>
              <CommonText fontSize={16} color={'#FFFFFF'}>
                1:1 채팅하기
              </CommonText>
            </CommonTouchableOpacity>
          </View>
        </View>
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

export default SearchProfileScreen;
