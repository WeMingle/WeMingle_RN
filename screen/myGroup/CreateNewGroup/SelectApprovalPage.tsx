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
import {Colors} from '../../../assets/color/Colors';
import Lock from '../../../assets/lock.png';
import LockOpen from '../../../assets/lock_open.png';
import styled from 'styled-components/native';

interface Item {
  image: string;
  title: string;
  content: string;
  description: string;
}

const data: Item[] = [
  {
    image: Lock,
    title: '직접 승인',
    content: `그룹장이 되고 싶은 사용자의 신청을\n그룹장이 직접 판단하에 승인 할 수 있어요`,
    description: '그룹에 최적화된 그룹원을 모을 수 있어요',
  },
  {
    image: LockOpen,
    title: '자동 승인',
    content: `별도의 승인 과정없이 그룹에 가입 신청한\n모든 인원이 참여할 수 있어요`,
    description: '빠른 시일내에 많은 인원을 모집할 수 있어요',
  },
];

const SelectApprovalPage = () => {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const barWidth = Math.ceil((2 / 5) * 100);
  const onPress = (item: Item) => {
    setSelectedTitle(item.title);
  };

  const RenderItem: ListRenderItem<Item> = ({item}) => {
    const isSelected = item.title === selectedTitle;
    return (
      <TouchableOpacity
        style={[
          styles.button,
          isSelected ? styles.selectedButton : styles.button,
        ]}
        onPress={() => onPress(item)}>
        <View
          style={{
            padding: 20,
          }}>
          <CommonImage source={item.image} width={15} height={19.5} />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'column',
          }}>
          <CommonText fontSize={16} color={'#1C1C1C'} marginBottom={10}>
            {item.title}
          </CommonText>
          <CommonText fontSize={12} color={'#1C1C1C'} marginBottom={10}>
            {item.content}
          </CommonText>
          <CommonText fontSize={10} color={'#cccccc'}>
            {item.description}
          </CommonText>
        </View>
      </TouchableOpacity>
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
            그룹 승인 방식을 선택해주세요
          </CommonText>
          <View
            style={{
              width: '100%',
              height: '75%',
            }}>
            {data.map(item => (
              <RenderItem
                item={item}
                index={0}
                separators={{
                  highlight: function (): void {
                    throw new Error('Function not implemented.');
                  },
                  unhighlight: function (): void {
                    throw new Error('Function not implemented.');
                  },
                  updateProps: function (
                    select: 'leading' | 'trailing',
                    newProps: any,
                  ): void {
                    throw new Error('Function not implemented.');
                  },
                }}
              />
            ))}
          </View>
          <View
            style={{
              width: '100%',
              height: '18%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
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
              onPress={() => navigation.navigate('SelectMemberType')}>
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
  background-color: #5c667b;
`;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#eeeeee',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  selectedButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    borderColor: '#0E6FFF',
    borderWidth: 5,
  },
});

export default SelectApprovalPage;
