import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const getAsyncCart = createAsyncThunk(
//   'cart/getAsyncCart',
//   async (payload, { dispatch }) => {
//     try {
//       const res = await axios.get(
//         `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
//       );
//       //setCartData(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {},
});

export default cartSlice.reducer;
