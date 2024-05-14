import axios from 'axios';
import {BASE_URL, axiosPrivate} from './Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/slice/TokenSlice';
import {useDispatch} from 'react-redux';

export const getMatchingWritableGroup = async () => {
  const result = await axiosPrivate
    .get('/team/profile/writable')
    .then(response => {
      if (response.status === 200) {
        return response.data?.responseData;
      }
    });
  return result;
};
