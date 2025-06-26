import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { config } from "dotenv";

config({ path: "./.env" });

// cloudinary service setup
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// saves images in RAM of server, not in HardDisk
const storage = new multer.memoryStorage(); 

// Utility function which uploads the image in cloudinary
const imageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
};

// multer middleware
const upload = multer({ storage });

export { upload, imageUploadUtil };
