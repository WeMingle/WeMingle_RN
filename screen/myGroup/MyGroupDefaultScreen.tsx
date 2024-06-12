import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Platform,
} from 'react-native';
import {
  BaseSafeView,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
  RowBox,
} from '../CommonStyled.style';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Add_Box from '../../assets/add_box.png';
import Arrow_Right from '../../assets/arrow_right.png';
import {SearchButton} from './style/MyGroupStyle.style';
import Toast, {
  BaseToast,
  BaseToastProps,
  ToastConfigParams,
} from 'react-native-toast-message';

const MyGroupDefaultScreen = ({route}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const item = route.params;
  console.log('파라미터: ', item.pageName);
  console.log('위밍글 추천 팀: ', item.teams);
  console.log('대학교 소속 팀: ', item.univTeams);

  const teamsList: any[] = item.teams ? Object.values(item.teams) : [];
  const teamsKeys: any[] = item.teams ? Object.keys(item.teams) : [];

  let teams = [];
  for (let i = 0; i < teamsList.length; i++) {
    teams.push({
      teamPk: teamsKeys[i],
      teamName: teamsList[i].teamName,
      content: teamsList[i].content,
      recruitmentType: teamsList[i].recruitmentType,
      teamImgUrl: teamsList[i].teamImgUrl,
    });
  }

  const univTeamsList: any[] = item.univTeams
    ? Object.values(item.univTeams)
    : [];
  const univTeamsKeys: any[] = item.univTeams
    ? Object.keys(item.univTeams)
    : [];

  let univTeams: any[] = [];
  for (let i = 0; i < univTeamsList.length; i++) {
    univTeams.push({
      teamPk: univTeamsKeys[i],
      teamName: univTeamsList[i].teamName,
      teamImgUrl: univTeamsList[i].teamImgUrl,
    });
  }

  useEffect(() => {
    Toast.show({
      type: 'customToast',
      text1: '그룹 추천을 위해 학교 인증을 완료해주세요',
      autoHide: false,
      position: 'top',
    });
  }, []);

  const toastConfig = {
    customToast: ({text1, ...rest}: ToastConfigParams<BaseToastProps>) => (
      <View
        style={{
          width: '80%',
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 80,
          padding: 20,
          alignItems: 'center',
          borderRadius: 10,
          ...Platform.select({
            ios: {
              shadowColor: '#000000',
              shadowOffset: {
                width: 10,
                height: 10,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
            },
            android: {
              elevation: 20,
            },
          }),
        }}>
        <CommonText fontSize={14} color={'#212121'}>
          {text1}
        </CommonText>
        <CommonImage source={Arrow_Right} width={24} height={24} />
      </View>
    ),
  };
  return (
    <>
      <BaseSafeView>
        <FlatList
          ListHeaderComponent={
            <View>
              <Container bgColor={'#212121'} padding={0}>
                <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
                  <RowBox alignC justify={'space-between'}>
                    <CommonText fontSize={18} color={'#fff'}>
                      {item.pageName === '내그룹'
                        ? item.pageName
                        : '그룹 둘러보기'}
                    </CommonText>
                    <RowBox>
                      <SearchButton width={24} height={24} />
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('SelectSports');
                        }}>
                        <CommonImage
                          source={Add_Box}
                          width={24}
                          height={24}
                          style={{marginLeft: 12}}
                        />
                      </TouchableOpacity>
                    </RowBox>
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
                  {univTeams.length === 0 ? (
                    <View
                      style={{
                        padding: 70,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  ) : (
                    <>
                      <RowBox justify={'space-between'} marginTop={40}>
                        <CommonText fontSize={16}>
                          ㅇㅇㅇ님의 학교에 속한 그룹이에요!
                        </CommonText>
                        <CommonImage
                          source={Arrow_Right}
                          width={24}
                          height={24}
                        />
                      </RowBox>
                      <FlatList
                        data={univTeams}
                        horizontal
                        style={{marginVertical: 20, flexGrow: 0}}
                        renderItem={items => {
                          return (
                            <View
                              style={{
                                marginLeft:
                                  items.index === 0 ||
                                  items.index === items.length - 1
                                    ? 0
                                    : 10,
                              }}>
                              <CommonTouchableOpacity
                                style={[
                                  {
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                  },
                                ]}
                                bgColor={'#000'}
                                width={96}
                                height={96}
                                onPress={() => {
                                  navigation.navigate('GroupFeed', {
                                    teamPk: items.item.teamPk,
                                  });
                                }}></CommonTouchableOpacity>
                              <CommonText
                                textAlignC
                                fontSize={10}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                color={'#212121'}
                                style={{marginBottom: 5, width: 96}}>
                                {items.item?.teamName}
                              </CommonText>
                            </View>
                          );
                        }}
                      />
                    </>
                  )}

                  <RowBox justify={'space-between'} marginTop={20}>
                    <CommonText fontSize={16} color={'#000000'}>
                      위밍글이 추천하는 그룹
                    </CommonText>
                  </RowBox>
                </Container>
              </Container>
            </View>
          }
          data={teams}
          style={{
            flexGrow: 0,
            width: '100%',
            height: '100%',
          }}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-around'}}
          renderItem={items => {
            return (
              <View
                style={{
                  width: '47%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      marginBottom:
                        items.index === 0 || items.index === items.length - 1
                          ? 0
                          : 10,
                    }}>
                    <CommonTouchableOpacity
                      style={[
                        {
                          borderRadius: 10,
                          marginBottom: 10,
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        },
                      ]}
                      bgColor={'#000'}
                      width={152}
                      height={152}
                      onPress={() => {
                        navigation.navigate('GroupFeed', {
                          teamPk: items.item.teamPk,
                        });
                      }}></CommonTouchableOpacity>
                    <CommonText
                      textAlignC
                      fontSize={14}
                      color={'#1C1C1C'}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{marginBottom: 5, textAlign: 'left', width: 152}}>
                      {items.item?.teamName}
                    </CommonText>
                    <CommonText
                      textAlignC
                      fontSize={12}
                      color={'#666666'}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{marginBottom: 5, textAlign: 'left', width: 152}}>
                      {items.item?.content}
                    </CommonText>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.teamPk}
        />
      </BaseSafeView>
      {univTeams.length === 0 ? <Toast config={toastConfig} /> : <></>}
    </>
  );
};

const styles = StyleSheet.create({
  customToast: {
    elevation: 0,
    shadowOpacity: 0,
    marginTop: 80,
    zIndex: 999,
  },
});

export default MyGroupDefaultScreen;
