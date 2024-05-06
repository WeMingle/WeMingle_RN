import axios from 'axios';
import {BASE_URL, axiosPrivate} from './Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/slice/TokenSlice';

// 회원가입, 토큰 발행
// thunk 사용으로 인해 사용X
// export const SignUp = async payload => {
//   await axiosPrivate
//     .post(`/member/signup`, payload)
//     .then(async response => {
//       if (response.status === 200) {
//         const token = {
//           accessToken: response.data?.responseData.accessToken,
//           refreshToken: response.data?.responseData.refreshToken,
//         };
//         await AsyncStorage.setItem('token', JSON.stringify(token));
//         return dispatch(setToken(token));
//       }
//     })
//     .catch(error => {
//       if (!error.response.status === 200) {
//         console.log(error);
//         return;
//       }
//     });
// };

// 이메일 로그인
export const signIn = async (payload: any) => {
  await axiosPrivate.post(`/member/signin`, payload).then(async response => {
    if (response.status === 200) {
    }
  });
};

// 프로필 추가
export const AddProfile = async (payload: any) => {
  const getBlob = async (fileUri: string) => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };

  const uploadImageNew = async (uploadUrl: string, data: any) => {
    console.log(uploadUrl);
    const imageBody = await getBlob(data);

    return fetch(uploadUrl, {
      method: 'PUT',
      body: imageBody,
    });
  };

  uploadImageNew(payload.url, payload.image);

  // const image = await getBlob(payload.image);
  // await axios
  //   .put(payload.url, image, {
  //     'Content-Type': 'image/jpeg',
  //   })
  //   .then(response => {
  //     return true;
  //   })
  //   .catch(e => {
  //     console.log(e);
  //     return false;
  //   });

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
