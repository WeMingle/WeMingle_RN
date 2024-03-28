import axios from "axios";
import { useSelector } from "react-redux";
import { useAppSelector, useGetToken } from "../component/hook/useAction";
import { Store } from "../redux/Store";

export const BASE_URL = 'http://49.172.40.78:8080//img/member/profile/upload';

export const axiosPrivate = axios.create({
  baseURL: 'http://49.172.40.78:8080',
  headers: {
    "accept": 'application/json',
    "Content-Type": 'application/json',
  },
  responseType: "json",
});

// 발급된 토큰이 있다면 인증 헤더를 추가해서 요청
axiosPrivate.interceptors.request.use((config) => {
  const token = Store.getState()?.token.accessToken;
  if (token)
    config.headers.Authorization = `Bearer ${token}`

  console.log(token)
  return config
})
