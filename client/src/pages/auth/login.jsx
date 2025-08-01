import { CommonForm } from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
// import { FaSquareXTwitter } from "@/components/FaSquareXTwitter";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ShoppingBag } from "lucide-react";

const initialState = {
  email: "",
  password: "",
};

export const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await dispatch(loginUser(formData));
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      } else {
        toast.error(
          data?.payload?.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <ShoppingBag className="h-12 w-12 mb-4" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText={isLoading ? "Signing in..." : "Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={isLoading}
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        {/* <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div> */}
      </div>

      {/* <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" disabled={isLoading}>
          {isLoading ? (
            <FaSquareXTwitter className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaSquareXTwitter className="mr-2 h-4 w-4" />
          )}
          GitHub
        </Button>
        <Button variant="outline" disabled={isLoading}>
          {isLoading ? (
            <FaSquareXTwitter className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaSquareXTwitter className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
      </div> */}

      <p className="px-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="hover:underline underline-offset-4 text-primary font-bold"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};
