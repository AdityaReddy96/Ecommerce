import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { CartItemContent } from "./cart-items-content";

export const CartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, currItem) => {
          return (
            sum +
            (currItem?.salePrice > 0 ? currItem?.salePrice : currItem?.price) *
              currItem?.quantity
          );
        }, 0)
      : 0;
  return (
    <SheetContent className="sm:max-w-md lg:max-w-sm px-4 overflow-auto">
      <SheetHeader>
        <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
      </SheetHeader>
      <div>
        {cartItems && cartItems.length > 0
          ? cartItems.map((cartItem) => {
              return (
                <CartItemContent cartItem={cartItem} key={cartItem.productId} />
              );
            })
          : null}
      </div>
      <div className="mt-2">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalAmount}</span>
        </div>
      </div>
      <Button onClick={() => {
        navigate("/shop/checkout")
        setOpenCartSheet(false)
      }} className="w-full mb-5">
        Checkout
      </Button>
    </SheetContent>
  );
};
