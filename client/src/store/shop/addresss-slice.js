import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  address: [],
  isLoading: false,
};

export const addAddressSlice = createAsyncThunk(
  "/address/addAddressSlice",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/address/add`,
      formData
    );
    return response.data;
  }
);

export const getAddressSlice = createAsyncThunk(
  "/address/getAddressSlice",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/shop/address/get/${userId}`
    );
    return response.data;
  }
);

export const updateAddressSlice = createAsyncThunk(
  "/address/updateAddressSlice",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }
);

export const deleteAddressSlice = createAsyncThunk(
  "/address/deleteAddressSlice",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "shopAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddressSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddressSlice.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addAddressSlice.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAddressSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddressSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(getAddressSlice.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
