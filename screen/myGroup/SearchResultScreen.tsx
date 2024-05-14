import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  BaseSafeView,
  CommonImage,
  Container,
  RowBox,
} from '../CommonStyled.style';
import Search from '../../assets/search.png';
import {SearchTabs} from './style/SearchTabs';
import {BackButton} from './style/MyGroupStyle.style';

const SearchResultScreen = ({navigation: {navigate}, route}: any) => {
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
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingTop: 10,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <SearchTabs />
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

export default SearchResultScreen;
