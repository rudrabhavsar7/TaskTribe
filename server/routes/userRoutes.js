import express from "express";
import { allUsers, isAuth, login, logout, register } from "../controller/userController.js";
import { authUser } from "../middleware/authUser.js";
import { updatecart } from "../controller/cartController.js";
import passport from "passport";

const userRoutes = express.Router();

userRoutes.post('/register',register);
userRoutes.post('/login',login);
userRoutes.get('/is-auth',authUser,isAuth)
userRoutes.post('/logout',authUser,logout)
userRoutes.get('/allusers',allUsers);
userRoutes.post('/cart',authUser,updatecart);

//Google Authentication

userRoutes.get('/oauth/google',passport.authenticate('google',{scope:['profile','email']}));
userRoutes.get('/oauth/google/callback',passport.authenticate('google',{failureRedirect:'/login',session:false}),(req,res)=>{
    const token = req.user.token;
    res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'None'
  });
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
}
)

export default userRoutes;