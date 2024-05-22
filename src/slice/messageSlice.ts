import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TMessage } from '@/types';

type TMessageState = TMessage[];

type TCreateMessagePayload = {
  success: boolean;
  message: string;
};

type TMessageWithId = TCreateMessagePayload & {
  id: string;
  timerId: NodeJS.Timeout | null;
};

const initialState: TMessageState = [];

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    createMessage(state, action: PayloadAction<TMessageWithId>) {
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
    removeMessage(state, action: PayloadAction<string>) {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        const message = state[index];
        if (message) {
          const timerId = message.timerId;
          if (timerId !== null) {
            clearTimeout(timerId); // 只在 `timerId` 非 `null` 時清除計時器
          } // 清除計時器
          state.splice(index, 1);
        }
      }
    },
  },
});

export const createAsyncMessage = createAsyncThunk<
  TMessageWithId,
  TCreateMessagePayload,
  {}
>('message/createAsyncMessage', function (payload, { dispatch, requestId }) {
  const message = {
    ...payload,
    id: requestId,
    timerId: null,
  };
  dispatch(messageSlice.actions.createMessage(message));

  const timerId = setTimeout(() => {
    dispatch(messageSlice.actions.removeMessage(message.id));
  }, 3000);

  return {
    ...message,
    timerId,
  };
});

export const { createMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;
