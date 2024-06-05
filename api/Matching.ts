import axios from 'axios';
import {BASE_URL, axiosPrivate} from './Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/slice/TokenSlice';
import {useDispatch} from 'react-redux';

export const getMatchingWritableGroup = async () => {
  const result = await axiosPrivate
    .get('/team/profile/writable?sportsType=SOCCER')
    .then(response => {
      if (response.status === 200) {
        // console.log('response.data?.responseData', response.data?.responseData);
        return response.data?.responseData;
      }
    });
  return result;
};

export const getPopularMatchingList = async () => {
  const result = await axiosPrivate
    .get('/post/match/popular/home')
    .then(response => {
      if (response.status === 200) {
        return response.data?.responseData;
      }
    });
  return result;
};

export const getRealTimePopularMatching = async () => {
  const result = await axiosPrivate.get('/team/popular').then(response => {
    if (response.status === 200) {
      return response.data?.responseData;
    }
  });
  return result;
};

export const getRecentMatchingList = async () => {
  const result = await axiosPrivate.get('/post/match').then(response => {
    if (response.status === 200) {
      return response.data?.responseData;
    }
  });
  return result;
};

export const getGroupMember = async () => {
  const result = await axiosPrivate.get('/member/team/1').then(response => {
    if (response.status === 200) {
      return response.data?.responseData;
    }
  });
  return result;
};

export const getGroupVote = async () => {
  const result = await axiosPrivate
    .get('/vote/completion?teamPk=1')
    .then(response => {
      if (response.status === 200) {
        return response.data?.responseData;
      }
    });
  return result;
};

export const postMatching = async (payload: any) => {
  const result = await axiosPrivate
    .post('./post/matching', payload)
    .then(response => {
      if (response.status === 200) {
        return true;
      }
    })
    .catch(e => console.log(e));

  return result;
};

export const getMatchingHistory = async (payload: any) => {
  const result = await axiosPrivate
    .post(
      `match/request/history?requestType=${payload.requestType}&recruiterType=${payload.recruiterType}&nextIdx=${payload.nextIdx}&excludeCompleteMatchesFilter=${payload.excludeCompleteMatchesFilter}`,
    )
    .then(response => {
      if (response.status === 200) {
        return response.data.responseData;
      }
    })
    .catch(e => {
      console.log(e);
    });

  return result;
};
