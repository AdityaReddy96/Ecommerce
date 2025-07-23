import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {
  const navigate = useNavigate()
  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl">Payment Successfull...!</CardTitle>
      </CardHeader>
      <Button className="w-30" onClick={() => navigate("/shop/account")}>View Details</Button>
    </Card>
  );
};
