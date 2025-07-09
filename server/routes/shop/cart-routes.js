import express from "express";
import {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../../controllers/shop/cart-controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCartItems);
router.put("/update-cart", updateCartItem);
router.delete("/:userId/:productId", deleteCartItem);

export default router;
