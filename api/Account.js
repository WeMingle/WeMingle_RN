import axios from 'axios';
import { BASE_URL, axiosPrivate } from './Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../redux/slice/TokenSlice';

// 회원가입, 토큰 발행
export const SignUp = async (payload) => {
  return (async (dispatch) => {
    await axiosPrivate.post('member/signup', payload).then(async (response) => {
      if (response.status === 200) {
        const token = {
          accessToken: response.data?.responseData.accessToken,
          refreshToken: response.data?.responseData.refreshToken
        }
        await AsyncStorage.setItem('token', JSON.stringify(token));
        return dispatch(setToken(token));
      }
    }).catch(error => {
      if (!error.response.status === 200) {
        console.log(error);
        return;
      }
    })
  })

};

export const AddProfile = async (payload) => {
  await axiosPrivate.post('member/profile', payload).then(response => {
    if (response.status === 200) {
      return true;
    }
  }).catch(error => {
    if (!error.response.status === 200) {
      console.log(error);
      return false;
    }
  })

};

export const CheckNickName = async (payload) => {
  await axiosPrivate.get(`/nickname/nickname/availability:`).then(response => {
    console.log('response', response)
    if (response?.status === 200) {
      return true;
    }
  }).catch(error => {
    console.log(error)
    return false;
  });


};
