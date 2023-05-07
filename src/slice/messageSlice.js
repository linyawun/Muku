import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: [],
  reducers: {
    createMessage(state, action) {
      if (action.payload.success) {
        state.push({
          id: action.payload.id,
          type: 'success',
          title: '成功',
          text: action.payload.message,
        });
      } else {
        state.push({
          id: action.payload.id,
          type: 'danger',
          title: '錯誤',
          text: Array.isArray(action.payload?.message)
            ? action.payload?.message.join('、')
            : action.payload?.message,
        });
      }
    },
    removeMessage(state, action) {
      console.log('removeMessage', action.payload);
      const index = state.findIndex((item) => item === action.payload);
      state.splice(index, 1);
    },
  },
});
//匯出給其他元件使用
export const createAsyncMessage = createAsyncThunk(
  'message/createAsyncMessage',
  async function (payload, { dispatch, requestId }) {
    dispatch(
      messageSlice.actions.createMessage({
        ...payload,
        id: requestId,
      })
    );
    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId));
    }, 3000);
  }
);
export const { createMessage } = messageSlice.actions;
export default messageSlice.reducer;
