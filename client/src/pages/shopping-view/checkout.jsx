import { Address } from "@/components/shopping-view/address";
import accountImg from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import { CartItemContent } from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createOrderSlice } from "@/store/shop/order-slice";
import { toast } from "sonner";

export const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalUrl } = useSelector((state) => state.shopOrders);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();

  // console.log(cartItems.items);

  // console.log(currentSelectedAddress);

  const handleInitiatePaypalPayment = () => {
    if (cartItems.length === 0) {
      toast.warning("Cart Is Empty");
      return;
    }

    if (currentSelectedAddress === null) {
      toast.warning("Please Select Address");
      return;
    }
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((cartItem) => ({
        productId: cartItem?.productId,
        title: cartItem?.title,
        image: cartItem?.image,
        price: cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price,
        quantity: cartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "Pending",
      paymentMethod: "Paypal",
      paymentStatus: "Pending",
      totalAmount: totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    // console.log(orderData);

    dispatch(createOrderSlice(orderData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  };

  if (approvalUrl) {
    window.location.href = approvalUrl;
  }

  const totalAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currItem) => {
          return (
            sum +
            (currItem?.salePrice > 0 ? currItem?.salePrice : currItem?.price) *
              currItem?.quantity
          );
        }, 0)
      : 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-5 mt-10">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((cartItem) => {
                return (
                  <CartItemContent
                    key={cartItem.productId}
                    cartItem={cartItem}
                  />
                );
              })
            : null}
          <div className="mt-5">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalAmount}</span>
            </div>
          </div>
          <div>
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              Checkout With Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
