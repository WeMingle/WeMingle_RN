import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {axiosPrivate} from '../../../api/Common';

interface TeamInfo {
  createDate: string;
  teamMemberCnt: number;
  teamImgUrl: string;
  teamBackgroundImgUrl: string;
  teamName: string;
  teamRating: number;
  reviewCnt: number;
  content: string;
  isManager: boolean;
}

interface TeamCondition {
  beforeWriteInfo: boolean;
  univCondResult: boolean;
  genderCondResult: {
    gender: string;
    satisfiedGenderCond: boolean;
  };
  birthYearCondResult: {
    startAge: number;
    endAge: number;
    satisfiedBirthYearCond: boolean;
  };
  isTeamMember: boolean;
  isTeamRequest: boolean;
  isExceedCapacity: boolean;
}

interface TeamPost {
  title: string;
  content: string;
  nickname: string;
  createdTime: string;
  teamPostImgUrls: string[];
  postType: string;
  likeCnt: number;
  replyCnt: number;
  voteInfo?: {
    votePk: number;
    voteOptionInfos: {
      optionName: string;
      resultCnt: number;
    }[];
  };
  imgUrl: string;
  isBookmarked: boolean;
  isWriter: boolean;
}

interface TeamPosts {
  [key: number]: TeamPost;
}

interface TeamState {
  teamInfo: TeamInfo | null;
  teamCondition: TeamCondition | null;
  teamPosts: TeamPosts | null;
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  teamInfo: null,
  teamCondition: null,
  teamPosts: null,
  loading: false,
  error: null,
};

// Async thunks for API calls
export const fetchTeamInfo = createAsyncThunk<TeamInfo, number>(
  'team/fetchTeamInfo',
  async (teamId, {rejectWithValue}) => {
    try {
      const response = await axiosPrivate.get(`/team/${teamId}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch team info');
      }
      return response.data.responseData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchTeamCondition = createAsyncThunk<TeamCondition, number>(
  'team/fetchTeamCondition',
  async (teamId, {rejectWithValue}) => {
    try {
      const response = await axiosPrivate.get(`/team/${teamId}/condition`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch team condition');
      }
      return response.data.responseData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchTeamPosts = createAsyncThunk<
  TeamPosts,
  {teamId: number; isNotice: boolean; nextIdx?: number}
>(
  'team/fetchTeamPosts',
  async ({teamId, isNotice, nextIdx}, {rejectWithValue}) => {
    try {
      const response = await axiosPrivate.get(`/post/team/${teamId}`, {
        params: {isNotice, nextIdx},
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch team posts');
      }
      return response.data.responseData.teamPostsInfo;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchTeamSearchPosts = createAsyncThunk<
  TeamPosts,
  {nextIdx: number; query: string; teamPk: number}
>(
  'team/fetchTeamSearchPosts',
  async ({nextIdx, query, teamPk}, {rejectWithValue}) => {
    try {
      const response = await axiosPrivate.get(`/post/team/result`, {
        params: {nextIdx, query, teamPk},
      });
      if (response.status !== 200) {
        throw new Error('Failed to search team posts');
      }
      return response.data.responseData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const likeTeamPost = createAsyncThunk<void, {teamPostPk: number}>(
  'team/likeTeamPost',
  async ({teamPostPk}, {rejectWithValue}) => {
    try {
      const response = await axiosPrivate.post(`/post/team/like`, {teamPostPk});
      if (response.status !== 200) {
        throw new Error('Failed to like team post');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    clearState: state => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTeamInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTeamInfo.fulfilled,
        (state, action: PayloadAction<TeamInfo>) => {
          state.loading = false;
          state.teamInfo = action.payload;
        },
      )
      .addCase(fetchTeamInfo.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTeamCondition.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTeamCondition.fulfilled,
        (state, action: PayloadAction<TeamCondition>) => {
          state.loading = false;
          state.teamCondition = action.payload;
        },
      )
      .addCase(
        fetchTeamCondition.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(fetchTeamPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTeamPosts.fulfilled,
        (state, action: PayloadAction<TeamPosts>) => {
          state.loading = false;
          state.teamPosts = action.payload;
        },
      )
      .addCase(fetchTeamPosts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTeamSearchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTeamSearchPosts.fulfilled,
        (state, action: PayloadAction<TeamPosts>) => {
          state.loading = false;
          state.teamPosts = action.payload;
        },
      )
      .addCase(
        fetchTeamSearchPosts.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(likeTeamPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeTeamPost.fulfilled, state => {
        state.loading = false;
      })
      .addCase(likeTeamPost.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearState} = teamSlice.actions;

export default teamSlice.reducer;
