import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "./components/auth/layout";
import { AuthLogin } from "./pages/auth/login";
import { AuthRegister } from "./pages/auth/register";
import { AdminLayout } from "./components/admin-view/layout";
import { AdminOrders } from "./pages/admin-view/orders";
import { AdminDashboard } from "./pages/admin-view/dashboard";
import { AdminFeatures } from "./pages/admin-view/features";
import { AdminProducts } from "./pages/admin-view/products";
import { ShoppingLayout } from "./components/shopping-view/layout";
import { NotFound } from "./pages/not-found";
import { ShoppingAccount } from "./pages/shopping-view/account";
import { ShoppingCheckout } from "./pages/shopping-view/checkout";
import { ShoppingHome } from "./pages/shopping-view/home";
import { ShoppingListing } from "./pages/shopping-view/listing";
import { CheckAuth } from "./components/common/check-auth";
import { UnAuthPage } from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { SpinnerLoader } from "./assets/loader";
import { PaypalReturn } from "./pages/shopping-view/paypal-return";
import { PaymentSuccess } from "./pages/shopping-view/payment-success";
import { SearchProducts } from "./pages/shopping-view/search";

export const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <SpinnerLoader size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />}></Route>
          <Route path="register" element={<AuthRegister />}></Route>
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="orders" element={<AdminOrders />}></Route>
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="features" element={<AdminFeatures />}></Route>
          <Route path="products" element={<AdminProducts />}></Route>
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShoppingAccount />}></Route>
          <Route path="checkout" element={<ShoppingCheckout />}></Route>
          <Route path="home" element={<ShoppingHome />}></Route>
          <Route path="listing" element={<ShoppingListing />}></Route>
          <Route path="paypal-return" element={<PaypalReturn />}></Route>
          <Route path="payment-success" element={<PaymentSuccess />}></Route>
          <Route path="search" element={<SearchProducts />}></Route>
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};
