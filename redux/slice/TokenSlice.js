import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  refreshToken: '',
};

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
});

export const { setToken } = TokenSlice.actions;

export default TokenSlice.reducer;
