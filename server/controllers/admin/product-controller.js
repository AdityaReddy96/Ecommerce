import { imageUploadUtil } from "../../helpers/cloudinary.js";
import { Product } from "../../models/Products.js";

// Controller to handle Image Upload
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      message: "Image Uploaded Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured in handleImageUpload",
    });
  }
};

// Controller to add a product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product Added Succesfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured in addProduct",
    });
  }
};

// Controller to fetch products
const fetchAllProduct = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Product Fetched Succesfully",
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured in fetchAllProduct",
    });
  }
};

// Controller to edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price ?? findProduct.price;
    findProduct.salePrice = salePrice ?? findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    await findProduct.save();
    res.status(200).json({
      success: true,
      message: "Product Edited Successfully",
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured in editProduct",
    });
  }
};

// Controller to delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured in deleteProduct",
    });
  }
};

export {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
};
