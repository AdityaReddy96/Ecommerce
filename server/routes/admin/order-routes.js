import express from "express";
import {
  getOrdersOfAllUsers,
  getOrderDetailsAdmin,
} from "../../controllers/admin/order-controller.js";

const router = express.Router();

router.get("/get", getOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsAdmin);

export default router;
