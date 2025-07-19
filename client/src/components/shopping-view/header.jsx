import {
  AlignJustify,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { CartWrapper } from "./cart-wrapper";
import { useEffect, useState } from "react";
import { getCartItemSlice } from "@/store/shop/shop-cart-slice";
import { Label } from "../ui/label";

const MenuItems = () => {
  const navigate = useNavigate();

  const handleMenuNavigation = (menuItem) => {
    sessionStorage.removeItem("filters");

    const menuFilter =
      menuItem.id !== "home" && menuItem.id !== "products"
        ? {
            category: [menuItem.id],
          }
        : {};

    sessionStorage.setItem("filters", JSON.stringify(menuFilter));
    const queryParam =
      menuItem.id !== "home" && menuItem.id !== "products"
        ? `?category=${menuItem.id}`
        : ""; // optional: add ?all=true or something like that

    navigate(`${menuItem.path}${queryParam}`);
  };
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleMenuNavigation(menuItem)}
          key={menuItem.id}
          className="text-sm font-medium cursor-pointer"
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getCartItemSlice(user?.id));
  }, [dispatch]);

  // console.log("cartItems Aditya", cartItems);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4 ">
      <Sheet
        open={openCartSheet}
        onOpenChange={() => {
          setOpenCartSheet(false);
        }}
      >
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">User Cart</span>
        </Button>
        <CartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-56">
          <DropdownMenuLabel>Logged In As {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer"
          >
            <User className="mr-2 h-4 w-4 " />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleUserLogout}
            className="cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4 " />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  //   console.log("user : ", user);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Shopping Heeader Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs p-4">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};
