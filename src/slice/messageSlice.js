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
          timerId: null, // 新增timerId屬性
        });
      } else {
        state.push({
          id: action.payload.id,
          type: 'danger',
          title: '錯誤',
          text: Array.isArray(action.payload?.message)
            ? action.payload?.message.join('、')
            : action.payload?.message,
          timerId: null, // 新增timerId屬性
        });
      }
    },
    removeMessage(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        clearTimeout(state[index].timerId); // 清除計時器
        state.splice(index, 1);
      }
    },
  },
});

export const createAsyncMessage = createAsyncThunk(
  'message/createAsyncMessage',
  async function (payload, { dispatch, requestId }) {
    const message = {
      ...payload,
      id: requestId,
      timerId: null, // 新增timerId屬性
    };
    dispatch(messageSlice.actions.createMessage(message));

    // 設定計時器並將timerId儲存在message物件中
    message.timerId = setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId));
    }, 3000);

    return message;
  }
);

export const { createMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;
