import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosPrivate} from '../../../api/Common';

const API_URL = '/teams/home/condition';

export const fetchUnivCertifyGroup = createAsyncThunk(
  'checkUnivCertifyGroup/fetchUnivCertifyGroup',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosPrivate.get(API_URL);
      // console.log('API Response:', response); // 응답 로그
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue('Failed to fetch team condition');
      }
    } catch ({error}: any) {
      // console.error('API Error:', error); // 오류 로그
      return rejectWithValue(error.message);
    }
  },
);

interface UnivCertifyGroupState {
  loading: boolean;
  error: string | null;
  responseData: {
    existMyTeam: boolean;
    univVerifiedMember: boolean;
  } | null;
}

const initialState: UnivCertifyGroupState = {
  loading: false,
  error: null,
  responseData: null,
};

const checkUnivCertifyGroupSlice = createSlice({
  name: 'checkUnivCertifyGroup',
  initialState,
  reducers: {
    getUnivCertifyGroup(state, action) {
      state.responseData = action.payload.responseData;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUnivCertifyGroup.pending, state => {
        state.loading = true;
        state.error = null;
        state.responseData = null;
      })
      .addCase(fetchUnivCertifyGroup.fulfilled, (state, action) => {
        // console.log('Action Payload:', action.payload); // 액션 페이로드 로그
        state.loading = false;
        state.responseData = action.payload.responseData; // action.payload.responseData 사용
      })
      .addCase(fetchUnivCertifyGroup.rejected, (state, action) => {
        // console.error('Rejected Action:', action); // 리젝션 액션 로그
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {getUnivCertifyGroup} = checkUnivCertifyGroupSlice.actions;

export default checkUnivCertifyGroupSlice.reducer;
