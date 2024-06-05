import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Switch,
  TouchableOpacity,
  ScrollView,
  FlatList,
  View,
  Touchable,
  Alert,
} from 'react-native';
import {
  BaseSafeView,
  BorderBoxButton,
  CenterBox,
  CommonInputView,
  CommonText,
  CommontInput,
  ConfirmButton,
  Container,
  RowBox,
  ScreenWidth,
  StartButton,
} from '../CommonStyled.style';
import {Colors} from '../../assets/color/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ConfigFrmae} from './style/MyPageStyle.style';
import {CommonHeader} from '../../component/header/CommonHeader';
import Profile_Icon from '../../assets/Profile_Square.png';
import Camera from '../../assets/Camera.png';
import {RadioButton} from 'react-native-paper';
import Arrow_Up from '../../assets/arrow_up.png';
import Arrow_down from '../../assets/arrow_down.png';
import {modifyMyProfile} from '../../api/MyPage';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Reducers';

interface profileProps {
  nickname: string;
  majorActivityAreaPublic: boolean;
  majorActivityArea: string;
  gender: string;
  abilityPublic: boolean;
  abilityList: {ability: string; sportsType: string}[];
  oneLineIntroduction: string;
  birthYear: number;
  birthYearPublic: boolean;
}

const MyProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const locationArray = useSelector(
    (state: RootState) => state.Common,
  ).locationArray;

  const [configVisible, setConfigVisible] = useState(false);

  const [levelSwitch, setLevelSwitdh] = useState(false);
  const [locationSwitch, setLocationSwitdh] = useState(false);
  const [ageSwitch, setAgeSwitdh] = useState(false);

  const [profile, setProfile] = useState<profileProps>(route?.params?.myInfo);
  const [isShowSprotsList, setIsShowSportsList] = useState(false);
  const [abilityType, setAbiltyType] = useState<{
    sportsType: string;
    ability: string;
  }>({
    sportsType: '',
    ability: '',
  });

  const abilitySetFunction = (ability: string) => {
    setProfile(prev => {
      let abilityTmp = prev.abilityList.filter((v, i) => {
        if (v.sportsType !== abilityType.sportsType) return v;
      });

      // if (!abilityTmp) {
      //   abilityTmp = [];
      // }

      abilityTmp.push({
        sportsType: abilityType.sportsType,
        ability: ability,
      });
      return {...prev, abilityList: abilityTmp};
    });
  };

  const getColor = (isBgColor: boolean, ability: string) => {
    const result = profile.abilityList.filter((v, i) => {
      return v.sportsType === abilityType.sportsType && v.ability === ability;
    });
    // console.log(result);
    if (isBgColor) {
      return result.length > 0 ? '#212121' : '#fff';
    } else {
      return result.length > 0 ? '#fff' : '#212121';
    }
  };

  const getYearsArray = () => {
    let result = [];
    const Years = new Date().getFullYear();
    for (let i = Years - 19; i >= 1990; i--) {
      result.push(i);
    }

    return result;
  };

  return (
    <BaseSafeView>
      <ScrollView nestedScrollEnabled={true}>
        <Container>
          <CommonHeader
            headerTitle={'내 정보'}
            rightButtonPress={() => setConfigVisible(prev => !prev)}
          />
          {configVisible && <ConfigFrmae />}
          <TouchableWithoutFeedback>
            <CenterBox>
              <Image source={Profile_Icon} style={{width: 65, height: 65}} />
              <CenterBox
                justify={'center'}
                width={20}
                height={20}
                style={{
                  position: 'absolute',
                  left: Dimensions.get('screen').width / 2 - 5,
                  bottom: -5,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  borderWidth: 0.3,
                }}>
                <Image source={Camera} style={{width: 12, height: 12}} />
              </CenterBox>
            </CenterBox>
          </TouchableWithoutFeedback>

          <CommonText color={Colors.c_gray400} fontSize={12} marginT={34}>
            닉네임
          </CommonText>
          <CommontInput
            value={profile?.nickname}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors.c_gray300,
              padding: 0,
            }}
            marginT={10}
          />

          <CommonText color={Colors.c_gray400} fontSize={12} marginT={40}>
            한줄 소개
          </CommonText>
          <CommonInputView marginT={14} height={68}>
            <CommontInput
              onChangeText={(v: string) => [
                setProfile(prev => {
                  return {...prev, oneLineIntroduction: v};
                }),
              ]}
              value={profile?.oneLineIntroduction}
              style={{width: '100%', alignSelf: 'flex-start'}}
              multiline
            />
          </CommonInputView>

          <RowBox marginT={40} justify={'space-between'}>
            <CommonText color={Colors.c_gray400} fontSize={12}>
              실력
            </CommonText>
            <RowBox alignC>
              <CommonText color={Colors.c_gray400} fontSize={10} marginR={5}>
                공개 여부
              </CommonText>
              <Switch
                value={profile?.abilityPublic}
                thumbColor={'#fff'}
                trackColor={{false: Colors.c_gray400, true: Colors.informative}}
                onValueChange={() =>
                  setProfile(prev => {
                    return {...prev, abilityPublic: !profile?.abilityPublic};
                  })
                }
              />
            </RowBox>
          </RowBox>
          <TouchableOpacity
            onPress={() => {
              if (isShowSprotsList === true) {
                setAbiltyType({ability: '', sportsType: ''});
              }
              setIsShowSportsList(prev => !prev);
            }}>
            <CommontInput
              editable={false}
              // placeholder={'선택해주세요'}
              value={'선택해주세요'}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.c_gray300,
                padding: 0,
                color: Colors.c_gray500,
              }}
            />
          </TouchableOpacity>

          {isShowSprotsList && (
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 20,
                marginTop: 5,
                width: '100%',
                height: !abilityType.sportsType ? 220 : 93,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.c_gray300,
                justifyContent: 'center',
              }}>
              {!abilityType.sportsType ? (
                <FlatList
                  nestedScrollEnabled={true}
                  data={sportsTypeList}
                  renderItem={item => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          setAbiltyType(prev => {
                            return {...prev, sportsType: item.item.sportsType};
                          })
                        }>
                        <CommonText
                          marginT={item.item.sportsType === 'RUNNING' ? 0 : 15}>
                          {item.item.title}
                        </CommonText>
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : (
                <>
                  <CommonText>
                    {sportsTypeList.map((v, i) => {
                      if (v.sportsType === abilityType.sportsType) {
                        return v.title;
                      }
                    })}
                  </CommonText>
                  <RowBox marginT={10}>
                    <StartButton
                      onPress={() => {
                        abilitySetFunction('LOW');
                      }}
                      width={64}
                      height={25}
                      bgColor={getColor(true, 'LOW')}
                      style={{borderWidth: 1, borderColor: Colors.c_gray300}}>
                      <CommonText color={getColor(false, 'LOW')} fontSize={12}>
                        Lv 1-3 {}
                      </CommonText>
                    </StartButton>
                    <StartButton
                      onPress={() => {
                        abilitySetFunction('MEDIUM');
                      }}
                      bgColor={getColor(true, 'MEDIUM')}
                      width={64}
                      height={25}
                      style={{
                        borderWidth: 1,
                        borderColor: Colors.c_gray300,
                        marginHorizontal: 10,
                      }}>
                      <CommonText
                        color={getColor(false, 'MEDIUM')}
                        fontSize={12}>
                        Lv 4-6
                      </CommonText>
                    </StartButton>
                    <StartButton
                      onPress={() => {
                        abilitySetFunction('HIGH');
                      }}
                      bgColor={getColor(true, 'HIGH')}
                      width={64}
                      height={25}
                      style={{borderWidth: 1, borderColor: Colors.c_gray300}}>
                      <CommonText color={getColor(false, 'HIGH')} fontSize={12}>
                        Lv 6-10
                      </CommonText>
                    </StartButton>
                  </RowBox>
                </>
              )}
            </View>
          )}
          <RowBox alignC justify={'space-between'} marginT={34}>
            <CommonText color={Colors.c_gray400} fontSize={12}>
              활동 지역
            </CommonText>
            <RowBox alignC>
              <CommonText color={Colors.c_gray400} fontSize={10} marginR={5}>
                공개 여부
              </CommonText>
              <Switch
                value={profile?.majorActivityAreaPublic}
                thumbColor={'#fff'}
                trackColor={{false: Colors.c_gray400, true: Colors.informative}}
                onValueChange={() =>
                  setProfile(prev => {
                    return {
                      ...prev,
                      majorActivityAreaPublic:
                        !profile?.majorActivityAreaPublic,
                    };
                  })
                }
              />
            </RowBox>
          </RowBox>

          <FlatList
            numColumns={6}
            data={locationArray}
            renderItem={({item, index}) => {
              return (
                <BorderBoxButton
                  onPress={() => {
                    setProfile(prev => {
                      return {...prev, majorActivityArea: item};
                    });
                  }}
                  bgColor={
                    profile.majorActivityArea === item ? '#212121' : '#fff'
                  }
                  width={(ScreenWidth - 40 - 60) / 6}
                  marginT={10}
                  marginL={index % 6 !== 0 ? 10 : 0}>
                  <CommonText
                    color={
                      profile.majorActivityArea === item
                        ? '#fff'
                        : Colors.c_gray500
                    }
                    fontSize={12}>
                    {item}
                  </CommonText>
                </BorderBoxButton>
              );
            }}
          />
          <CommonText color={Colors.c_gray400} fontSize={12} marginT={34}>
            성별
          </CommonText>
          <RowBox>
            <RowBox alignC marginT={28}>
              <RadioButton value="" color={Colors.blue400} status={'checked'} />
              <CommonText fontSize={14} marginR={10}>
                남성
              </CommonText>
            </RowBox>
            <RowBox alignC marginT={28}>
              <RadioButton
                value=""
                color={Colors.blue400}
                status={'unchecked'}
              />
              <CommonText fontSize={14}>여성</CommonText>
            </RowBox>
          </RowBox>

          <RowBox alignC justify={'space-between'} marginT={34}>
            <CommonText color={Colors.c_gray400} fontSize={12}>
              나이 (출생연도)
            </CommonText>
            <RowBox alignC>
              <CommonText color={Colors.c_gray400} fontSize={10} marginR={5}>
                공개 여부
              </CommonText>
              <Switch
                value={levelSwitch}
                thumbColor={'#fff'}
                trackColor={{false: Colors.c_gray400, true: Colors.informative}}
                onValueChange={() => setLevelSwitdh(prev => !prev)}
              />
            </RowBox>
          </RowBox>
          <TouchableOpacity>
            <CommontInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.c_gray300,
                padding: 0,
              }}
              editable={false}
              value={String(profile.birthYear)}
            />
            <Image
              source={Arrow_down}
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                right: 10,
                top: 5,
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 5,
              paddingBottom: 20,
              marginTop: 5,
              width: '100%',
              height: 220,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.c_gray300,
            }}>
            <FlatList
              nestedScrollEnabled={true}
              data={getYearsArray()}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setProfile(prev => {
                        return {...prev, birthYear: item};
                      });
                    }}>
                    <CommonText marginT={15}>{item}</CommonText>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Container>
        <ConfirmButton
          marginB={20}
          onPress={() => {
            modifyMyProfile(profile);
          }}>
          <CommonText color={'#fff'}>수정 완료</CommonText>
        </ConfirmButton>
      </ScrollView>
    </BaseSafeView>
  );
};

const sportsTypeList = [
  {title: '러닝', sportsType: 'RUNNING'},
  {title: '축구', sportsType: 'SOCCER'},
  {title: '농구', sportsType: 'BASKETBALL'},
  {title: '야구', sportsType: 'BASEBALL'},
  {title: '테니스', sportsType: 'TENNIS'},
  {title: '배드민턴', sportsType: 'BADMINTON'},
  {title: '클라이밍', sportsType: 'CLIMBING'},
  {title: '스쿼시', sportsType: 'SQUASH'},
  {title: '볼링', sportsType: 'BOWLING'},
  {title: '자전거', sportsType: 'CYCLING'},
  {title: '보드', sportsType: 'SKATEBOARDING'},
  {title: '기타', sportsType: 'OTHER'},
];

export default MyProfileScreen;
