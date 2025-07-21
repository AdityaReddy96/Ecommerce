import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const searchProductsSlice = createAsyncThunk(
  "/search/searchProductsSlice",
  async (keyword) => {
    const response = await axios.get(
      `http://localhost:8000/api/shop/search/${keyword}`
    );
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "shopSearch",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProductsSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProductsSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchProductsSlice.rejected, (state) => {
        state.isLoading = true;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
