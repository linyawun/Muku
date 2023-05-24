import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  mainImg: {
    uploadMsg: '',
    uploadVal: '',
  },
  detailImg1: {
    uploadMsg: '',
    uploadVal: '',
  },
  detailImg2: {
    uploadMsg: '',
    uploadVal: '',
  },
  detailImg3: {
    uploadMsg: '',
    uploadVal: '',
  },
  detailImg4: {
    uploadMsg: '',
    uploadVal: '',
  },
  detailImg5: {
    uploadMsg: '',
    uploadVal: '',
  },
};

export const uploadImgSlice = createSlice({
  name: 'uploadImg',
  initialState,
  reducers: {
    setUploadVal(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key].uploadVal = action.payload[key];
      });
    },
    setUploadMsg(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key].uploadMsg = action.payload[key];
      });
    },
    resetUploadImg(state, action) {
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
