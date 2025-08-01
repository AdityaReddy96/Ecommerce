import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="relative flex min-h-screen w-full bg-gradient-to-br from-stone-50 to-gray-100">
      {/* Left decorative panel - only visible on larger screens */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br bg-black w-1/2 p-12">
        <div className="max-w-md space-y-6 text-center text-stone-100">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to Ecommerce Shopping
          </h1>
          <p className="text-lg text-stone-300">
            Sign in to access exclusive deals and personalized recommendations
          </p>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm border border-stone-100 sm:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}