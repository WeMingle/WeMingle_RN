import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosPrivate} from '../../../api/Common';

interface Team {
  teamName: string;
  content?: string;
  teamImgUrl: string;
  recruitmentType?: string;
}

interface RecommendationState {
  teams: Record<string, Team>;
  univTeams: Record<string, Team>;
  recLoading: boolean;
  recError: string | null;
}

// 초기 상태
const initialState: RecommendationState = {
  teams: {},
  univTeams: {},
  recLoading: false,
  recError: null,
};

// 위밍글이 추천하는 그룹 API
export const fetchWemingleRecTeams = createAsyncThunk(
  'recommendation/fetchWemingleRecTeams',
  async () => {
    const response = await axiosPrivate.get('/teams/recommendation');
    return response.data.responseData;
  },
);

//사용자가 속한 대학교 그룹 API
export const fetchUnivRecTeams = createAsyncThunk(
  'recommendation/fetchUnivRecTeams',
  async () => {
    const response = await axiosPrivate.get('/teams/univ');
    return response.data.responseData;
  },
);

// createSlice 생성
const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWemingleRecTeams.pending, state => {
        state.recLoading = true;
        state.recError = null;
      })
      .addCase(fetchWemingleRecTeams.fulfilled, (state, action) => {
        state.recLoading = false;
        // console.log('위밍글이 추천하는 : ', action);
        state.teams = action.payload;
      })
      .addCase(fetchWemingleRecTeams.rejected, (state, action) => {
        state.recLoading = false;
        state.recError =
          action.error.message ??
          'Failed to fetch recommendation wemingle teams';
      })
      .addCase(fetchUnivRecTeams.pending, state => {
        state.recLoading = true;
        state.recError = null;
      })
      .addCase(fetchUnivRecTeams.fulfilled, (state, action) => {
        state.recLoading = false;
        state.univTeams = action.payload;
      })
      .addCase(fetchUnivRecTeams.rejected, (state, action) => {
        state.recLoading = false;
        state.recError =
          action.error.message ??
          'Failed to fetch recommendation university teams';
      });
  },
});

export default recommendationSlice.reducer;
