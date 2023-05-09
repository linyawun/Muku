import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAsyncCart = createAsyncThunk(
  'cart/getAsyncCart',
  async (payload, { dispatch }) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
    );
    return res.data.data;
    // try {
    //   const res = await axios.get(
    //     `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
    //   );
    //   //setCartData(res.data.data);
    // } catch (error) {
    //   console.log(error);
    // }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    loading: false,
    cart: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAsyncCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = payload;
      })
      .addCase(getAsyncCart.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      });
  },
});

export default cartSlice.reducer;
