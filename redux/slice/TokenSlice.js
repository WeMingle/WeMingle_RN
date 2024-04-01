import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../api/Common';
import { create } from 'react-test-renderer';

const initialState = {
  accessToken: null,
  refreshToken: null,
};

// thunk api 요청 및 디스패치를 비동기식으로 처리하기 위한 함수
export const SignUpEmail = createAsyncThunk(
  'token/signUp',
  async (object, thunkAPI) => {
    try {
      return await axiosPrivate
        .post('/member/signup', object)
        .then(async response => {
          if (response.status !== 200) {
            return;
          }
          const token = {
            accessToken: response.data?.responseData.accessToken,
            refreshToken: response.data?.responseData.refreshToken,
          };
          await AsyncStorage.setItem('token', JSON.stringify(token));

          return token;
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const signInEmail = createAsyncThunk(
  'token/signIn',
  async (object, thunkAPI) => {
    try {
      return await axiosPrivate
        .post('/member/signin', object)
        .then(async response => {
          if (response.status !== 200) {
            return;
          }
          const token = {
            accessToken: response.data?.responseData.accessToken,
            refreshToken: response.data?.responseData.refreshToken,
          };
          await AsyncStorage.setItem('token', JSON.stringify(token));

          return token;
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const TokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    // 리듀서 선언
    setToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  // redux toolkit createAsyncThunk 사용 시 필요
  // builder.addCase()에서 fulfilled(성공), pendding(대기), rejected(실패)
  extraReducers: builder => {
    builder.addCase(SignUpEmail.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(signInEmail.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
  },
});

export const { setToken } = TokenSlice.actions;

export default TokenSlice.reducer;
