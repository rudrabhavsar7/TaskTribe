// routes/sellerRoutes.js
import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import Category from "../models/Category.js";

const router = express.Router();
const upload = multer({ storage });

// POST /api/seller/category
const category = async (req, res) => {
  try {
    const { categoryId, name } = req.body;
    const image = req.file.path; // Cloudinary image URL

    const newCategory = await Category.create({
      categoryId,
      name,
      image,
    });

    res.status(201).json({ success: true, category: newCategory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default router;
