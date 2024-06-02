import {
  AccountButton,
  BaseSafeView,
  BorderBox,
  BorderBoxButton,
  CommonImage,
  CommonText,
  Container,
  RowBox,
  ScreenHeight,
  ScreenWidth,
  VerticalBar,
} from '../CommonStyled.style';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {CommonHeaderBlack} from '../../component/header/CommonHeader';
import NaverMapView from 'react-native-nmap';
import {Colors} from '../../assets/color/Colors';
import {KeyboardAvoidingView, TextInput} from 'react-native';

import Location_Icon from '../../assets/location.png';
import Search from '../../assets/search.png';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const MatchingGetLocationScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <BaseSafeView>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{flex: 1}}>
        <CommonHeaderBlack headerTitle="지역" />
        <NaverMapView
          center={{
            latitude: 37.50497126,
            longitude: 127.04905021,
          }}
          showsMyLocationButton={false}
          zoomControl={false}
          style={{
            width: '100%',
            height: '45%',
          }}>
          {/* Not Working in iOS Old Architecture Yet */}
        </NaverMapView>
        <Container
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            bottom: 20,
          }}>
          <RowBox alignC justify={'space-between'}>
            <CommonText bold fontSize={16}>
              위치 검색
            </CommonText>
            <RowBox alignC>
              <CommonImage source={Location_Icon} width={12} height={12} />
              <CommonText marginL={5} color={Colors.c_gray700}>
                현재 위치로 설정
              </CommonText>
            </RowBox>
          </RowBox>
          <VerticalBar />
          <RowBox marginT={20}>
            <BorderBoxButton width={60}>
              <CommonText>선택</CommonText>
            </BorderBoxButton>
            <BorderBox marginL={8} padding={0} row alignC>
              <TextInput
                style={{
                  paddingLeft: 15,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingRight: 25,
                  height: 20,
                  width: ScreenWidth - 40 - 60 - 8 - 16,
                  color: '#212121',
                }}
              />
              <CommonImage
                source={Search}
                width={14}
                height={14}
                style={{right: 10}}
              />
            </BorderBox>
          </RowBox>
        </Container>
        <AccountButton
          style={{
            bottom: 20,
            alignSelf: 'center',
            width: ScreenWidth - 40,
            marginTop: 20,
          }}
          onPress={() => {}}
          bgColor={'#212121'}>
          <CommonText color={'#fff'}>적용</CommonText>
        </AccountButton>
      </KeyboardAwareScrollView>
    </BaseSafeView>
  );
};

export default MatchingGetLocationScreen;
