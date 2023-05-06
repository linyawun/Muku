import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: [],
  reducers: {
    createMessage(state, action) {
      const id = new Date().getTime();
      state.push({
        id,
        type: 'success',
        title: '成功',
        text: action.payload.message,
      });
      // setTimeout(() => {
      //   const index = state.findIndex((item) => item === item.id);
      //   state.splice(index, 1);
      // }, 2000);
    },
    removeMessage(state, action) {
      const index = state.findIndex((item) => item === action.payload);
      state.splice(index, 1);
    },
  },
});
//匯出給其他元件使用
export const createAsyncMessage = createAsyncThunk(
  'message/createAsyncMessage',
  async function () {}
);
export const { createMessage } = messageSlice.actions;
export default messageSlice.reducer;
