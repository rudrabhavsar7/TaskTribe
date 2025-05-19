import express from 'express';
import { allUsers, isAuth, login, logout, register } from "../controller/userController.js";
import { authUser } from "../middleware/authUser.js";


const sellerRoutes = express.Router();

sellerRoutes.post('/register',register);
sellerRoutes.post('/login',login);
sellerRoutes.get('/is-auth',authUser,isAuth)
sellerRoutes.post('/logout',authUser,logout)
sellerRoutes.get('/allusers',allUsers);

export default sellerRoutes;