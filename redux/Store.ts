import {configureStore, Middleware} from '@reduxjs/toolkit';
import RootReducer from './Reducers';
import {useDispatch} from 'react-redux';
import {buildGetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import logger from 'redux-logger';

/**
 * 애플리케이션의 '상태'를 관리하기 위한 Store 구성
 */

export const Store = configureStore({
  // combined된 여러개의 리듀서를 store에 저장합니다.
  reducer: RootReducer,

  // logger: 로그
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),

  middleware: buildGetDefaultMiddleware =>
    buildGetDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type AppDispatch = typeof Store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
