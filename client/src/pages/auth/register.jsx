import { CommonForm } from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      // console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate("/auth/login");
      } else {
        toast.error(data?.payload?.message);
      }
    });
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <ShoppingBag className="h-12 w-12 mb-4" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Create new account
        </h1>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account{" "}
          <Link
            to="/auth/login"
            className="hover:underline underline-offset-4 text-primary font-bold"
          >
            Login
          </Link>
        </p>
    </div>
  );
};
