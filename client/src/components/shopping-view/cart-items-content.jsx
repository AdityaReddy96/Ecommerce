import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItemSlice,
  updateCartItemSlice,
} from "@/store/shop/shop-cart-slice";
import { toast } from "sonner";

export const CartItemContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (cartItem, typeOfAction) => {
    dispatch(
      updateCartItemSlice({
        userId: user?.id,
        productId: cartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? cartItem?.quantity + 1
            : cartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart Item Updated");
      }
    });
  };

  const handleCartDelete = (cartItem) => {
    dispatch(
      deleteCartItemSlice({ userId: user?.id, productId: cartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart Item Deleted");
      }
    });
  };
  return (
    <div className="flex items-center space-x-4 mb-3">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem.price) *
            cartItem?.quantity.toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};
