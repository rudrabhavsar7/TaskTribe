import express from 'express';
import { allUsers, isAuth, login, logout, register } from "../controller/userController.js";
import { authUser } from "../middleware/authUser.js";
import upload from "../config/multer.js";
import category from '../controller/categoryController.js';
import subcategory from '../controller/subcategoryController.js';

const sellerRoutes = express.Router();

sellerRoutes.post('/register',register);
sellerRoutes.post('/login',login);
sellerRoutes.get('/is-auth',authUser,isAuth);
sellerRoutes.post('/logout',authUser,logout);
sellerRoutes.get('/allusers',allUsers);
sellerRoutes.post('/category',upload.single("image"),category);
sellerRoutes.post('/subcategory',upload.single("image"),subcategory);
sellerRoutes.post('/subcategory',upload.single("image"),subcategory);

export default sellerRoutes;