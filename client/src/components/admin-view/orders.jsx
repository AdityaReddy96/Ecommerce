import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useEffect, useState } from "react";
import { AdminOrdersDetailView } from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersOfAllUsers,
  getOrderDetailsAdmin,
  resetAdminOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

export const AdminOrdersView = () => {
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();

  const handleFetchAdminOrderDetails = (getId) => {
    dispatch(getOrderDetailsAdmin(getId));
  };

  useEffect(() => {
    dispatch(getAllOrdersOfAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenOrderDetails(true);
    }
  }, [orderDetails]);

  // console.log(orderList);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
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
                          open={openOrderDetails}
                          onOpenChange={() => {
                            setOpenOrderDetails(false),
                              dispatch(resetAdminOrderDetails());
                          }}
                        >
                          <Button
                            onClick={() =>
                              handleFetchAdminOrderDetails(order?._id)
                            }
                          >
                            View Details
                          </Button>
                          <AdminOrdersDetailView orderDetails={orderDetails} />
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
