import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slice/messageSlice';
import uploadImgReducer from './slice/uploadImgSlice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    uploadImg: uploadImgReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
