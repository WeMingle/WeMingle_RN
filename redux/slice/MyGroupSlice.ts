import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosPrivate} from '../../api/Common';

export const MyGroupSlice = createSlice({
  name: 'myGroup',
  initialState: {
    value: {
      responseMessage: '',
      responseData: {},
    },
  },
  reducers: {
    MyGroup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default MyGroupSlice.reducer;

export const {MyGroup} = MyGroupSlice.actions;
