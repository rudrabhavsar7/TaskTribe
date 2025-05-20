// routes/sellerRoutes.js
import express from "express";
import upload from "../config/multer.js";
import cloudinary from "../config/cloudinary.js"
import { Subcategory } from "../model/Category.js";

// POST /api/seller/category
const subcategory = async (req, res) => {
  try {
    const { subcategoryId, name ,categoryId} = req.body;
    const filePath = req.file.path;

    console.log(filePath);
    let result;
    try {
      result = await cloudinary.uploader.upload(filePath, {
        folder: "tasktribe/subcategories",
      });
      console.log("Cloudinary Upload Result:", result);
    } catch (uploadErr) {
      console.error("❌ Cloudinary Upload Failed:", uploadErr);
      return res.status(500).json({ success: false, message: "Cloudinary upload failed", error: uploadErr.message });
    }
    
    console.log("Upload Success:", result);

    const newSubCategory = await Subcategory.create({
      subcategoryId,
      name,
      image:result.secure_url,
      categoryId
    });

    res.status(201).json({ success: true, category: newSubCategory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default subcategory;
