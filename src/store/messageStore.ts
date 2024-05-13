import { Dispatch } from '@reduxjs/toolkit';
import { createContext } from 'react';
// useContext 跨元件傳遞
export const MessageContext = createContext({});

type TMessageState = {
  type: string;
  title: string;
  text: string;
};

type TAction = {
  type: string;
  payload?: TMessageState;
};

type TResponse = {
  data: {
    message: string;
  };
};

type TCustomError = Error & {
  response?: {
    data?: {
      message: string | string[];
    };
  };
};

export const initState: TMessageState = {
  type: '',
  title: '',
  text: '',
};
// Reducer
export const messageReducer = (state: TMessageState, action: TAction) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      return {
        ...action.payload,
      };
    case 'CLEAR_MESSAGE':
      return {
        ...initState,
      };
    default:
      return state;
  }
};

export function handleSuccessMessage(
  dispatch: Dispatch<TAction>,
  res: TResponse
) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'success',
      title: '更新成功',
      text: res.data.message,
    },
  });
  setTimeout(() => {
    dispatch({
      type: 'CLEAR_MESSAGE',
    });
  }, 3000);
}
export function handleErrorMessage(
  dispatch: Dispatch<TAction>,
  error: TCustomError
) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'danger',
      title: '失敗',
      text: Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message.join('、')
        : error?.response?.data?.message || '',
    },
  });
  setTimeout(() => {
    dispatch({
      type: 'CLEAR_MESSAGE',
    });
  }, 3000);
}
