import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  sample: '',
  form: '',
};

export const SampleSlice = createSlice({
  name: 'templateUser',
  initialState,
  reducers: {
    // 리듀서 선언
    setSample(state, action) {
      state.sample = action.payload.sample;
      state.form = action.payload.form;
    },
  },
});

export const { setSample } = SampleSlice.actions;

export default SampleSlice.reducer;
