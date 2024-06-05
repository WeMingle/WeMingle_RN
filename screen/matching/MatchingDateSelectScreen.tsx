import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {
  BaseSafeView,
  CommonText,
  ConfirmButton,
  Container,
  RowBox,
} from '../CommonStyled.style';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {CommonHeaderBlack} from '../../component/header/CommonHeader';
import CalendarBox from '../../component/CalendarBox';
import {getMatchingWritableGroup} from '../../api/Matching';
import WritableMatchingGroupModal from '../../component/modal/WritableMatchingGroupModal';

const MatchingDateSelectScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  // useState
  const [selectedDate, setSelectedDate] = useState<string>();
  const [writableGroups, setWritableGroups] = useState({});

  const [modalVisible, setModalVisible] = useState(false);

  //useEffect
  useEffect(() => {
    _onRendered();
  }, []);

  // Function
  const _setSelectedDate = (day: string) => {
    setSelectedDate(day);
  };

  const _onRendered = async () => {
    const result = await getMatchingWritableGroup();

    // console.log('result', result);
    setWritableGroups(result);
    console.log('result', result);
    setModalVisible(true);
  };

  // console.log(writableGroups);
  const _setSelectedGroup = (value: string) => {
    setModalVisible(false);
    return;
  };

  return (
    <BaseSafeView>
      <WritableMatchingGroupModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedGroup={_setSelectedGroup}
        // writableGroups={writableGroups}
      />
      <Container padding={0}>
        <View style={{backgroundColor: '#212121'}}>
          <CommonHeaderBlack headerTitle={'매칭글 작성'} />
        </View>
        <RowBox
          borderB
          height={55}
          bgColor={'#fff'}
          alignC
          padding={7}
          style={{paddingLeft: 20}}>
          <CommonText bold fontSize={16}>
            ⏰ 일정을 선택해주세요!
          </CommonText>
        </RowBox>
        <CalendarBox
          selectedDate={selectedDate}
          setSelectedDate={(day: string) => _setSelectedDate(day)}
        />
        <ConfirmButton
          bottom={20}
          onPress={() =>
            navigation.navigate('MatchingWrite', {selectedDate: selectedDate})
          }
          position={'absolute'}>
          <CommonText color={'#fff'} bold fontSize={16}>
            적용
          </CommonText>
        </ConfirmButton>
      </Container>
    </BaseSafeView>
  );
};

export default MatchingDateSelectScreen;
