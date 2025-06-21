import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRegisterRouter from "./routes/auth/auth-routes.js";
import authLoginRouter from "./routes/auth/auth-routes.js";

const app = express();
config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database Connected..!");
  })
  .catch((error) => {
    console.log(`Error in connecting the database : ${error}`);
  });

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
