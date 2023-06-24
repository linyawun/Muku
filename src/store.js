import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slice/messageSlice';
import uploadImgReducer from './slice/uploadImgSlice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    uploadImg: uploadImgReducer,
  },
});
