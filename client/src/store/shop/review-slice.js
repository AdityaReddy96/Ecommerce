import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReviewsSlice = createAsyncThunk(
  "/order/addReviewsSlice",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/review/add`,
      formData
    );
    return response.data;
  }
);

export const getReviewsSlice = createAsyncThunk(
  "/order/getReviewsSlice",
  async (productId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/review/${productId}`
    );
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "shopReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviewsSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviewsSlice.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
