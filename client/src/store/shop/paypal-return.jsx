import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePaymentSlice } from "./order-slice";

export const PaypalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (payerId && paymentId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePaymentSlice({ paymentId, payerId, orderId })).then(
        (data) => {
          // console.log(data);
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            window.location.href = "/shop/payment-success";
          }
        }
      );
    }
  }, [dispatch, paymentId, payerId]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proccessing Payment...Please Wait</CardTitle>
      </CardHeader>
    </Card>
  );
};
