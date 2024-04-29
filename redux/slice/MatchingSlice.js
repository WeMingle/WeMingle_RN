import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../api/Common';

const initialState = {
  matchingList: {},
  nextUrl: '',
};

export const test = () => {
  console.log('asd')
}

export const getMatchingList = createAsyncThunk(
  'get/matching',
  async (Object, thunkAPI) => {
    try {
      const { sortOption, dateFilter, recruitmentType, sportsType } = Object
      console.log(`/post/match/calendar?sortOption=${sortOption}&dateFilter=${dateFilter}&recruitmentType=${recruitmentType}&sportsType=${sportsType}`)
      return await axiosPrivate
        .get(`/post/match/calendar?sortOption=${sortOption}&dateFilter=${dateFilter}&recruitmentType=${recruitmentType}&sportsType=${sportsType}`)
        .then(async response => {
          if (response.status === 200) {
            const result = {
              matchingList: response.data.responseData['post list'],
              nextUrl: response.data.responseData['next url']
            }
            return result
          }
        })
        .catch(error => {
          if (error.response.status !== 200) {
            console.log('error', error);
            return;
          }
        });
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const MatchingSlice = createSlice({
  name: 'matching',
  initialState,
  reducers: {
    // 리듀서 선언
    getMatching(state, action) {
      state.matchingList = action.payload.matchingList;
      state.nextUrl = action.payload.nextUrl;
    },
    extraReducers: builder => {
      builder.addCase(getMatchingList.fulfilled, (state, action) => {
        state.matchingList = action.payload.matchingList;
        state.nextUrl = action.payload.nextUrl;
      });

    },
  },
});

export const { getMatching } = MatchingSlice.actions;

export default MatchingSlice.reducer;
