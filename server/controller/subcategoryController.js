// routes/sellerRoutes.js
import express from "express";
import upload from "../config/multer.js";
import cloudinary from "../config/cloudinary.js"
import { Subcategory } from "../model/Category.js";

// POST /api/seller/category
export const subcategory = async (req, res) => {
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

//GET /api/seller/allsubcategories

export const getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({});
    res.status(200).json({ success: true, subcategories });
  } catch (error) {
    console.error("Fetch Categories Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch categories" });
  }
};
