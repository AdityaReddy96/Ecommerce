import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/admin-product-slice";
import shopProductSlice from "./shop/shop-products-silce";
import shopCartSlice from "./shop/shop-cart-slice";
import shopAddressSlice from "./shop/addresss-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: shopProductSlice,
    shoppingCart: shopCartSlice,
    shopAddress: shopAddressSlice,
  },
});

export default store;
