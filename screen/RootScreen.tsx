import React, {useEffect} from 'react';
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Account - 이현태
import SplashScreen from './SplashScreen';
import SignInScreen from './account/SignInScreen';
import SignUpScreen from './account/SignUpScreen';
import SignUpCompleteScreen from './account/SignUpCompleteScreen';
import OnboardingScreen from './account/OnBoardingScreen';
import CertificationSchoolScreen from './account/CertificationSchoolScreen';
import {useDispatch} from 'react-redux';
import {setToken} from '../redux/slice/TokenSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyPageScreen from './myPage/MyPageScreen';
import MyInfoScreen from './myPage/MyInfoScreen';
import MyProfileScreen from './myPage/MyProfileScreen';
import MatchingListScreen from './myPage/MatchingListScreen';
import MatchingScreen from './matching/MatchingScreen';
import MatchingWriteScreen from './matching/MatchingWriteScreen';
import {BackHandler, Platform, View} from 'react-native';
import {BottomTabView} from '../component/BottomTab';
import MatchingDateSelectScreen from './matching/MatchingDateSelectScreen';
import {showToastMessage} from '../component/Toast';
import Component from 'react-native-paper/lib/typescript/components/List/ListItem';
import ScrapListScreen from './myPage/ScrapListScreen';

// Jeon
import MyGroupScreen from './myGroup/MyGroupScreen';
import MyGroupScreen2 from './myGroup/MyGroupScreen2';
import MyGroupSearchScreen from './myGroup/MyGroupSearchScreen';

import {
  PERMISSIONS,
  request,
  requestLocationAccuracy,
  requestMultiple,
} from 'react-native-permissions';

let count = 0; //  종료카운트

const RootScreen = () => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  const getToken = async () => {
    await AsyncStorage.getItem('token').then(response => {
      if (response) {
        dispatch(setToken(response));
      }
    });
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(status => {
        console.log(`Location request status: ${status}`);
        if (status === 'granted') {
          requestLocationAccuracy({
            purposeKey: 'common-purpose', // replace your purposeKey of Info.plist
          })
            .then(accuracy => {
              console.log(`Location accuracy is: ${accuracy}`);
            })
            .catch(e => {
              console.error(`Location accuracy request has been failed: ${e}`);
            });
        }
      });
    }
    if (Platform.OS === 'android') {
      requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      ])
        .then(status => {
          console.log(`Location request status: ${status}`);
        })
        .catch(e => {
          console.error(`Location request has been failed: ${e}`);
        });
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Matching'}>
        {RouterSetting.map((v, index) => {
          const ranNum = Math.random().toString(36).substr(2, 10);
          return (
            <Stack.Screen
              key={`${v.name}_${index}_${ranNum}`}
              name={v.name}
              component={withScrollView(v.component)}
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
            />
          );
        })}
        {TabRouterSetting.map((v, index) => {
          const ranNum = Math.random().toString(36).substr(2, 10);
          return (
            <Stack.Screen
              key={`${v.name}_${index}_${ranNum}`}
              name={v.name}
              component={withScrollView(v.component, true)}
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const withScrollView = (WrappedComponent: React.FC, isTab = false) => {
  return (props: any) => {
    const isFocus = useIsFocused();
    const navigation = useNavigation();

    const onBackPress = () => {
      if (count < 1) {
        count++;
        //ToastAndroid.show('한번더 뒤로가기를 누르면 앱이 종료됩니다.', ToastAndroid.SHORT);
        showToastMessage('뒤로가기를 한번 더 누르면 앱이 종료됩니다.', 1500);
      } else {
        BackHandler.exitApp();
      }
      setTimeout(() => {
        count = 0;
      }, 1500);

      return true;
    };
    useEffect(() => {
      if (!navigation?.canGoBack() && isFocus) {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
      }

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [isFocus]);

    return (
      <>
        <View style={{flex: 1}}>
          <WrappedComponent {...props}></WrappedComponent>
          {isTab && <BottomTabView />}
        </View>
      </>
    );
  };
};

const RouterSetting = [
  {
    name: 'Splash',
    component: SplashScreen,
  },
  {
    name: 'SignIn',
    component: SignInScreen,
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
  },
  {
    name: 'SignUpComplete',
    component: SignUpCompleteScreen,
  },
  {
    name: 'Onboarding',
    component: OnboardingScreen,
  },
  {
    name: 'CertificationSchool',
    component: CertificationSchoolScreen,
  },
];

const TabRouterSetting = [
  {
    name: 'MyPage',
    component: MyPageScreen,
  },
  {
    name: 'MyInfo',
    component: MyInfoScreen,
  },
  {
    name: 'MyProfile',
    component: MyProfileScreen,
  },
  {
    name: 'MyGroup',
    component: MyGroupScreen,
  },
  {
    name: 'MyGroup2',
    component: MyGroupScreen2,
  },
  {
    name: 'MyGroupSearch',
    component: MyGroupSearchScreen,
  },
  {
    name: 'MatchingList',
    component: MatchingListScreen,
  },
  {
    name: 'Matching',
    component: MatchingScreen,
  },
  {
    name: 'MatchingWrite',
    component: MatchingWriteScreen,
  },
  {
    name: 'MatchingDateSelect',
    component: MatchingDateSelectScreen,
  },
  {
    name: 'ScrapList',
    component: ScrapListScreen,
  },
];

export default RootScreen;
