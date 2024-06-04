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
  console.log(props);
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
