import { useState } from "react";
import { CommonForm } from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersOfAllUsers,
  getOrderDetailsAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";

const initialFormData = {
  status: "",
};

export const AdminOrdersDetailView = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleStatusUpdate = (event) => {
    event.preventDefault();
    // console.log(formData);
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsAdmin(orderDetails?._id));
        dispatch(getAllOrdersOfAllUsers());
        setFormData(initialFormData);
      }
    });
  };
  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
      <div className="grid gap-6 py-4">
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
                        <li
                          key={cartItem?._id}
                          className="grid grid-cols-3 gap-4 items-center"
                        >
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
            <Separator />
            <div>
              <CommonForm
                formControls={[
                  {
                    label: "Order Status",
                    name: "status",
                    componentType: "select",
                    options: [
                      { id: "Confirmed", label: "Confirmed" },
                      { id: "Pending", label: "Pending" },
                      { id: "In Process", label: "In Process" },
                      { id: "Shipped", label: "Shipped" },
                      { id: "Delivered", label: "Delivered" },
                      { id: "Rejected", label: "Rejected" },
                    ],
                  },
                ]}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Update Order Status"}
                onSubmit={handleStatusUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
