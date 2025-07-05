import { Product } from "../../models/Products.js";

export const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      message: "Product Fetched Successfully",
      data: products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error ocurred in getFilteredProducts",
    });
  }
};
