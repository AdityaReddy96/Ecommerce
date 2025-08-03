import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCartSlice = createAsyncThunk(
  "/cart/addToCartSlice",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/add`,
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);

export const getCartItemSlice = createAsyncThunk(
  "/cart/getCartItemSlice",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/get/${userId}`
    );
    return response.data;
  }
);

export const updateCartItemSlice = createAsyncThunk(
  "/cart/updateCartItemSlice",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);

export const deleteCartItemSlice = createAsyncThunk(
  "/cart/deleteCartItemSlice",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/${userId}/${productId}`
    );
    return response.data;
  }
);

const shoppinCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCartSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCartSlice.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(getCartItemSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItemSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(getCartItemSlice.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartItemSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartItemSlice.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItemSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItemSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItemSlice.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppinCartSlice.reducer;
