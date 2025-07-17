import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";

export const ShoppingOrderDetailsView = () => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>01/12/23</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>Arriving Today</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>$100</Label>
          </div>
          <Separator />
          <div className="grid gap-4 mt-5">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span>Product One</span>
                  <span>$100</span>
                </li>
              </ul>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 mt-5">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Details</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>Username: John</span>
                <span>Address: 6th Main Street</span>
                <span>City: Bengaluru</span>
                <span>Pincode: 235689</span>
                <span>Phone: 7894562396</span>
                <span>Landmark: Near Lighthouse</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
