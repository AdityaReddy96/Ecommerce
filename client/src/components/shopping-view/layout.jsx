import { Outlet } from "react-router-dom";
import { ShoppingHeader } from "./header";

export const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* {Shopping Header} */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};
