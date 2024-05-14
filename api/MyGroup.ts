import axios from 'axios';
import {BASE_URL, axiosPrivate} from './Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/slice/TokenSlice';

// 속한 그룹과 대학교 인증 유무 확인
export const checkUniversityAndGroup = async () => {
  return await axiosPrivate
    .get('/team/home/condition')
    .then(response => {
      if (response?.status === 200) {
        return true;
      }
    })
    .catch(error => {
      return false;
    });
};

//사용자가 속한 대학교 그룹 조회
export const checkUniversityGroup = async () => {
  return await axiosPrivate
    .get('/team/univ')
    .then(response => {
      if (response?.status === 200) {
        return true;
      }
    })
    .catch(error => {
      return false;
    });
};

//위밍글이 추천하는 그룹 조회
export const wemingleGroup = async () => {
  return await axiosPrivate
    .get('/team/recommendation')
    .then(response => {
      if (response?.status === 200) {
        return true;
      }
    })
    .catch(error => {
      return false;
    });
};

// 검색
export const Search = async (query: string) => {
  return await axiosPrivate
    .get(`/team/result?query=${query}`)
    .then(response => {
      if (response?.status === 200) {
        return true;
      }
    })
    .catch(error => {
      return false;
    });
};
