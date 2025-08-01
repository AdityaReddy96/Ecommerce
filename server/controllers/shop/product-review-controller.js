import { Order } from "../../models/Order.js";
import { Product } from "../../models/Products.js";
import { Review } from "../../models/Review.js";

export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "Confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You cannot review",
      });
    }

    const checkExistingReview = await Review.findOne({ productId, userId });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed",
      });
    }

    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await Review.find({ productId });
    const totalReviewLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewLength;

    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      success: true,
      message: "Review Added Successfully",
      data: newReview,
      product: await Product.findById(productId),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred in addProductReview",
    });
  }
};

export const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId });

    res.status(200).json({
      success: true,
      message: "Review Added Successfully",
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred in getProductReview",
    });
  }
};

// Add to product-review-controller.js
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    // First get the review to find the productId
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const { productId } = review;

    // Delete the review
    await Review.findByIdAndDelete(id);

    // Recalculate average review
    const reviews = await Review.find({ productId });
    let averageReview = 0;

    if (reviews.length > 0) {
      averageReview =
        reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length;
    }

    // Update the product's average review
    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred in deleteReview",
    });
  }
};
