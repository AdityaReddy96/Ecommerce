import { Address } from "@/components/shopping-view/address";
import accountImg from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import { CartItemContent } from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

export const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  // console.log(cartItems.items);

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
        <Address />
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
            <Button className="w-full">Checkout With Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
