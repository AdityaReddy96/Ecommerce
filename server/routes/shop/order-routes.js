import express from "express";
import {
  capturePayment,
  createOrder,
  getOrdersByUSerId,
  getOrderDetails,
} from "../../controllers/shop/order-controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getOrdersByUSerId);
router.get("/details/:id", getOrderDetails);

export default router;
