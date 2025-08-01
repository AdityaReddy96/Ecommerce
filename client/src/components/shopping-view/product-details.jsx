import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCartSlice, getCartItemSlice } from "@/store/shop/shop-cart-slice";
import { toast } from "sonner";
import {
  getProductDetails,
  setProductDetails,
  updateProductInList,
} from "@/store/shop/shop-products-silce";
import { Label } from "../ui/label";
import { Rating } from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReviewsSlice, getReviewsSlice } from "@/store/shop/review-slice";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const ProductDetails = ({
  openDetails,
  setOpenDetails,
  productDetails,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const dispatch = useDispatch();
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const handleAddReview = () => {
    dispatch(
      addReviewsSlice({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getReviewsSlice(productDetails?._id));
        dispatch(getProductDetails(productDetails?._id)).then((productData) => {
          // Update the product in the list with new average review
          dispatch(updateProductInList(productData.payload.data));
        });
        toast.success("Review Added Successfully");
        setReviewMsg("");
        setRating(0);
      }
    });
  };

  const handleAddToCartInProductDetails = (getCurrProductId, getTotalStock) => {
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
        setRating(0);
        setReviewMsg("");
        toast.success("Product Added to Cart");
      }
    });
  };

  const handleDetailsDialogClose = () => {
    setOpenDetails(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviewsSlice(productDetails?._id));
    }
  }, [productDetails]);

  return (
    <Dialog open={openDetails} onOpenChange={handleDetailsDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[65vw]">
        <VisuallyHidden asChild>
          <DialogTitle>Product Details</DialogTitle>
        </VisuallyHidden>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-5">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-2xl
              font-bold
              text-muted-foreground ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-primary">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Rating rating={averageReview} />
            <span className="text-xl text-muted-foreground">{`(${Math.round(
              averageReview
            )})`}</span>
          </div>
          <div className="mt-5 mb-5">
            <Button
              onClick={() =>
                handleAddToCartInProductDetails(
                  productDetails?._id,
                  productDetails?.totalStock
                )
              }
              className={`${
                productDetails?.totalStock === 0
                  ? "opacity-60 w-full cursor-not-allowed"
                  : "w-full"
              }`}
            >
              {`${
                productDetails?.totalStock === 0
                  ? "Out of Stock"
                  : "Add to Cart"
              }`}
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review?._id} className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback className="bg-gray-300">
                        {review?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{review?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Rating rating={review?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {review?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No reviews</h1>
              )}
            </div>
            <div className="mt-4 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex">
                <Rating
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                placeholder="Write a review"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
              />
              <Button
                disabled={reviewMsg.trim() === ""}
                onClick={handleAddReview}
              >
                Add review
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
