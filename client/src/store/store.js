import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/admin-product-slice";
import adminOrderSlice from "./admin/order-slice";
import shopProductSlice from "./shop/shop-products-silce";
import shopCartSlice from "./shop/shop-cart-slice";
import shopAddressSlice from "./shop/addresss-slice";
import shoppingOrderSlice from "./shop/order-slice";
import shoppingSearchSlice from "./shop/search-slice";
import shoppingReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./admin/feature-slice";


const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductSlice,
    adminOrders: adminOrderSlice,

    shopProducts: shopProductSlice,
    shoppingCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrders: shoppingOrderSlice,
    shopSearch: shoppingSearchSlice,
    shopReview: shoppingReviewSlice,

    featureSlice: commonFeatureSlice
  },
});

export default store;
