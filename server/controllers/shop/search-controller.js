import { Product } from "../../models/Products.js";

export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      res.status(400).json({
        success: false,
        message: `Keyword is not a string`,
      });
    }

    const regEx = new RegExp(keyword, "i");
    const createSearchQuery = {
      $or: [
        { title: regEx },
        { category: regEx },
        { brand: regEx },
        { description: regEx },
      ],
    };

    const searchResults = await Product.find(createSearchQuery);

    res.status(200).json({
      success: true,
      message: "Search Successfull",
      data: searchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured in searchProduct",
    });
  }
};
