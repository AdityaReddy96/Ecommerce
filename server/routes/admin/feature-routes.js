import express from "express";
import {
  addFeatureImage,
  getFeatureImage,
} from "../../controllers/admin/feature-controller.js";

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImage);

export default router;
