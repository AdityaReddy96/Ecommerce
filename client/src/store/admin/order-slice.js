import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersOfAllUsers = createAsyncThunk(
  "/order/getAllOrdersOfAllUsers",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/admin/orders/get"
    );
    return response.data;
  }
);

export const getOrderDetailsAdmin = createAsyncThunk(
  "/order/getOrderDetailsAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/admin/orders/details/${id}`
    );
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {
    resetAdminOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersOfAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersOfAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetAdminOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
