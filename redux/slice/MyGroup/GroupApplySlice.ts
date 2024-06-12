import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {axiosPrivate} from '../../../api/Common';

// response data에 대한 유형 정의
interface TeamRequestPageData {
  imgUrl: string;
  matchingCnt: number;
  nickname: string;
  univName: string;
  gender: string;
  ability: string | null;
  majorArea: string | null;
  age: string;
  reportCnt: number;
  teamQuestionnaires: Record<string, string>;
}

interface TeamJoinRequest {
  teamPk: number;
  nickname: string;
  profilePicId: string;
  answers: Record<string, string>;
}

// 초기 상태 정의
interface TeamState {
  requestPageData: TeamRequestPageData | null;
  nicknameAvailable: boolean | null;
  profileUploadUrl: string | null;
  joinRequestStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TeamState = {
  requestPageData: null,
  nicknameAvailable: null,
  profileUploadUrl: null,
  joinRequestStatus: 'idle',
  status: 'idle',
  error: null,
};

// 그룹 신청 화면에 필요한 데이터 조회
export const fetchTeamRequestPageData = createAsyncThunk(
  'groupApply/fetchTeamRequestPageData',
  async (teamId: number) => {
    const response = await axiosPrivate.get<{
      responseMessage: string;
      responseData: TeamRequestPageData;
    }>(`/teams/${teamId}/request/members/info`);
    return response.data.responseData;
  },
);

// 그룹에 가입 신청
export const joinTeamRequest = createAsyncThunk(
  'groupApply/joinTeamRequest',
  async (joinRequest: TeamJoinRequest) => {
    const response = await axiosPrivate.post<{
      responseMessage: string;
      responseData: null;
    }>('/teams/request', joinRequest);
    return response.data.responseMessage;
  },
);

// 팀 내에 사용 가능한 닉네임인지 확인
export const checkNicknameAvailability = createAsyncThunk(
  'groupApply/checkNicknameAvailability',
  async ({teamId, nickname}: {teamId: number; nickname: string}) => {
    const response = await axiosPrivate.get<{
      responseMessage: string;
      responseData: null;
    }>(`/nickname/teams/${teamId}/members/${nickname}/available`);
    return response.data.responseMessage;
  },
);

// 그룹 멤버 신청 때 프로필 링크 발급
export const fetchProfileUploadUrl = createAsyncThunk(
  'groupApply/fetchProfileUploadUrl',
  async (profileId: string) => {
    const response = await axiosPrivate.get<{
      responseMessage: string;
      responseData: string;
    }>(`/Images/teams/request/profile/upload/${profileId}/jpg`);
    return response.data.responseData;
  },
);

// slice 생성
const groupApplySlice = createSlice({
  name: 'groupApply',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTeamRequestPageData.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchTeamRequestPageData.fulfilled,
        (state, action: PayloadAction<TeamRequestPageData>) => {
          state.status = 'succeeded';
          state.requestPageData = action.payload;
        },
      )
      .addCase(fetchTeamRequestPageData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(joinTeamRequest.pending, state => {
        state.joinRequestStatus = 'loading';
      })
      .addCase(joinTeamRequest.fulfilled, state => {
        state.joinRequestStatus = 'succeeded';
      })
      .addCase(joinTeamRequest.rejected, (state, action) => {
        state.joinRequestStatus = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(checkNicknameAvailability.pending, state => {
        state.status = 'loading';
      })
      .addCase(checkNicknameAvailability.fulfilled, state => {
        state.status = 'succeeded';
        state.nicknameAvailable = true;
      })
      .addCase(checkNicknameAvailability.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
        state.nicknameAvailable = false;
      })
      .addCase(fetchProfileUploadUrl.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchProfileUploadUrl.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          state.profileUploadUrl = action.payload;
        },
      )
      .addCase(fetchProfileUploadUrl.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default groupApplySlice.reducer;
