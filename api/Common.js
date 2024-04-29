import axios from 'axios';
import { Store } from '../redux/Store';

export const BASE_URL = 'http://49.172.40.78:8080';

export const axiosPrivate = axios.create({
  baseURL: 'http://49.172.40.78:8080',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

// 발급된 토큰이 있다면 인증 헤더를 추가해서 요청
axiosPrivate.interceptors.request.use(config => {
  const token = Store.getState()?.token.accessToken;
  config.headers.Authorization =
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0aHJ1c3VtMTIzQGdtYWlsLmNvbSIsImlhdCI6MTcxMTk4MzA4NiwiZXhwIjo0ODIyMzgzMDg2LCJzdWIiOiJXZU1pbmdsZSIsImlkIjoibWVtYmVySWQwIiwicm9sZSI6IlJPTEVfQURNSU4ifQ.OkVWQpb-w4r5GtIYXufXU9kLs4KSnG26olvVuqydlcw`;

  return config;
});
