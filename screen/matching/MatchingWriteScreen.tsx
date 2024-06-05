import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {
  BaseSafeView,
  BorderBoxButton,
  CommonImage,
  CommonInputBox,
  CommonText,
  ConfirmButton,
  RowBox,
  ScrollContainer,
} from '../CommonStyled.style';

import Calendar_Icon from '../../assets/uil_calender.png';
import Arrow_down from '../../assets/arrow_right.png';
import Intersect from '../../assets/Intersect.png';
import Arrow_Right from '../../assets/right_arrow.png';
import {Colors} from '../../assets/color/Colors';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {CommonHeaderBlack} from '../../component/header/CommonHeader';
import moment from 'moment';
import {showToastMessage} from '../../component/Toast';
import {postMatching} from '../../api/Matching';
import {MatchingCounter} from './style/MatchingStyle';

const MatchingWriteScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();
  const {selectedDate} = route.params;

  // const [selectedDate, setSelectedDate] = useState(
  //   moment().format('YYYY-MM-DD'),
  // );
  const [expiredDate, setExpiredDate] = useState(new Date());

  const [matchingData, setMatchingData] = useState({
    matchingDate: selectedDate,
    latitude: 0,
    longitude: 0,
    locationName: '',
    dou: '',
    si: '',
    gun: '',
    gu: '',
    dong: '',
    eup: '',
    myen: '',
    ri: '',
    areaNameList: ['서울'],
    ability: '',
    gender: '',
    capacityLimit: 10,
    teamPk: 1,
    participantsId: [],
    expiryDate: '',
    recruiterType: '',
    recruitmentType: '',
    content: '',
    locationSelectionType: '',
    sportsType: 'OTHER',
  });

  useEffect(() => {
    showToastMessage(
      '매칭 조건은 업로드 후 수정이 불가하니 신중하게 작성해주세요!',
    );
  }, []);

  console.log(matchingData);

  const MatchingColumn = ({title, rightComponent, marginT}: any) => {
    return (
      <RowBox
        alignC
        padding={20}
        marginT={marginT}
        justify={'space-between'}
        bgColor={'#fff'}
        height={60}>
        <CommonText bold>{title}</CommonText>
        {rightComponent && rightComponent()}
      </RowBox>
    );
  };

  const LevelBox = ({level = '', marginL = false}) => {
    const isSelected = () => {
      if (level === matchingData.ability) {
        return true;
      }
    };

    return (
      <BorderBoxButton
        onPress={() => {
          setMatchingData(prev => {
            return {...prev, ability: level};
          });
        }}
        height={28}
        marginL={marginL && 12}
        borderColor={isSelected() ? Colors.informative : Colors.c_gray300}
        alignC
        justify={'center'}>
        <CommonText
          color={isSelected() ? Colors.informative : Colors.c_gray300}
          bold
          fontSize={12}>
          {level === 'LOW'
            ? 'Lv 1-3'
            : level === 'MEDIUM'
            ? 'Lv 4-6'
            : 'Lv 7-9'}
        </CommonText>
      </BorderBoxButton>
    );
  };

  const GenderBox = ({gender = '', marginL = false}) => {
    const isSelected = () => {
      if (gender === matchingData.gender) {
        return true;
      }
    };
    return (
      <BorderBoxButton
        onPress={() => {
          setMatchingData(prev => {
            return {...prev, gender: gender};
          });
        }}
        marginL={marginL && 12}
        height={28}
        borderColor={isSelected() ? Colors.informative : Colors.c_gray300}
        alignC
        justify={'center'}>
        <CommonText
          color={isSelected() ? Colors.informative : Colors.c_gray300}
          bold
          fontSize={12}>
          {gender === 'MALE' ? '남성' : '여성'}
        </CommonText>
      </BorderBoxButton>
    );
  };

  const RecruiterTypeBox = ({recruiterType = '', marginL = false}) => {
    const isSelected = () => {
      if (recruiterType === matchingData.recruiterType) {
        return true;
      }
    };

    return (
      <BorderBoxButton
        onPress={() => {
          setMatchingData(prev => {
            return {...prev, recruiterType: recruiterType};
          });
        }}
        marginL={marginL && 12}
        height={28}
        borderColor={isSelected() ? Colors.informative : Colors.c_gray300}
        alignC
        justify={'center'}>
        <CommonText
          color={isSelected() ? Colors.informative : Colors.c_gray300}
          bold
          fontSize={12}>
          {recruiterType === 'INDIVIDUAL' ? '개인' : '그룹'}
        </CommonText>
      </BorderBoxButton>
    );
  };
  return (
    <BaseSafeView>
      <ScrollContainer padding={0} bgColor={Colors.c_gray50}>
        <View style={{backgroundColor: '#212121'}}>
          <CommonHeaderBlack headerTitle={'매칭글 작성'} />
        </View>
        <MatchingColumn
          title={'일정'}
          rightComponent={() => {
            return (
              <RowBox alignC>
                <CommonImage source={Calendar_Icon} width={18} height={18} />
                <CommonText marginL={8} bold color={'#777777'} fontSize={12}>
                  {selectedDate}
                </CommonText>
              </RowBox>
            );
          }}
        />

        <MatchingColumn
          marginT={10}
          title={'지역'}
          rightComponent={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MatchingGetLocation');
                }}
                hitSlop={{right: 50, top: 50, bottom: 50, left: 50}}>
                <CommonImage source={Arrow_down} width={24} height={24} />
              </TouchableOpacity>
            );
          }}
        />

        <MatchingColumn
          marginT={10}
          title={'내 실력'}
          rightComponent={() => {
            return (
              <RowBox>
                <LevelBox level={'LOW'} />
                <LevelBox level={'MEDIUM'} marginL />
                <LevelBox level={'HIGH'} marginL />
              </RowBox>
            );
          }}
        />

        <MatchingColumn
          title={'내 성별'}
          rightComponent={() => {
            return (
              <RowBox>
                <GenderBox gender={'MALE'} />
                <GenderBox gender={'FEMALE'} marginL />
              </RowBox>
            );
          }}
        />

        <MatchingColumn
          title={'내 인원'}
          rightComponent={() => {
            return (
              <RowBox>
                <BorderBoxButton
                  onPress={() => {
                    navigation.navigate('MatchingGetVote');
                  }}
                  marginR={10}>
                  <RowBox alignC>
                    <CommonImage source={Arrow_Right} width={9} height={7} />
                    <CommonImage source={Intersect} width={14} height={12} />
                  </RowBox>
                </BorderBoxButton>
                <MatchingCounter />
              </RowBox>
            );
          }}
        />

        <MatchingColumn
          marginT={10}
          title={'매칭 상대'}
          rightComponent={() => {
            return (
              <RowBox>
                <RecruiterTypeBox recruiterType="INDIVIDUAL" />
                <RecruiterTypeBox recruiterType="TEAM" marginL />
              </RowBox>
            );
          }}
        />

        <MatchingColumn title={'매칭 마감일'} />
        <DatePicker
          style={{alignSelf: 'center', justifyContent: 'space-between'}}
          date={expiredDate}
          onDateChange={v => {
            const date = v;
            // console.log(date);
            setMatchingData(prev => {
              return {
                ...prev,
                expiryDate: `${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`,
              };
            });
          }}
          mode="date"
          locale="ko-KR"
          theme="light"
          renderToHardwareTextureAndroid={false}
          dividerColor="#fff"
        />

        <MatchingColumn
          title={'매칭 방식'}
          rightComponent={() => {
            return (
              <RowBox>
                <TouchableOpacity
                  onPress={() => {
                    setMatchingData(prev => {
                      return {...prev, recruitmentType: 'APPROVAL_BASED'};
                    });
                  }}
                  style={{
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    height: 35,
                    width: 85,
                    backgroundColor:
                      matchingData.recruitmentType === 'APPROVAL_BASED'
                        ? Colors.informative
                        : '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor:
                      matchingData.recruitmentType !== 'APPROVAL_BASED'
                        ? Colors.c_gray300
                        : '#fff',
                    borderWidth:
                      matchingData.recruitmentType !== 'APPROVAL_BASED' ? 1 : 0,
                    borderRightWidth: 0,
                  }}>
                  <CommonText
                    color={
                      matchingData.recruitmentType === 'APPROVAL_BASED'
                        ? '#fff'
                        : '#6B768B'
                    }
                    bold
                    fontSize={12}>
                    승인제
                  </CommonText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setMatchingData(prev => {
                      return {...prev, recruitmentType: 'FIRST_SERVED_BASED'};
                    });
                  }}
                  style={{
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    height: 35,
                    width: 85,
                    backgroundColor:
                      matchingData.recruitmentType === 'FIRST_SERVED_BASED'
                        ? Colors.informative
                        : '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor:
                      matchingData.recruitmentType !== 'FIRST_SERVED_BASED'
                        ? Colors.c_gray300
                        : '#fff',
                    borderWidth:
                      matchingData.recruitmentType !== 'FIRST_SERVED_BASED'
                        ? 1
                        : 0,
                  }}>
                  <CommonText
                    color={
                      matchingData.recruitmentType === 'FIRST_SERVED_BASED'
                        ? '#fff'
                        : '#6B768B'
                    }
                    bold
                    fontSize={12}>
                    자동승인(선착)
                  </CommonText>
                </TouchableOpacity>
              </RowBox>
            );
          }}
        />
        <MatchingColumn title={'매칭 소개'} marginT={10} />
        <RowBox style={{paddingLeft: 20, paddingRight: 20}} bgColor={'#fff'}>
          <CommonInputBox
            value={matchingData.content}
            onChangeText={(v: string) => {
              setMatchingData(prev => {
                return {...prev, content: v};
              });
            }}
            height={150}
          />
        </RowBox>
        <ConfirmButton
          marginT={20}
          marginB={20}
          onPress={() => postMatching(matchingData)}>
          <CommonText color={'#fff'} bold fontSize={16}>
            작성 완료하기
          </CommonText>
        </ConfirmButton>
      </ScrollContainer>
    </BaseSafeView>
  );
};

export default MatchingWriteScreen;
