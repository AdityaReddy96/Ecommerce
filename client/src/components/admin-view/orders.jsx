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
import { useState } from "react";
import { AdminOrdersDetailView } from "./order-details";

export const AdminOrdersView = () => {
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
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
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>24/05/2018</TableCell>
              <TableCell>Arriving Today</TableCell>
              <TableCell>$1000</TableCell>
              <TableCell>
                <Dialog
                  open={openOrderDetails}
                  onOpenChange={setOpenOrderDetails}
                >
                  <Button onClick={() => setOpenOrderDetails(true)}>
                    View Details
                  </Button>
                  <AdminOrdersDetailView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
