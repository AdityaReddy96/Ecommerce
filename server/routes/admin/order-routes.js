import express from "express";
import {
  getOrdersOfAllUsers,
  getOrderDetailsAdmin,
  updateOrderStatus
} from "../../controllers/admin/order-controller.js";

const router = express.Router();

router.get("/get", getOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsAdmin);
router.put("/update/:id", updateOrderStatus);


export default router;
