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
import ScrapListScreen from './myPage/ScrapListScreen';
import HomeScreen from './home/HomeScreen';

//MyGroup - 전하윤
import MyGroupDefaultScreen from './myGroup/MyGroupDefaultScreen';
import MyGroupScreen from './myGroup/MyGroupScreen';
import MyGroupSearchScreen from './myGroup/MyGroupSearchScreen';
import SearchResultScreen from './myGroup/SearchResultScreen';
import SearchProfileScreen from './myGroup/SearchProfileScreen';
import GroupPageScreen from './myGroup/GroupPageScreen';
import GroupChattingPageScreen from './myGroup/GroupChattingPageScreen';
import GroupMemberPageScreen from './myGroup/GroupMemberPageScreen';

import {
  PERMISSIONS,
  request,
  requestLocationAccuracy,
  requestMultiple,
} from 'react-native-permissions';
import AlertModal from '../component/modal/AlertModal';
import AllPostScreen from './myPage/AllPostScreen';
import Component from 'react-native-paper/lib/typescript/components/List/ListItem';
import MatchingSearchScreen from './matching/MatchingSearchScreen';

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
        if (status === 'granted') {
          requestLocationAccuracy({
            purposeKey: 'common-purpose', // replace your purposeKey of Info.plist
          })
            .then(accuracy => {})
            .catch(e => {});
        }
      });
    }
    if (Platform.OS === 'android') {
      requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      ])
        .then(status => {})
        .catch(e => {
          // console.error(`Location request has been failed: ${e}`);
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
                presentation: v.presentation && v.presentation,
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
        showToastMessage(
          '뒤로가기를 한번 더 누르면 앱이 종료됩니다.',
          1500,
          'bottom',
        );
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
  {
    name: 'AlertModal',
    component: AlertModal,
    presentation: 'transparentModal',
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
    name: 'MyGroupDefault',
    component: MyGroupDefaultScreen,
  },
  {
    name: 'MyGroup',
    component: MyGroupScreen,
  },
  {
    name: 'MyGroupSearch',
    component: MyGroupSearchScreen,
  },
  {
    name: 'SearchResult',
    component: SearchResultScreen,
  },
  {
    name: 'SearchProfile',
    component: SearchProfileScreen,
  },
  {
    name: 'GroupPage',
    component: GroupPageScreen,
  },
  {
    name: 'GroupChatting',
    component: GroupChattingPageScreen,
  },
  {
    name: 'GroupMember',
    component: GroupMemberPageScreen,
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
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'AllPost',
    component: AllPostScreen,
  },
  {
    name: 'MatchingSearch',
    component: MatchingSearchScreen,
  },
];

export default RootScreen;
