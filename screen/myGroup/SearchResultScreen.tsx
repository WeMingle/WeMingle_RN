import React, {
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  Alert,
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
} from '../CommonStyled.style';
import Back_White from '../../assets/back_icon_white.png';
import Search from '../../assets/search.png';
import {Colors} from '../../assets/color/Colors';
import Add_Box from '../../assets/add_box.png';
import Arrow_Right from '../../assets/arrow_right.png';
import {SearchButton} from './style/MyGroupStyle.style';

type AccordionItemPros = PropsWithChildren<{
  title: string;
}>;

export const AccordionItem = ({children, title}: AccordionItemPros) => {
  console.log('타이틀 : ', title);
  const [expanded, setExpanded] = useState(false);

  const toggleItem = () => {
    setExpanded(!expanded);
  };

  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View style={styles.accordContainer}>
      {/* // <View style={{height: 200}}> */}
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <CommonText color={'#666666'} fontSize={20}>
          {title}
        </CommonText>
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
};

const SearchResultScreen = ({navigation: {navigate}, route}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [text, setText] = useState('');

  const onPress = () => {
    setText('');
    Keyboard.dismiss();
  };

  const onBackPress = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }),
    [onBackPress];

  return (
    <BaseSafeView>
      <Container bgColor={'#212121'} padding={0}>
        <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
          <RowBox alignC justify={'space-around'}>
            <TouchableOpacity onPress={onBackPress}>
              <CommonImage
                source={Back_White}
                width={48}
                height={24}
                marginRight={20}
              />
            </TouchableOpacity>
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
              // flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 20,
            }}>
            <CommonText fontSize={18} color={'#1C1C1C'} marginBottom={20}>
              그룹
            </CommonText>
            <FlatList
              data={[
                {image: 'none', name: '숭실대 축구 동아리'},
                {image: 'none', name: '숭실대 축구 동아리'},
                // {image: 'none', name: '숭실대 축구 동아리'},
                // {image: 'none', name: '숭실대 축구 동아리'},
                // {image: 'none', name: '숭실대 축구 동아리'},
                // {image: 'none', name: '숭실대 축구 동아리'},
                // {image: 'none', name: '숭실대 축구 동아리'},
                // {image: 'none', name: '숭실대 축구 동아리'},
                // {image: 'none', name: '숭실대 축구 동아리'},
                // {image: 'none', name: '숭실대 축구 동아리'},
                // {image: 'none', name: '숭실대 축구 동아리'},
                // {image: 'none', name: '숭실대 축구 동아리'},
              ]}
              style={{
                flexGrow: 0,
                width: '100%',
                height: '100%',
              }}
              numColumns={2}
              renderItem={items => {
                return (
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          marginHorizontal: 10,
                          marginBottom:
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
                          width={152}
                          height={152}></CommonTouchableOpacity>
                        <CommonText
                          textAlignC
                          fontSize={14}
                          color={'#1C1C1C'}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            marginBottom: 5,
                            textAlign: 'left',
                            width: 152,
                          }}>
                          {items.item?.name}
                        </CommonText>
                        <CommonText
                          textAlignC
                          fontSize={12}
                          color={'#666666'}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            marginBottom: 5,
                            textAlign: 'left',
                            width: 152,
                          }}>
                          {items.item?.name}
                        </CommonText>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          <View style={{width: '100%', paddingVertical: 20}}>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: Colors.c_gray200,
              }}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CommonText fontSize={18} color={'#1C1C1C'} paddingRight={10}>
                프로필
              </CommonText>
            </View>
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
  container: {
    flex: 1,
  },
  accordContainer: {
    height: 40,
    width: '100%',
  },
  accordHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: 'black',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
  },
  accordTitle: {
    fontSize: 20,
    color: '#666666',
  },
  accordBody: {
    padding: 12,
  },
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
});

export default SearchResultScreen;
