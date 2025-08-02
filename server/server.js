import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRegisterRouter from "./routes/auth/auth-routes.js";
import authLoginRouter from "./routes/auth/auth-routes.js";
import adminProductsRouter from "./routes/admin/products-routes.js";
import adminOrderRouter from "./routes/admin/order-routes.js";

import shopProductsRouter from "./routes/shop/products-routes.js";
import ShopCartRouter from "./routes/shop/cart-routes.js";
import addressRouter from "./routes/shop/address-routes.js";
import shopOrderRouter from "./routes/shop/order-routes.js";
import shopSearchRouter from "./routes/shop/search-routes.js";
import shopReviewRouter from "./routes/shop/review-routes.js";

import commonFeatureRouter from "./routes/admin/feature-routes.js";

const app = express();

// Loads environment variable from .env file in root directory
config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database Connected..!");
  })
  .catch((error) => {
    console.log(`Error in connecting the database : ${error}`);
  });

// CORS Configuration
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://ecommerce-frontend-five-chi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRegisterRouter);
app.use("/api/auth", authLoginRouter);

app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", ShopCartRouter);
app.use("/api/shop/address", addressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

// server connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;