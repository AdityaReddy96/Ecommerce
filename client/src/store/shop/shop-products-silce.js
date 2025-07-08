import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const getFilteredProducts = createAsyncThunk(
  "/products/getFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(
      `http://localhost:8000/api/shop/products/get?${query}`
    );
    return result?.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "/products/getProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:8000/api/shop/products/get/${id}`
    );
    return result?.data;
  }
);

const shopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {  
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shopProductSlice.reducer;
