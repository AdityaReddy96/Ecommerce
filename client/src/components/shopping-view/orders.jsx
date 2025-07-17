import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ShoppingOrderDetailsView } from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

export const ShoppingOrders = () => {
  const [openShoppingDetails, setOpenShoppingDetails] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrders);

  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetails(getId));
  };

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenShoppingDetails(true);
    }
  }, [orderDetails]);

  // console.log(orderList);
  // console.log(orderDetails);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((order) => {
                  return (
                    <TableRow key={order?._id}>
                      <TableCell>{order?._id}</TableCell>
                      <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 ${
                            order?.orderStatus === "Confirmed"
                              ? "bg-blue-500"
                              : null
                          }`}
                        >
                          {order?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>${order?.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openShoppingDetails}
                          onOpenChange={() => [
                            setOpenShoppingDetails(false),
                            dispatch(resetOrderDetails()),
                          ]}
                        >
                          <Button
                            onClick={() => handleFetchOrderDetails(order?._id)}
                          >
                            View Details
                          </Button>
                          <ShoppingOrderDetailsView
                            orderDetails={orderDetails}
                          />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
