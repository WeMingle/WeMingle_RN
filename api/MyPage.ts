import axios from 'axios';
import {BASE_URL, axiosPrivate} from './Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/slice/TokenSlice';
import {useDispatch} from 'react-redux';

export const getMyGroupList = async () => {
  const result = await axiosPrivate
    .get('team/membership')
    .then(response => {
      if (response.status === 200) {
        return response.data.responseData;
      }
    })
    .catch(e => {
      return false;
    });

  return result;
};

export const getMyInfo = async () => {
  const result = await axiosPrivate
    .get('member/info')
    .then(response => {
      if (response.status === 200) {
        return response.data.responseData;
      }
    })
    .catch(e => {
      return false;
    });
  return result;
};
