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
      console.log('getMyInfo', e);
      return false;
    });
  return result;
};

export const getMemberInfo = async () => {
  const result = await axiosPrivate
    .get('member/authentication')
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

export const getScrap = async () => {
  const result = await axiosPrivate
    .get(`bookmark/my?excludeExpired=false`)
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

export const modifyMyProfile = async (props: any) => {
  const result = await axiosPrivate
    .patch('member/info', props)
    .then(response => {
      if (response.status === 200) {
        // console.log('scc');
        return true;
      }
    })
    .catch(e => {
      return false;
    });
  return result;
};

export const getMatchingSummary = async () => {
  const result = await axiosPrivate.get('/match/summary').then(response => {
    if (response.status === 200) {
      return response.data.responseData;
    }
  });

  return result;
};

export const getProfileImageLink = async (payload: any) => {
  console.log(payload);
  const result = await axiosPrivate
    .get(`/img/member/profile/${payload}`)
    .then(response => {
      if (response.status === 200) {
        return response.data.responseData;
      }
    })
    .catch(e => {
      console.log('getProfileImageLink', e);
    });

  return result;
};
