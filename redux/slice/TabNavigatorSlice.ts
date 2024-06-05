import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// 하단 탭 메뉴 상태
// currentTab 상태값에 따라 하이라이팅 되는 메뉴가 바뀜
const initialState = {
  currentTab: '', // Home, Matching, MyGroupo, MyPage
};

export const TabNavigatorSlice = createSlice({
  name: 'currentTab',
  initialState,
  reducers: {
    // 리듀서 선언
    setCurrentTab(state, action) {
      state.currentTab = action.payload.currentTab;
    },
  },
});

export const {setCurrentTab} = TabNavigatorSlice.actions;

export default TabNavigatorSlice.reducer;
