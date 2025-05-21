import express from 'express';
import { allUsers, isAuth, login, logout, register } from "../controller/userController.js";
import { authUser } from "../middleware/authUser.js";
import upload from "../config/multer.js";
import {category, getAllCategories} from '../controller/categoryController.js';
import {getAllSubCategories, subcategory} from '../controller/subcategoryController.js';
import { getAllService, service } from '../controller/serviceController.js';

const sellerRoutes = express.Router();

sellerRoutes.post('/register',register);
sellerRoutes.post('/login',login);
sellerRoutes.get('/is-auth',authUser,isAuth);
sellerRoutes.post('/logout',authUser,logout);
sellerRoutes.get('/allusers',allUsers);
sellerRoutes.post('/category',upload.single("image"),category);
sellerRoutes.get('/allcategory',getAllCategories);
sellerRoutes.post('/subcategory',upload.single("image"),subcategory);
sellerRoutes.get('/allsubcategory',getAllSubCategories);
sellerRoutes.post('/service',service);
sellerRoutes.get('/allservice',getAllService);

export default sellerRoutes;