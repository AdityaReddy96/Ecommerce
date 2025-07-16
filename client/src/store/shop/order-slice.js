import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  approvalUrl: null,
  isLoading: false,
  orderId: null,
};

export const createOrderSlice = createAsyncThunk(
  "/order/createOrderSlice",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:8000/api/shop/order/create",
      orderData
    );
    return response.data;
  }
);

export const capturePaymentSlice = createAsyncThunk(
  "/order/capturePaymentSlice",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      "http://localhost:8000/api/shop/order/create",
      {
        paymentId,
        payerId,
        orderId,
      }
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shopOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrderSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalUrl = action.payload.approvalUrl;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createOrderSlice.rejected, (state) => {
        state.isLoading = false;
        state.approvalUrl = null;
        state.orderId = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
