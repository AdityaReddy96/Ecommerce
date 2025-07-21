import { ProductDetails } from "@/components/shopping-view/product-details";
import { ShoppingProductTile } from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import {
  resetSearchResults,
  searchProductsSlice,
} from "@/store/shop/search-slice";
import { addToCartSlice, getCartItemSlice } from "@/store/shop/shop-cart-slice";
import { getProductDetails } from "@/store/shop/shop-products-silce";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetails, setOpenDetails] = useState(false);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();

  const handleGetProductDetails = (getCurrProductId) => {
    // console.log(getCurrProductId);
    dispatch(getProductDetails(getCurrProductId));
  };

  const handleAddToCart = (getCurrProductId, getTotalStock) => {
    // console.log(getCurrProductId);
    let getCartItem = cartItems.items || [];

    if (getCartItem.length) {
      const currentItemIndex = getCartItem.findIndex(
        (item) => item.productId === getCurrProductId
      );

      if (currentItemIndex > -1) {
        const getQuantity = getCartItem[currentItemIndex].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.warning("Max Product Limit Reached");
          return;
        }
      }
    }
    dispatch(
      addToCartSlice({
        userId: user?.id,
        productId: getCurrProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getCartItemSlice(user?.id));
        toast.success("Product Added to Cart");
      }
    });
  };

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(searchProductsSlice(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetails(true);
  }, [productDetails]);

  //   console.log(searchResults);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            className="py-6"
            placeholder="Search Products..."
            name={keyword}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No Results Found</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            key={item?._id}
            product={item}
            handleAddToCart={handleAddToCart}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetails
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        productDetails={productDetails}
      />
    </div>
  );
};
