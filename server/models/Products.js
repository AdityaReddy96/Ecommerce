import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: {
      type: Number,
      default: 0,
    },
  },
  { timeStamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
