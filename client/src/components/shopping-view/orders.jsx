import { useState } from "react";
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

export const ShoppingOrders = () => {
  const [openShoppingDetails, setOpenShoppingDetails] = useState(false);
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
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>24/05/2018</TableCell>
              <TableCell>Arriving Today</TableCell>
              <TableCell>$1000</TableCell>
              <TableCell>
                <Dialog
                  open={openShoppingDetails}
                  onOpenChange={setOpenShoppingDetails}
                >
                  <Button onClick={() => setOpenShoppingDetails(true)}>
                    View Details
                  </Button>
                <ShoppingOrderDetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
