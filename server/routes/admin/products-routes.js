import express from "express";
import {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
} from "../../controllers/admin/product-controller.js";
import { upload } from "../../helpers/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/get", fetchAllProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
