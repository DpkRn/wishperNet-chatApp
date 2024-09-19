import { Router } from "express";
import { getuserinfo, login, signup,updateprofile,addprofileimage,removeprofileimage, logout } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const route=Router()

const upload=multer({dest:'uploads/profiles/'})
route.post('/signup',signup)
route.post('/login',login)
route.get('/userinfo',verifyToken,getuserinfo)
route.post('/update-profile',verifyToken,updateprofile)
route.post(
    '/add-profile-image',
    verifyToken,
    upload.single('profile-name'),
    addprofileimage
)

route.delete('/remove-profile-image',verifyToken,removeprofileimage)
route.post('/logout',logout)

export default route