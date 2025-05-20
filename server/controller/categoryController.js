// routes/sellerRoutes.js
import express from "express";
import upload from "../config/multer.js";
import cloudinary from "../config/cloudinary.js"
import { Category } from "../model/Category.js";

// POST /api/seller/category
const category = async (req, res) => {
  try {
    const { categoryId, name } = req.body;
    const filePath = req.file.path;

    console.log(filePath);
    let result;
    try {
      result = await cloudinary.uploader.upload(filePath, {
        folder: "tasktribe/categories",
      });
      console.log("Cloudinary Upload Result:", result);
    } catch (uploadErr) {
      console.error("❌ Cloudinary Upload Failed:", uploadErr);
      return res.status(500).json({ success: false, message: "Cloudinary upload failed", error: uploadErr.message });
    }
    
    console.log("Upload Success:", result);

    const newCategory = await Category.create({
      categoryId,
      name,
      image:result.secure_url,
    });

    res.status(201).json({ success: true, category: newCategory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default category;
