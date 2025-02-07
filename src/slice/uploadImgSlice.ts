import { TImageState, TUploadImgState } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
const createImageState = (): TImageState => ({
  uploadMsg: '',
  uploadVal: '',
});

const initialState: TUploadImgState = {
  mainImg: createImageState(),
  detailImg1: createImageState(),
  detailImg2: createImageState(),
  detailImg3: createImageState(),
  detailImg4: createImageState(),
  detailImg5: createImageState(),
};

export const uploadImgSlice = createSlice({
  name: 'uploadImg',
  initialState,
  reducers: {
    setUploadVal(state, action: PayloadAction<Partial<TUploadImgState>>) {
      Object.keys(action.payload).forEach((key) => {
        state[key as keyof TUploadImgState].uploadVal =
          action.payload[key as keyof TUploadImgState]?.uploadVal || '';
      });
    },
    setUploadMsg(state, action: PayloadAction<Partial<TUploadImgState>>) {
      Object.keys(action.payload).forEach((key) => {
        const stateKey = key as keyof TUploadImgState;
        if (state[stateKey]) {
          state[stateKey].uploadMsg = action.payload[stateKey]?.uploadMsg || '';
        }
      });
    },
    resetUploadImg() {
      return initialState;
    },
  },
});
//匯出給其他元件使用
// export const createAsyncMessage = createAsyncThunk(
//   'message/createAsyncMessage',
//   async function (payload, { dispatch, requestId }) {
//     dispatch(
//       uploadImgSlice.actions.createMessage({
//         ...payload,
//         id: requestId,
//       })
//     );
//     setTimeout(() => {
//       dispatch(uploadImgSlice.actions.removeMessage(requestId));
//     }, 3000);
//   }
// );

export const { setUploadVal, setUploadMsg, resetUploadImg } =
  uploadImgSlice.actions;
export default uploadImgSlice.reducer;
