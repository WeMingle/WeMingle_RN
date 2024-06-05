import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  BaseSafeView,
  CommonText,
  CommonTouchableOpacity,
  Container,
  RowBox,
} from '../../CommonStyled.style';
import {BackButton} from '../style/MyGroupStyle.style';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';
import {useAppDispatch} from '../../../redux/Store';
import {
  fetchCreateNewGroup,
  clearState,
  fetchUploadProfile,
} from '../../../redux/slice/MyGroup/CreateNewGroupSlice';
import {RootState} from '../../../redux/Reducers';
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

const SetGroupProfilePage = ({route}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const barWidth = Math.ceil((5 / 5) * 100);
  const dispatch = useAppDispatch();
  const {loading, error, successMessage} = useSelector(
    (state: RootState) => state.newGroup,
  );

  const item = route.params;
  console.log('넘겨진 데이터 : ', item);
  console.log('로딩 : ', loading);
  console.log('에러 : ', error);
  console.log('성공 : ', successMessage);

  const [imageUri, setImageUri] = useState<string | null | undefined>(null);
  const [groupName, setGroupName] = useState('');
  const [groupIntroduce, setGroupIntroduce] = useState('');

  let formData = new FormData();

  const selectImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });

      if (result && result.path) {
        setImageUri(result.path);
        formData.append('file', {
          uri: imageUri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
      }

      console.log('어떻게 처리? : ', formData);
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick the image');
      // formData = "test.png";
    }
  };

  const createNewGroupPost = () => {
    const createGroupList = {
      sportsType: item.sportsType,
      recruitmentType: item.recruitmentType,
      onlySameUniv: item.onlySameUniv,
      ageIsIrrelevant: item.ageIsIrrelevant,
      startAge: item.startAge,
      endAge: item.endAge,
      genderIsIrrelevant: item.genderIsIrrelevant,
      gender: item.gender,
      personnelLimitIrrelevant: item.personnelLimitIrrelevant,
      personnelLimit: item.personnelLimit,
      freeQuestionList: item.freeQuestionList,
      teamName: groupName,
      content: groupIntroduce,
      teamImgId: 'dea14329-9eff-4e52-ad57-825285e97242',
    };

    dispatch(fetchCreateNewGroup(createGroupList));
    // dispatch(fetchUploadProfile())
  };

  return (
    <BaseSafeView>
      <Container bgColor={'#ffffff'} padding={0}>
        <View
          style={{paddingHorizontal: 10, paddingTop: 40, paddingBottom: 20}}>
          <RowBox alignC justify={'space-between'}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <BackButton />
              <CommonText fontSize={18} color={'#1C1C1C'}>
                새 그룹
              </CommonText>
            </View>
          </RowBox>
        </View>
        <View
          style={{
            width: '100%',
            height: 5,
            borderWidth: 1,
            borderColor: '#DCDCDC',
            marginBottom: 5,
            backgroundColor: '#D4E5FF',
          }}>
          <ProgressBar width={barWidth} />
        </View>
        <Container
          bgColor={'#ffffff'}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <CommonText fontSize={18} color={'#1C1C1C'} marginBottom={30}>
            그룹 프로필을 설정해주세요
          </CommonText>
          <View
            style={{
              width: '100%',
              height: '75%',
              //   backgroundColor: 'red',
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
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  },
                ]}
                bgColor={'#000'}
                width={80}
                height={80}
                onPress={selectImage}></CommonTouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
              }}>
              <CommonText fontSize={15} color={'#1C1C1C'} paddingTop={20}>
                그룹명
              </CommonText>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                  marginVertical: 10,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 5,
                  paddingHorizontal: 5,
                }}>
                <TextInput
                  placeholder="그룹명을 작성해주세요."
                  placeholderTextColor={'#9e9e9e'}
                  style={{padding: 10}}
                  value={groupName}
                  onChangeText={setGroupName}
                />
              </View>
              <CommonText fontSize={15} color={'#1C1C1C'} paddingTop={20}>
                그룹 소개글
              </CommonText>
              <View
                style={{
                  width: '100%',
                  height: 120,
                  marginVertical: 10,
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 5,
                  paddingHorizontal: 5,
                }}>
                <TextInput
                  placeholder="그룹 소개글을 작성해주세요."
                  textAlignVertical="top"
                  placeholderTextColor={'#9e9e9e'}
                  style={{padding: 10, height: 100}}
                  multiline={true}
                  numberOfLines={5}
                  value={groupIntroduce}
                  onChangeText={setGroupIntroduce}
                />
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <CommonText
                    fontSize={10}
                    color={'#cccccc'}
                    paddingBottom={5}
                    paddingRight={10}>
                    1/100
                  </CommonText>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: '18%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingBottom: 10,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#000000',
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={createNewGroupPost}>
              <CommonText fontSize={16} color={'#ffffff'}>
                다음
              </CommonText>
            </TouchableOpacity>
          </View>
        </Container>
      </Container>
    </BaseSafeView>
  );
};

const ProgressBar = styled.View`
  ${(props: {width: number}) =>
    props.width === 0 ? 'width: 0%' : props.width && `width: ${props.width}%`};
  height: 5px;
  background-color: #0e6fff;
`;

export default SetGroupProfilePage;
