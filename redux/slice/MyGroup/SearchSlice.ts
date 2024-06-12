import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosPrivate} from '../../../api/Common';

interface Search {
  teamName?: string;
  content?: string;
  teamImgUrl?: string;
  recruitmentType?: string;
  nickname?: string;
  profileImg?: string;
  isMe?: boolean;
}

interface SearchState {
  teamSearch: Record<any, Search>;
  memberSearch: Record<any, Search>;
  memberTeams: Record<string, Search>;
  //   search: boolean;
  loading: boolean;
  error: string | null;
}

//초기 상태
const initialState: SearchState = {
  teamSearch: {},
  memberSearch: {},
  memberTeams: {},
  //   search: false,
  loading: false,
  error: null,
};

// 그룹 검색 API
export const fetchTeamSearch = createAsyncThunk(
  'search/fetchTeamSearch',
  async (query: string) => {
    const response = await axiosPrivate.get(`/teams/result?query=${query}`);
    return response.data.responseData;
  },
);

// 사용자 검색 API
export const fetchMemberSearch = createAsyncThunk(
  'search/fetchMemberSearh',
  async (query: string) => {
    const response = await axiosPrivate.get(`/members/result?query=${query}`);
    return response.data.responseData;
  },
);

// 사용자별 추천하는 그룹 API
export const fetchMemberRecTeams = createAsyncThunk(
  'search/fetchMemberRecTeams',
  async () => {
    const response = await axiosPrivate.get('/teams/recommendation/members');
    return response.data.responseData;
  },
);

//createSlice 생성
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTeamSearch.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamSearch.fulfilled, (state, action) => {
        state.loading = false;
        // state.search = true;
        state.teamSearch = action.payload;
      })
      .addCase(fetchTeamSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to search team';
      })
      .addCase(fetchMemberSearch.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemberSearch.fulfilled, (state, action) => {
        state.loading = false;
        // state.search = true;
        state.memberSearch = action.payload;
      })
      .addCase(fetchMemberSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to search member';
      })
      .addCase(fetchMemberRecTeams.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemberRecTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.memberTeams = action.payload;
      })
      .addCase(fetchMemberRecTeams.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Failed to recommend the right team for you';
      });
  },
});

export default searchSlice.reducer;
