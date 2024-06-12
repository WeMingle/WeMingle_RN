import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {axiosPrivate} from '../../../api/Common';

interface TeamData {
  teamName: string;
  content: string;
  teamImgId: string;
  sportsType: string;
  recruitmentType: string;
  onlySameUniv: boolean;
  ageIsIrrelevant: boolean;
  startAge: number;
  endAge: number;
  genderIsIrrelevant: boolean;
  gender: string;
  personnelLimitIrrelevant: boolean;
  personnelLimit: number;
  freeQuestionList: string[];
}

interface TeamResponse {
  responseMessage: string;
  responseData: null;
}

interface TeamState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

// 초기 상태
const initialState: TeamState = {
  loading: false,
  error: null,
  successMessage: null,
};

// 새 그룹 생성 API
export const fetchCreateNewGroup = createAsyncThunk<TeamResponse, TeamData>(
  'createNewGroup/fetchCreateNewGroup',
  async (teamData, {rejectWithValue}) => {
    try {
      const response = await axiosPrivate.post('/teams', teamData);
      if (response.status !== 200) {
        throw new Error('Failed to create team');
      }
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error.message);
    }
  },
);

// createSlice 생성
const createNewGroupSlice = createSlice({
  name: 'createNewGroup',
  initialState,
  reducers: {
    clearState: state => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCreateNewGroup.pending, state => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(
        fetchCreateNewGroup.fulfilled,
        (state, action: PayloadAction<TeamResponse>) => {
          state.loading = false;
          state.successMessage = action.payload.responseMessage;
        },
      )
      .addCase(
        fetchCreateNewGroup.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {clearState} = createNewGroupSlice.actions;

export default createNewGroupSlice.reducer;
