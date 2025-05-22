// routes/sellerRoutes.js
import express from "express";
import upload from "../config/multer.js";
import cloudinary from "../config/cloudinary.js"
import { Service } from "../model/Category.js";

// POST /api/seller/category
export const service = async (req, res) => {
  try {
    const { serviceId,serviceTitle, title, review,price,offerPrice,time,description,categoryId,subcategoryId } = req.body;
   
    const newService = await Service.create({
      serviceId,
      serviceTitle,
      title,
      review,
      price,
      offerPrice,
      time,
      description,
      categoryId,
      subcategoryId
    });

    if (!serviceId || !title || !categoryId || !subcategoryId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    
    res.status(201).json({ success: true, category: newService });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//GET /api/seller/allservice

export const getAllService = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error("Fetch Categories Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch categories" });
  }
};