import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

export const ShoppingOrderDetailsView = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <DialogContent className="sm:max-w-[500px] overflow-y-auto max-h-[80vh]">
      <div className="grid gap-6 mt-5">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "Confirmed"
                    ? "bg-blue-500"
                    : orderDetails?.orderStatus === "Rejected"
                    ? "bg-red-500"
                    : null
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <Separator />
          <div className="grid gap-4 mt-5">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                  ? orderDetails?.cartItems.map((cartItem) => {
                      return (
                        <li className="grid grid-cols-3 gap-4 items-center">
                          <span className="truncate">
                            Title: {cartItem?.title}
                          </span>
                          <span className="text-center">
                            Quantity: {cartItem?.quantity}
                          </span>
                          <span className="text-right">
                            Price: ${cartItem?.price}
                          </span>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 mt-5">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Details</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>Username: {user?.userName}</span>
                <span>Address: {orderDetails?.addressInfo?.address}</span>
                <span>City: {orderDetails?.addressInfo?.city}</span>
                <span>Pincode: {orderDetails?.addressInfo?.pincode}</span>
                <span>Phone: {orderDetails?.addressInfo?.phone}</span>
                <span>Landmark: {orderDetails?.addressInfo?.notes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
