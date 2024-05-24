import axios from 'axios';
import {BASE_URL, axiosPrivate} from './Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/slice/TokenSlice';

// 이메일 로그인
export const signIn = async (payload: any) => {
  await axiosPrivate.post(`/member/signin`, payload).then(async response => {
    if (response.status === 200) {
    }
  });
};

// BLOB presignedUrl로 이미지 직접 업로드
export const uploadImageWithBLOB = (payload: any) => {
  const getBlob = async (fileUri: string) => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };

  const uploadImageNew = async (uploadUrl: string, data: any) => {
    const imageBody = await getBlob(data);

    return fetch(uploadUrl, {
      method: 'PUT',
      body: imageBody,
    });
  };

  uploadImageNew(payload.url, payload.image);
};

// 프로필 추가
export const AddProfile = async (payload: any) => {
  uploadImageWithBLOB(payload);

  const result = await axiosPrivate
    .post('member/profile', payload.nickName)
    .then(response => {
      if (response.status === 200) {
        return true;
      }
    })
    .catch(error => {
      if (error.response.status !== 200) {
        console.log(error);
        return false;
      }
    });

  return result;
};

// 닉네임 체크
export const checkNickName = async (payload: string) => {
  return await axiosPrivate
    .get(`/nickname/${payload}/availability`)
    .then(response => {
      if (response?.status === 200) {
        return true;
      }
    })
    .catch(error => {
      return false;
    });
};

// 이미지 업로드 링크 발급
export const getPresignedUrl = async () => {
  return await axiosPrivate
    .get('/img/member/profile/upload')
    .then(response => {
      if (response?.status === 200) {
        return response.data.responseData;
      }
    })
    .catch(error => {
      return false;
    });
};

// onboard sports
export const addOnboard = async (payload: string) => {
  return await axiosPrivate
    .post('/onboard', {selectedSport: payload})
    .then(response => {
      if (response?.status === 200) {
        console.log('asd');
        return response.data.responseData;
      }
    })
    .catch(e => console.log(e));
};

export const certificationEmail = async (payload: string) => {
  return await axiosPrivate
    .post('/mail', {univEmail: payload})
    .then(response => {
      if (response?.status === 200) {
        console.log('asd');
        return response.data.responseData;
      }
    })
    .catch(e => console.log(e));
};

export const checkEmailNumber = async (payload: any) => {
  return await axiosPrivate
    .post('/mail/verify', {
      univEmail: payload.email,
      verificationCode: payload.checkNum,
    })
    .then(response => {
      if (response?.status === 200) {
        return response.data.responseData;
      }
    })
    .catch(e => console.log(e));
};
