import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Account - 이현태
import SplashScreen from './SplashScreen';
import SignInScreen from './account/SignInScreen';
import SignUpScreen from './account/SignUpScreen';
import SignUpCompleteScreen from './account/SignUpCompleteScreen';
import OnboardingScreen from './account/OnBoardingScreen';
import CertificationSchoolScreen from './account/CertificationSchoolScreen';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/slice/TokenSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyPageScreen from './myPage/MyPageScreen';
import MyInfoScreen from './myPage/MyInfoScreen';
import MyProfileScreen from './myPage/MyProfileScreen';
import MatchingListScreen from './myPage/MatchingListScreen';

const RootScreen = () => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  const getToken = async () => {
    await AsyncStorage.getItem('token').then(response => {
      if (response) {
        dispatch(setToken(response))
      }
    })
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'MyPage'}>
        {RouterSetting.map((v, index) => {
          const ranNum = Math.random().toString(36).substr(2, 10);
          return (
            <Stack.Screen
              key={`${v.name}_${index}_${ranNum}`}
              name={v.name}
              component={v.component}
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
    name: 'MyPage',
    component: MyPageScreen
  },
  {
    name: 'MyInfo',
    component: MyInfoScreen
  },
  {
    name: 'MyProfile',
    component: MyProfileScreen
  },
  {
    name: 'MatchingList',
    component: MatchingListScreen
  }
];

export default RootScreen;
