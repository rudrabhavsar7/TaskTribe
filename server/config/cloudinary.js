// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_NAME,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tasktribe/categories",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export { cloudinary, storage };
