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
  ListRenderItem,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  BaseSafeView,
  CommonImage,
  CommonText,
  CommonTouchableOpacity,
  Container,
  RowBox,
} from '../../CommonStyled.style';
import {BackButton} from '../style/MyGroupStyle.style';
import styled from 'styled-components/native';

type Item = {
  image: string;
  name: string;
  type: string;
};

const data: Item[] = [
  {image: 'none', name: '러닝', type: 'RUNNING'},
  {image: 'none', name: '축구', type: 'SOCCER'},
  {image: 'none', name: '농구', type: 'BASKETBALL'},
  {image: 'none', name: '스쿼시', type: 'SQUASH'},
  {image: 'none', name: '볼링', type: 'BOWLING'},
  {image: 'none', name: '테니스', type: 'TENNIS'},
  {image: 'none', name: '클라이밍', type: 'CLIMBING'},
  {image: 'none', name: '자전거', type: 'BICYCLE'},
  {image: 'none', name: '보드', type: 'BOARD'},
  {image: 'none', name: '배드민턴', type: 'BADMINTON'},
  {image: 'none', name: '야구', type: 'BASEBALL'},
  {image: 'none', name: '기타', type: 'ETC'},
];

const SelectSportsPage = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const barWidth = Math.ceil((1 / 5) * 100);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const onPress = (item: Item) => {
    setSelectedSport(item.type);
  };

  const renderItem: ListRenderItem<Item> = ({item}) => {
    const isSelected = item.type === selectedSport;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginBottom: 8,
        }}>
        <TouchableOpacity
          style={[
            styles.button,
            isSelected ? styles.selectedButton : styles.button,
          ]}
          onPress={() => onPress(item)}>
          <CommonText fontSize={10} color={'#ffffff'} paddingBottom={5}>
            {item?.name}
          </CommonText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BaseSafeView>
      <Container bgColor={'#ffffff'} padding={0}>
        <View
          style={{paddingHorizontal: 10, paddingTop: 40, paddingBottom: 20}}>
          <RowBox alignC justify={'flex-start'}>
            <BackButton />
            <CommonText fontSize={18} color={'#1C1C1C'}>
              새 그룹
            </CommonText>
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
            어떤 스포츠 그룹인가요?
          </CommonText>
          <View
            style={{
              width: '100%',
              height: '75%',
            }}>
            <FlatList
              data={data}
              numColumns={3}
              scrollEnabled={false}
              renderItem={renderItem}
              keyExtractor={item => item.name}
            />
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
              onPress={() => {
                navigation.navigate('SelectApproval', {
                  sportsType: selectedSport,
                });
              }}>
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

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    tintColor: 'gray',
    opacity: 0.7,
    backgroundColor: '#000000',
  },
  selectedButton: {
    width: 80,
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    opacity: 1,
    backgroundColor: '#000000',
    borderColor: '#0E6FFF',
    borderWidth: 5,
  },
});

export default SelectSportsPage;
