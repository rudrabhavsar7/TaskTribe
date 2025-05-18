import express from "express";
import { allUsers, isAuth, login, logout, register } from "../controller/userController.js";
import { authUser } from "../middleware/authUser.js";

const userRoutes = express.Router();

userRoutes.post('/register',register);
userRoutes.post('/login',login);
userRoutes.get('/is-auth',authUser,isAuth)
userRoutes.post('/logout',authUser,logout)
userRoutes.get('/allusers',allUsers);

export default userRoutes;