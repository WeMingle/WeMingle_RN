import { combineReducers } from '@reduxjs/toolkit';
import SampleSlice from './slice/SampleSlice';
import TokenSlice from './slice/TokenSlice';

// 애플리케이션에서 목적에 따라 리듀서를 분리하여 관리 합니다.

const RootReducer = combineReducers({
  //이름: 슬라이스 이름
  sample: SampleSlice,
  token: TokenSlice
  // modal: ModalSlice,
});

export default RootReducer;
