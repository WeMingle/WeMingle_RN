import axios from 'axios';
import {BASE_URL, axiosPrivate} from './Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/slice/TokenSlice';

// 속한 그룹과 대학교 인증 유무 확인
export const checkUnivCertifyGroup = async () => {
  return await axiosPrivate
    .get('/teams/home/condition')
    .then(response => {
      if (response?.status === 200) {
        return true;
        // return response.data?.responseData;
      }
    })
    .catch(error => {
      return false;
    });
};

//위밍글이 추천하는 그룹 조회
export const wemingleRecGroup = async () => {
  return await axiosPrivate
    .get('/teams/recommendation')
    .then(response => {
      if (response?.status === 200) {
        return true;
      }
    })
    .catch(error => {
      return false;
    });
};

//사용자별 추천하는 그룹 조회
export const userRecGroup = async () => {
  return await axiosPrivate
    .get('/teams/recommendation/member')
    .then(response => {
      if (response?.status === 200) {
        return true;
      }
    })
    .catch(error => {
      return false;
    });
};

// 그룹 이름으로 그룹 검색
export const teamSearch = async (query: string) => {
  return await axiosPrivate
    .get(`/teams/result?query=${query}`)
    .then(response => {
      if (response?.status === 200) {
        return response.data?.responseData;
      }
    })
    .catch(error => {
      return false;
    });
};

//닉네임으로 사용자 검색
export const nicknameSearch = async (query: string) => {
  return await axiosPrivate
    .get(`/member/result?query=${query}`)
    .then(response => {
      if (response?.status === 200) {
        return response.data?.responseData;
      }
    })
    .catch(error => {
      return false;
    });
};

//사용자가 속한 대학교 그룹 조회
export const checkUnivGroup = async () => {
  return await axiosPrivate.get('/teams/univ').then(response => {
    if (response?.status === 200) {
      console.log('response : ', response);
      return response.data?.responseData;
    }
  });
};

//내가 속한 팀 내의 글 조회
export const readMyGroupPost = async () => {
  return await axiosPrivate.get('/post/teams').then(response => {
    if (response?.status === 200) {
      console.log('response : ', response);
      return response.data?.responseData;
    }
  });
};

//그룹 프로필 이미지 업로드
export const uploadProfileImage = async (teamImgUUID: any, image: any) => {
  console.log(teamImgUUID);
  return await axiosPrivate
    .get(`/images/teams/profile/upload/${teamImgUUID}`)
    .then(response => {
      if (response?.status === 200) {
        console.log('reponse 성공: ', response.data?.responseData);
        uploadImageWithBLOB({
          image: image,
          url: response.data?.responseData,
        });
        return response.data?.responseData;
      }
    })
    .catch(e => console.log(e));
};

//Blob 이미지 업로드
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
