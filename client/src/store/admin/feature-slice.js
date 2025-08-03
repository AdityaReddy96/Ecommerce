import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const addFeatureImage = createAsyncThunk(
  "/common/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

export const getFeatureImage = createAsyncThunk(
  "/common/getFeatureImage",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/common/feature/get`
    );
    return response.data;
  }
);

const featureSlice = createSlice({
  name: "featureSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImage.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default featureSlice.reducer;
