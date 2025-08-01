import express from "express";
import {
  addProductReview,
  getProductReview,
  deleteReview,
} from "../../controllers/shop/product-review-controller.js";

const router = express.Router();

router.post("/add", addProductReview);
router.get("/:productId", getProductReview);
router.delete("/delete/:id", deleteReview);

export default router;
