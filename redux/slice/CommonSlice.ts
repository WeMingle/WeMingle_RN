import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  locationArray: [
    '서울',
    '경기',
    '인천',
    '부산',
    '대전',
    '대구',
    '울산',
    '세종',
    '광주',
    '강원',
    '충북',
    '충남',
    '경북',
    '경남',
    '전북',
    '전남',
    '제주',
  ],
};

export const SampleSlice = createSlice({
  name: 'templateUser',
  initialState,
  reducers: {
    // 리듀서 선언
  },
});

// export const {setSample} = SampleSlice.actions;

export default SampleSlice.reducer;
